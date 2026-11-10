/* Work-email rules for lead forms (the Disruption Check). Used in the
   browser for instant feedback and again on the server, which also checks
   that the domain can receive mail (app/api/check-email). Returns a
   message for the visitor, or null when the address looks acceptable. */

// Personal mailbox providers: the form asks for a work email
const FREE = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.in", "yahoo.co.uk", "ymail.com", "rocketmail.com",
  "hotmail.com", "hotmail.co.uk", "outlook.com", "outlook.in", "live.com", "msn.com",
  "icloud.com", "me.com", "mac.com", "aol.com", "proton.me", "protonmail.com", "pm.me",
  "gmx.com", "gmx.de", "gmx.net", "web.de", "mail.com", "yandex.com", "yandex.ru", "zoho.com", "zohomail.in",
  "rediffmail.com", "qq.com", "163.com", "126.com", "tutanota.com", "tuta.io", "fastmail.com", "hey.com",
]);

// Throwaway inboxes
const DISPOSABLE = new Set([
  "mailinator.com", "10minutemail.com", "guerrillamail.com", "guerrillamail.net", "sharklasers.com",
  "temp-mail.org", "tempmail.com", "tempmailo.com", "temp-mail.io", "yopmail.com", "throwawaymail.com",
  "trashmail.com", "getnada.com", "maildrop.cc", "dispostable.com", "fakeinbox.com", "mintemail.com",
  "mohmal.com", "emailondeck.com", "spamgourmet.com", "mailnesia.com", "mytemp.email", "tempinbox.com",
  "burnermail.io", "inboxkitten.com", "moakt.com", "mailcatch.com", "discard.email", "tmpmail.org",
]);

// Placeholder and keyboard-mash domains and mailbox names
const FAKE_DOMAIN = /^(example|test|testing|sample|demo|fake|abc|xyz|asdf|qwerty|domain|email|mail|company|none|na|null)\.[a-z.]+$/;
const FAKE_LOCAL = /^(test|testing|tester|asdf+|qwerty|abc|abcd|xyz|aaa+|fake|dummy|sample|none|na|null|no|noreply|no-reply|example|foo|bar|foobar|user|name|email|admin)\d*$/;

export const WORK_EMAIL_MESSAGE = "Please use your work email.";

export function checkEmailFormat(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  // one @, a real-looking mailbox, a domain with a 2+ letter ending, no double dots
  const m = email.match(/^([a-z0-9._%+'-]+)@([a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,})$/);
  if (!m || email.includes("..") || m[1].startsWith(".") || m[1].endsWith(".")) {
    return "Please enter a valid email address.";
  }
  const [, local, domain] = m;
  if (domain.split(".").some((p) => p.startsWith("-") || p.endsWith("-"))) return "Please enter a valid email address.";
  if (DISPOSABLE.has(domain)) return "Please use your work email, not a temporary inbox.";
  if (FREE.has(domain)) return WORK_EMAIL_MESSAGE;
  if (FAKE_DOMAIN.test(domain) || FAKE_LOCAL.test(local)) return "Please enter your real work email.";
  return null;
}
