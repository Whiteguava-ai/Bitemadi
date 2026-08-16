import PageHero from "@/components/PageHero";
import OfferCards from "@/components/OfferCards";
import CTABanner from "@/components/CTABanner";
import { ArrowButton } from "@/components/Button";
import { images } from "@/lib/images";
import Reveal from "@/components/Reveal";

export default function OfferPage() {
  return (
    <>
      <PageHero
        title="Special Deals You Can’t Miss"
        subtitle="Grab your favorite meals at unbeatable prices - limited time only."
      />
      <div className="-mt-10 mb-6 flex justify-center">
        <ArrowButton href="/menu">Order Now</ArrowButton>
      </div>
      <OfferCards />
      <section className="bg-cream px-5 pb-24 md:px-8">
        <Reveal>
          <article className="mx-auto grid max-w-[1320px] overflow-hidden rounded-[32px] bg-burgundy lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 text-white md:p-14">
              <p className="text-sm tracking-[0.2em] text-gold">TODAY’S SPECIAL</p>
              <p className="mt-3 text-sm text-white/70">Limited Time</p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] md:text-6xl">
                BBQ Chicken Wings
              </h2>
              <p className="mt-5 max-w-md text-white/75">
                Smoky and tangy, served with a side of dipping sauce with rich
                flavor and perfect taste.
              </p>
              <div className="mt-8">
                <ArrowButton href="/menu" variant="cream">
                  Order Now
                </ArrowButton>
              </div>
            </div>
            <img
              src={images.wings}
              alt="BBQ Chicken Wings"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </article>
        </Reveal>
      </section>
      <CTABanner />
    </>
  );
}
