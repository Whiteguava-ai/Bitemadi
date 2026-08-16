import { ArrowButton } from "./Button";
import { images } from "@/lib/images";
import Reveal from "./Reveal";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-burgundy">
      <img
        src={images.ctaFood}
        alt=""
        className="pointer-events-none absolute left-0 top-1/2 hidden w-[38%] -translate-y-1/2 object-cover opacity-90 lg:block"
      />
      <img
        src={images.ctaFood2}
        alt=""
        className="pointer-events-none absolute right-0 top-1/2 hidden w-[38%] -translate-y-1/2 object-cover opacity-90 lg:block"
      />
      <div className="relative mx-auto max-w-3xl px-5 py-20 text-center md:py-28">
        <Reveal>
          <h2 className="font-display text-4xl uppercase leading-[0.95] text-white md:text-6xl">
            Hungry? We’re Ready
            <br />
            Come and Enjoy
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/80">
            Order your favorite meals now and enjoy fresh, flavorful food
            delivered fast right to your doorstep with quick service.
          </p>
          <div className="mt-8 flex justify-center">
            <ArrowButton href="/menu" variant="cream">
              Order Now
            </ArrowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
