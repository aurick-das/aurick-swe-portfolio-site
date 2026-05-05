# Link-in-Bio Portfolio

This repository contains a fast, accessible portfolio built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Profile, projects, social links, and tech stack remain **JSON-driven** and validated at runtime with **Zod** via `data/*.json`. A markdown **work log** adds long-form posts under `posts/*.md`, listed at **`/blog`** and surfaced on the homepage as **Latest Posts**. Releases flow through **GitHub Actions** and **Vercel**.

---

## Stack

| Layer | Choice |
|--------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Site content | Local JSON + Zod (`lib/schema.ts`, `lib/data.ts`) |
| Blog content | Markdown in `posts/`; **gray-matter** for front matter; **remark** + **remark-html** for HTML; Zod front matter schema in `lib/schema.ts`; `lib/posts.ts` (server-only) loads and renders at build/request as appropriate |
| Unit / component tests | Vitest + Testing Library |
| E2E | Playwright (`e2e/home.spec.ts`, `e2e/blog.spec.ts`) |
| Quality gates | ESLint, `tsc`, Lighthouse CI (desktop + mobile) |
| CI | GitHub Actions (`ubuntu-latest`, Node 24) |
| Hosting | Vercel (`main`) |

---

## Features

The app exposes a JSON-driven profile, social links, projects, and tech stack. Schemas are validated before render; featured projects are sorted ahead of non-featured items. Sections (hero, projects, socials, tech marquee) are composed from reusable components with accessibility considered. The tech stack uses a two-track marquee with hover pause and reduced-motion support.

A **Blog** route (`/blog`) and **post pages** (`/blog/[slug]`) publish markdown from `posts/*.md`, sorted by date with optional tags and draft filtering. A compact **Site** nav (Home / Blog) sits in the root layout; the homepage includes a **Latest Posts** strip (up to three entries) ahead of projects. Article bodies pick up typographic styling through a scoped `.prose` layer in `app/globals.css` so markdown-generated HTML reads cleanly on the dark theme.

---

## Project structure

| Path | Role |
|------|------|
| `app/` | Routes, layout, metadata (`page.tsx`, `layout.tsx`); **`app/blog/`** holds the blog index, `[slug]` post page, and blog `not-found` |
| `components/` | UI sections and cards (including `BlogPostCard`, `LatestPosts`, `SiteNav`) |
| `data/*.json` | Editable site content |
| `posts/*.md` | Markdown posts (front matter + body); filenames define URL slugs |
| `lib/` | Zod schemas, loaders (`lib/data.ts`, **`lib/posts.ts`**), types |
| `public/` | Static assets |
| `e2e/` | Playwright specs (`home.spec.ts`, **`blog.spec.ts`**) |
| `scripts/run-lighthouse.mjs` | Lighthouse CI entry point; in CI it skips `next build` when `CI` is set and `.next/BUILD_ID` exists (restored cache from the Build job) |

---

## Blog (markdown work log)

Posts are plain Markdown files with YAML front matter. Required fields are **`title`**, **`date`**, and **`summary`**; **`tags`** (string array) and **`draft`** (boolean) are optional. Front matter is validated with Zod (`postFrontmatterSchema` in `lib/schema.ts`). The public slug is the filename without `.md`. Dates may appear as quoted strings or YAML dates; the loader normalizes them for sorting and display.

**`lib/posts.ts`** reads the `posts/` directory (the unit tests aim the loader at temp fixture dirs via `POSTS_DIR`), parses with **gray-matter**, validates metadata, renders the body through **remark** / **remark-html**, and exposes helpers used by the App Router. The module is marked **server-only** so filesystem access never ships to the client bundle. Listings exclude **`draft: true`** posts in production.

The **`/blog`** page lists all published posts; **`/blog/[slug]`** renders a single article with metadata, tags when present, and HTML body content inside a `.prose` wrapper. **`generateStaticParams`** prebuilds known slugs; **`dynamicParams`** is enabled so unknown paths still reach the segment and can call `notFound()`, which surfaces **`app/blog/not-found.tsx`** (“Post not found” with a link back to `/blog`) instead of only the root 404 shell.

Rendered HTML is styled via **`globals.css`** `.prose` rules (headings, paragraphs, lists, links, `code` / `pre`, blockquotes). Tailwind’s `content` globs intentionally omit `posts/`—utilities are not scanned from `.md`; typography comes from that prose layer and shared layout components.

Sample entries ship in-repo (`hello-world`, `building-a-blog-with-next-15`) so lists, ordering, and CI audits always have stable targets.

---

## Local development

Dependencies are installed with `npm ci` or `npm install`. An optional `.env.local` may define `NEXT_PUBLIC_SITE_URL` for local metadata. The dev server is started with `npm run dev`. Typecheck, lint, and production build are available via `npm run typecheck`, `npm run lint`, and `npm run build`.

---

## Environment variables

`lib/env.ts` and layout metadata read the public site URL from the environment.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Optional; sets `metadataBase` in `app/layout.tsx` |

For GitHub Actions, the same value may be stored as the repository secret `NEXT_PUBLIC_SITE_URL` so CI builds align with production URL assumptions where applicable.

---

## Test commands

| Command | Scope |
|---------|--------|
| `npm run test:unit` | Vitest: `lib/**/*.test.ts` |
| `npm run test:component` | Vitest: `components/**/*.test.tsx` |
| `npm run test:e2e` | Playwright against the local app (`playwright.config.ts`; Chromium / desktop by default) |
| `npm run test:lighthouse` | Production build when needed, then Lighthouse CI (desktop + mobile) via `scripts/run-lighthouse.mjs` |
| `npm run test:local` | Typecheck, lint, build, unit, component, e2e, and Lighthouse in sequence |

### Playwright end-to-end

**`e2e/home.spec.ts`** exercises the landing page: core section headings, primary CTA and social cards, project titles, a conservative external-link probe, and a **mobile viewport** pass (**390×844**) that repeats those checks.

**`e2e/blog.spec.ts`** covers the markdown blog end-to-end: the **`/blog`** index and first **Read post** navigation to a detail page (title, `.prose`, body paragraph); **unknown slugs** resolving to the blog **`not-found`** UI; **site navigation** between home, `/blog`, and a post (including a combined Home ↔ Blog index round-trip); and a second **mobile** block that replays the shared helpers (`assertBlogIndex`, opening the first post, unknown slug, nav round-trip, nav from a post page) so blog flows stay usable on a narrow screen alongside the home spec’s mobile smoke pattern.

---

## CI/CD

The workflow is defined in **[`.github/workflows/ci.yml`](.github/workflows/ci.yml)**.

### Triggers

| Event | Behavior |
|-------|----------|
| **Pull request** to `main` | Full detection + jobs per path rules |
| **Push** to `main` | Same pipeline on the merge commit so status checks exist on the default branch (used by **Vercel deployment checks** to resolve GitHub job names) |
| **`workflow_dispatch`** | Manual run from the Actions tab; runs the **full** pipeline (expensive jobs are not skipped by path filters) |

Concurrency is limited to one active run per ref (`ci-${{ github.ref }}`); newer runs supersede older ones on the same branch.

### Pipeline overview

```mermaid
flowchart TD
  A[Detect Changed Paths] --> B[Quality + Unit + Component]
  B --> C{Build needed?}
  C -->|filters / manual run| D[Build Next.js + save .next cache]
  C -->|no matching paths| Z[Skip build]
  D --> E{E2E filter}
  D --> F{Lighthouse filter}
  E -->|yes| G[E2E Playwright]
  E -->|no| skipE[Skip E2E]
  F -->|yes| H[Lighthouse desktop + mobile]
  F -->|no| skipL[Skip Lighthouse]
```

1. **Detect Changed Paths** — Diff paths are classified into four buckets (see below).
2. **Quality + Unit + Component** — Always runs after detection: install, `typecheck`, `lint`, `test:unit`, `test:component`. In CI, Vitest uses verbose and GitHub Actions reporters.
3. **Build (Next.js)** — Runs when any filter matches or when the workflow is dispatched manually. It depends on **Quality + Unit + Component**, so lint/type/unit failures prevent `next build`. The `.next` output is saved to `actions/cache` under `build-${{ github.sha }}`.
4. **E2E** and **Lighthouse** — Start only after a successful build (each gated by its own filter). They restore `.next` from cache; the Lighthouse script avoids a second full build when CI sees a restored `.next/BUILD_ID`.

### Path filters

Filters control **Build**, **E2E**, and **Lighthouse**; they do not skip the quality job.

| Filter | Paths (summary) | Drives |
|--------|-----------------|--------|
| **frontend** | `app/**`, `components/**`, `data/**`, `posts/**`, `lib/**`, `public/**`, `next.config.*`, `tailwind.config.*`, `postcss.config.*`, optional root `middleware.ts` / `instrumentation.ts` | Build; E2E; Lighthouse |
| **deps** | `package.json`, `package-lock.json` | Build; E2E; Lighthouse |
| **tests** | `e2e/**`, `**/*.test.*`, `**/*.spec.*`, `vitest.config.*`, `vitest.setup.ts`, `playwright.config.*` | Build; E2E |
| **lighthouse_ci** | `lighthouserc*.json`, `scripts/run-lighthouse.mjs` | Build; Lighthouse |

| Job | Condition |
|-----|-----------|
| **Build** | Any filter true, or manual dispatch |
| **E2E** | `frontend` or `tests` or `deps`, or manual dispatch |
| **Lighthouse** | `frontend` or `deps` or `lighthouse_ci`, or manual dispatch |

Changes that only touch documentation (e.g. this README) usually match no build filters, so **Build / E2E / Lighthouse** are skipped and the run finishes faster. Edits under generic `scripts/**` do not enable Lighthouse unless they include `run-lighthouse.mjs` or match another filter.

### CI artifacts

| Job | Upload | `if` in workflow |
|-----|--------|------------------|
| E2E | `playwright-report`, `playwright-test-results` | `failure()` |
| Lighthouse | `lighthouseci` (`.lighthouseci/*`) | `always()`; `include-hidden-files: true` so paths under `.lighthouseci` are included |

**E2E (Playwright):** On a passing run, the HTML report and `test-results` are usually unnecessary for triage, and the outputs can be large. The workflow therefore uploads them **only when the E2E job fails**, so failures retain traces and reports for debugging while successful runs avoid extra storage and noise.

**Lighthouse:** Each run materializes HTML/JSON reports and related output under `.lighthouseci/`, which is the record of scores, categories, and audits. That output is useful **even when assertions pass** (trend review, threshold tuning, audit detail). The job also ends non-zero when assertions fail, so **`always()`** ensures those reports are still attached when the job fails at the assert step, as long as LHCI wrote files to disk. Desktop and mobile configs collect the **homepage**, the **blog index** (`/blog`), and a **stable sample post** (`/blog/hello-world`) so list and article templates both meet the same category thresholds (performance, accessibility, best practices, SEO).

### Vercel and deployment checks

Production traffic is served from **`main`** through the Vercel Git integration. Deployment checks in Vercel are configured to wait on selected **GitHub** status checks for the commit.

The following **job names** (exact strings) are registered as deployment checks:

- **Quality + Unit + Component**
- **E2E (Playwright)**
- **Lighthouse**

Because E2E and Lighthouse can be **skipped** on path-only PRs, branch protection rules that require every check to “pass” may interact badly with **skipped** statuses; many teams require only jobs that always run (for example **Quality + Unit + Component**), or adjust GitHub rules to allow skipped optional checks.

---

## Deployment (Vercel)

The repository is connected to Vercel with the **Next.js** preset and **main** as the production branch. `NEXT_PUBLIC_SITE_URL` may be set in the Vercel project when the deployed site URL should feed metadata. The variable remains optional for local work; setting it in both Vercel and GitHub keeps preview, CI, and production consistent when URL-dependent behavior matters.
