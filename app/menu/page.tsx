"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import OfferCards from "@/components/OfferCards";
import CTABanner from "@/components/CTABanner";
import { menuCategories } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { inr } from "@/lib/site";

export default function MenuPage() {
  const [active, setActive] = useState(menuCategories[0].id);
  const current =
    menuCategories.find((c) => c.id === active) ?? menuCategories[0];

  return (
    <>
      <PageHero
        title="Designed for Flavor Made to Impress"
        subtitle="Every dish is thoughtfully prepared with fresh ingredients and bold taste — crafted to satisfy every craving."
      />
      <OfferCards />
      <section className="bg-cream px-5 pb-24 md:px-8">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-wrap justify-center gap-2">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(cat.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  active === cat.id
                    ? "bg-burgundy text-white"
                    : "bg-white/60 text-brown hover:bg-burgundy/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {current.items.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.05}>
                <Link href="/contact" className="group block">
                  <div className="overflow-hidden rounded-[28px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-display text-2xl uppercase text-brown">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-sm text-muted">{item.desc}</p>
                    </div>
                    <p className="font-display text-2xl text-burgundy">
                      {inr(item.price)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
