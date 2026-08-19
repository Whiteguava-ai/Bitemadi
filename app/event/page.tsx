import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { eventServices, packages } from "@/lib/data";
import { Check } from "lucide-react";

export default function EventPage() {
  return (
    <>
      <PageHero
        title="Catering & Private Events Made Effortless"
        subtitle="From intimate gatherings to large celebrations, we deliver exceptional food and seamless service for every occasion."
      />
      <section className="bg-cream px-5 py-16 md:px-8 md:py-24">
        <SectionHeading eyebrow="" title="Our Catering Services" />
        <div className="mx-auto mt-12 grid max-w-[1320px] gap-6 lg:grid-cols-3">
          {eventServices.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <article className="overflow-hidden rounded-[28px] bg-white/50">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-[220px] w-full object-cover"
                />
                <div className="p-6">
                  <h4 className="font-display text-2xl uppercase text-brown">
                    {s.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.desc}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-brown">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-burgundy" strokeWidth={2} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream px-5 pb-24 md:px-8">
        <SectionHeading title="Flexible Catering Packages" />
        <div className="mx-auto mt-12 grid max-w-[1320px] gap-6 md:grid-cols-2 lg:grid-cols-4">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-[28px] border border-brown/10 bg-white/40 p-6">
                <h4 className="font-display text-2xl uppercase text-brown">
                  {p.name}
                </h4>
                <p className="mt-3 font-display text-3xl text-burgundy">{p.price}</p>
                <p className="mt-3 text-sm text-muted">{p.desc}</p>
                <ul className="mt-5 space-y-2 text-sm text-brown">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-burgundy" strokeWidth={2} />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
