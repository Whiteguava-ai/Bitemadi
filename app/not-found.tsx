import Link from "next/link";
import { ArrowButton } from "@/components/Button";
import CTABanner from "@/components/CTABanner";
import { images } from "@/lib/images";

export default function NotFound() {
  return (
    <>
      <section className="relative overflow-hidden bg-burgundy pt-36 pb-28 text-center">
        <img
          src={images.heroChilis}
          alt=""
          className="float-slow pointer-events-none absolute left-0 top-24 hidden w-48 md:block"
        />
        <img
          src={images.heroTomatoes}
          alt=""
          className="float-med pointer-events-none absolute right-0 top-20 hidden w-48 md:block"
        />
        <h1 className="mx-auto max-w-4xl px-5 font-display text-5xl uppercase leading-[0.92] text-white md:text-7xl">
          Oops! That Page Isn’t on the Menu
        </h1>
        <p className="mx-auto mt-6 max-w-lg px-5 text-white/80">
          Looks like the page you’re searching for has been moved or doesn’t
          exist. Let’s get you back to something.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 font-medium text-burgundy"
          >
            Back To Home
          </Link>
        </div>
        <div className="mt-6 flex justify-center">
          <ArrowButton href="/menu" variant="outline">
            Order Now
          </ArrowButton>
        </div>
        <svg
          className="absolute bottom-[-1px] left-0 w-full"
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
      <CTABanner />
    </>
  );
}
