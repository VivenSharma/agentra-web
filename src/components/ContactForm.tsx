"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44">
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div
        className="glow left-1/2 top-0 h-[360px] w-[560px] -translate-x-1/2 opacity-20"
        style={{ background: "radial-gradient(circle,#5a4794,transparent 70%)" }}
      />
      <div className="container-x relative z-10 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* Left: pitch */}
        <div className="flex flex-col lg:pt-6">
          <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl">
            See Agentra in your supply chain.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-fg-muted">
            Book a 30-minute demo.
          </p>

          {/* crescent fills the space, blended into the page on all sides */}
          <div className="relative mt-10 hidden h-80 flex-1 lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-crescent.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                objectPosition: "center 46%",
                mixBlendMode: "screen",
                maskImage:
                  "radial-gradient(ellipse 82% 78% at 50% 48%, #000 38%, transparent 88%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 82% 78% at 50% 48%, #000 38%, transparent 88%)",
              }}
            />
          </div>
        </div>

        {/* Right: form */}
        <div className="glass p-7 sm:p-9">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex min-h-[420px] flex-col items-center justify-center text-center"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-grad">
                <Check className="h-8 w-8 text-white" />
              </span>
              <h2 className="mt-6 text-2xl font-semibold">Thank you.</h2>
              <p className="mt-2 max-w-sm text-fg-muted">
                Our team will be in touch within one business day to schedule
                your session.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="First name" name="firstName" />
                <Field label="Last name" name="lastName" />
              </div>
              <Field label="Work email" name="email" type="email" />
              <Field label="Company" name="company" />
              <Field label="Role" name="role" placeholder="e.g. VP Supply Chain" />
              <div>
                <label className="mb-2 block text-sm font-medium text-fg-muted">
                  What would you like agents to act on first?
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg-dim focus:border-purple-4/60"
                  placeholder="Planning, freight audit, exception response..."
                />
              </div>
              <button
                type="submit"
                className="btn-primary group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Request my demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-center text-xs text-fg-dim">
                By submitting, you agree to be contacted about Agentra. We
                respect your data.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-fg-muted"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg-dim focus:border-purple-4/60"
      />
    </div>
  );
}
