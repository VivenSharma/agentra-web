import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CTA } from "@/components/CTA";
import { ArticleEmbed } from "@/components/ArticleEmbed";
import { articles, getArticle, type Block } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Blog" };
  return {
    title: a.seoTitle ?? a.title,
    description: a.description ?? a.dek,
    alternates: { canonical: `/resources/blog/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.dek,
      images: [{ url: a.cover.src, width: a.cover.width, height: a.cover.height, alt: a.cover.alt }],
    },
  };
}

const linkClass =
  "text-purple-5 underline decoration-purple-4/40 underline-offset-4 transition-colors hover:text-purple-6";

// Inline marks used in the article copy: **bold** and [text](url).
function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) {
      parts.push(
        <strong key={m.index} className="font-semibold text-fg">
          <Inline text={m[1]} />
        </strong>,
      );
    } else if (m[3].startsWith("/")) {
      parts.push(
        <Link key={m.index} href={m[3]} className={linkClass}>
          {m[2]}
        </Link>,
      );
    } else {
      parts.push(
        <a
          key={m.index}
          href={m[3]}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {m[2]}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "h2":
      return <h2 className="pt-6 text-2xl font-light leading-snug tracking-tight text-fg sm:text-3xl">{b.text}</h2>;
    case "h3":
      return <h3 className="pt-2 text-lg font-medium text-fg">{b.text}</h3>;
    case "p":
      return (
        <p>
          <Inline text={b.text} />
        </p>
      );
    case "list":
      return (
        <ul className="list-disc space-y-2 pl-6 marker:text-purple-5">
          {b.items.map((t) => (
            <li key={t}>
              <Inline text={t} />
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-purple-4/60 py-1 pl-6 text-xl font-light leading-snug text-fg sm:text-2xl">
          {b.text}
        </blockquote>
      );
    case "figure":
      return (
        <figure className="py-2">
          <Image
            src={b.src}
            alt={b.alt}
            width={b.width}
            height={b.height}
            sizes="(min-width: 860px) 760px, 100vw"
            className="h-auto w-full rounded-2xl ring-1 ring-white/10"
          />
          {b.caption && <figcaption className="mt-3 text-sm text-fg-dim">{b.caption}</figcaption>}
        </figure>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl ring-1 ring-white/10">
          <table className="w-full min-w-[560px] text-left text-base">
            <thead className="bg-white/[0.04] text-sm text-fg">
              <tr>
                {b.head.map((h) => (
                  <th key={h} className="px-5 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {b.rows.map((r) => (
                <tr key={r[0]}>
                  {r.map((c, i) => (
                    <td key={i} className={`px-5 py-4 align-top ${i === 0 ? "font-medium text-fg" : ""}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "embed":
      return <ArticleEmbed src={b.src} title={b.title} />;
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  return (
    <>
      <article className="pt-32 pb-16 sm:pt-36">
        <header className="container-x">
          <div className="mx-auto max-w-[760px]">
            <Link
              href="/resources/blog"
              className="fade-up inline-flex items-center gap-1.5 text-sm text-fg-dim transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Blog
            </Link>
            {a.tag && (
              <p className="fade-up mt-8 text-xs font-semibold uppercase tracking-wider text-purple-5 [animation-delay:40ms]">
                {a.tag}
              </p>
            )}
            <h1 className={`fade-up ${a.tag ? "mt-4" : "mt-8"} text-balance text-4xl font-light leading-[1.1] tracking-[-0.02em] sm:text-5xl [animation-delay:80ms]`}>
              {a.title}
            </h1>
            <p className="fade-up mt-5 text-lg leading-relaxed text-fg-muted [animation-delay:120ms]">{a.dek}</p>
            <p className="fade-up mt-5 text-sm text-fg-dim [animation-delay:140ms]">{a.readMins} min read</p>
          </div>
        </header>

        <div className="container-x mt-10">
          <div className="mx-auto max-w-[1000px]">
            <Image
              src={a.cover.src}
              alt={a.cover.alt}
              width={a.cover.width}
              height={a.cover.height}
              priority
              sizes="(min-width: 1100px) 1000px, 100vw"
              className="fade-up h-auto w-full rounded-[24px] ring-1 ring-white/10 [animation-delay:160ms]"
            />
          </div>
        </div>

        <div className="container-x mt-12">
          <div className="mx-auto max-w-[760px] space-y-6 text-lg leading-relaxed text-fg-muted">
            {a.body.map((b, i) => (
              <BlockView key={i} b={b} />
            ))}
          </div>
        </div>

        {a.banner && (
          <div className="container-x mt-12">
            <div className="mx-auto max-w-[1000px]">
              <Image
                src={a.banner.src}
                alt={a.banner.alt}
                width={a.banner.width}
                height={a.banner.height}
                sizes="(min-width: 1100px) 1000px, 100vw"
                className="h-auto w-full rounded-[24px] ring-1 ring-white/10"
              />
            </div>
          </div>
        )}

        {a.about && (
          <aside className="container-x mt-12">
            <div className="raised mx-auto max-w-[760px] rounded-[20px] p-7 sm:p-8">
              <h2 className="text-base font-semibold text-fg">About Agentra</h2>
              <p className="mt-3 text-base leading-relaxed text-fg-muted">
                <Inline text={a.about} />
              </p>
              <p className="mt-4 text-base font-semibold text-fg">You stay in command.</p>
            </div>
          </aside>
        )}
      </article>

      <CTA />
    </>
  );
}
