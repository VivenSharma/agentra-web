import Link from "next/link";
import { ArrowRight, ArrowUpRight, Newspaper, PenLine, type LucideIcon } from "lucide-react";
import { articles } from "@/lib/articles";
import { pressArticles } from "@/lib/press";

/* ---------------------------------------------------------------
   Two slim, light-purple moving strips near the top of the homepage:
   the newest blog posts (moving left) and press coverage (moving right).
   Text only, each with a clear label. A soft light sweeps across each
   band now and then to draw the eye without shouting. Strips pause while
   hovered or focused; under reduced motion they stop and scroll sideways.
   Styles: .news-strip in globals.css.
   --------------------------------------------------------------- */

type Item = { key: string; href: string; external?: boolean; lead?: string; text: string; meta?: string; badge?: string };

function Strip({
  icon: Icon,
  label,
  items,
  all,
  reverse,
}: {
  icon: LucideIcon;
  label: string;
  items: Item[];
  all: { href: string; label: string };
  reverse?: boolean;
}) {
  // repeat short lists so one half of the track is always wider than the screen
  const half = items.length < 4 ? [...items, ...items] : items;

  const row = (copy: boolean) =>
    half.map((it, i) => {
      const dup = copy || i >= items.length;
      const body = (
        <>
          {it.badge && (
            <span className="rounded-full bg-purple-3/40 px-2 py-0.5 text-[11px] font-semibold text-white">{it.badge}</span>
          )}
          {it.lead && <span className="font-semibold text-purple-6">{it.lead}</span>}
          <span className="text-fg transition-colors duration-300 group-hover:text-purple-6">{it.text}</span>
          {it.meta && <span className="text-xs text-purple-5/80">{it.meta}</span>}
          {it.external ? (
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-purple-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          ) : (
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-purple-5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          )}
        </>
      );
      const cls = "group flex items-center gap-2.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors duration-300 hover:bg-white/[0.07]";
      return (
        <li key={`${it.key}-${i}-${copy}`} aria-hidden={dup || undefined} className="flex shrink-0 items-center">
          {it.external ? (
            <a href={it.href} target="_blank" rel="noopener noreferrer" tabIndex={dup ? -1 : undefined} className={cls}>
              {body}
            </a>
          ) : (
            <Link href={it.href} tabIndex={dup ? -1 : undefined} className={cls}>
              {body}
            </Link>
          )}
          <span aria-hidden className="mx-3 h-4 w-px bg-purple-4/30" />
        </li>
      );
    });

  return (
    <div className="news-strip relative flex items-center gap-2 overflow-hidden rounded-full p-1.5">
      <p className="news-strip-label relative z-10 flex shrink-0 items-center gap-2 rounded-full bg-grad py-2 pl-3 pr-4 text-sm font-semibold text-white">
        <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
        {label}
      </p>
      <div className="news-strip-view min-w-0 flex-1 overflow-hidden">
        <ul className={`news-strip-track ${reverse ? "is-reverse" : ""}`}>
          {row(false)}
          {row(true)}
        </ul>
      </div>
      <Link
        href={all.href}
        className="group relative z-10 hidden shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-purple-6 transition-colors duration-300 hover:bg-white/[0.08] hover:text-white md:inline-flex"
      >
        {all.label}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </Link>
    </div>
  );
}

export function LatestPosts() {
  const posts: Item[] = articles.slice(0, 6).map((a, i) => ({
    key: a.slug,
    href: `/resources/blog/${a.slug}`,
    text: a.title,
    meta: `${a.readMins} min read`,
    badge: i === 0 ? "New" : undefined,
  }));
  const press: Item[] = pressArticles.map((p) => ({
    key: p.url,
    href: p.url,
    external: true,
    lead: p.outlet,
    text: p.headline,
  }));
  if (posts.length === 0 && press.length === 0) return null;

  return (
    <section aria-label="Latest from Agentra: blog posts and press coverage" className="py-8 sm:py-10">
      <div className="container-x grid gap-3">
        {posts.length > 0 && (
          <Strip icon={PenLine} label="From the blog" items={posts} all={{ href: "/resources/blog", label: "All posts" }} />
        )}
        {press.length > 0 && (
          <Strip icon={Newspaper} label="In the news" items={press} all={{ href: "/company/press", label: "All coverage" }} reverse />
        )}
      </div>
    </section>
  );
}
