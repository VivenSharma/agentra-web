import { resolveMx, resolve4, resolve6 } from "node:dns/promises";
import { checkEmailFormat } from "@/lib/email-check";

/* POST { email } -> { ok: true } | { ok: false, message }
   Server-side check for the Disruption Check's work email: the same rules
   as the browser, plus a DNS lookup that the domain can receive mail (MX
   records, or an address record as mail falls back to it). A made-up
   company domain fails here. If DNS itself errors or times out, the
   address is allowed, so a lookup problem never blocks a real lead. */

export const runtime = "nodejs";

const NO_DOMAIN = new Set(["ENOTFOUND", "ENODATA", "EBADNAME", "ENONAME"]);

async function domainReceivesMail(domain: string): Promise<boolean | "unknown"> {
  const timeout = new Promise<"unknown">((r) => setTimeout(() => r("unknown"), 4000));
  const lookup = (async () => {
    try {
      const mx = await resolveMx(domain);
      // a "null MX" (single record pointing at ".") means the domain accepts no mail
      if (mx.length > 0 && !(mx.length === 1 && (mx[0].exchange === "" || mx[0].exchange === "."))) return true;
      if (mx.length > 0) return false;
    } catch (e) {
      const code = (e as { code?: string }).code ?? "";
      if (!NO_DOMAIN.has(code)) return "unknown" as const;
    }
    try {
      if ((await resolve4(domain)).length) return true;
    } catch {}
    try {
      if ((await resolve6(domain)).length) return true;
    } catch {}
    return false;
  })();
  return Promise.race([lookup, timeout]);
}

export async function POST(request: Request) {
  let email = "";
  try {
    email = String((await request.json())?.email ?? "").trim().toLowerCase();
  } catch {
    return Response.json({ ok: false, message: "Please enter a valid email address." }, { status: 400 });
  }
  if (email.length > 254) return Response.json({ ok: false, message: "Please enter a valid email address." });

  const format = checkEmailFormat(email);
  if (format) return Response.json({ ok: false, message: format });

  const domain = email.split("@")[1];
  const mail = await domainReceivesMail(domain);
  if (mail === false) {
    return Response.json({ ok: false, message: "We couldn't find that email domain. Please check your work email." });
  }
  return Response.json({ ok: true });
}
