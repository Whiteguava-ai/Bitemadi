import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { values } from "@/lib/data";
import { images } from "@/lib/images";

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Fresh Flavors & Foodie Stories Into the Experience"
        subtitle="Discover delicious recipes, kitchen stories, and the passion behind every dish we create with love, care, and authentic flavors."
      />
      <section className="bg-cream px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h3 className="font-display text-4xl uppercase leading-[0.95] text-brown md:text-5xl">
              15 Years of Culinary Excellence
            </h3>
            <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-muted">
              <p>
                For over a decade, Bite Maadi has been more than just a place to
                eat — it’s where people come together to celebrate food,
                connection, and memorable moments.
              </p>
              <p>
                We believe great food starts with great ingredients. That’s why
                every dish is thoughtfully prepared using fresh, high-quality
                produce and crafted with care by our passionate team, ensuring
                rich flavor, consistent quality, and an unforgettable dining
                experience every time.
              </p>
              <p>
                From casual meals to special celebrations, we aim to create
                experiences that feel warm, welcoming, and truly satisfying with
                friendly service, cozy ambiance, and memorable moments for every
                guest, offering exceptional taste, quality service, and
                delightful dining memories always.
              </p>
              <p>
                Every plate we serve reflects our commitment to flavor, quality,
                and the joy of sharing good food with passion, care, consistency,
                and unforgettable dining satisfaction for everyone.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4">
              <img
                src={images.about2}
                alt="Bite Maadi kitchen"
                className="h-[280px] w-full rounded-[28px] object-cover md:h-[360px]"
              />
              <div className="overflow-hidden rounded-[28px]">
                <video
                  src="/videos/pizza.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-[220px] w-full scale-110 object-cover md:h-[280px]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream px-5 pb-16 md:px-8">
        <SectionHeading
          title="Our Values"
          subtitle="The principles that guide everything we create — from kitchen to table with passion, quality, care, consistency, freshness, and dedication always."
        />
        <div className="mx-auto mt-12 grid max-w-[1320px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <article className="rounded-[24px] bg-white/50 p-6">
                <img src={v.icon} alt="" className="h-12 w-12 object-contain" />
                <h4 className="mt-4 font-display text-2xl uppercase text-brown">
                  {v.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
