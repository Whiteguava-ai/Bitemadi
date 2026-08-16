import Link from "next/link";
import { offers } from "@/lib/data";
import { ArrowIcon } from "./Button";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function OfferCards() {
  return (
    <section className="bg-cream px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading
          eyebrow="Special Offers"
          title="Delicious Deals You Can’t Miss"
          subtitle="Enjoy your favorite meals at unbeatable prices — freshly made and full of flavor with delicious ingredients, great quality, amazing taste, and satisfying portions for everyone."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {offers.map((offer, i) => (
            <Reveal key={offer.tag} delay={i * 0.1}>
              <article className="group relative overflow-hidden rounded-[28px] min-h-[340px]">
                <img
                  src={offer.image}
                  alt={offer.tag}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
                <div className="relative flex h-full min-h-[340px] flex-col justify-between p-7 text-white">
                  <div>
                    <p className="text-sm text-white/80">Save up to</p>
                    <p className="font-display text-6xl leading-none">{offer.save}</p>
                    <p className="mt-4 text-sm text-gold">{offer.tag}</p>
                    <h3 className="mt-2 max-w-[220px] font-display text-3xl uppercase leading-[0.95]">
                      {offer.title}
                    </h3>
                  </div>
                  <Link
                    href="/menu"
                    className="inline-flex w-fit items-center gap-2 text-sm font-medium"
                  >
                    Order Now
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-burgundy">
                      <ArrowIcon className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
