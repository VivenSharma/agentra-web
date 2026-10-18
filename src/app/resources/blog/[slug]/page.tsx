import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CTA } from "@/components/CTA";
import { CoverArt } from "@/components/insights/CoverArt";
import { AuthorLine, PostCard } from "@/components/insights/PostCard";
import { getPost, placeholderBody, posts, type BodyBlock } from "@/lib/insights";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Insights" };
  return {
    title: post.title,
    description: post.excerpt,
    robots: { index: false, follow: true }, // placeholder until real copy lands
  };
}

function Block({ b }: { b: BodyBlock }) {
  switch (b.type) {
    case "p":
      return <p className="text-[1.075rem] leading-[1.8] text-fg-muted">{b.text}</p>;
    case "h2":
      return (
        <h2 id={b.id} className="scroll-mt-28 pt-6 text-2xl font-semibold tracking-tight text-fg">
          {b.text}
        </h2>
      );
    case "list":
      return (
        <ul className="space-y-3 pl-1">
          {b.items.map((it) => (
            <li key={it} className="flex gap-3 text-[1.05rem] leading-relaxed text-fg-muted">
              <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-purple-4" />
              {it}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <figure className="my-4 border-l-2 border-purple-3 pl-6">
          <blockquote className="text-xl font-medium leading-snug text-fg sm:text-2xl">
            &ldquo;{b.text}&rdquo;
          </blockquote>
          <figcaption className="mt-3 text-sm text-fg-dim">{b.by}</figcaption>
        </figure>
      );
    case "stat":
      return (
        <div className="card my-4 rounded-2xl p-6 sm:p-8">
          <div className="text-4xl font-semibold tracking-tight text-purple-5 sm:text-5xl">
            {b.value}
          </div>
          <div className="mt-2 text-base text-fg">{b.label}</div>
          <div className="mt-3 text-xs text-fg-dim">Source: {b.source}</div>
        </div>
      );
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = placeholderBody.filter(
    (b): b is Extract<BodyBlock, { type: "h2" }> => b.type === "h2"
  );
  const related = posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    `https://www.agentra-ai.com/resources/blog/${post.slug}`
  )}`;

  return (
    <>
      <article>
        <header className="pt-32 sm:pt-36">
          <div className="container-x">
            <Link
              href="/resources/blog"
              className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              All articles
            </Link>
            <div className="mt-10 max-w-3xl">
              <span className="text-sm font-medium text-purple-5">{post.category}</span>
              <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-fg-muted">
                {post.excerpt}
              </p>
              <div className="mt-8">
                <AuthorLine
                  author={post.author}
                  date={post.date}
                  readMins={post.readMins}
                  size="md"
                />
              </div>
            </div>
            <CoverArt
              seed={post.cover.seed}
              block={post.cover.block}
              className="mt-12 aspect-[16/9] sm:aspect-[21/9]"
              eager
            />
          </div>
        </header>

        <div className="container-x grid gap-12 py-16 lg:grid-cols-12">
          {/* Sticky contents rail, desktop only */}
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="On this page" className="sticky top-28">
              <p className="text-sm font-semibold text-fg">On this page</p>
              <ul className="mt-4 space-y-2.5 border-l border-line">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="-ml-px block border-l border-transparent pl-4 text-sm text-fg-muted transition-colors hover:border-purple-4 hover:text-fg"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                Share on LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </nav>
          </aside>

          <div className="max-w-[68ch] space-y-6 lg:col-span-7">
            {placeholderBody.map((b, i) => (
              <Block key={i} b={b} />
            ))}
            <div className="flex items-center justify-between gap-4 border-t border-line pt-8 lg:hidden">
              <span className="text-sm text-fg-muted">Found this useful?</span>
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg"
              >
                Share on LinkedIn
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-line py-20">
        <div className="container-x">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
              Keep reading
            </h2>
            <Link
              href="/resources/blog"
              className="text-sm font-semibold text-purple-5 hover:text-purple-6"
            >
              All articles
            </Link>
          </div>
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA />
    </>
  );
}
