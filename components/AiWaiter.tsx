"use client";

import { useEffect, useRef, useState } from "react";
import {
  itemByName,
  waiterPrompts,
  type WaiterPick,
  type WaiterResult,
} from "@/lib/ai-waiter";
import { inr } from "@/lib/site";

const langs = [
  { id: "en-IN", label: "EN" },
  { id: "hi-IN", label: "हिं" },
  { id: "kn-IN", label: "ಕನ್" },
] as const;

type CallBits = {
  pc: RTCPeerConnection;
  local: MediaStream;
  remote: HTMLAudioElement;
};

function picksFromTool(raw: string): WaiterPick[] {
  try {
    const data = JSON.parse(raw) as {
      picks?: { name?: string; qty?: number; note?: string; reason?: string }[];
    };
    return (data.picks ?? [])
      .map((p) => {
        const item = itemByName(p.name || "");
        if (!item) return null;
        return {
          item,
          qty: Math.min(8, Math.max(1, Number(p.qty) || 1)),
          note: p.note || "",
          reason: p.reason || "From voice",
        };
      })
      .filter((p) => p !== null);
  } catch {
    return [];
  }
}

export default function AiWaiter({
  cart,
  onAdd,
  onRemove,
}: {
  cart: { name: string; qty: number }[];
  onAdd: (picks: WaiterPick[]) => void;
  onRemove: (names: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState<(typeof langs)[number]["id"]>("en-IN");
  const [live, setLive] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<WaiterResult | null>(null);
  const [status, setStatus] = useState("");
  const callRef = useRef<CallBits | null>(null);
  const seenCalls = useRef(new Set<string>());
  const lastAddKey = useRef({ key: "", at: 0 });

  const hangUp = () => {
    const call = callRef.current;
    callRef.current = null;
    call?.pc.close();
    call?.local.getTracks().forEach((t) => t.stop());
    call?.remote.pause();
    call?.remote.remove();
    seenCalls.current.clear();
    setLive(false);
  };

  useEffect(() => () => hangUp(), []);

  const applyPicks = (picks: WaiterPick[], reply: string, callId?: string) => {
    if (!picks.length) return;
    if (callId && seenCalls.current.has(callId)) return;
    if (callId) seenCalls.current.add(callId);
    const key = picks.map((p) => `${p.item.name}:${p.qty}`).join("|");
    const now = Date.now();
    if (lastAddKey.current.key === key && now - lastAddKey.current.at < 4000) return;
    lastAddKey.current = { key, at: now };
    onAdd(picks);
    setResult({ reply, picks });
  };

  const applyRemove = (names: string[], reply: string, callId?: string) => {
    if (callId && seenCalls.current.has(callId)) return;
    if (callId) seenCalls.current.add(callId);
    const clean = names.map((n) => itemByName(n)?.name).filter((n): n is string => !!n);
    if (!clean.length) return;
    onRemove(clean);
    setResult({ reply, picks: [], remove: clean });
  };

  const runTyped = async (text: string) => {
    const q = text.trim();
    if (!q) return;
    setBusy(true);
    setStatus("Understanding that…");
    try {
      const res = await fetch("/api/waiter/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: q, language: lang, cart }),
      });
      const next = (await res.json()) as WaiterResult & { error?: string };
      if (!res.ok) {
        setStatus(next.error || "Waiter is busy. Try again.");
        return;
      }
      setResult(next);
      setQuery(q);
      setStatus("");
      if (next.picks.length) onAdd(next.picks);
      if (next.remove?.length) onRemove(next.remove);
    } catch {
      setStatus("Could not reach the waiter.");
    } finally {
      setBusy(false);
    }
  };

  const talk = async () => {
    if (live) {
      hangUp();
      setStatus("Call ended.");
      return;
    }
    setBusy(true);
    setStatus("Calling the waiter…");
    try {
      const boot = await fetch("/api/realtime/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: lang, cart }),
      });
      const session = (await boot.json()) as {
        model?: string;
        clientSecret?: string;
        error?: string;
      };
      if (!boot.ok || !session.clientSecret || !session.model) {
        throw new Error(session.error || "Voice call is not available.");
      }

      const pc = new RTCPeerConnection();
      const remote = document.createElement("audio");
      remote.autoplay = true;
      pc.ontrack = (event) => {
        remote.srcObject = event.streams[0];
        void remote.play();
      };
      const local = await navigator.mediaDevices.getUserMedia({ audio: true });
      local.getTracks().forEach((track) => pc.addTrack(track, local));
      const dc = pc.createDataChannel("oai-events");
      dc.addEventListener("message", (event) => {
        const msg = JSON.parse(String(event.data)) as {
          type?: string;
          name?: string;
          arguments?: string;
          call_id?: string;
          item?: {
            type?: string;
            name?: string;
            arguments?: string;
            call_id?: string;
          };
        };
        if (
          msg.type === "input_audio_buffer.speech_started" ||
          msg.type === "input_audio.speech_started"
        ) {
          setStatus("Listening… speak naturally.");
        }
        // Realtime emits the same tool call on several events. Apply it once.
        if (msg.type !== "response.function_call_arguments.done") return;
        const name = msg.name || msg.item?.name;
        const args = msg.arguments || msg.item?.arguments;
        const callId = msg.call_id || msg.item?.call_id;
        if (!args) return;
        if (name === "propose_order") {
          const picks = picksFromTool(args);
          applyPicks(
            picks,
            "Added to your table. Want fries with that? They’re a bestseller.",
            callId,
          );
          if (callId) {
            dc.send(
              JSON.stringify({
                type: "conversation.item.create",
                item: {
                  type: "function_call_output",
                  call_id: callId,
                  output: JSON.stringify({
                    ok: true,
                    added: picks.map((p) => `${p.qty}× ${p.item.name}`),
                    note: "Already on the cart. Do not call propose_order again for these dishes.",
                  }),
                },
              }),
            );
            dc.send(JSON.stringify({ type: "response.create" }));
          }
        }
        if (name === "remove_item") {
          try {
            const data = JSON.parse(args) as { names?: string[]; name?: string };
            const names = data.names ?? (data.name ? [data.name] : []);
            applyRemove(names, "Taken off the table order.", callId);
          } catch {
            /* ignore */
          }
          if (callId) {
            dc.send(
              JSON.stringify({
                type: "conversation.item.create",
                item: {
                  type: "function_call_output",
                  call_id: callId,
                  output: JSON.stringify({ ok: true }),
                },
              }),
            );
            dc.send(JSON.stringify({ type: "response.create" }));
          }
        }
      });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      await Promise.race([
        new Promise<void>((resolve) => {
          if (pc.iceGatheringState === "complete") {
            resolve();
            return;
          }
          pc.onicegatheringstatechange = () => {
            if (pc.iceGatheringState === "complete") resolve();
          };
        }),
        new Promise<void>((resolve) => {
          setTimeout(resolve, 1600);
        }),
      ]);

      const sdpRes = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        body: pc.localDescription?.sdp ?? "",
        headers: {
          Authorization: `Bearer ${session.clientSecret}`,
          "Content-Type": "application/sdp",
        },
      });
      if (!sdpRes.ok) {
        throw new Error("Could not start the voice call.");
      }
      const answer = await sdpRes.text();
      if (!answer.includes("v=")) {
        throw new Error("Could not start the voice call.");
      }
      await pc.setRemoteDescription({
        type: "answer",
        sdp: answer,
      });
      callRef.current = { pc, local, remote };
      setLive(true);
      setStatus("You’re on a call. Just talk — don’t wait for a beep.");
    } catch (err) {
      hangUp();
      setStatus(err instanceof Error ? err.message : "Mic or voice call failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="aiw">
      <div className="aiw-head">
        <p className="aiw-kicker">Table waiter</p>
        <h2>I’ll take your order</h2>
        <p>
          Tell me what you feel like. I’ll add it to this table, mention what’s selling, and you can
          remove anything you don’t want.
        </p>
      </div>

      <div className="aiw-langs" role="group" aria-label="Voice language">
        {langs.map((l) => (
          <button
            key={l.id}
            type="button"
            className={lang === l.id ? "is-on" : ""}
            onClick={() => setLang(l.id)}
            disabled={live}
          >
            {l.label}
          </button>
        ))}
      </div>

      <form
        className="aiw-bar"
        onSubmit={(e) => {
          e.preventDefault();
          void runTyped(query);
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="2 zingers, extra spicy — or remove the pizza"
          aria-label="Type what you want"
        />
        <button
          type="button"
          className={`aiw-mic${live ? " is-on" : ""}`}
          onClick={() => void talk()}
          disabled={busy}
          aria-label={live ? "Hang up" : "Talk to the waiter"}
        >
          {live ? "●" : "🎤"}
        </button>
        <button type="submit" className="aiw-go" disabled={busy || live}>
          Ask
        </button>
      </form>

      {status ? <p className="aiw-status">{status}</p> : null}

      <div className="aiw-chips">
        {waiterPrompts.map((p) => (
          <button key={p} type="button" onClick={() => void runTyped(p)}>
            {p}
          </button>
        ))}
      </div>

      {result ? (
        <div className="aiw-out">
          <p>{result.reply}</p>
          {result.picks.length ? (
            <ul>
              {result.picks.map((p) => (
                <li key={p.item.name}>
                  <img src={p.item.image} alt="" />
                  <span>
                    <b>
                      {p.qty}× {p.item.name}
                    </b>
                    <em>
                      {p.reason}
                      {p.note ? ` · ${p.note}` : ""}
                    </em>
                  </span>
                  <strong>{inr(p.item.price * p.qty)}</strong>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
