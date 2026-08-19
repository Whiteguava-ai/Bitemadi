"use client";

import { useEffect, useState } from "react";
import { Lamp, Minus, Plus, Sofa, Sparkles, Sun, TreePalm } from "lucide-react";
import { menuCategories, type MenuItem } from "@/lib/data";
import { inr } from "@/lib/site";
import AiWaiter from "@/components/AiWaiter";
import type { WaiterPick } from "@/lib/ai-waiter";

type TableSpot = {
  id: string;
  no: number;
  name: string;
  zone: string;
  seats: number;
};

type CartLine = MenuItem & { qty: number; note: string };

const tables: TableSpot[] = [
  { id: "w1", no: 1, name: "Aurora", zone: "Window", seats: 2 },
  { id: "w2", no: 2, name: "Solstice", zone: "Window", seats: 2 },
  { id: "w3", no: 3, name: "Ember", zone: "Window", seats: 4 },
  { id: "b1", no: 4, name: "Velvet", zone: "Booth", seats: 4 },
  { id: "c1", no: 5, name: "Hearth", zone: "Center", seats: 6 },
  { id: "c2", no: 6, name: "Noir", zone: "Center", seats: 4 },
  { id: "g1", no: 7, name: "Garden", zone: "Patio", seats: 4 },
  { id: "p1", no: 8, name: "Private", zone: "Nook", seats: 8 },
];

const floorZones = [
  {
    id: "Window",
    hint: "Street light",
    icon: Sun,
    tables: tables.filter((t) => t.zone === "Window"),
  },
  {
    id: "Booth",
    hint: "Along the wall",
    icon: Sofa,
    tables: tables.filter((t) => t.zone === "Booth"),
  },
  {
    id: "Center",
    hint: "Main room",
    icon: Lamp,
    tables: tables.filter((t) => t.zone === "Center"),
  },
  {
    id: "Patio",
    hint: "Open air",
    icon: TreePalm,
    tables: tables.filter((t) => t.zone === "Patio"),
  },
  {
    id: "Nook",
    hint: "Quiet corner",
    icon: Sparkles,
    tables: tables.filter((t) => t.zone === "Nook"),
  },
] as const;

const steps = ["Table", "Menu", "Confirm"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function tableShape(t: TableSpot) {
  if (t.zone === "Booth") return "booth";
  if (t.seats <= 2) return "round";
  if (t.seats >= 8) return "banquet";
  if (t.seats >= 6) return "oval";
  return "square";
}

function TableSpotButton({
  t,
  selected,
  onSelect,
}: {
  t: TableSpot;
  selected: boolean;
  onSelect: () => void;
}) {
  const shape = tableShape(t);
  return (
    <button
      type="button"
      className={`bk-spot is-${shape}${selected ? " is-on" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`Table ${pad(t.no)}, ${t.name}, ${t.zone}, ${t.seats} seats`}
    >
      {shape === "booth" ? <span className="bk-spot-bench" aria-hidden /> : null}
      <span className="bk-spot-chairs" aria-hidden>
        {Array.from({ length: t.seats }, (_, i) => (
          <i key={i} className={`c${i}`} />
        ))}
      </span>
      <span className="bk-spot-top">
        <strong>{pad(t.no)}</strong>
        <em>{t.name}</em>
        <small>{t.seats} seats</small>
      </span>
    </button>
  );
}

export default function TableBooking() {
  const [step, setStep] = useState(0);
  const [table, setTable] = useState<TableSpot | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [comment, setComment] = useState("");
  const [openNote, setOpenNote] = useState<string | null>(null);
  const [category, setCategory] = useState(menuCategories[0].id);
  const [done, setDone] = useState(false);

  const menu = menuCategories.find((c) => c.id === category) ?? menuCategories[0];
  const total = cart.reduce((s, l) => s + l.price * l.qty, 0);
  const count = cart.reduce((s, l) => s + l.qty, 0);

  const canNext =
    (step === 0 && !!table) || (step === 1 && count > 0) || step === 2;

  const nextLabel = [
    table ? `Order from table ${pad(table.no)}` : "Select a table first",
    count ? `Review order · ${inr(total)}` : "Add a dish to continue",
    "Place order",
  ][step];
  const nextShort = [
    table ? `Continue · ${pad(table.no)}` : "Pick a table",
    count ? `Review · ${inr(total)}` : "Add a dish",
    "Place order",
  ][step];

  const addPicks = (picks: WaiterPick[]) => {
    setCart((prev) => {
      let next = [...prev];
      for (const p of picks) {
        const hit = next.find((l) => l.name === p.item.name);
        if (hit) {
          next = next.map((l) =>
            l.name === p.item.name
              ? { ...l, qty: l.qty + p.qty, note: p.note || l.note }
              : l,
          );
        } else {
          next.push({ ...p.item, qty: p.qty, note: p.note });
        }
      }
      return next;
    });
  };

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("bm-ai-picks");
      if (!raw) return;
      sessionStorage.removeItem("bm-ai-picks");
      const stored = JSON.parse(raw) as { name: string; qty: number; note: string }[];
      const items = menuCategories.flatMap((c) => c.items);
      const picks: WaiterPick[] = [];
      for (const row of stored) {
        const item = items.find((i) => i.name === row.name);
        if (item) {
          picks.push({
            item,
            qty: row.qty,
            note: row.note,
            reason: "From AI waiter",
          });
        }
      }
      if (picks.length) addPicks(picks);
    } catch {
      /* ignore bad session data */
    }
  }, []);

  const setQty = (item: MenuItem, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) {
        if (openNote === item.name) setOpenNote(null);
        return prev.filter((l) => l.name !== item.name);
      }
      const hit = prev.find((l) => l.name === item.name);
      if (!hit) return [...prev, { ...item, qty, note: "" }];
      return prev.map((l) => (l.name === item.name ? { ...l, qty } : l));
    });
  };

  const goNext = () => {
    if (!canNext) return;
    if (step === 2) {
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bk">
      <div className="bk-wrap">
        <p className="bk-kicker">Order from table · Bite Maadi</p>
        <h1 className="bk-title">
          {done
            ? "Order placed"
            : ["Choose your table", "Order from the menu", "Check your order"][step]}
        </h1>
        <p className="bk-help">
          {done
            ? "The kitchen has your table number. We’ll bring the food to you."
            : [
                "Tap the table you’re sitting at — the floor is the cafe.",
                "Talk to the waiter or pick dishes. You can remove anything from your table order.",
                "Confirm the table, dishes, and any comments before sending.",
              ][step]}
        </p>

        {!done ? (
          <div className="bk-steps" aria-label="Order steps">
            {steps.map((label, i) => (
              <div
                key={label}
                className={`bk-step${i === step ? " is-on" : ""}${i < step ? " is-done" : ""}`}
              >
                <span>{i + 1}</span>
                {label}
              </div>
            ))}
          </div>
        ) : null}

        {table && !done && step > 0 ? (
          <p className="bk-status">
            Ordering from table {pad(table.no)} · {table.name} · {table.zone}
            {count ? ` · ${count} items` : ""}
          </p>
        ) : null}

        {done && table ? (
          <div className="bk-done">
            <p className="bk-done-no">Table {pad(table.no)}</p>
            <h2>Order sent</h2>
            <ul>
              <li>
                {table.name} · {table.zone}
              </li>
              <li>
                {count} dishes · {inr(total)}
              </li>
              {comment ? <li>Kitchen: {comment}</li> : null}
            </ul>
            <ul className="bk-done-food">
              {cart.map((l) => (
                <li key={l.name}>
                  {l.qty}× {l.name}
                  {l.note ? ` — ${l.note}` : ""}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="bk-btn"
              onClick={() => {
                setDone(false);
                setStep(0);
                setTable(null);
                setCart([]);
                setComment("");
                setOpenNote(null);
              }}
            >
              New table order
            </button>
          </div>
        ) : null}

        {!done && step === 0 ? (
          <div className="bk-floor">
            <div className="bk-floor-legend">
              <span>
                <i className="is-open" /> Available
              </span>
              <span>
                <i className="is-yours" /> Your table
              </span>
            </div>
            <div className="bk-floor-map">
              <p className="bk-floor-window">Window</p>
              {floorZones.map((zone) => {
                const Icon = zone.icon;
                return (
                  <section
                    key={zone.id}
                    className={`bk-zone is-${zone.id.toLowerCase()}`}
                  >
                    <p className="bk-zone-label">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                      <span>{zone.id}</span>
                      <em>{zone.hint}</em>
                    </p>
                    <div className="bk-zone-spots">
                      {zone.tables.map((t) => (
                        <TableSpotButton
                          key={t.id}
                          t={t}
                          selected={table?.id === t.id}
                          onSelect={() => setTable(t)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
              <p className="bk-floor-door">Entrance</p>
            </div>
            {table ? (
              <div className="bk-picked" aria-live="polite">
                <span className="bk-picked-no">{pad(table.no)}</span>
                <span>
                  <b>
                    You’re at {table.name}
                  </b>
                  {table.zone} · {table.seats} seats
                </span>
              </div>
            ) : (
              <p className="bk-floor-hint">Pick the table that matches where you’re sitting.</p>
            )}
          </div>
        ) : null}

        {!done && step === 1 ? (
          <div className="bk-food">
            <AiWaiter
              cart={cart.map((l) => ({ name: l.name, qty: l.qty }))}
              onAdd={addPicks}
              onRemove={(names) => {
                setCart((prev) => prev.filter((l) => !names.includes(l.name)));
              }}
            />
            {cart.length ? (
              <div className="bk-cart">
                <p className="bk-cart-label">Your table order · {inr(total)}</p>
                <ul>
                  {cart.map((l) => (
                    <li key={l.name}>
                      <span>
                        {l.qty}× {l.name}
                      </span>
                      <button type="button" onClick={() => setQty(l, 0)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="bk-cats">
              {menuCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={category === c.id ? "is-on" : ""}
                  onClick={() => setCategory(c.id)}
                >
                  {c.label.replace(" Items", "")}
                </button>
              ))}
            </div>

            <div className="bk-dishes">
              {menu.items.map((item) => {
                const line = cart.find((l) => l.name === item.name);
                const qty = line?.qty ?? 0;
                const noting = openNote === item.name;
                return (
                  <article key={item.name} className="bk-dish">
                    <div className="bk-dish-row">
                      <div className="bk-dish-media">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="bk-dish-body">
                        <h3>{item.name}</h3>
                        <p>{inr(item.price)}</p>
                        <div className="bk-qty">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQty(item, qty - 1)}
                          >
                            <Minus className="h-3.5 w-3.5" strokeWidth={2.4} />
                          </button>
                          <span>{qty}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQty(item, qty + 1)}
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
                          </button>
                        </div>
                        {qty > 0 ? (
                          <button
                            type="button"
                            className="bk-note-toggle"
                            onClick={() => setQty(item, 0)}
                          >
                            Remove
                          </button>
                        ) : null}
                        {qty > 0 ? (
                          <button
                            type="button"
                            className={`bk-note-toggle${line?.note || noting ? " is-on" : ""}`}
                            onClick={() => setOpenNote(noting ? null : item.name)}
                          >
                            {line?.note ? "Edit kitchen note" : "Add kitchen note"}
                          </button>
                        ) : null}
                      </div>
                    </div>
                    {qty > 0 && noting ? (
                      <div className="bk-dish-note">
                        <p className="bk-dish-note-label">Kitchen note</p>
                        <p className="bk-dish-note-hint">
                          For {item.name} only — extra spicy, no onion, allergy…
                        </p>
                        <textarea
                          rows={2}
                          value={line?.note ?? ""}
                          onChange={(e) =>
                            setCart((prev) =>
                              prev.map((l) =>
                                l.name === item.name ? { ...l, note: e.target.value } : l,
                              ),
                            )
                          }
                          placeholder="Type the request for this dish"
                        />
                      </div>
                    ) : null}
                    {qty > 0 && !noting && line?.note ? (
                      <p className="bk-dish-note-saved">Note: {line.note}</p>
                    ) : null}
                  </article>
                );
              })}
            </div>

            <section className="bk-comment">
              <p className="bk-comment-label">Comment for the whole order</p>
              <p className="bk-comment-hint">
                This is sent to the kitchen with table {table ? pad(table.no) : "—"}.
                Allergies, packing, or anything for every dish.
              </p>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Example: peanut allergy at the table"
              />
            </section>
          </div>
        ) : null}

        {!done && step === 2 && table ? (
          <div className="bk-review">
            <section className="bk-card">
              <h3>Table</h3>
              <p className="bk-big">Table {pad(table.no)}</p>
              <p>
                {table.name} · {table.zone}
              </p>
            </section>
            <section className="bk-card">
              <h3>Menu order</h3>
              <ul className="bk-lines">
                {cart.map((l) => (
                  <li key={l.name} className="bk-review-line">
                    <div>
                      <strong>{l.name}</strong>
                      {l.note ? (
                        <em className="bk-line-note">Kitchen note: {l.note}</em>
                      ) : null}
                    </div>
                    <div className="bk-qty">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(l, l.qty - 1)}
                      >
                        <Minus className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </button>
                      <span>{l.qty}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQty(l, l.qty + 1)}
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </button>
                    </div>
                    <b>{inr(l.price * l.qty)}</b>
                    <button
                      type="button"
                      className="bk-remove"
                      onClick={() => setQty(l, 0)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              {comment ? (
                <div className="bk-comment-preview">
                  <p className="bk-comment-label">Order comment</p>
                  <p>{comment}</p>
                </div>
              ) : null}
              <p className="bk-big">{inr(total)}</p>
            </section>
          </div>
        ) : null}

        {!done ? (
          <div className="bk-foot">
            {step > 0 ? (
              <button
                type="button"
                className="bk-btn is-ghost"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                Back
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              className="bk-btn"
              disabled={!canNext}
              onClick={goNext}
            >
              <span className="bk-btn-wide">{nextLabel}</span>
              <span className="bk-btn-narrow">{nextShort}</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
