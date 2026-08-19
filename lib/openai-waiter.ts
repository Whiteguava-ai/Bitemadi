import { askWaiter, bestsellers, getMenuForAi, itemByName, type WaiterPick, type WaiterResult } from "./ai-waiter";
import { envKey } from "./env";

const ttsStyle: Record<string, string> = {
  "en-IN":
    "You are a warm waiter at Bite Maadi, a casual cafe in Manipal. Speak like a real person taking a table order: friendly, slightly casual Indian English, a little smile in the voice. Natural pauses. Not a call-centre robot, not monotone, not overly dramatic.",
  "hi-IN":
    "आप बाइट मादी कैफे के गर्मजोशी भरे वेटर हैं। स्वाभाविक हिंदी में बात करें, जैसे किसी टेबल पर ऑर्डर ले रहे हों। दोस्ताना, हल्की मुस्कान, रोबोट जैसी आवाज़ बिल्कुल नहीं।",
  "kn-IN":
    "ನೀವು ಮಣಿಪಾಲಿನ Bite Maadi ಕೆಫೆಯ ಒಬ್ಬ ಸ್ನೇಹಪರ ವೇಟರ್. ಸಹಜ ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ, ಟೇಬಲ್ ಆರ್ಡರ್ ತೆಗೆದುಕೊಳ್ಳುವಂತೆ. ರೋಬಾಟ್ ಧ್ವನಿ ಬೇಡ, ನಗುಮುಖದ ಸಹಜ ಧ್ವನಿ.",
};

function openaiHeaders() {
  const key = envKey("OPENAI_API_KEY");
  if (!key) throw new Error("OPENAI_API_KEY is missing in .env");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

function mentioned(query: string, name: string) {
  const q = query.toLowerCase();
  const bits = name.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  return bits.some((w) => q.includes(w)) || q.includes(name.toLowerCase());
}

function tightenPicks(query: string, picks: WaiterPick[]): WaiterPick[] {
  const q = query.toLowerCase();
  const extras = /fries|lemonade|milkshake|brownie|cheesecake|tiramisu|garlic|nachos|rings/;
  let next = picks.filter((p, i) => {
    if (picks.findIndex((x) => x.item.name === p.item.name) !== i) return false;
    if (extras.test(p.item.name.toLowerCase()) && !mentioned(query, p.item.name) && !extras.test(q))
      return false;
    return true;
  });
  if (!/\band\b|,|&|\bplus\b|\balso\b|\bwith\b/.test(q) && next.length > 1) {
    next = next.slice(0, 1);
  }
  const num = q.match(/\b(\d+|one|two|three|four|five|six)\b/);
  const word: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
  };
  const asked = num ? (word[num[1]] ?? (Number(num[1]) || 1)) : 1;
  return next.map((p, i) => ({
    ...p,
    qty: i === 0 ? Math.min(p.qty, asked) : Math.min(p.qty, 1),
  }));
}

export async function askMenuWaiter(
  text: string,
  language: string,
  cart: { name: string; qty: number }[] = [],
): Promise<WaiterResult> {
  const query = text.trim();
  if (!query) return askWaiter(query);

  try {
    const menu = getMenuForAi();
    const langLabel =
      language === "hi-IN" ? "Hindi" : language === "kn-IN" ? "Kannada" : "casual Indian English";
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: openaiHeaders(),
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.5,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `You are a live table waiter at Bite Maadi in Manipal, taking this guest's order right now.
Help them choose. You may mention a bestseller in reply, but NEVER put unsolicited extras in picks.
If they want something removed, put those exact names in remove.
Use ONLY this menu. Never invent dishes.
Bestsellers: ${bestsellers.join(", ")}
Current table cart: ${cart.length ? cart.map((c) => `${c.qty}× ${c.name}`).join(", ") : "empty"}
Menu JSON:
${JSON.stringify(menu)}

Return JSON: {"reply": string, "speak": string, "picks": [{"name": string, "qty": number, "note": string, "reason": string}], "remove": [string]}
Rules:
- picks = ONLY dishes the guest clearly asked to add. If they said one item, picks has exactly that one item with qty 1
- do not add fries, drinks, or dessert unless they asked for them
- suggest an add-on only in reply, as a question
- qty must match their words (one/1 → 1). Never default to 3
- name must match a menu item exactly
- remove is dishes to take off the cart
- reply is a helpful waiter line in ${langLabel}
- honour veg, jain, spicy, budget, allergies, and "remove / no / take off"`,
          },
          { role: "user", content: query },
        ],
      }),
    });
    const data = (await res.json()) as {
      error?: { message?: string };
      choices?: { message?: { content?: string } }[];
    };
    if (!res.ok) throw new Error(data.error?.message || "OpenAI menu failed");
    const parsed = JSON.parse(data.choices?.[0]?.message?.content || "{}") as {
      reply?: string;
      speak?: string;
      picks?: { name?: string; qty?: number; note?: string; reason?: string }[];
      remove?: string[];
    };
    const picks = tightenPicks(
      query,
      (parsed.picks ?? [])
        .map((p) => {
          const item = itemByName(p.name || "");
          if (!item) return null;
          return {
            item,
            qty: Math.min(8, Math.max(1, Number(p.qty) || 1)),
            note: (p.note || "").slice(0, 80),
            reason: (p.reason || "Good match").slice(0, 80),
          };
        })
        .filter((p) => p !== null),
    );
    const remove = (parsed.remove ?? [])
      .map((name) => itemByName(name)?.name)
      .filter((name): name is string => !!name);
    const reply = (parsed.reply || "").trim() || askWaiter(query).reply;
    const speak = (parsed.speak || "").trim();
    return { reply, speak, picks, remove };
  } catch {
    return askWaiter(query);
  }
}

export async function openaiSpeechToText(audio: ArrayBuffer, language: string) {
  const key = envKey("OPENAI_API_KEY");
  if (!key) throw new Error("OPENAI_API_KEY is missing in .env");
  const lang = language.startsWith("hi") ? "hi" : language.startsWith("kn") ? "kn" : "en";
  const form = new FormData();
  form.set("model", "whisper-1");
  form.set("language", lang);
  form.set(
    "file",
    new Blob([new Uint8Array(audio)], { type: "audio/wav" }),
    "speech.wav",
  );
  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}` },
    body: form,
  });
  const data = (await res.json()) as { text?: string; error?: { message?: string } };
  if (!res.ok || !data.text?.trim()) {
    throw new Error(data.error?.message || "Could not hear that.");
  }
  return data.text.trim();
}

export function waiterTalkInstructions(
  language: string,
  cart: { name: string; qty: number }[] = [],
) {
  const menu = getMenuForAi()
    .map(
      (item) =>
        `${item.name} ₹${item.price}${item.veg ? " veg" : ""}${item.jain ? " jain" : ""}`,
    )
    .join("; ");
  const lang =
    language === "hi-IN"
      ? "Hindi"
      : language === "kn-IN"
        ? "Kannada"
        : "casual Indian English";
  return `You are the table waiter at Bite Maadi, Manipal, taking this guest's order at their table.
Speak ${lang}. Warm, short, real person — not a robot, not a menu reader.
Help them order. Mention that Crispy Zinger Burger, BBQ Chicken Pizza, and French Fries are bestsellers when it fits.
After they pick a main, suggest ONE add-on (fries, lemonade, milkshake, or brownie). Don't stack three upsells.
If they say remove / cancel / take off a dish, call remove_item.
If they confirm dishes, call propose_order ONCE with ONLY those dishes — never add extras they did not ask for. qty is 1 unless they said a number. Never call propose_order again for the same dishes in the same turn.
After adding, you may ASK if they want fries (bestseller) — do not add them until they say yes.
Never recite the whole menu. Suggest one thing at a time.
Current cart: ${cart.length ? cart.map((c) => `${c.qty}× ${c.name}`).join(", ") : "empty"}.
You may only sell: ${menu}
Keep spoken replies to one or two short sentences.`;
}

export async function createRealtimeSession(
  language: string,
  cart: { name: string; qty: number }[] = [],
) {
  const models = ["gpt-realtime-2.1", "gpt-realtime", "gpt-4o-realtime-preview"];
  const tools = [
    {
      type: "function",
      name: "propose_order",
      description:
        "Add ONLY dishes the guest clearly asked for. qty is 1 unless they said another number. Never add fries, drinks, or dessert unless they asked.",
      parameters: {
        type: "object",
        properties: {
          picks: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                qty: { type: "integer" },
                note: { type: "string" },
                reason: { type: "string" },
              },
              required: ["name", "qty"],
            },
          },
        },
        required: ["picks"],
      },
    },
    {
      type: "function",
      name: "remove_item",
      description: "Remove a dish from the table cart when the guest doesn't want it.",
      parameters: {
        type: "object",
        properties: {
          names: {
            type: "array",
            items: { type: "string" },
            description: "Exact menu item names to remove",
          },
        },
        required: ["names"],
      },
    },
  ];
  let last = "Voice call is not enabled on this OpenAI key.";
  for (const model of models) {
    const res = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: openaiHeaders(),
      body: JSON.stringify({
        session: {
          type: "realtime",
          model,
          instructions: waiterTalkInstructions(language, cart),
          audio: {
            output: { voice: "coral" },
            input: {
              transcription: { model: "whisper-1" },
              turn_detection: { type: "server_vad" },
            },
          },
          tools,
        },
      }),
    });
    const data = (await res.json()) as {
      value?: string;
      client_secret?: { value?: string };
      error?: { message?: string };
    };
    const secret = data.value || data.client_secret?.value;
    if (res.ok && secret) {
      return { model, clientSecret: secret };
    }
    last = data.error?.message || last;
  }
  throw new Error(last);
}

export async function openaiTextToSpeech(text: string, language: string) {
  const spoken = text.replace(/\s+/g, " ").trim().slice(0, 400);
  const body = {
    model: "gpt-4o-mini-tts",
    voice: "coral",
    input: spoken,
    instructions: ttsStyle[language] || ttsStyle["en-IN"],
    response_format: "mp3",
  };
  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: openaiHeaders(),
    body: JSON.stringify(body),
  });
  if (res.ok) return Buffer.from(await res.arrayBuffer());

  const hd = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: openaiHeaders(),
    body: JSON.stringify({
      model: "tts-1-hd",
      voice: "nova",
      input: spoken,
      response_format: "mp3",
    }),
  });
  if (!hd.ok) {
    const raw = await hd.text();
    throw new Error(raw.slice(0, 180) || "OpenAI voice failed");
  }
  return Buffer.from(await hd.arrayBuffer());
}
