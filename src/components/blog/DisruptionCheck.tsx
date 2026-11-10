"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck, LoaderCircle, RotateCcw } from "lucide-react";
import { checkEmailFormat } from "@/lib/email-check";

/* Inbound Freight Disruption Check: Marketing's 10-question self-assessment
   ("Inbound Freight Disruption Check · Agentra" HTML, Nov 2026), rebuilt in
   the site's own components. Questions, bands, result copy and scoring are
   verbatim from that file; only the layout and motion are new.

   Leads: submitLead() sends the lead to the HubSpot form on start and again
   with the score on completion (see HUBSPOT_SUBMIT below), and also calls
   window.agentraLead, the hook the original file exposed. */

const SECTIONS = [
  {
    t: "Data: one view of every shipment",
    w: "You cannot act on what you cannot see in one place.",
    q: [
      "Do updates from every forwarder reach you in one place, in one format?",
      "Is each shipment linked to the purchase order it carries?",
    ],
  },
  {
    t: "Spotting the problem: how early do you know?",
    w: "Every day you learn about a delay earlier is a day of cheaper options.",
    q: [
      "Are delays flagged automatically, before the forwarder emails you?",
      "Can you tell straight away which orders will miss their promised date?",
    ],
  },
  {
    t: "Decision: who decides, and how fast?",
    w: "Most of the time lost in a disruption is spent waiting for a decision.",
    q: [
      "Are the options (rebook, air freight, move stock) compared side by side, with cost and service?",
      "Can a decision be made on the same day the delay is spotted?",
    ],
  },
  {
    t: "Action: does the decision actually happen?",
    w: "A decision that lives in an email thread is not yet an action.",
    q: [
      "Is the change made in your ERP and with the forwarder, without re-keying or email chains?",
      "Can you see afterwards who approved what, and when?",
    ],
  },
  {
    t: "Cost: do you know what disruption costs you?",
    w: "What is not measured is rarely improved.",
    q: [
      "Do you track what each disruption costs (air freight, demurrage, expedited deliveries)?",
      "Can you compare forwarders on cost and reliability, lane by lane?",
    ],
  },
];
const SHORT = ["Data", "Spotting the problem", "Decision", "Action", "Cost"];
const TOTAL = SECTIONS.reduce((a, s) => a + s.q.length, 0);
const BANDS = [
  {
    max: 3,
    n: "Reacting",
    w: "Inbox Firefighter",
    l: "Your team is putting out fires one email at a time. Agentra’s agents can read every forwarder update and raise the alarm before the smoke reaches your plan.",
    m: "You mostly find out about delays from the forwarder, and fixes depend on a few people and a lot of email.",
    x: "Start with data: get every forwarder’s updates into one place and one format.",
  },
  {
    max: 7,
    n: "Seeing",
    w: "Storm Spotter",
    l: "You can see the storm coming. Now let Agentra’s agents steer around it: they propose the fix, you approve it, and it happens.",
    m: "You can see most problems, but deciding and acting still takes days of hand-offs between people and systems.",
    x: "Focus on decision and action: agree who decides, and remove the re-keying between the decision and the change.",
  },
  {
    max: TOTAL,
    n: "Acting",
    w: "Agent-Ready Navigator",
    l: "Your team already acts fast. Agentra’s agents can make that speed the standard on every lane, every day.",
    m: "Your team turns alerts into actions quickly, with a clear record of who decided what.",
    x: "Focus on cost: measure what each disruption costs, lane by lane, so you can keep improving.",
  },
];
const ROLES = [
  "Supply chain leadership",
  "Logistics or distribution",
  "Procurement",
  "Planning",
  "IT or digital",
  "Finance",
  "Other",
];

type Lead = { name: string; email: string; company: string; role: string };
type Answers = (boolean | null)[][];

declare global {
  interface Window {
    agentraLead?: (payload: Record<string, unknown>) => void;
  }
}

/* HubSpot form "Inbound Freight Disruption Check" (account 247909679),
   created 10 Nov 2026. Submissions go to HubSpot's Forms API: once when the
   check starts (so an abandoned check still leaves the lead) and again with
   the score when it finishes. The visitor ticks the contact consent box
   before either is sent. Field names are HubSpot property internal names;
   disruption_check_score is the custom number property made for this form. */
const HUBSPOT_SUBMIT =
  "https://api.hsforms.com/submissions/v3/integration/submit/247909679/3ad27ae2-5e52-4c31-8e2b-afafe809afe6";

function sendToHubSpot(payload: Record<string, unknown>) {
  const v = (k: string) => (payload[k] == null ? "" : String(payload[k]));
  const fields = [
    { name: "firstname", value: v("name") },
    { name: "email", value: v("email") },
    { name: "company", value: v("company") },
    { name: "jobtitle", value: v("role") },
  ];
  if (payload.score != null) fields.push({ name: "disruption_check_score", value: v("score") });
  // HubSpot's visitor cookie, present only if the visitor accepted cookies;
  // it links the submission to their earlier page views
  const hutk = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/)?.[1];
  fetch(HUBSPOT_SUBMIT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      fields,
      context: { pageUri: window.location.href, pageName: document.title, ...(hutk ? { hutk } : {}) },
    }),
  }).catch(() => {
    /* never block the quiz on a network error */
  });
}

function submitLead(payload: Record<string, unknown>) {
  sendToHubSpot(payload);
  try {
    window.agentraLead?.(payload);
  } catch {
    /* the hook is optional */
  }
}

const ease = [0.22, 1, 0.36, 1] as const;
const fresh = (): Answers => SECTIONS.map((s) => s.q.map(() => null));

export function DisruptionCheck() {
  const [stage, setStage] = useState<"start" | "quiz" | "result">("start");
  const [lead, setLead] = useState<Lead | null>(null);
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const [a, setA] = useState<Answers>(fresh);
  const top = useRef<HTMLDivElement>(null);
  const still = useReducedMotion() ?? false;

  // keep the panel's top in view when a step changes
  const toTop = () => {
    const el = top.current;
    if (el && el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "start" });
    }
  };

  const go = (next: number) => {
    setDir(next > cur ? 1 : -1);
    setCur(next);
    toTop();
  };

  const start = (l: Lead) => {
    setLead(l);
    submitLead({ stage: "started", ...l });
    setCur(0);
    setStage("quiz");
    toTop();
  };

  const finish = () => {
    setStage("result");
    toTop();
  };

  const retake = () => {
    setA(fresh());
    setCur(0);
    setDir(-1);
    setStage("quiz");
    toTop();
  };

  return (
    <section id="disruption-check" aria-labelledby="dc-title" className="scroll-mt-28">
      <div ref={top} className="dc relative overflow-hidden rounded-[28px] bg-bg-1 ring-1 ring-white/10 shadow-[0_40px_120px_-50px_rgba(128,85,226,0.7)]">
        {/* ambient: three inbound lanes converging, with shipments moving */}
        <Lanes still={still} />

        <div className="relative px-5 pb-6 pt-8 sm:px-10 sm:pb-10 sm:pt-12">
          <header className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-5">
              A 3-minute check for logistics leaders
            </p>
            <h2 id="dc-title" className="mt-4 text-balance text-3xl font-light leading-[1.12] tracking-[-0.02em] text-fg sm:text-[2.5rem]">
              Can your team act on a shipping delay{" "}
              <span className="animate-gradient-text bg-[linear-gradient(90deg,#d6c7fb,#9a71ef,#d6c7fb)] bg-[length:200%_auto] bg-clip-text text-transparent">
                before it hits your plan?
              </span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-fg-muted">
              Ten quick questions on how your team handles inbound freight disruption. See your score the moment you
              finish, and where your biggest gap is.
            </p>
          </header>

          <div className="mt-8 sm:mt-10">
            <AnimatePresence mode="wait" initial={false}>
              {stage === "start" && (
                <Step key="start" still={still}>
                  <StartForm onStart={start} />
                </Step>
              )}
              {stage === "quiz" && (
                <Step key="quiz" still={still}>
                  <Quiz
                    cur={cur}
                    dir={dir}
                    a={a}
                    first={lead?.name}
                    still={still}
                    onAnswer={(i, v) =>
                      setA((prev) => prev.map((r, s) => (s === cur ? r.map((x, j) => (j === i ? v : x)) : r)))
                    }
                    onBack={() => go(cur - 1)}
                    onNext={() => (cur < SECTIONS.length - 1 ? go(cur + 1) : finish())}
                  />
                </Step>
              )}
              {stage === "result" && (
                <Step key="result" still={still}>
                  <Result a={a} lead={lead} still={still} onRetake={retake} />
                </Step>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ children, still }: { children: React.ReactNode; still: boolean }) {
  return (
    <motion.div
      initial={still ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={still ? undefined : { opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- ambient lanes ---------------- */
function Lanes({ still }: { still: boolean }) {
  const lanes = [
    "M -20 40 C 220 40, 380 150, 560 150",
    "M -20 150 L 560 150",
    "M -20 260 C 220 260, 380 150, 560 150",
  ];
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 300"
      preserveAspectRatio="xMaxYMid slice"
      className="pointer-events-none absolute right-0 top-0 h-[300px] w-full max-w-[720px] opacity-50 [mask-image:linear-gradient(to_left,#000_20%,transparent_85%),linear-gradient(to_bottom,#000_40%,transparent)] [mask-composite:intersect] sm:opacity-70"
    >
      {lanes.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke="rgba(154,113,239,0.35)" strokeWidth="1" strokeDasharray="3 5" />
          {!still && (
            <circle r="3" fill="#d6c7fb">
              <animateMotion dur={`${7 + i * 1.6}s`} begin={`${i * 1.1}s`} repeatCount="indefinite" path={d} />
            </circle>
          )}
        </g>
      ))}
      <rect x="550" y="140" width="20" height="20" rx="5" fill="#8055e2" stroke="#d6c7fb" strokeWidth="1.2" />
    </svg>
  );
}

/* ---------------- step 1: who you are ---------------- */
function StartForm({ onStart }: { onStart: (l: Lead) => void }) {
  const [f, setF] = useState<Lead>({ name: "", email: "", company: "", role: "" });
  const [consent, setConsent] = useState(false);
  const [bad, setBad] = useState<Partial<Record<keyof Lead, boolean>>>({});
  const [msg, setMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [checking, setChecking] = useState(false);

  /* The work email must look real: format and junk rules here, then the
     server confirms the domain can receive mail (api/check-email). If the
     server can't be reached, the visitor carries on rather than being
     stopped by our own outage. */
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (checking) return;
    const t = { name: f.name.trim(), email: f.email.trim().toLowerCase(), company: f.company.trim(), role: f.role };
    const emailProblem = t.email ? checkEmailFormat(t.email) : "Please enter your work email.";
    const errs = { name: !t.name, email: !!emailProblem, company: !t.company, role: !t.role };
    setBad(errs);
    setEmailMsg(emailProblem ?? "");
    if (Object.values(errs).some(Boolean)) return setMsg("Please fill in the highlighted fields.");
    if (!consent) return setMsg("Please tick the box to continue.");
    setMsg("");

    setChecking(true);
    try {
      const res = await fetch("/api/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: t.email }),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string };
      if (data.ok === false) {
        setBad({ email: true });
        setEmailMsg(data.message ?? "Please check your work email.");
        setMsg("Please fill in the highlighted fields.");
        return;
      }
    } catch {
      /* check unavailable: let the visitor continue */
    } finally {
      setChecking(false);
    }
    onStart(t);
  };

  const field = (k: keyof Lead) =>
    `w-full rounded-xl bg-bg px-4 py-3 text-base text-fg ring-1 transition-all placeholder:text-fg-dim focus:outline-none focus:ring-2 ${
      bad[k] ? "ring-rose-400/70 focus:ring-rose-400" : "ring-white/15 hover:ring-white/25 focus:ring-purple-4"
    }`;

  return (
    <form onSubmit={submit} noValidate className="rounded-[22px] bg-white/[0.03] p-5 ring-1 ring-white/10 sm:p-8" id="disruption-check-form">
      <h3 className="text-xl font-medium text-fg">Tell us who you are</h3>
      <p className="mt-1.5 text-base text-fg-muted">Your score appears on screen the moment you finish.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid content-start gap-2">
          <span className="text-sm font-medium text-fg">First name</span>
          <input name="firstname" autoComplete="given-name" placeholder="Your first name" className={field("name")} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} aria-invalid={bad.name || undefined} />
        </label>
        <label className="grid content-start gap-2">
          <span className="text-sm font-medium text-fg">Work email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            className={field("email")}
            value={f.email}
            onChange={(e) => {
              setF({ ...f, email: e.target.value });
              if (emailMsg) setEmailMsg("");
            }}
            aria-invalid={bad.email || undefined}
            aria-describedby={emailMsg ? "dc-email-error" : undefined}
          />
          {emailMsg && (
            <span id="dc-email-error" className="text-sm text-rose-300">
              {emailMsg}
            </span>
          )}
        </label>
        <label className="grid content-start gap-2">
          <span className="text-sm font-medium text-fg">Company</span>
          <input name="company" autoComplete="organization" placeholder="Company name" className={field("company")} value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} aria-invalid={bad.company || undefined} />
        </label>
        <label className="grid content-start gap-2">
          <span className="text-sm font-medium text-fg">Your role</span>
          <select name="jobtitle" className={`${field("role")} appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%22%20height=%2212%22%20fill=%22none%22%20stroke=%22%23b89bf5%22%20stroke-width=%222%22%3E%3Cpath%20d=%22m2%204%204%204%204-4%22/%3E%3C/svg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10 ${f.role ? "" : "text-fg-dim"}`} value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} aria-invalid={bad.role || undefined}>
            <option value="">Choose one</option>
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-base text-fg-muted">
        <input type="checkbox" name="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#9a71ef]" />
        <span>Agentra may contact me about my result. I can opt out at any time.</span>
      </label>

      <p role="alert" className="mt-3 min-h-[1.5rem] text-sm text-rose-300">
        {msg}
      </p>

      <div className="mt-2 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fg-dim">Tip: answer with the people who handle delays every day.</p>
        <button
          type="submit"
          disabled={checking}
          className="btn-primary group inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all enabled:hover:-translate-y-0.5 enabled:active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
        >
          {checking ? "Checking your email" : "Start the check"}
          {checking ? (
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          )}
        </button>
      </div>
    </form>
  );
}

/* ---------------- step 2: ten questions in five sections ---------------- */
function Quiz({
  cur,
  dir,
  a,
  first,
  still,
  onAnswer,
  onBack,
  onNext,
}: {
  cur: number;
  dir: number;
  a: Answers;
  first?: string;
  still: boolean;
  onAnswer: (i: number, v: boolean) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const s = SECTIONS[cur];
  const done = a[cur].every((v) => v !== null);
  const answered = a.flat().filter((v) => v !== null).length;
  const last = cur === SECTIONS.length - 1;

  return (
    <div className="rounded-[22px] bg-white/[0.03] p-5 ring-1 ring-white/10 sm:p-8">
      {/* progress: one segment per section, filling as questions are answered */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-purple-5">
          Section {cur + 1} of {SECTIONS.length}
          {first ? ` · ${first}` : ""}
        </p>
        <p className="font-mono text-sm tabular-nums text-fg-dim">
          {answered}/{TOTAL}
        </p>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1.5" aria-hidden>
        {a.map((r, i) => {
          const fill = r.filter((v) => v !== null).length / r.length;
          return (
            <span key={i} className="relative h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.span
                className="absolute inset-0 origin-left rounded-full bg-grad"
                initial={false}
                animate={{ scaleX: fill }}
                transition={{ duration: still ? 0 : 0.5, ease }}
              />
            </span>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false} custom={dir}>
        <motion.div
          key={cur}
          custom={dir}
          initial={still ? false : { opacity: 0, x: 40 * dir }}
          animate={{ opacity: 1, x: 0 }}
          exit={still ? undefined : { opacity: 0, x: -40 * dir }}
          transition={{ duration: 0.4, ease }}
        >
          <h3 className="mt-7 text-2xl font-light leading-snug tracking-tight text-fg sm:text-[1.75rem]">{s.t}</h3>
          <p className="mt-2 text-base text-fg-muted">{s.w}</p>

          <ul className="mt-6 grid gap-3">
            {s.q.map((q, i) => {
              const v = a[cur][i];
              return (
                <li key={q} className={`flex flex-col gap-4 rounded-2xl p-4 ring-1 transition-colors duration-300 sm:flex-row sm:items-center sm:justify-between sm:p-5 ${v === null ? "bg-bg/60 ring-white/10" : "bg-purple-3/[0.06] ring-purple-4/30"}`}>
                  <p className="text-base font-medium leading-snug text-fg">{q}</p>
                  <YesNo value={v} onChange={(x) => onAnswer(i, x)} label={q} still={still} />
                </li>
              );
            })}
          </ul>
        </motion.div>
      </AnimatePresence>

      <p className="mt-5 text-sm text-fg-dim">If the honest answer is “sometimes”, choose No.</p>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-fg-muted ring-1 ring-white/15 transition-all hover:text-fg hover:ring-white/30 active:scale-[0.98] ${cur === 0 ? "invisible" : ""}`}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!done}
          className="btn-primary group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all enabled:hover:-translate-y-0.5 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          {last ? "See my score" : "Next section"}
          <ArrowRight className="h-4 w-4 transition-transform group-enabled:group-hover:translate-x-1" aria-hidden />
        </button>
      </div>
    </div>
  );
}

function YesNo({ value, onChange, label, still }: { value: boolean | null; onChange: (v: boolean) => void; label: string; still: boolean }) {
  return (
    <div role="group" aria-label={`Answer: ${label}`} className="relative flex shrink-0 rounded-full bg-bg p-1 ring-1 ring-white/10">
      {([true, false] as const).map((opt) => {
        const on = value === opt;
        return (
          <button
            key={String(opt)}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(opt)}
            className={`relative z-10 w-[4.5rem] rounded-full py-2 text-sm font-semibold transition-colors duration-200 ${on ? (opt ? "text-white" : "text-bg") : "text-fg-muted hover:text-fg"}`}
          >
            {on && (
              <motion.span
                layoutId={`yn-${label}`}
                className={`absolute inset-0 -z-10 rounded-full ${opt ? "bg-grad shadow-[0_8px_24px_-8px_rgba(160,107,255,0.9)]" : "bg-fg"}`}
                transition={still ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {opt ? "Yes" : "No"}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- step 3: the result ---------------- */
function Result({ a, lead, still, onRetake }: { a: Answers; lead: Lead | null; still: boolean; onRetake: () => void }) {
  const per = a.map((r) => r.filter((v) => v === true).length);
  const score = per.reduce((x, y) => x + y, 0);
  const band = BANDS.find((b) => score <= b.max)!;
  const ratio = per.map((v, i) => v / SECTIONS[i].q.length);
  const low = ratio.indexOf(Math.min(...ratio));
  const first = lead?.name;

  // report the completed check once
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    submitLead({
      stage: "completed",
      ...lead,
      score,
      level: band.n,
      bySection: Object.fromEntries(SHORT.map((k, i) => [k, per[i]])),
    });
  }, [lead, score, band.n, per]);

  return (
    <div className="grid gap-5">
      {/* verdict */}
      <div className="relative grid items-center gap-8 overflow-hidden rounded-[22px] bg-[radial-gradient(120%_120%_at_0%_0%,rgba(128,85,226,0.35),transparent_60%),linear-gradient(180deg,#141018,#0d0b10)] p-6 ring-1 ring-purple-4/30 sm:p-8 md:grid-cols-[240px_1fr]">
        <Gauge score={score} still={still} />
        <div aria-live="polite">
          <p className="text-sm font-medium text-purple-5">
            {first ? `${first}, your` : "Your"} readiness level: {band.n}
          </p>
          <motion.p
            className="mt-2 pb-1 text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-transparent sm:text-5xl"
            style={{ backgroundImage: "linear-gradient(90deg,#efe8ff,#b89bf5,#9a71ef)", backgroundClip: "text", WebkitBackgroundClip: "text" }}
            initial={still ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.5 }}
          >
            {band.w}
          </motion.p>
          <motion.p
            className="mt-3 text-lg leading-relaxed text-fg"
            initial={still ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease }}
          >
            {band.l}
          </motion.p>
          <p className="mt-3 text-base leading-relaxed text-fg-muted">{band.m}</p>
          <div className="mt-5 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-purple-4/25">
            <p className="text-sm font-semibold text-purple-5">Your next step</p>
            <p className="mt-1 text-base text-fg">{band.x}</p>
          </div>
        </div>
      </div>

      {/* by area */}
      <div className="rounded-[22px] bg-white/[0.03] p-6 ring-1 ring-white/10 sm:p-8">
        <h3 className="text-xl font-medium text-fg">Where your gaps are</h3>
        <ul className="mt-5 grid gap-3 sm:grid-cols-5">
          {per.map((v, i) => {
            const start = i === low && ratio[i] < 1;
            return (
              <motion.li
                key={SHORT[i]}
                initial={still ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.08, ease }}
                className={`relative rounded-2xl p-4 ring-1 ${start ? "bg-purple-3/15 ring-purple-4/60" : "bg-bg/60 ring-white/10"}`}
              >
                <p className="text-sm font-medium text-fg">{SHORT[i]}</p>
                <div className="mt-3 flex items-center gap-1.5" aria-hidden>
                  {SECTIONS[i].q.map((_, j) => (
                    <span key={j} className={`h-2.5 flex-1 rounded-full ${j < v ? "bg-grad" : "bg-white/10"}`} />
                  ))}
                </div>
                <p className="mt-2 font-mono text-sm tabular-nums text-fg-muted">
                  {v}/{SECTIONS[i].q.length}
                </p>
                {start && (
                  <span className="mt-3 inline-block rounded-full bg-grad px-2.5 py-1 text-xs font-semibold text-white">Start here</span>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* where agents help */}
      <div className="grid gap-6 rounded-[22px] bg-white/[0.03] p-6 ring-1 ring-white/10 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <h3 className="text-xl font-medium text-fg">The gaps sit between the alert and the action</h3>
          <p className="mt-3 text-base leading-relaxed text-fg-muted">
            Agentra adds AI agents on top of the systems you already run. They read every forwarder update, spot the orders at risk, propose the fix, and carry it out once your team approves, with every step logged. Nothing is replaced: 1000+ connectors, and the first agent is typically live in 6–8 weeks.
          </p>
          <div className="mt-5 rounded-2xl border-l-2 border-purple-4 bg-purple-3/[0.08] p-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-purple-5">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
              Delivered
            </span>
            <p className="mt-2 text-base text-fg-muted">
              A global electronics manufacturer: “3,000+ POs a month booked from SAP to forwarder without re-keying, with alerts before a delay hits the promised date.”
            </p>
          </div>
        </div>
        <div className="grid gap-3">
          <Link href="/contact" className="btn-primary group inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.98]">
            Book 30 minutes on your lanes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
          <p className="text-center text-sm text-fg-dim">A disruption scenario on your own lanes and forwarder mix. No slides.</p>
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-fg-muted ring-1 ring-white/15 transition-all hover:text-fg hover:ring-white/30 active:scale-[0.98]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Retake the check
          </button>
        </div>
      </div>
    </div>
  );
}

function Gauge({ score, still }: { score: number; still: boolean }) {
  const ref = useRef<SVGTextElement>(null);
  const L = 276.5; // length of the arc below

  // count the number up alongside the arc
  useEffect(() => {
    const el = ref.current;
    if (!el || still) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 1100);
      el.textContent = String(Math.round(score * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score, still]);

  return (
    <div className="relative mx-auto w-full max-w-[240px]">
      {/* a one-off burst when the score lands */}
      {!still &&
        Array.from({ length: 14 }).map((_, i) => {
          const ang = (i / 14) * Math.PI * 2;
          return (
            <motion.span
              key={i}
              aria-hidden
              className="absolute left-1/2 top-[62%] h-1.5 w-1.5 rounded-full bg-purple-5"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
              animate={{ x: Math.cos(ang) * 120, y: Math.sin(ang) * 90, opacity: [0, 1, 0], scale: [0.4, 1, 0.6] }}
              transition={{ duration: 1.1, delay: 1.0, ease: "easeOut" }}
            />
          );
        })}
      <svg viewBox="0 0 220 132" role="img" aria-label={`Your score: ${score} out of ${TOTAL}`} className="relative w-full">
        <defs>
          <linearGradient id="dc-arc" x1="0" x2="1">
            <stop offset="0" stopColor="#9a71ef" />
            <stop offset="1" stopColor="#d6c7fb" />
          </linearGradient>
        </defs>
        <path d="M22 116 A 88 88 0 0 1 198 116" fill="none" stroke="rgba(205,174,255,.14)" strokeWidth="15" strokeLinecap="round" />
        <motion.path
          d="M22 116 A 88 88 0 0 1 198 116"
          fill="none"
          stroke="url(#dc-arc)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray={L}
          initial={{ strokeDashoffset: still ? L - (L * score) / TOTAL : L }}
          animate={{ strokeDashoffset: L - (L * score) / TOTAL }}
          transition={{ duration: still ? 0 : 1.1, ease: [0.4, 0, 0.2, 1] }}
          style={{ filter: "drop-shadow(0 0 8px rgba(160,107,255,0.6))" }}
        />
        <text ref={ref} x="110" y="102" textAnchor="middle" fill="#fff" fontSize="48" fontWeight="600" letterSpacing="-2">
          {score}
        </text>
        <text x="110" y="124" textAnchor="middle" fill="#b89bf5" fontSize="10" fontWeight="700" letterSpacing="2.2">
          OUT OF {TOTAL}
        </text>
      </svg>
    </div>
  );
}
