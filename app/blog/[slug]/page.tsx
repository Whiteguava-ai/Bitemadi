import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { blogPosts } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <PageHero title={post.title} subtitle={`Read time: ${post.readTime}`} />
      <article className="bg-cream px-5 py-12 md:px-8 md:pb-24">
        <div className="mx-auto max-w-3xl">
          <img
            src={post.image}
            alt={post.title}
            className="mb-10 h-[360px] w-full rounded-[28px] object-cover"
          />
          {post.sections.map((section) => (
            <section key={section.heading} className="mb-10">
              <h4 className="font-display text-3xl uppercase text-brown">
                {section.heading}
              </h4>
              {section.body.map((p) => (
                <p key={p} className="mt-4 text-[16px] leading-relaxed text-muted">
                  {p}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-4 space-y-2 text-[16px] text-brown">
                  {section.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>
      <CTABanner />
    </>
  );
}
