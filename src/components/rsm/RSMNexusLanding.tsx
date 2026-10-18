"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, ArrowUpRight, Play, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";

/* ================================================================== */
/*  Content                                                            */
/* ================================================================== */

const EVENT = {
  dateLabel: "Friday, 25 September 2026",
  timeLabel: "18:00 to 21:00 CET",
  city: "A'DAM Lookout, Amsterdam",
  targetISO: "2026-09-25T16:00:00Z",
  mailto:
    "mailto:anish.chatterjee@agentra-ai.com?subject=Rotterdam%20School%20of%20Management%2C%20Erasmus%20University%20Supply%20Chain%20Nexus%202026%20Request%20a%20seat&body=Hi%20Anish%2C%0A%0AI%27d%20like%20to%20request%20a%20seat%20at%20the%20Rotterdam%20School%20of%20Management%2C%20Erasmus%20University%20Supply%20Chain%20Nexus%20on%2025%20September%202026.%0A%0AName%3A%0ACompany%3A%0ARole%3A%0A",
  contact: "anish.chatterjee@agentra-ai.com",
};

const NAV = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Themes", href: "#themes" },
  { label: "Speakers", href: "#speakers" },
  { label: "The room", href: "#room" },
  { label: "Venue", href: "#venue" },
];

const MARQUEE_WORDS = ["Agentic AI", "Resilience by design", "The human layer", "Supply chain", "Amsterdam", "Chapter 02"];

const STATS = [
  { value: "17", label: "Senior practitioners" },
  { value: "3", label: "Roundtables in parallel" },
  { value: "180", label: "Minutes, one keynote" },
  { value: "02", label: "Chapter, and counting" },
];

const EXPERIENCE = [
  { title: "A practitioner keynote", body: "Eighteen minutes from someone who took agentic AI from pilot to production, then open questions. No theory, no vendor deck." },
  { title: "Three roundtables, in parallel", body: "Five or six seats per table, one theme each for the full 45 minutes. Shaped by the room, not by the agenda." },
  { title: "Table readouts", body: "Six minutes per theme, delivered by each table. Spoken, no slides, so the room hears every argument." },
  { title: "Bites, drinks and networking", body: "A relaxed buffet of bites and drinks, with seating deliberately mixed from 20:30 so the three themes cross over before people leave." },
  { title: "A shared follow-up", body: "One commitment captured per table, sent to the whole room within 48 hours while it is still fresh." },
  { title: "Badges that seat you", body: "Your table number prints on your badge, so the evening flows with no shuffling or announcements." },
];

const THEMES = [
  { n: "01", title: "Agentic AI in operations", body: "From pilot to production without breaking the systems that already run the business. The honest conversation lives in what broke between the two." },
  { n: "02", title: "Resilience by design", body: "Supply chains that absorb shocks instead of reacting to them. Buffers, dual sourcing and scenario work all cost money in a calm quarter. Which survived the last budget round?" },
  { n: "03", title: "The human layer", body: "Leading the people dimension of the shift. Planners are being asked to supervise systems that used to be their job, a change problem before it is a technology one." },
];

const ROLES = [
  "Chief Supply Chain Officer", "VP Supply Chain", "Head of Planning", "S&OP Lead",
  "Procurement Director", "Global Category Manager", "Logistics Director", "Demand Planning Manager",
  "Supply Chain Transformation", "Head of Operations", "Digital & Data Leader", "Resilience & Risk Lead",
];

type Person = { name: string; role: string; org: string; theme?: string; photo?: string; linkedin?: string };

const HOST: Person = { name: "Lalit Das", role: "Founder & CEO, Host", org: "Agentra", photo: "/team/lalit.webp" };

const SPEAKERS: Person[] = [
  { name: "Avinash Aman", role: "Co-Founder & COO", org: "Agentra", photo: "/team/avinash.webp" },
  { name: "Niharika Chawla", role: "Head of Business Enablement", org: "Agentra", photo: "/team/niharika-chawla.webp" },
  { name: "Anish Chatterjee", role: "Event Lead", org: "Agentra", photo: "/team/anish-chatterjee.webp" },
];

const ATTENDEES: Person[] = [
  { name: "Ritesh Gupta", role: "Senior Digital Leader / Portfolio Manager", org: "Shell", theme: "Agentic AI in operations" },
  { name: "Veronique Berens", role: "Director Global Supply Chain Transformation", org: "Procter & Gamble", theme: "Agentic AI in operations" },
  { name: "Nirmal Kumar", role: "SC Transformation Manager", org: "SBM Offshore", theme: "Agentic AI in operations" },
  { name: "Jan Offermanns", role: "Senior Manager Supply Planning", org: "Adidas", theme: "Agentic AI in operations" },
  { name: "Xun Li", role: "Global Planning Operations Manager", org: "Crocs EMEA", theme: "Agentic AI in operations" },
  { name: "Erin Wang", role: "Demand Planning Manager", org: "TPV", theme: "Agentic AI in operations" },
  { name: "Jean Paul Vidal", role: "Global Procurement Director", org: "Mars", theme: "Resilience by design" },
  { name: "Thijs van Munster", role: "Executive Director, Business Development & Supply Chain", org: "MRC Global", theme: "Resilience by design" },
  { name: "Angelina Wijnen", role: "Director Global Supply Chain Management", org: "Novanta", theme: "Resilience by design" },
  { name: "Yan He", role: "Global Procurement Energy Category Manager", org: "JDE Peet's", theme: "Resilience by design" },
  { name: "Ying Zhang", role: "Supply Chain Manager", org: "Antenna Company", theme: "Resilience by design" },
  { name: "Julia Schrijvers", role: "Supply Chain Manager", org: "SEA Water", theme: "Resilience by design" },
  { name: "Stepan Afanasyev", role: "Senior Director Global Planning", org: "Bausch + Lomb", theme: "The human layer" },
  { name: "Samantha van Hoof Flores", role: "Senior Director, Nike Digital EMEA", org: "Power House Code", theme: "The human layer" },
  { name: "Hetty van Ewijk", role: "Supply Chain Director", org: "SwissSense", theme: "The human layer" },
  { name: "Fatma Ismail", role: "Senior Engineering Manager", org: "Johnson & Johnson MedTech", theme: "The human layer" },
  { name: "Paz Levi", role: "Project Manager", org: "Vanderlande", theme: "The human layer" },
];

const AGENDA = [
  { time: "18:00", title: "Arrival & welcome drinks", body: "Badges carry your table number, so seating needs no announcement later." },
  { time: "18:30", title: "Welcome & framing", body: "The three themes and the format. No company pitch." },
  { time: "18:40", title: "Keynote, pilot to production", body: "A practitioner, not a theorist. Eighteen minutes from the floor, then open questions." },
  { time: "19:15", title: "Roundtables, three themes in parallel", body: "Five or six seats per table. Shaped by the room, not by the agenda." },
  { time: "20:00", title: "Table readouts", body: "Six minutes per theme, delivered by each table. Spoken, no slides." },
  { time: "20:20", title: "Close & what happens next", body: "One commitment per table, captured for the follow-up note." },
  { time: "20:30", title: "Bites, drinks & open networking", body: "Seating deliberately mixed so the three themes cross over before people leave." },
];

const VENUE = [
  { label: "Venue", body: "A'DAM Lookout, atop the A'DAM Tower, Overhoeksplein 1, Amsterdam Noord. A short, free ferry from behind Amsterdam Centraal." },
  { label: "Timing", body: "Doors at 18:00, programme from 18:30, close at 21:00. Arrive late and you still catch the roundtables." },
  { label: "Format", body: "Seated keynote, then three roundtables of five or six. Bites and drinks from 20:30." },
  { label: "Catering", body: "Drinks and bites on arrival and throughout, a relaxed buffet rather than a sit-down dinner. Dietary requirements collected with the RSVP." },
];

/* ================================================================== */
/*  Primitives                                                         */
/* ================================================================== */

function LinkedinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.53C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/* Plain uppercase label, no leading dash */
function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`text-[0.72rem] font-medium uppercase tracking-[0.24em] text-purple-4 ${className}`} style={{ fontFamily: "var(--font-label)" }}>{children}</span>;
}

function SectionLabel({ kicker, title, accent, align = "center" }: { kicker: string; title: string; accent?: string; align?: "center" | "left" }) {
  return (
    <Reveal>
      <div className={align === "left" ? "max-w-2xl" : "mx-auto max-w-2xl text-center"}>
        <Kicker>{kicker}</Kicker>
        <h2 className="mt-5 text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[2.8rem]" style={{ fontWeight: 800 }}>
          {title} {accent && <span className="text-grad">{accent}</span>}
        </h2>
      </div>
    </Reveal>
  );
}

/* Seamless marquee — duplicates children and scrolls forever */
function Marquee({ children, reverse = false, fast = false, className = "" }: { children: ReactNode; reverse?: boolean; fast?: boolean; className?: string }) {
  return (
    <div className={`marquee-pause relative overflow-hidden ${className}`}>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40"
        style={{ background: "linear-gradient(90deg,#000,transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40"
        style={{ background: "linear-gradient(270deg,#000,transparent)" }}
      />
      <div className={`nexus-marquee-track ${reverse ? "rev" : ""} ${fast ? "fast" : ""}`}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>{children}</div>
      </div>
    </div>
  );
}

/* Portrait photo card top — big, TiECON style; shows a dummy placeholder when no photo */
function PersonGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-16 w-16 text-purple-4/45" fill="currentColor" aria-hidden>
      <path d="M12 12.5a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5ZM4.5 20.2c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6v.3H4.5v-.3Z" />
    </svg>
  );
}

function Portrait({ person }: { person: Person }) {
  // Subtle per-card variation so a grid of placeholders never looks like one tile.
  const seed = person.name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const angle = 145 + (seed % 70);
  const alpha = 0.12 + (seed % 8) / 90;
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 5" }}>
      {person.photo ? (
        <Image src={person.photo} alt={person.name} fill sizes="(max-width:768px) 50vw, 320px" className="object-cover object-top" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3" style={{ background: `linear-gradient(${angle}deg, rgba(160,107,255,${alpha}), rgba(26,26,26,0.92))` }}>
          <PersonGlyph />
          <span className="text-[0.62rem] uppercase tracking-[0.22em] text-fg-dim">Photo to follow</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 -40px 50px -30px rgba(0,0,0,0.9)" }} />
    </div>
  );
}

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="grad-border group h-full overflow-hidden">
      <Portrait person={person} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-[1.02rem] font-semibold leading-tight tracking-[-0.01em]">{person.name}</h4>
          {person.linkedin && (
            <a href={person.linkedin} target="_blank" rel="noreferrer" className="mt-0.5 text-fg-dim transition-colors hover:text-purple-4"><LinkedinIcon className="h-4 w-4" /></a>
          )}
        </div>
        <p className="mt-1.5 text-[0.82rem] leading-snug text-fg-muted">{person.role}</p>
        <p className="mt-1 text-[0.82rem] font-medium text-purple-5">{person.org}</p>
        {person.theme && <p className="mt-3 text-[0.62rem] uppercase tracking-[0.16em] text-fg-dim">{person.theme}</p>}
      </div>
    </div>
  );
}

/* Tower line-art in a purple gradient, always animated (float + light sweep) */
function TowerGradient({ className = "" }: { className?: string }) {
  const maskStyle = {
    WebkitMaskImage: "url(/rsm-nexus/adam-line-white.png)",
    maskImage: "url(/rsm-nexus/adam-line-white.png)",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  } as const;
  return (
    <div className={`relative animate-float ${className}`} style={{ aspectRatio: "461 / 665" }} aria-hidden>
      {/* base gradient fill */}
      <div className="absolute inset-0" style={{ ...maskStyle, background: "linear-gradient(180deg, #e0d4ff 0%, #9a71ef 34%, #6e50c8 68%, #3a2b73 100%)" }} />
      {/* travelling light sweep */}
      <div className="absolute inset-0 overflow-hidden" style={maskStyle}>
        <div className="absolute inset-x-0 h-1/3" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.85), transparent)", animation: "tower-sweep 4.5s ease-in-out infinite", mixBlendMode: "screen" }} />
      </div>
    </div>
  );
}

function useCountdown(targetISO: string) {
  const compute = () => {
    const diff = Math.max(0, new Date(targetISO).getTime() - Date.now());
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  // Lazy initializer computes the real value before first paint (no 00 flash).
  const [p, setP] = useState(compute);
  useEffect(() => {
    setP(compute());
    const id = setInterval(() => setP(compute()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetISO]);
  return p;
}

function SeatCTA({ variant = "primary", className = "", children }: { variant?: "primary" | "ghost"; className?: string; children: ReactNode }) {
  const base = "group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300";
  const styles = variant === "primary" ? "btn-primary hover:-translate-y-0.5 active:scale-[0.98]" : "border border-line-strong text-fg hover:border-purple-4/60 hover:bg-white/5 active:scale-[0.98]";
  return (
    <a href={EVENT.mailto} className={`${base} ${styles} ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

/* ================================================================== */
/*  Intro title card                                                   */
/* ================================================================== */

function IntroOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDone(), 2200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black" initial={{ opacity: 1 }} exit={{ y: "-100%" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} onClick={onDone}>
      <div className="mesh pointer-events-none absolute inset-0 opacity-40" />
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.5 }} className="relative text-[0.7rem] uppercase tracking-[0.4em] text-fg-dim">Rotterdam School of Management, Erasmus University Supply Chain Nexus</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="relative mt-4 text-center text-5xl font-bold tracking-[-0.03em] sm:text-7xl">
        Chapter <span className="text-grad animate-gradient-text">02</span>
      </motion.h1>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="relative mt-6 h-px w-24 origin-center bg-grad" />
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }} className="absolute bottom-10 text-[0.62rem] uppercase tracking-[0.3em] text-fg-dim">Click to enter</motion.p>
    </motion.div>
  );
}

/* ================================================================== */
/*  Nav                                                                */
/* ================================================================== */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-line bg-black/75 backdrop-blur-xl" : "border-b border-transparent"}`}>
      <div className="container-x flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Logo className="h-7 w-auto" />
        </div>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={`text-sm transition-colors hover:text-fg ${active === n.href.slice(1) ? "nav-active" : "text-fg-muted"}`}>{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <SeatCTA className="!px-5 !py-2.5 !text-xs">Request a seat</SeatCTA>
          <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {/* Scrolling ticker strip, just under the nav */}
      <div className="border-y border-line bg-black/55 py-2 backdrop-blur-md">
        <Marquee>
          {MARQUEE_WORDS.map((w, i) => (
            <span key={i} className="mx-5 inline-flex items-center gap-5 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-fg-muted">
              {w}<span className="h-1 w-1 rounded-full bg-purple-4/70" />
            </span>
          ))}
        </Marquee>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-line bg-black/95 backdrop-blur-xl lg:hidden">
            <div className="container-x flex flex-col gap-1 py-4">
              {NAV.map((n) => (<a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 text-sm text-fg-muted transition-colors hover:text-fg">{n.label}</a>))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ================================================================== */
/*  Hero                                                               */
/* ================================================================== */

function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const show = ready || reduce;
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-36 pb-16">
      <div className="mesh pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="grid-bg absolute inset-0 -z-10 opacity-30" />
      <div className="glow left-[12%] top-[24%] h-[440px] w-[560px]" style={{ background: "radial-gradient(circle,#5a4794,transparent 70%)" }} />

      <div className="container-x relative z-10 w-full">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left — copy */}
          <div className="text-center lg:text-left">
            <motion.div initial={false} animate={show ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.6 }}>
              <Kicker>Rotterdam School of Management, Erasmus University Supply Chain Nexus · Chapter 02</Kicker>
            </motion.div>

            <h1 className="mt-6 text-[3.1rem] font-extrabold leading-[0.9] tracking-[-0.045em] sm:text-[4.5rem] md:text-[5.2rem]" style={{ fontWeight: 800 }}>
              <motion.span className="block" initial={false} animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>An evening for</motion.span>
              <motion.span className="text-grad animate-gradient-text block" initial={false} animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>agentic supply chain</motion.span>
            </h1>

            <motion.p initial={false} animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ delay: 0.4, duration: 0.7 }} className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-fg-muted lg:mx-0">
              One evening in Amsterdam with the practitioners shaping what comes next. Connecting Rotterdam School of Management, Erasmus University alumni, industry and the people building the agentic supply chain.
            </motion.p>

            <motion.div initial={false} animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ delay: 0.52, duration: 0.7 }} className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-fg-muted lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.02] px-4 py-2"><Calendar className="h-4 w-4 text-purple-4" /> {EVENT.dateLabel}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.02] px-4 py-2"><Clock className="h-4 w-4 text-purple-4" /> {EVENT.timeLabel}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.02] px-4 py-2"><MapPin className="h-4 w-4 text-purple-4" /> {EVENT.city}</span>
            </motion.div>

            <motion.div initial={false} animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ delay: 0.64, duration: 0.7 }} className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <SeatCTA>Request your seat</SeatCTA>
              <Link href="#recap" className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-sm font-semibold text-fg transition-all duration-300 hover:border-purple-4/60 hover:bg-white/5"><Play className="h-4 w-4 text-purple-4" /> Watch Chapter 01</Link>
            </motion.div>

            <motion.div initial={false} animate={show ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.8, duration: 0.7 }} className="mt-10 flex items-center justify-center gap-3 lg:justify-start">
              <span className="text-[0.6rem] uppercase tracking-[0.24em] text-fg-dim">An initiative of Rotterdam School of Management, Erasmus University alumni at</span>
              <Logo className="h-5 w-auto" />
            </motion.div>
          </div>

          {/* Right — big animated gradient tower */}
          <motion.div initial={false} animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }} transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative mx-auto hidden w-full max-w-lg md:block">
            <div className="glow glow-pulse left-1/2 top-1/2 h-[80%] w-[85%] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle,#8055e2,transparent 70%)" }} />
            <TowerGradient className="relative mx-auto w-[94%]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Countdown — dramatic dedicated section below the hero              */
/* ================================================================== */

function CountdownSection() {
  const p = useCountdown(EVENT.targetISO);
  const reduce = useReducedMotion();
  const cells: [number, string][] = [[p?.d ?? 0, "Days"], [p?.h ?? 0, "Hours"], [p?.m ?? 0, "Minutes"], [p?.s ?? 0, "Seconds"]];
  return (
    <section className="relative overflow-hidden border-t border-line py-28">
      <div className="mesh pointer-events-none absolute inset-0 opacity-45" />
      <div className="grid-bg absolute inset-0 opacity-20" />
      <div className="glow glow-pulse left-1/2 top-1/2 h-[440px] w-[760px] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle,#5a4794,transparent 70%)" }} />
      <div className="container-x relative text-center">
        <Kicker>Counting down</Kicker>
        <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-5xl" style={{ fontWeight: 800 }}>
          The room opens in
        </h2>
        <div className="mt-12 flex items-stretch justify-center gap-3 sm:gap-5">
          {cells.map(([v, l], i) => (
            <motion.div
              key={l}
              initial={reduce ? false : { scale: 0.94 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grad-border flex min-w-[74px] flex-1 flex-col items-center justify-center px-3 py-6 sm:min-w-0 sm:max-w-[150px] sm:px-6 sm:py-9"
            >
              <span suppressHydrationWarning className="text-grad text-5xl font-extrabold tabular-nums leading-none sm:text-[4.6rem]" style={{ fontFamily: "var(--font-mono)" }}>{String(v).padStart(2, "0")}</span>
              <span className="mt-3 text-[0.58rem] uppercase tracking-[0.24em] text-fg-dim sm:text-[0.7rem]">{l}</span>
            </motion.div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-md text-sm text-fg-muted sm:text-base">Friday, 25 September 2026 · 18:00 CET · A&apos;DAM Lookout, Amsterdam</p>
        <div className="mt-8 flex justify-center"><SeatCTA>Request your seat</SeatCTA></div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  About                                                              */
/* ================================================================== */

function About() {
  return (
    <section id="about" className="relative scroll-mt-20 border-t border-line py-28">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Kicker>Welcome to the Nexus</Kicker>
            <p className="mt-6 text-2xl font-light leading-[1.4] tracking-[-0.01em] sm:text-[2rem]">
              The meeting point for the people who actually run supply chains. Three hours,
              one keynote, three tables in parallel. An evening as{" "}
              <span className="text-grad animate-gradient-text">social as it is substantive</span>.
            </p>
          </div>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="grad-border flex h-full flex-col items-center justify-center p-8 text-center">
                <div className="text-grad animate-gradient-text text-4xl font-bold tracking-[-0.02em] sm:text-5xl">{s.value}</div>
                <div className="mt-3 text-xs uppercase tracking-[0.14em] text-fg-dim">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Experience                                                         */
/* ================================================================== */

function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-20 border-t border-line py-24">
      <div className="glow right-0 top-1/4 h-[380px] w-[480px]" style={{ background: "radial-gradient(circle,#5b46c9,transparent 70%)" }} />
      <div className="container-x relative">
        <SectionLabel kicker="The experience" title="An evening built" accent="to produce something" align="left" />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.title} delay={(i % 3) * 0.08}>
              <div className="grad-border h-full p-7">
                <div className="font-mono text-sm text-purple-4">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em]">{e.title}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-fg-muted">{e.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Themes                                                             */
/* ================================================================== */

function Themes() {
  return (
    <section id="themes" className="relative scroll-mt-20 border-t border-line py-24">
      <div className="container-x">
        <SectionLabel kicker="On the agenda, three themes" title="Three arguments worth" accent="an evening" />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {THEMES.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.08}>
              <div className="grad-border group h-full p-8">
                <div className="flex items-center justify-between">
                  <span className="text-grad animate-gradient-text font-mono text-3xl font-bold">{t.n}</span>
                  <span className="h-2 w-2 rounded-full bg-purple-4 shadow-[0_0_14px_var(--glow-soft)] transition-transform duration-500 group-hover:scale-150" />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em]">{t.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Who should be here — scrolling role chips                          */
/* ================================================================== */

function WhoShouldAttend() {
  const half = Math.ceil(ROLES.length / 2);
  const rowA = ROLES.slice(0, half);
  const rowB = ROLES.slice(half);
  const chip = (r: string) => (
    <span key={r} className="mx-2 whitespace-nowrap rounded-full border border-purple-4/25 bg-purple-4/5 px-5 py-2.5 text-sm text-purple-6">{r}</span>
  );
  return (
    <section className="relative border-t border-line py-24">
      <div className="container-x">
        <SectionLabel kicker="Who should be here" title="Built for the people who" accent="carry the number" />
      </div>
      <div className="mt-12 space-y-4">
        <Marquee>{rowA.map(chip)}</Marquee>
        <Marquee reverse>{rowB.map(chip)}</Marquee>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Speakers                                                           */
/* ================================================================== */

function Speakers() {
  return (
    <section id="speakers" className="relative scroll-mt-20 border-t border-line py-24">
      <div className="container-x">
        <SectionLabel kicker="Speakers & hosts" title="The people running" accent="the room" />

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal><PersonCard person={HOST} /></Reveal>
          {SPEAKERS.map((p, i) => (<Reveal key={p.name} delay={(i + 1) * 0.07}><PersonCard person={p} /></Reveal>))}
        </div>

        <Reveal delay={0.1}><p className="mx-auto mt-10 max-w-xl text-center text-sm text-fg-dim">Keynote speaker and the three table hosts are being confirmed, announced with the invitation.</p></Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  The room — one grid of big-photo cards                             */
/* ================================================================== */

function Room() {
  return (
    <section id="room" className="relative scroll-mt-20 border-t border-line py-24">
      <div className="container-x">
        <SectionLabel kicker="Who is in the room" title="Seventeen leaders" accent="in the room" />
        <Reveal><p className="mx-auto mt-4 max-w-2xl text-center text-fg-muted">Seniority is spread so no single voice dominates a table, and the industries are deliberately mixed. Small enough to argue, senior enough to matter.</p></Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {ATTENDEES.map((p, i) => (<Reveal key={p.name} delay={(i % 4) * 0.06}><PersonCard person={p} /></Reveal>))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Agenda                                                             */
/* ================================================================== */

function Agenda() {
  return (
    <section id="agenda" className="relative scroll-mt-20 border-t border-line py-24">
      <div className="glow left-0 top-1/3 h-[400px] w-[500px]" style={{ background: "radial-gradient(circle,#5b46c9,transparent 70%)" }} />
      <div className="container-x relative grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        {/* Left — sticky intro card */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <div className="grad-border p-8 sm:p-10">
              <Kicker>The shape of the evening</Kicker>
              <h2 className="mt-5 text-3xl font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[2.9rem]" style={{ fontWeight: 800 }}>
                One evening,<br /><span className="text-grad animate-gradient-text">end to end</span>
              </h2>
              <p className="mt-5 leading-relaxed text-fg-muted">
                Three hours, one keynote, three tables in parallel. Drinks run throughout, so there is no separate break. The timings are proposed, not fixed.
              </p>
              <div className="mt-7 flex flex-col gap-3 text-sm text-fg-muted">
                <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-purple-4" /> {EVENT.dateLabel}</span>
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-purple-4" /> {EVENT.timeLabel}</span>
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-purple-4" /> {EVENT.city}</span>
              </div>
              <div className="mt-8"><SeatCTA>Request your seat</SeatCTA></div>
            </div>
          </Reveal>
        </div>

        {/* Right — timeline */}
        <div className="relative">
          <div className="absolute left-[3.65rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-grad opacity-40 sm:block" />
          <div className="space-y-3">
            {AGENDA.map((a, i) => (
              <Reveal key={a.time} delay={i * 0.05} y={20}>
                <div className="group relative flex gap-4 sm:gap-6">
                  <div className="w-14 shrink-0 pt-5 text-right font-mono text-xs text-purple-4 sm:w-16 sm:text-sm">{a.time}</div>
                  <div className="relative hidden sm:block"><span className="absolute left-[-0.5rem] top-6 h-3 w-3 rounded-full border border-purple-3 bg-black shadow-[0_0_12px_var(--glow-halo)] transition-colors duration-300 group-hover:bg-purple-4" /></div>
                  <div className="grad-border flex-1 p-5"><h3 className="font-semibold tracking-[-0.01em]">{a.title}</h3><p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{a.body}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Recap                                                              */
/* ================================================================== */

function Recap() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <section id="recap" className="relative scroll-mt-20 border-t border-line py-24">
      <div className="container-x">
        <SectionLabel kicker="Chapter 01, last year in the room" title="Where it" accent="started" />
        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="grad-border overflow-hidden p-1.5">
              <div className="relative overflow-hidden rounded-[14px]">
                <video ref={videoRef} src="/rsm-nexus/recap-2025.mp4" className="aspect-video w-full bg-black" poster="/rsm-nexus/recap-poster.jpg" controls={playing} preload="none" playsInline onPlay={() => setPlaying(true)} />
                {!playing && (
                  <button type="button" aria-label="Play Chapter 01 recap" onClick={() => { setPlaying(true); videoRef.current?.play(); }} className="group absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/10">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-grad shadow-[0_0_50px_var(--glow-halo)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95"><Play className="ml-1 h-8 w-8 fill-white text-white" /></span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Gallery — real Chapter 01 photos                                   */
/* ================================================================== */

function Gallery() {
  return (
    <section className="relative border-t border-line py-24">
      <div className="container-x">
        <SectionLabel kicker="Chapter 01 · in the room" title="Last year," accent="in pictures" />
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <div className="grad-border relative aspect-[4/3] overflow-hidden">
              <Image src="/rsm-nexus/gallery-1.jpg" alt="Guests at Rotterdam School of Management, Erasmus University Supply Chain Nexus Chapter 01, Amsterdam" fill sizes="(max-width:768px) 100vw, 66vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grad-border relative aspect-[3/4] overflow-hidden">
              <Image src="/rsm-nexus/gallery-3.jpg" alt="A guest signing the Shaping the Future of Supply Chains board" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-3">
            <div className="grad-border relative aspect-[16/7] overflow-hidden">
              <Image src="/rsm-nexus/gallery-2.jpg" alt="The full room at Rotterdam School of Management, Erasmus University Supply Chain Nexus Chapter 01" fill sizes="100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
        <p className="mt-6 text-center text-xs uppercase tracking-[0.18em] text-fg-dim">Rotterdam School of Management, Erasmus University Supply Chain Nexus · Chapter 01 · Amsterdam</p>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Venue                                                              */
/* ================================================================== */

function Venue() {
  return (
    <section id="venue" className="relative scroll-mt-20 border-t border-line py-24">
      <div className="container-x">
        <SectionLabel kicker="The venue" title="A'DAM Lookout," accent="over the IJ" />
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="relative mx-auto w-full max-w-md">
              <div className="glow glow-pulse left-1/2 top-1/2 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle,#8055e2,transparent 70%)" }} />
              <TowerGradient className="relative mx-auto w-full" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <div className="relative overflow-hidden rounded-3xl border border-line-strong">
                <Image src="/rsm-nexus/adam-tower.jpg" alt="A'DAM Lookout atop the A'DAM Tower, Amsterdam, lit at dusk" width={1920} height={1440} sizes="(max-width: 1024px) 100vw, 640px" className="h-[38vh] min-h-[260px] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="text-[0.66rem] uppercase tracking-[0.24em] text-purple-4">Amsterdam Noord</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-[-0.02em]">A&apos;DAM Lookout · A&apos;DAM Tower</h3>
                  </div>
                  <a href="https://maps.google.com/?q=A%27DAM+Lookout+Amsterdam" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] backdrop-blur-sm transition-all hover:border-white/50"><MapPin className="h-3.5 w-3.5 text-purple-4" /> Map</a>
                </div>
              </div>
              <p className="mt-2 text-right text-[0.6rem] text-fg-dim/70">Photo: Muck / Wikimedia Commons, CC BY-SA 4.0</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {VENUE.map((v) => (
                  <div key={v.label} className="grad-border h-full p-5">
                    <div className="text-[0.68rem] uppercase tracking-[0.2em] text-purple-4">{v.label}</div>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Register                                                           */
/* ================================================================== */

function Register() {
  return (
    <section id="register" className="relative scroll-mt-20 border-t border-line py-28">
      <div className="container-x">
        <Reveal>
          <div className="surface-primary relative mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-purple-4/25 px-8 py-16 text-center sm:px-16 sm:py-20">
            <div className="mesh pointer-events-none absolute inset-0 opacity-50" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative">
              <Kicker>By invitation, seats limited to seventeen</Kicker>
              <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[3rem]">Come argue at a <span className="text-grad animate-gradient-text">table</span> that matters.</h2>
              <p className="mx-auto mt-5 max-w-lg text-fg-muted">Request your seat and we&apos;ll follow up with the venue, the agenda and your table before the evening.</p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <SeatCTA>Request your seat</SeatCTA>
                <a href={`mailto:${EVENT.contact}`} className="group inline-flex items-center gap-1.5 rounded-full border border-line-strong px-7 py-3.5 text-sm font-semibold text-fg transition-all duration-300 hover:border-purple-4/60 hover:bg-white/5">{EVENT.contact}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Partners                                                           */
/* ================================================================== */

function Partners() {
  return (
    <section className="relative border-t border-line py-24">
      <div className="container-x">
        <SectionLabel kicker="Who's behind it" title="An Agentra initiative," accent="by Rotterdam School of Management, Erasmus University alumni" />
        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center justify-center gap-7 text-center">
            <div className="grad-border flex items-center justify-center px-12 py-8"><Logo className="h-9 w-auto" /></div>
            <p className="text-fg-muted">The Rotterdam School of Management, Erasmus University Supply Chain Nexus is an initiative of Rotterdam School of Management, Erasmus University alumni now at Agentra. It is organised by Agentra, with the support of the school's Alumni team.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Footer                                                             */
/* ================================================================== */

function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-black/80 px-4 py-3 backdrop-blur-xl lg:hidden">
      <SeatCTA className="w-full justify-center">Request your seat</SeatCTA>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-line pb-24 lg:pb-0">
      <div className="container-x flex flex-col items-start justify-between gap-8 py-12 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4"><Logo className="h-7 w-auto" /></div>
        <div className="text-sm text-fg-muted">Rotterdam School of Management, Erasmus University Supply Chain Nexus · Chapter 02 · 25 September 2026 · Amsterdam</div>
        <a href={`mailto:${EVENT.contact}`} className="group inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg">{EVENT.contact}<ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

export function RSMNexusLanding() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const seen = sessionStorage.getItem("rsm-intro-seen");
    if (reduce || isMobile || seen) {
      setReady(true);
      setShowIntro(false);
    } else {
      setShowIntro(true);
    }
  }, [reduce]);

  const finishIntro = () => {
    sessionStorage.setItem("rsm-intro-seen", "1");
    setShowIntro(false);
    setReady(true);
  };

  return (
    <div className="relative bg-black">
      <AnimatePresence>{showIntro && <IntroOverlay key="intro" onDone={finishIntro} />}</AnimatePresence>
      <Nav />
      <main>
        <Hero ready={ready} />
        <CountdownSection />
        <About />
        <Experience />
        <Themes />
        <WhoShouldAttend />
        <Speakers />
        <Room />
        <Agenda />
        <Recap />
        <Gallery />
        <Venue />
        <Register />
        <Partners />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
