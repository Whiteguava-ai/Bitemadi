"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { images } from "@/lib/images";

const slides = [
  {
    main: images.heroBurgerSplash,
    left: images.heroChilis,
    right: images.heroTomatoes,
    bottomLeft: images.heroBowl,
    bottomRight: images.heroPizza,
  },
  {
    main: images.heroBurgerAlt,
    left: images.heroTomatoes,
    right: images.heroChilis,
    bottomLeft: images.heroPizza,
    bottomRight: images.heroBowl,
  },
  {
    main: images.heroPizza,
    left: images.heroChilis,
    right: images.heroTomatoes,
    bottomLeft: images.heroBowl,
    bottomRight: images.heroBurgerSplash,
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-burgundy pt-28 md:pt-32">
      <div className="relative mx-auto min-h-[720px] max-w-[1440px] px-4 pb-40 text-center md:min-h-[820px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm tracking-[0.18em] text-white/85"
        >
          Fresh • Fast • Flavorful
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mx-auto mt-4 max-w-5xl font-display text-[42px] uppercase leading-[0.9] text-white sm:text-6xl md:text-7xl lg:text-[92px]"
        >
          Crafted for Cravings
          <br />
          Served with Perfection
        </motion.h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-0"
          >
            <img
              src={slide.left}
              alt=""
              className="float-slow absolute left-[-20px] top-[18%] w-[150px] sm:left-4 sm:w-[200px] lg:w-[240px]"
            />
            <img
              src={slide.right}
              alt=""
              className="float-med absolute right-[-20px] top-[16%] w-[150px] sm:right-4 sm:w-[200px] lg:w-[240px]"
            />
            <img
              src={slide.bottomLeft}
              alt=""
              className="float-fast absolute bottom-[8%] left-[-40px] hidden w-[220px] md:block lg:left-8 lg:w-[280px]"
            />
            <img
              src={slide.bottomRight}
              alt=""
              className="float-slow absolute bottom-[6%] right-[-50px] hidden w-[240px] md:block lg:right-6 lg:w-[300px]"
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative mx-auto mt-8 w-full max-w-[720px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={slide.main}
              src={slide.main}
              alt="Bite Maadi signature dish"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.04 }}
              transition={{ duration: 0.55 }}
              className="relative z-10 mx-auto w-[88%] max-w-[620px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
            />
          </AnimatePresence>
        </div>

        <div className="absolute bottom-28 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-gold" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <svg
        className="absolute bottom-[-1px] left-0 w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 48C160 110 320 10 480 42C640 74 800 130 960 92C1120 54 1280 8 1440 40V120H0V48Z"
          fill="#fff7e8"
        />
      </svg>
    </section>
  );
}
