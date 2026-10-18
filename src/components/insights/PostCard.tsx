import Link from "next/link";
import { CoverArt } from "./CoverArt";
import { formatDate, type Author, type Post } from "@/lib/insights";

export function AuthorLine({
  author,
  date,
  readMins,
  size = "sm",
}: {
  author: Author;
  date: string;
  readMins: number;
  size?: "sm" | "md";
}) {
  const avatar = size === "md" ? "h-10 w-10" : "h-7 w-7";
  return (
    <div className="flex items-center gap-3">
      {author.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={author.photo}
          alt=""
          className={`${avatar} rounded-full object-cover ring-1 ring-white/15`}
        />
      ) : (
        <span
          aria-hidden
          className={`${avatar} inline-flex items-center justify-center rounded-full bg-purple-1 text-[11px] font-semibold text-purple-6 ring-1 ring-white/10`}
        >
          A
        </span>
      )}
      <div className={size === "md" ? "text-sm" : "text-xs"}>
        <div className="font-medium text-fg">{author.name}</div>
        <div className="text-fg-dim">
          <time dateTime={date}>{formatDate(date)}</time>, {readMins} min read
        </div>
      </div>
    </div>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/resources/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-2xl outline-offset-4"
    >
      <CoverArt seed={post.cover.seed} block={post.cover.block} />
      <div className="mt-5 flex flex-1 flex-col">
        <span className="text-xs font-medium text-purple-5">{post.category}</span>
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-fg transition-colors group-hover:text-purple-6">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-fg-muted">
          {post.excerpt}
        </p>
        <div className="mt-5">
          <AuthorLine author={post.author} date={post.date} readMins={post.readMins} />
        </div>
      </div>
    </Link>
  );
}
