"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { images } from "@/lib/images";
import { ArrowIcon } from "./Button";

type TableSpot = {
  id: string;
  name: string;
  zone: string;
  seats: number;
  x: number;
  y: number;
  shape: "round" | "booth" | "square";
  taken?: boolean;
};

const tables: TableSpot[] = [
  { id: "w1", name: "Aurora", zone: "Window", seats: 2, x: 18, y: 22, shape: "round" },
  { id: "w2", name: "Solstice", zone: "Window", seats: 2, x: 38, y: 18, shape: "round", taken: true },
  { id: "w3", name: "Ember", zone: "Window", seats: 4, x: 58, y: 22, shape: "square" },
  { id: "b1", name: "Velvet", zone: "Booth", seats: 4, x: 82, y: 28, shape: "booth" },
  { id: "c1", name: "Hearth", zone: "Center", seats: 6, x: 36, y: 52, shape: "round" },
  { id: "c2", name: "Noir", zone: "Center", seats: 4, x: 58, y: 54, shape: "round" },
  { id: "g1", name: "Garden", zone: "Patio", seats: 4, x: 18, y: 72, shape: "square" },
  { id: "p1", name: "Private", zone: "Nook", seats: 8, x: 78, y: 70, shape: "booth" },
];

const moods = [
  { id: "lunch", label: "Lunch Light", time: "12:30 PM", note: "Sun on the tables", tone: "#ffeabe" },
  { id: "sunset", label: "Golden Hour", time: "5:30 PM", note: "Warm & unhurried", tone: "#fc9e25" },
  { id: "dinner", label: "Candle Dinner", time: "7:30 PM", note: "The main sitting", tone: "#920711" },
  { id: "late", label: "After Dark", time: "9:30 PM", note: "Low lights, slow bites", tone: "#2c0205" },
];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export default function TableBooking() {
  const days = useMemo(() => {
    const today = startOfDay(new Date());
    return Array.from({ length: 10 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return d;
    });
  }, []);

  const [date, setDate] = useState(days[1] ?? days[0]);
  const [mood, setMood] = useState(moods[2]);
  const [table, setTable] = useState(tables[4]);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const maxSeats = table.seats;
  const guestSafe = Math.min(guests, maxSeats);

  return (
    <div className="book-stage">
      <div className="book-canvas">
        <img src={images.heroChilis} alt="" className="book-float book-float-l" />
        <img src={images.heroTomatoes} alt="" className="book-float book-float-r" />

        <header className="book-intro">
          <p>Tonight’s floor</p>
          <h1>Pick a table. Claim the night.</h1>
        </header>

        <aside className="book-dates">
          <span className="book-kicker">When</span>
          {days.map((d) => {
            const active = d.toDateString() === date.toDateString();
            return (
              <button
                key={d.toISOString()}
                type="button"
                className={`book-day${active ? " is-on" : ""}`}
                onClick={() => setDate(d)}
              >
                <em>{d.toLocaleDateString("en-US", { weekday: "short" })}</em>
                <strong>{d.getDate()}</strong>
                <small>{d.toLocaleDateString("en-US", { month: "short" })}</small>
              </button>
            );
          })}
        </aside>

        <section className="book-floor">
          <div className="floor-label floor-label-n">Window wall</div>
          <div className="floor-label floor-label-s">Garden patio</div>
          <div className="floor-label floor-label-e">Private nook</div>
          <div className="kitchen">Open kitchen</div>
          <div className="bar">Bar</div>

          {tables.map((t) => (
            <button
              key={t.id}
              type="button"
              disabled={t.taken}
              onClick={() => {
                setTable(t);
                setGuests((g) => Math.min(g, t.seats));
              }}
              className={`spot spot-${t.shape}${table.id === t.id ? " is-on" : ""}${t.taken ? " is-taken" : ""}`}
              style={{ left: `${t.x}%`, top: `${t.y}%` }}
            >
              <span className="spot-ring" />
              <span className="spot-chairs" aria-hidden>
                {Array.from({ length: Math.min(t.seats, 6) }).map((_, i) => (
                  <i key={i} />
                ))}
              </span>
              <b>{t.name}</b>
              <small>{t.taken ? "Taken" : `${t.seats} seats`}</small>
            </button>
          ))}
        </section>

        <aside className="book-panel">
          <div className="moods">
            <span className="book-kicker">Sitting</span>
            {moods.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`mood${mood.id === m.id ? " is-on" : ""}`}
                onClick={() => setMood(m)}
              >
                <span className="mood-swatch" style={{ background: m.tone }} />
                <span>
                  <strong>{m.label}</strong>
                  <em>
                    {m.time} · {m.note}
                  </em>
                </span>
              </button>
            ))}
          </div>

          <div className="party">
            <span className="book-kicker">Place settings</span>
            <div className="party-row">
              <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))}>
                –
              </button>
              <div className="plates">
                {Array.from({ length: maxSeats }).map((_, i) => (
                  <span key={i} className={i < guestSafe ? "is-set" : ""} />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(maxSeats, g + 1))}
              >
                +
              </button>
            </div>
            <p>
              {guestSafe} of {maxSeats} at Table {table.name}
            </p>
          </div>

          <form
            className="ticket"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <span className="book-kicker">Your name on the card</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 820 257 6104"
            />
            <button type="submit">
              Hold this table
              <ArrowIcon className="h-3.5 w-3.5" />
            </button>
          </form>
        </aside>

        <AnimatePresence>
          {sent ? (
            <motion.div
              className="book-pass"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="pass-stub">
                <span className="logo-mark is-light" style={{ fontSize: 22 }}>
                  Bite Maadi
                </span>
                <p>Admit one table</p>
              </div>
              <div className="pass-body">
                <p>You’re in</p>
                <h2>
                  Table {table.name}
                  <br />
                  {mood.label}
                </h2>
                <ul>
                  <li>
                    {date.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </li>
                  <li>{mood.time}</li>
                  <li>
                    {guestSafe} guests · {table.zone}
                  </li>
                  <li>{name}</li>
                </ul>
                <button type="button" onClick={() => setSent(false)}>
                  Choose another table
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
