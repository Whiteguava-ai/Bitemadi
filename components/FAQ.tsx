"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { faqs } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-cream px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[900px]">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Got questions? We’ve got answers to help you enjoy your experience with us quickly, easily, and comfortably."
        />
        <div className="mt-10 divide-y divide-brown/10 border-y border-brown/10">
          {faqs.map((item, i) => {
            const active = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => setOpen(active ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <h4 className="font-display text-xl uppercase text-brown md:text-2xl">
                    {item.q}
                  </h4>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brown/20 text-lg transition ${
                      active ? "bg-burgundy text-white" : "text-brown"
                    }`}
                  >
                    {active ? (
                      <Minus className="h-4 w-4" strokeWidth={2} />
                    ) : (
                      <Plus className="h-4 w-4" strokeWidth={2} />
                    )}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    active ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="overflow-hidden text-[15px] leading-relaxed text-muted">
                    {item.a}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
