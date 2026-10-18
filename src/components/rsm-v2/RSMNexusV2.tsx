"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SmoothScroll } from "./SmoothScroll";

/* ================================================================== */
/*  Content                                                            */
/* ================================================================== */

const EVENT = {
  dateLabel: "Friday, 25 September 2026",
  timeLabel: "18:00–21:00 CET",
  city: "A'DAM Lookout, Amsterdam",
  address: "A'DAM Lookout, Overhoeksplein 5, Amsterdam",
  agendaPdf: "/rsm-nexus/rsm-nexus-agenda.pdf",
  form: "https://share-na2.hsforms.com/282c-AIY7T4es3wt7T3T3TA4280z7",
  contact: "anish.chatterjee@agentra-ai.com",
};

const INTRO_HEADING = "An evening for fellow Rotterdam School of Management, Erasmus University alumni";
const INTRO = [
  "Chapter One brought the old supply chain crowd back into one room, and nobody wanted to leave. So we're doing it again.",
  "Ninety metres above the IJ, with the whole city on the other side of the glass. A wide-angle look at where supply chains are heading as agentic AI reshapes the field, an honest panel, and plenty of room to reconnect.",
];

const EXPECT = [
  { k: "01", t: "Ninety metres up", d: "A'DAM Lookout, the city laid out on every side, and the light going gold over the water as the evening turns." },
  { k: "02", t: "One real question", d: "Where agentic AI actually sits in supply chain today. What's running, what isn't, and what leaders are left having to decide. Sharp views, and room to disagree." },
  { k: "03", t: "The network, back in one room", d: "Familiar faces from across the Rotterdam School of Management, Erasmus University supply chain world, a dozen industries between them, and a few new ones to meet." },
  { k: "04", t: "Time to actually talk", d: "A long golden-hour break, food and drinks after, and no rush to leave. Europe's highest swing is on the roof, if the evening takes you that way." },
];

const AGENDA = [
  { time: "18:00", dur: "30 min", title: "Arrival, registration & welcome drinks", who: "", body: "Arrive, catch up, meet the room.", tag: "" },
  { time: "18:30", dur: "5 min", title: "Welcome & opening note", who: "Lalit Das, Founder & CEO, Agentra", body: "A welcome to the community, and where supply chain technology has come from.", tag: "" },
  { time: "18:35", dur: "15 min", title: "Keynote", who: "Pratik Yadav, Managing Partner, BCG", body: "What companies are actually doing with agentic AI, where they are experimenting, and where things are heading.", tag: "Keynote" },
  { time: "18:50", dur: "15 min", title: "Making agentic AI work inside an organisation", who: "Prof. Ioannis Fragkos, Rotterdam School of Management, Erasmus University", body: "What it takes before a decision can be handed to a system, and why two organisations with the same tools end up in different places.", tag: "" },
  { time: "19:05", dur: "20 min", title: "Break", who: "", body: "Refreshments and conversation.", tag: "Golden hour" },
  { time: "19:25", dur: "10 min", title: "Quiz", who: "", body: "A short one, on your phone. One lucky attendee walks away with a prize.", tag: "" },
  { time: "19:35", dur: "25 min", title: "Panel discussion", who: "Christophe Villain, Nestlé · Dr Sudip Lahiri, HCLTech · Patrick van der Tier, Mead Johnson · Stepan Afanasyev, Bausch + Lomb", body: "Moderated by Ikram Mataich, Founder of Get New Spark. Senior practitioners in candid conversation, with room to disagree and questions from the floor.", tag: "" },
  { time: "20:00", dur: "5 min", title: "Vote of thanks", who: "", body: "A few words to close the programme.", tag: "" },
  { time: "20:05", dur: "to 21:00", title: "Drinks, small bites & continued conversations", who: "", body: "The networking left deliberately long.", tag: "" },
];

const HOST = { name: "Lalit Das", role: "Rotterdam School of Management, Erasmus University alumnus", org: "and your host", photo: "/team/lalit.webp" };

const THEMES = [
  { n: "01", title: "Agentic AI in operations", body: "From pilot to production without breaking the systems that already run the business. The honest conversation lives in what broke between the two." },
  { n: "02", title: "Resilience by design", body: "Supply chains that absorb shocks instead of reacting to them. Buffers, dual sourcing and scenario work all cost money in a calm quarter. Which survived the last budget round?" },
  { n: "03", title: "The human layer", body: "Leading the people dimension of the shift. Planners are being asked to supervise systems that used to be their job, a change problem before it is a technology one." },
];

/* ================================================================== */
/*  Primitives                                                         */
/* ================================================================== */

function CTA({ children, ghost = false, className = "" }: { children: ReactNode; ghost?: boolean; className?: string }) {
  const base = "group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300";
  const styles = ghost ? "border border-white/20 text-fg hover:border-white/45 hover:bg-white/5" : "bg-white text-black hover:-translate-y-0.5 active:scale-[0.98]";
  return (
    <a href={EVENT.form} target="_blank" rel="noreferrer" className={`${base} ${styles} ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  return <motion.div style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-grad" />;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-white/10 bg-black/70 backdrop-blur-xl" : "border-b border-transparent"}`}>
      {!scrolled && <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/70 to-transparent" />}
      <div className="container-x flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Logo className="h-7 w-auto" />
        </div>
        <a href={EVENT.form} target="_blank" rel="noreferrer" className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-black transition-transform hover:-translate-y-0.5">
          Grab your seat
        </a>
      </div>
    </header>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.3em] text-purple-4">{children}</p>;
}

/* ================================================================== */
/*  1 — HERO                                                           */
/* ================================================================== */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTower = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scaleTower = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const line = (children: ReactNode, delay: number) => (
    <span className="v2-mask">
      <motion.span className="block" initial={reduce ? undefined : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </motion.span>
    </span>
  );

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24">
      <motion.div style={{ y: reduce ? 0 : yTower, scale: reduce ? 1 : scaleTower }} className="absolute inset-x-0 top-[-6%] z-0 h-[112%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/rsm-nexus/adam-hero.jpg" alt="A'DAM Tower and the Amsterdam skyline at night" className="h-full w-full object-cover object-center" fetchPriority="high" />
      </motion.div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black from-28% via-black/70 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-transparent to-black/45" />
      <div className="mesh pointer-events-none absolute inset-0 z-[1] opacity-30" />
      <div className="grid-bg absolute inset-0 z-[1] opacity-15" />

      <motion.div style={{ y: reduce ? 0 : yText, opacity: reduce ? 1 : opacity }} className="container-x relative z-10 py-16">
        <div className="max-w-4xl">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.7 }} className="inline-block rounded-full border border-purple-4/40 px-3 py-1 font-mono text-xs uppercase tracking-[0.3em] text-purple-4">
            Chapter 02
          </motion.span>
          <h1 className="v2-display mt-6 text-[2.5rem] leading-[1.08] sm:text-5xl md:text-[3.9rem]">
            {line(<span>The Rotterdam School of Management, Erasmus University supply chain network,</span>, 0.1)}
            {line(<span>back together for one evening</span>, 0.2)}
            {line(<span className="text-grad">high above Amsterdam.</span>, 0.3)}
          </h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }} className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-fg-muted sm:text-sm">
            <span>{EVENT.dateLabel}</span>
            <span className="h-3 w-px bg-white/20" />
            <span>{EVENT.timeLabel}</span>
            <span className="hidden h-3 w-px bg-white/20 sm:block" />
            <span className="w-full sm:w-auto">{EVENT.city}</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 0.8 }} className="mt-9">
            <CTA>Grab your seat</CTA>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] uppercase tracking-[0.4em] text-fg-dim">
        <span className="inline-block animate-bounce">Scroll</span>
      </motion.div>
    </section>
  );
}

/* ================================================================== */
/*  2 — INTRO                                                          */
/* ================================================================== */

function Intro() {
  return (
    <section className="relative border-t border-white/10 py-24 md:py-32">
      <div className="glow left-1/2 top-0 h-[360px] w-[620px] -translate-x-1/2" style={{ background: "radial-gradient(circle,#5a4794,transparent 70%)" }} />
      <div className="container-x relative">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="mx-auto max-w-3xl text-center">
          <Kicker>An Rotterdam School of Management, Erasmus University alumni evening</Kicker>
          <h2 className="v2-display mt-5 text-4xl md:text-6xl">{INTRO_HEADING}</h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-fg-muted md:text-xl">
            {INTRO.map((p) => <p key={p.slice(0, 16)}>{p}</p>)}
          </div>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Logo className="h-5 w-auto" />
            <span className="max-w-xl text-[0.66rem] uppercase leading-relaxed tracking-[0.18em] text-fg-dim">An initiative of Rotterdam School of Management, Erasmus University alumni working at Agentra, with the support of the school&apos;s alumni team. Organised by Agentra; the school supports it.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  3 — LAST YEAR (gallery + recap)                                    */
/* ================================================================== */

function LastYear() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["-5%", "7%"]);

  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-white/10 py-24">
      <div className="container-x">
        <div className="text-center">
          <Kicker>Last year</Kicker>
          <h2 className="v2-display mx-auto mt-5 max-w-3xl text-4xl md:text-6xl">A glimpse into how <span className="text-grad">Chapter One</span> unfolded</h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          <motion.div style={{ y: reduce ? 0 : yA }} className="relative overflow-hidden rounded-2xl border border-white/10 md:col-span-2">
            <div className="relative aspect-[4/3] w-full"><Image src="/rsm-nexus/gallery-1.jpg" alt="Guests at Rotterdam School of Management, Erasmus University Supply Chain Nexus Chapter One" fill sizes="(max-width:768px) 100vw, 66vw" className="object-cover" /></div>
          </motion.div>
          <motion.div style={{ y: reduce ? 0 : yB }} className="relative overflow-hidden rounded-2xl border border-white/10">
            <div className="relative aspect-[3/4] w-full"><Image src="/rsm-nexus/gallery-3.jpg" alt="A guest at Rotterdam School of Management, Erasmus University Supply Chain Nexus Chapter One" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" /></div>
          </motion.div>
        </div>

        {/* recap video */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mx-auto mt-5 max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/12">
            <video ref={videoRef} src="/rsm-nexus/recap-2025.mp4" poster="/rsm-nexus/recap-poster.jpg" className="aspect-video w-full bg-black" controls={playing} preload="none" playsInline onPlay={() => setPlaying(true)} />
            {!playing && (
              <button type="button" aria-label="Play the Chapter One recap" onClick={() => { setPlaying(true); videoRef.current?.play(); }} className="group absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/10">
                <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white/95 transition-transform duration-300 group-hover:scale-110"><Play className="ml-1 h-9 w-9 fill-black text-black" /></span>
              </button>
            )}
          </div>
        </motion.div>

        <p className="mt-6 text-center font-mono text-[0.62rem] uppercase tracking-[0.2em] text-fg-dim">Rotterdam School of Management, Erasmus University Supply Chain Nexus · Chapter One · Amsterdam</p>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  4 — WHAT TO EXPECT                                                 */
/* ================================================================== */

function Experience() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 py-24">
      <div className="absolute inset-0 -z-10">
        <Image src="/rsm-nexus/gallery-1.jpg" alt="" fill sizes="100vw" className="object-cover opacity-[0.2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>
      <div className="container-x">
        <div className="max-w-2xl">
          <Kicker>What to expect</Kicker>
          <h2 className="v2-display mt-5 text-5xl md:text-7xl">An evening built <span className="text-grad">around the room</span></h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {EXPECT.map((e, i) => (
            <motion.div
              key={e.k}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-purple-4/40"
            >
              <div className="font-mono text-sm text-purple-4">{e.k}</div>
              <h3 className="mt-5 text-xl font-bold tracking-[-0.01em] md:text-2xl">{e.t}</h3>
              <p className="mt-3 leading-relaxed text-fg-muted">{e.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  5 — THE RUN OF THE EVENING                                         */
/* ================================================================== */

function Themes() {
  return (
    <section id="themes" className="relative border-t border-white/10 py-24">
      <div className="container-x relative">
        <div className="max-w-2xl">
          <Kicker>The themes of the evening</Kicker>
          <h2 className="v2-display mt-5 text-4xl md:text-6xl">Three arguments <span className="text-grad">worth the room</span></h2>
          <p className="mt-5 leading-relaxed text-fg-muted">The theme of the evening, running through the keynote and into the panel.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {THEMES.map((t, i) => (
            <motion.div
              key={t.n}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-8"
            >
              <div className="font-mono text-sm text-purple-4">{t.n}</div>
              <h3 className="mt-4 text-xl font-bold tracking-[-0.01em] md:text-2xl">{t.title}</h3>
              <p className="mt-3 leading-relaxed text-fg-muted">{t.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Agenda() {
  return (
    <section id="agenda" className="relative border-t border-white/10 py-28">
      <div className="glow left-1/2 top-0 h-[380px] w-[620px] -translate-x-1/2" style={{ background: "radial-gradient(circle,#5a4794,transparent 70%)" }} />
      <div className="container-x relative">
        <div className="text-center">
          <Kicker>The run of the evening</Kicker>
          <h2 className="v2-display mx-auto mt-5 max-w-3xl text-5xl md:text-7xl">One evening,<br /><span className="text-grad">end to end</span></h2>
        </div>

        <ol className="mx-auto mt-16 max-w-3xl">
          {AGENDA.map((a, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-[54px_1fr] gap-x-4 sm:grid-cols-[88px_1fr] sm:gap-x-8"
            >
              <div className="pt-1 text-right">
                <span className="block font-mono text-sm text-purple-4 sm:text-base">{a.time}</span>
                {a.dur && <span className="mt-0.5 block font-mono text-[0.6rem] uppercase tracking-[0.12em] text-fg-dim">{a.dur}</span>}
              </div>
              <div className={`relative pb-11 pl-6 sm:pl-9 ${i === AGENDA.length - 1 ? "" : "border-l border-white/12"}`}>
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-purple-4 ring-4 ring-black transition-transform duration-300 group-hover:scale-125" />
                {a.tag && (
                  <span className="mb-3 inline-block rounded-full border border-purple-4/30 bg-purple-4/[0.07] px-3 py-1 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-purple-4">{a.tag}</span>
                )}
                <h3 className="text-xl font-bold tracking-[-0.01em] md:text-[1.7rem] md:leading-tight">{a.title}</h3>
                {a.who && <p className="mt-2 text-sm font-medium text-purple-4/90">{a.who}</p>}
                <p className="mt-3 max-w-xl leading-relaxed text-fg-muted">{a.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-fg-dim">We&apos;ll keep this page updated as more details land.</p>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  6 — YOUR HOST                                                      */
/* ================================================================== */

function Speakers() {
  return (
    <section className="relative border-t border-white/10 py-24">
      <div className="container-x">
        <div className="text-center"><Kicker>Your host, a fellow alumnus</Kicker></div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mx-auto mt-12 grid max-w-4xl items-center gap-10 sm:grid-cols-[auto_1fr]">
          <div className="relative mx-auto sm:mx-0">
            <div className="glow left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-50" style={{ background: "radial-gradient(circle,#8055e2,transparent 70%)" }} />
            <div className="relative h-44 w-44 overflow-hidden rounded-full border border-white/15"><Image src={HOST.photo} alt={HOST.name} fill sizes="176px" className="object-cover" /></div>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="v2-display text-5xl md:text-6xl">Your host, <span className="text-grad">Lalit Das</span></h2>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-purple-4">Rotterdam School of Management, Erasmus University alumnus · your host for the evening</p>
            <p className="mt-5 max-w-lg leading-relaxed text-fg-muted">Lalit came up through Rotterdam School of Management, Erasmus University like the rest of us, and every year he pulls the old supply chain crowd back together. It&apos;s his way of keeping the network warm and swapping notes on where the field is heading. He builds Agentra now, and this evening is how he puts one real question in front of the people best placed to answer it.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  7 — CLOSING CTA                                                    */
/* ================================================================== */

function Finale() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 py-[16vh]">
      <div className="mesh pointer-events-none absolute inset-0 opacity-60" />
      <div className="glow left-1/2 top-1/2 h-[500px] w-[760px] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle,#5a4794,transparent 70%)" }} />
      <div className="container-x relative text-center">
        <Kicker>Chapter 02</Kicker>
        <h2 className="v2-display mx-auto mt-6 max-w-4xl text-6xl md:text-[7.5vw]">Save your seat,<br /><span className="text-grad">see you there</span></h2>
        <div className="mx-auto mt-8 flex flex-col items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-fg-muted sm:text-sm">
          <span>{EVENT.dateLabel} · {EVENT.timeLabel}</span>
          <span>{EVENT.address}</span>
        </div>
        <p className="mx-auto mt-6 max-w-lg text-fg-muted">Seats are limited to keep the room the right size.</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <CTA>Grab your seat</CTA>
        </div>
        <div className="mt-20 flex flex-col items-center gap-3 border-t border-white/10 pt-10 text-sm text-fg-muted">
          <Logo className="h-7 w-auto" />
          <span className="mt-1 max-w-lg text-center text-[0.6rem] uppercase leading-relaxed tracking-[0.2em] text-fg-dim">An initiative of Rotterdam School of Management, Erasmus University alumni working at Agentra, with the support of the school&apos;s alumni team</span>
        </div>
        <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-fg-dim">Rotterdam School of Management, Erasmus University Supply Chain Nexus · Chapter 02 · 25.09.2026 · Amsterdam</p>
        <p className="mt-3 text-[0.58rem] text-fg-dim/60">Amsterdam photography: radkuch.13 &amp; Muck / Wikimedia Commons (CC BY 2.0, CC BY-SA 4.0)</p>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

export function RSMNexusV2() {
  return (
    <SmoothScroll>
      <div className="relative overflow-clip bg-black">
        <ProgressBar />
        <Nav />
        <main>
          <Hero />
          <Intro />
          <LastYear />
          <Experience />
          <Themes />
          <Speakers />
          <Agenda />
          <Finale />
        </main>
      </div>
    </SmoothScroll>
  );
}
