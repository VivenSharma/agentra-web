"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";

// Cookie consent, per the Cookie Policy: non-essential cookies (here the
// LinkedIn Insight Tag) run only after the visitor clicks Accept. The choice
// is kept in localStorage; "Cookie settings" in the footer reopens the banner.

type Choice = "accepted" | "rejected";

const STORAGE_KEY = "agentra-cookie-consent";
export const OPEN_COOKIE_SETTINGS = "agentra:open-cookie-settings";

const LINKEDIN_PARTNER_ID = "11264537";

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Choice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* storage blocked: the choice holds for this page view only */
  }
}

// The stored choice as an external store, so React reads localStorage
// without setState-in-effect. Other tabs update via the storage event.
const CHANGED = "agentra:cookie-consent-changed";
function subscribe(onChange: () => void) {
  window.addEventListener(CHANGED, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGED, onChange);
    window.removeEventListener("storage", onChange);
  };
}
// On the server, and during hydration, report "undecided but hidden" so the
// banner never flashes into the static HTML.
const SERVER = "server" as const;

export function CookieConsent() {
  const choice = useSyncExternalStore<Choice | null | typeof SERVER>(
    subscribe,
    readChoice,
    () => SERVER
  );
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  const open = choice !== SERVER && (choice === null || reopened);

  const decide = (next: Choice) => {
    const wasAccepted = choice === "accepted";
    saveChoice(next);
    setReopened(false);
    // A tag that already ran cannot be unloaded; reload so it is gone.
    if (wasAccepted && next === "rejected") {
      window.location.reload();
      return;
    }
    window.dispatchEvent(new Event(CHANGED));
  };

  return (
    <>
      {choice === "accepted" && (
          <Script id="linkedin-insight" strategy="afterInteractive">
            {`
_linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
`}
          </Script>
      )}

      {open && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="fade-up fixed inset-x-4 bottom-4 z-[60] sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md"
        >
          <div
            className="nav-capsule px-5 py-5 sm:px-6"
            // Near-solid so the hero glow behind it never hurts legibility.
            style={{ borderRadius: 24, background: "rgba(14, 14, 16, 0.96)" }}
          >
            <p className="text-sm leading-relaxed text-fg-muted">
              We use analytics cookies to understand how the site is used so we
              can improve it. These run only with your consent.{" "}
              <Link href="/cookies" className="text-fg underline underline-offset-4 hover:text-purple-6">
                Cookie Policy
              </Link>
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => decide("rejected")}
                className="btn-primary px-5 py-2.5 text-sm transition-all active:scale-[0.98]"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => decide("accepted")}
                className="btn-primary px-5 py-2.5 text-sm transition-all active:scale-[0.98]"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
