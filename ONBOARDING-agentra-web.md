# agentra-web — getting started

This is the source of **www.agentra-ai.com**, the live Agentra website. Everything on it
is public-facing, so treat changes accordingly.

Snapshot taken from `main` at commit `bfb3292` (18 Sept 2026). It has no git history and
no remote — it will drift from the real repo as soon as anyone merges, so check with
Giacomo before starting anything large.

---

## 1. Run it locally

Requires Node 24 (repo is built and deployed on it) and npm 11.

```bash
npm ci          # NOT npm install — see below
npm run dev     # http://localhost:3000
```

Use `npm ci`, not `npm install`. It installs exactly the tree in `package-lock.json` and
never rewrites the lockfile. `npm install` can quietly change the lockfile, which changes
what gets built in production.

Four scripts exist, and that is all: `dev`, `build`, `start`, `lint`.

---

## 2. Read this before writing any code

The repo has an `AGENTS.md` (aliased as `CLAUDE.md`) with one instruction that matters:

> **This is NOT the Next.js you know.** This version has breaking changes — APIs,
> conventions, and file structure may all differ. Read the relevant guide in
> `node_modules/next/dist/docs/` before writing any code.

This is Next.js **16.2.10** with React **19.2.4**. A lot of what you'll find online, and
most of what an LLM will suggest, is written for Next 13–15 and is wrong here. The real
docs ship inside `node_modules` — use them.

---

## 3. How it's built

- **Next.js 16 App Router**, TypeScript `strict`, path alias `@/*` → `./src/*`
- **Tailwind CSS v4** via PostCSS — there is **no `tailwind.config.js`**. Design tokens are
  CSS custom properties in `src/app/globals.css`, exposed to Tailwind as `--color-*`
  (`bg`, `fg`, `fg-muted`, `fg-dim`, `line`, `purple-1..6`, `indigo`, `cyan`).
  Custom utilities: `.container-x`, `.glass`, `.link-glow`, `.grid-bg`, `.glow`,
  `.text-grad`, `.nav-capsule`. Use these rather than inventing new colours.
- **No CMS.** All content is hardcoded TypeScript — either inline in the page component or
  in `src/lib/content.ts` / `src/lib/data.ts`.
- Routes live in `src/app/<route>/page.tsx`; shared components in `src/components/`.
  `src/app/layout.tsx` wraps everything with `Nav` and `Footer`.

### Things that are easy to get wrong

- **The sitemap is hand-maintained.** `src/app/sitemap.ts` has a `routes` array. A new page
  that isn't added there never appears in `sitemap.xml`. `freq` is a typed union —
  `"yearly"` is valid, `"annually"` is a compile error.
- **Legal pages share one component.** `/privacy`, `/terms`, `/cookies` and
  `/privacy/moove` are thin wrappers over `src/components/LegalLayout.tsx`, which takes
  `{eyebrow, title, updated, intro, sections, children}` where `sections` is
  `{heading, body: string[]}[]`. It renders the `01`, `02` numbering itself and hardcodes
  the `privacy@agentra-ai.com` contact card. Don't rebuild this — pass it data.
- **House style in copy:** British spellings (`anonymise`, `organisation`), curly
  typographic quotes (`"Agentra"`), sentence-case headings.
- **Case sensitivity.** macOS doesn't care, the Vercel build container does. A folder named
  `Moove` or an import of `@/components/legalLayout` works locally and 404s in production.

---

## 4. Verifying your work

**There are no tests.** No test runner, no `__tests__`, nothing. The entire safety net is:

```bash
npm run lint     # must produce no NEW errors
npm run build    # must exit 0
npm run start    # serve the production build and look at it
```

`npm run build` is the one that matters — it runs TypeScript (`strict`) and executes
`sitemap.ts` at build time, so it catches most real breakage.

**`npm run lint` currently reports 8 errors on a clean checkout.** They're in
`RSMNexusLanding.tsx`, `Reveal.tsx`, `ScrollRevealText.tsx` and `scripts/gen-worldmap.cjs`,
and they predate you. Don't try to "fix" them as part of an unrelated change — just make
sure your own files add nothing new.

`npm run dev` is fine while writing; `build` + `start` is what you check before saying
something is done, because dev mode tolerates things the production build rejects.

---

## 5. How it deploys — and why you can't yet

Vercel deploys `main` automatically via its GitHub integration. **Merging to `main` puts
code on the live company site within about two minutes.** There is no staging environment.

Two constraints to know up front:

1. **`main` has no branch protection.** Nothing technically prevents a direct push to
   production. Don't — always branch, open a PR, get it reviewed.
2. **Vercel accepts commits from exactly one git identity**, currently Giacomo's. The
   project sits on a single-seat Hobby account, so a commit authored by anyone else is
   rejected with *"Git author must have access to the project on Vercel"*. This has already
   bitten the team once: a colleague's fix sat on `main` looking merged for five days
   without ever going live.

So until access is formally sorted, send work to Giacomo as a patch or a PR and let him
deploy it. **Never set your git `user.email` to someone else's to get around the Vercel
check** — it forges commit authorship on a company repo.

### If something breaks in production

In order:

1. **Vercel → Deployments → filter Production → last known-good → `…` → Instant Rollback.**
   Seconds, no rebuild, can't fail on a build error.
2. **Then** `git revert` the bad commit via a PR, so `main` matches what's live. Rollback
   alone leaves the bad commit sitting on `main`, ready to redeploy on the next merge.

A *failed* build does not take the site down — Vercel keeps serving the last good
deployment. The dangerous case is a build that succeeds and renders something wrong.

---

## 6. The RSM Nexus pages — rules that aren't in the code

There's an event microsite with branding rules agreed with the school. These are easy to
break and someone will notice:

- **No RSM logo anywhere.**
- **Always write "Rotterdam School of Management, Erasmus University" in full.** Never the
  abbreviation. The codebase currently has zero bare uses — keep it that way.
- Keep the line stating this is an initiative of alumni working at Agentra, with the
  support of the school's alumni team.

`/rsm-nexus` **308-redirects to `/rsm-nexus-v2`** (configured in `next.config.ts`). The old
page described a roundtable format that was dropped; its component
(`src/components/rsm/RSMNexusLanding.tsx`) still exists but is unreachable. All real work
happens in `src/components/rsm-v2/RSMNexusV2.tsx`, where the agenda is a plain `AGENDA`
array near the top.

---

## 7. Known outstanding items

- **`public/rsm-nexus/rsm-nexus-agenda.pdf` is stale.** It predates several agenda
  revisions — wrong panelists, wrong running order. There's no source file in the repo, so
  whoever produces it has to regenerate it.
- The event is 25 September; check whether anything on the RSM pages is now historical.

---

## 8. Ask before you do these

- Anything touching `/privacy`, `/terms`, `/cookies` or `/privacy/moove` — legal copy
- Changing `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `robots.ts` or `layout.tsx`
- Adding or upgrading dependencies
- Anything that changes an existing live URL
