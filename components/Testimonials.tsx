"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      6000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="overflow-hidden bg-cream px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative">
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Customers Say"
            align="left"
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
              className="mt-8"
            >
              <Quote className="mb-6 h-10 w-10 text-burgundy" strokeWidth={1.5} aria-hidden="true" />
              <p className="max-w-xl text-lg leading-relaxed text-muted">
                “{t.quote}”
              </p>
              <div className="mt-8 flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-16 w-16 rounded-2xl object-cover"
                />
                <div>
                  <p className="font-semibold text-brown">{t.name}</p>
                  <p className="text-sm text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              aria-label="Previous"
              onClick={() =>
                setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
              }
              className="grid h-12 w-12 place-items-center rounded-full border border-brown/15 text-brown transition hover:bg-burgundy hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="grid h-12 w-12 place-items-center rounded-full border border-brown/15 text-brown transition hover:bg-burgundy hover:text-white"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[480px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={t.decor}
              src={t.decor}
              alt=""
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              className="w-full rounded-[32px] object-cover"
            />
          </AnimatePresence>
          <img
            src={t.avatar}
            alt={t.name}
            className="absolute -bottom-6 -left-4 h-28 w-28 rounded-[24px] object-cover shadow-xl md:h-36 md:w-36"
          />
        </div>
      </div>
    </section>
  );
}
