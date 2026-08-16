import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import { ArrowIcon } from "@/components/Button";
import { blogPosts } from "@/lib/data";

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Insights, Recipes & Food Stories"
        subtitle="Explore expert tips, delicious recipes, and stories from our kitchen with creative ideas, cooking inspiration, and professional guidance."
      />
      <section className="bg-cream px-5 py-16 md:px-8 md:pb-24">
        <div className="mx-auto grid max-w-[1320px] gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <article className="overflow-hidden rounded-[28px] bg-white/40">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-[240px] w-full object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-muted">
                    Read time: {post.readTime} · {post.date}
                  </p>
                  <h4 className="mt-2 font-display text-2xl uppercase text-brown">
                    {post.title}
                  </h4>
                  <div className="mt-5 flex flex-wrap gap-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-burgundy"
                    >
                      Read Article <ArrowIcon className="h-3.5 w-3.5" />
                    </Link>
                    <Link href="/book" className="text-sm font-medium text-brown">
                      Book Your Table
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
