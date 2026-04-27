# Link-in-Bio Portfolio

High-performance single-page portfolio built with Next.js 15, Tailwind CSS, and local JSON-driven content.

## Features

- Dark modern UI with reusable section/card primitives.
- Animated Tech Stack marquee sourced from `data/tech-stack.json`.
- Marquee pauses on hover and respects reduced-motion settings.
- Project cards mapped from `data/projects.json`.
- Runtime JSON schema validation via Zod.

## Project Structure

- `app/page.tsx`: composition root for all sections.
- `components/*`: section and card UI components.
- `data/*.json`: editable local content.
- `lib/schema.ts`: Zod schemas for data contracts.
- `lib/data.ts`: data parsing and sorting utilities.

## Local Setup

1. Install Node.js with npm available.
2. Install dependencies:
   - `npm install`
3. Start development server:
   - `npm run dev`
4. Quality checks:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run build`

## Testing Commands

Run these commands from the project root:

- `npm run test:unit`: runs unit tests for schema and data logic in `lib/`.
- `npm run test:component`: runs component tests in `components/`.
- `npm run test:e2e`: runs Playwright smoke tests in `e2e/`.
- `npm run test:lighthouse`: builds the app and runs Lighthouse assertions against local production output.
- `npm run test:local`: full local gate (`typecheck`, `lint`, `build`, unit, component, e2e, and Lighthouse).

Recommended workflow:

1. During development, run targeted tests (`test:unit` or `test:component`).
2. Before finalizing changes, run `npm run test:e2e`.
3. Before pushing, run `npm run test:local`.

## Vercel Deployment

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Framework preset should auto-detect as Next.js.
4. Deploy from the main branch.
5. Validate build output and monitor Web Vitals in Vercel analytics.

No environment variables are required for the current JSON-based portfolio setup.
