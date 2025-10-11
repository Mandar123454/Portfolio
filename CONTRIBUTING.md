# Contributing

Thanks for your interest in contributing! This repo powers Mandar Kajbaje’s personal portfolio.

Before you start, please note the license and content policy:
- Code is MIT‑licensed (see [LICENSE](./LICENSE)).
- Personal content and media (text, images, badges, screenshots) are Copyright © 2025 Mandar Kajbaje and not licensed for republication. Please replace with your own if you fork.
- Third‑party marks (EC‑Council/CEH, NSDC, SIDH, Microsoft, etc.) are trademarks of their owners (see [NOTICE](./NOTICE.md)).

## Development Setup
1. Prereqs: Node 18+ and npm
2. Install deps:
   ```powershell
   npm install
   ```
3. Run dev server:
   ```powershell
   npm run dev
   ```
4. Build locally:
   ```powershell
   npm run build
   ```

## Project Structure
- `app/` — Next.js App Router pages (Home, Projects, Certifications, Internships, Contact)
- `components/` — Reusable UI (Hero, ContactForm)
- `public/` — Static assets
- `lib/` — Utils

## Coding Guidelines
- TypeScript: prefer explicit types for public exports
- Styling: Tailwind CSS utilities; keep hover/animation subtle
- Accessibility: aria‑labels, focus states, and keyboard support
- Commit messages: concise, imperative (e.g., "feat(hero): add evidence bar")
- Lint: run `npm run lint` (if configured) before opening a PR

## Pull Requests
- Fork the repo and create a feature branch: `feat/<short-name>`
- Keep PRs focused and small; include screenshots for UI changes
- Ensure `npm run build` completes successfully
- Describe the change, rationale, and any follow‑ups

## Issues
- Use clear titles and steps to reproduce
- Include browser/OS and screenshots for visual issues

## Attribution
If you reuse code:
- Retain the MIT license and copyright
- Credit: "Portfolio template based on Mandar Kajbaje’s MK Portfolio (MIT)."

Thanks again for helping improve the project!
