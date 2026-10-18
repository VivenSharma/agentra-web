import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { ScrollRevealText } from "@/components/ScrollRevealText";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

export function SectionHeader({
  title,
  accent,
  sub,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "left"
          ? "max-w-2xl"
          : "mx-auto max-w-2xl text-center"
      }
    >
      <ScrollRevealText
        as="h2"
        text={accent ? `${title} ${accent}` : title}
        className="text-2xl font-semibold leading-[1.15] tracking-[-0.01em] sm:text-[1.7rem] md:text-[2rem]"
      />
      {sub && (
        <p className="mt-4 text-[1.05rem] leading-relaxed text-fg-muted">
          {sub}
        </p>
      )}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300";
  const styles =
    variant === "primary"
      ? "btn-primary hover:-translate-y-0.5 active:scale-[0.98]"
      : "border border-line-strong text-fg hover:border-purple-4/60 hover:bg-white/5 active:scale-[0.98]";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function GlassCard({
  children,
  className = "",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div className={`glass ${hover ? "glass-hover" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function Pill({
  children,
  soft = false,
}: {
  children: ReactNode;
  soft?: boolean;
}) {
  return (
    <span
      className={
        soft
          ? "inline-flex items-center rounded-full border border-purple-4/25 bg-purple-4/10 px-3 py-1 text-xs font-medium text-purple-5"
          : "inline-flex items-center rounded-full bg-grad px-3 py-1 text-xs font-semibold text-white"
      }
    >
      {children}
    </span>
  );
}
