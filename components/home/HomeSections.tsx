import Link from "next/link";
import { categories, featuredMenu, stats, whyUs, cateringDishes, blogPosts } from "@/lib/data";
import { images } from "@/lib/images";
import { inr } from "@/lib/site";
import { ArrowButton, ArrowIcon } from "@/components/Button";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import OfferCards from "@/components/OfferCards";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Counter from "@/components/Counter";

export function Categories() {
  const loop = [...categories, ...categories];
  return (
    <section id="categories" className="bg-cream px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading
          eyebrow="Categories"
          title="Explore Our Popular Dishes"
          subtitle="Discover a variety of freshly prepared meals, crafted to satisfy every craving with rich flavors, premium ingredients, and delightful taste experience for everyone."
        />
      </div>
      <div className="mt-12 overflow-hidden">
        <div className="marquee-track flex w-max gap-8 pr-8">
          {loop.map((cat, i) => (
            <Link
              key={`${cat.name}-${i}`}
              href="/menu"
              className="group w-[220px] shrink-0 text-center"
            >
              <div className="overflow-hidden rounded-[28px] bg-white/40 p-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-[200px] w-full rounded-[22px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 font-display text-2xl uppercase text-brown">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MenuPreview() {
  return (
    <section className="bg-cream px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1320px] items-end gap-8 lg:grid-cols-[1fr_auto]">
        <SectionHeading
          eyebrow="Our Menu"
          title="Discover Flavors You’ll Love"
          subtitle="Explore our carefully crafted dishes — made with fresh ingredients and bold flavors, rich taste, premium quality, and delightful aroma."
          align="left"
        />
        <ArrowButton href="/book">Book Your Table</ArrowButton>
      </div>
      <div className="mx-auto mt-12 grid max-w-[1320px] gap-6 md:grid-cols-3">
        {featuredMenu.map((item, i) => (
          <Reveal key={item.name} delay={i * 0.1}>
            <Link href="/book" className="group block">
              <div className="overflow-hidden rounded-[28px]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[340px]"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl uppercase text-brown">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
                <p className="shrink-0 font-display text-2xl text-burgundy">
                  {inr(item.price)}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function AboutPreview() {
  return (
    <section className="bg-cream px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <img
              src={images.menuTall}
              alt="Bite Maadi"
              className="w-full rounded-[32px] object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-[22px] bg-burgundy p-5 text-white shadow-xl">
              <p className="font-display text-xl uppercase">Opening Hours</p>
              <p className="mt-2 text-sm text-white/80">
                Mon – Thu: 10:00 AM – 01:00 AM
              </p>
              <p className="text-sm text-white/80">
                Fri – Sun: 11:00 AM – 10:00 PM
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-sm font-medium text-burgundy">About Us</p>
          <h2 className="mt-2 font-display text-4xl uppercase leading-[0.95] text-brown md:text-5xl">
            Exceptional Experience with premium quality, rich flavors
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">
            We bring together premium ingredients, expert craftsmanship, and a
            passion for flavor — creating unforgettable dining experiences in
            every bite with rich taste and quality.
          </p>
          <div className="mt-8">
            <ArrowButton href="/book">Book Your Table</ArrowButton>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1320px] grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((s) => (
          <Reveal key={s.label}>
            <div className="rounded-[24px] bg-white/50 p-6 text-center">
              <p className="font-display text-5xl text-burgundy md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section className="bg-cream px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-2">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Loved by Food Lovers"
          subtitle="We combine quality ingredients, expert cooking, and exceptional service to deliver an unforgettable dining experience."
          align="left"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {whyUs.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <article className="rounded-[24px] bg-white/60 p-6">
                <img src={item.icon} alt="" className="h-12 w-12 object-contain" />
                <h3 className="mt-4 font-display text-2xl uppercase text-brown">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CateringPreview() {
  return (
    <section id="catering" className="bg-cream px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1320px] items-end gap-8 lg:grid-cols-[1fr_auto]">
        <SectionHeading
          eyebrow="Catering"
          title="Catering for Every Celebration"
          subtitle="From intimate gatherings to grand events, we deliver exceptional food experiences that leave a lasting impression."
          align="left"
        />
        <ArrowButton href="/menu">Explore Menu</ArrowButton>
      </div>
      <div className="mx-auto mt-12 grid max-w-[1320px] gap-6 md:grid-cols-3">
        {cateringDishes.map((dish, i) => (
          <Reveal key={dish.name} delay={i * 0.1}>
            <article>
              <img
                src={dish.image}
                alt={dish.name}
                className="h-[280px] w-full rounded-[28px] object-cover md:h-[320px]"
              />
              <p className="mt-4 text-xs tracking-[0.2em] text-burgundy">
                {dish.tag}
              </p>
              <h3 className="mt-1 font-display text-2xl uppercase text-brown">
                {dish.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{dish.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Gallery() {
  const shots = [images.gallery1, images.gallery2, images.gallery3];
  return (
    <section id="gallery" className="bg-cream px-5 py-16 md:px-8 md:py-24">
      <SectionHeading
        eyebrow="Gallery"
        title="A Feast for Your Eyes"
        subtitle="Explore our delicious creations — beautifully crafted and served with passion, love, care, quality, freshness, and unforgettable dining experience always."
      />
      <div className="mx-auto mt-12 grid max-w-[1320px] gap-4 md:grid-cols-3">
        {shots.map((src, i) => (
          <Reveal key={src} delay={i * 0.08}>
            <img
              src={src}
              alt="Gallery dish"
              className="h-[280px] w-full rounded-[28px] object-cover md:h-[360px]"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function BlogPreview() {
  const posts = blogPosts.slice(0, 2);
  return (
    <section className="bg-cream px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1320px] items-end gap-8 lg:grid-cols-[1fr_auto]">
        <SectionHeading
          eyebrow="Blog"
          title="Insights, Trends & Food Stories"
          subtitle="Discover the latest food trends, recipes, and stories from our kitchen, chefs, and culinary journey updates."
          align="left"
        />
        <ArrowButton href="/blog">Explore Blog</ArrowButton>
      </div>
      <div className="mx-auto mt-12 grid max-w-[1320px] gap-6 md:grid-cols-2">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.1}>
            <article className="overflow-hidden rounded-[28px] bg-white/40">
              <img
                src={post.image}
                alt={post.title}
                className="h-[280px] w-full object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-muted">
                  Read time: {post.readTime} · {post.date}
                </p>
                <h3 className="mt-2 font-display text-3xl uppercase text-brown">
                  {post.title}
                </h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-burgundy"
                  >
                    Read Article
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 text-sm font-medium text-brown"
                  >
                    Book Your Table
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export { OfferCards, Testimonials, FAQ };
