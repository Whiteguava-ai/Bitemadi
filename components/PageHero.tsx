import { images } from "@/lib/images";
import Reveal from "./Reveal";

export default function PageHero({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-burgundy pt-32 pb-28 md:pt-40 md:pb-36">
      <img
        src={images.heroChilis}
        alt=""
        className="float-slow pointer-events-none absolute -left-8 top-24 z-0 hidden w-44 md:block lg:w-56"
      />
      <img
        src={images.heroTomatoes}
        alt=""
        className="float-med pointer-events-none absolute -right-6 top-20 z-0 hidden w-44 md:block lg:w-56"
      />
      <img
        src={images.heroPizza}
        alt=""
        className="float-fast pointer-events-none absolute bottom-16 left-[4%] z-0 hidden w-40 opacity-80 lg:block"
      />
      <img
        src={images.heroBowl}
        alt=""
        className="float-slow pointer-events-none absolute bottom-16 right-[4%] z-0 hidden w-36 opacity-80 lg:block"
      />
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <h1 className="font-display text-5xl uppercase leading-[0.92] text-white md:text-7xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/80">
            {subtitle}
          </p>
          {children}
        </Reveal>
      </div>
      <svg
        className="pointer-events-none absolute bottom-[-1px] left-0 z-0 w-full"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 40C180 90 360 0 540 30C720 60 900 100 1080 70C1260 40 1380 10 1440 30V90H0V40Z"
          fill="#fff7e8"
        />
      </svg>
    </section>
  );
}
