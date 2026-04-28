# Link-in-Bio Portfolio

High-performance single-page portfolio built with Next.js 15, TypeScript, Tailwind CSS, and local JSON-driven content.

## Features

- JSON-driven profile, social links, projects, and tech stack content.
- Runtime schema validation with Zod (`lib/schema.ts`) before rendering.
- Accessible UI composition with reusable section/card components.
- Animated two-track tech marquee with hover pause and reduced-motion support.
- Project sorting logic that prioritizes featured projects.

## Project Structure

- `app/page.tsx`: page composition root.
- `app/layout.tsx`: app metadata and root layout.
- `components/*`: presentational UI components.
- `data/*.json`: editable local content source.
- `lib/schema.ts`: Zod contracts for content.
- `lib/data.ts`: parsing and sorting utilities.
- `e2e/home.spec.ts`: Playwright smoke/e2e tests.

## Local Setup

1. Install dependencies:
   - `npm install`
2. Run the app:
   - `npm run dev`
3. Basic quality checks:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run build`

## Testing

### Unit and Component

- `npm run test:unit`: tests data and schema logic in `lib/`.
- `npm run test:component`: tests UI behavior in `components/`.

### End-to-End

- `npm run test:e2e`: runs Playwright tests in `e2e/` against a local app server.

### Lighthouse (Desktop + Mobile)

- `npm run test:lighthouse:desktop`: desktop Lighthouse assertions using `lighthouserc.desktop.json`.
- `npm run test:lighthouse:mobile`: mobile Lighthouse assertions using `lighthouserc.mobile.json`.
- `npm run test:lighthouse`: build + desktop + mobile Lighthouse runs.

### Full Local Gate

- `npm run test:local`: `typecheck`, `lint`, `build`, unit, component, e2e, and both Lighthouse modes.

Recommended flow:
1. Run targeted tests while developing (`test:unit` / `test:component`).
2. Run `npm run test:e2e` before finalizing UI/content changes.
3. Run `npm run test:local` before pushing.

## CI / CD

- GitHub Actions workflow: `.github/workflows/ci.yml`
  - Quality + Unit + Component
  - Playwright E2E
  - Lighthouse (Desktop + Mobile)
- Production deployment target: Vercel (from protected `main` branch).

## Deployment (Vercel)

1. Push repository to GitHub.
2. Import repository in Vercel.
3. Confirm framework preset is Next.js.
4. Deploy from `main`.

No environment variables are required for the current JSON-based setup.
