# MK Portfolio

Professional, stylish, animated portfolio for Mandar Kajbaje — joining AI × Security × Web into one experience. Built with Next.js, TypeScript, Tailwind, and Framer Motion.

## ✨ Highlights
- Animated Hero with polished CTAs, “Class of 2026” badge, and micro‑motion
- High‑signal hero tags: B.Sc CS ’26 • 20+ Projects • CEH v13 • CTF Top 113/3,235 • NSDC‑DS • Full‑Stack • AI/ML
- Dedicated pages: Projects, Certifications (3-column categories), Internships, Contact
- Evidence bar with badges (CEH v13, NSDC, SIDH, Microsoft)
- Evidence links wired: NSDC, Microsoft (CEH & SIDH placeholders ready)
- Contact form powered by Formspree with:
	- Field validation hints (email format, message length, optional phone pattern)
	- Anti-spam (honeypot + time heuristic), analytics event, offline fallback with retry
	- Success “thank-you” glow screen and 24–48 hour reply note
- Dark-first theme, electric-violet accent, pro icon set (Lucide)

## 🧭 Pages & Routes
- `/` Home — Hero with links: Explore Projects → Certifications → Internships → Let’s Talk → LinkedIn → GitHub
- `/projects` — Placeholder grid for animated project cards & filters (coming next)
- `/certifications` — Three sections:
	1. Ethical Hacking & Cybersecurity
	2. Data Science
	3. Other Certifications
- `/internships` — Online internships with role, dates, stack tags, and highlights
- `/contact` — Formspree-powered contact form with validation, anti-spam, and success screen

## 🛠 Tech Stack

## 🚀 Getting Started (dev)
```powershell
cd "e:\Internships and Projects\MK Portfolio"
npm install
npm run dev
```
Open http://localhost:3000

## 🔐 Environment Variables

Environment variables (see `.env.example`):

- `SMTP_HOST` — SMTP server host (e.g., smtp.gmail.com)
- `SMTP_PORT` — Port (465 for SSL, 587 for STARTTLS)
- `SMTP_USER` — SMTP username/login
- `SMTP_PASS` — SMTP password or app password
- `CONTACT_TO_EMAIL` — Destination mailbox (your inbox)
- `CONTACT_FROM_EMAIL` — From header (defaults to SMTP_USER)

Deployment notes:
- On Netlify, add these variables in Site Settings → Environment Variables.
- For Gmail, use an App Password (recommended) and keep 2FA enabled.

## 📦 Build
```powershell
npm run build
npm start
```

## ☁️ Deploy
Netlify (recommended):
- Build command: `npm run build`
- Publish directory: `.next`
- Plugin: `@netlify/plugin-nextjs` (configured in `netlify.toml`)

Vercel works out of the box as well.

## 🗺️ Roadmap
- Home sections: About, Skills
- Projects page: animated cards, category filters (AI, Security, Web, Games)
- SEO/OG polish, sitemap/robots
- Theme toggle, scrollspy nav

## 🔗 Evidence Links
- NSDC: https://trainings.internshala.com/certificate/view/nsdc/6glr84cp6od/e52s9kdy5a2/
- Microsoft (freeCodeCamp): https://www.freecodecamp.org/certification/mandar1234/foundational-c-sharp-with-microsoft
- CEH v13: coming soon
- SIDH: coming soon


## ♻️ Reuse Policy (TL;DR)
Use the code, not the identity.

Do:
- Fork and adapt the code under MIT
- Replace all personal content with your own (text, images, badges, proofs)
- Keep attribution somewhere (e.g., repo README) — example below

Don’t:
- Republish this portfolio with Mandar Kajbaje’s name, content, or branding
- Reuse screenshots, badges, or proofs that belong to Mandar
- Misuse third‑party marks (EC‑Council/CEH, NSDC, SIDH, Microsoft, etc.)

Attribution example:
> Portfolio template based on Mandar Kajbaje’s MK Portfolio (MIT).


## 📄 License
- Code: MIT (see [LICENSE](./LICENSE)). You may copy, modify, and reuse the code with attribution.
- Content, media, and branding (text, images, badges, screenshots, profile details): Copyright © 2025 Mandar Kajbaje. Not licensed for republication or redistribution. Do not publish as your own; you may adapt the code for your portfolio and replace my content with yours.
- Third‑party names, logos, and badges (e.g., EC‑Council/CEH, NSDC, SIDH, Microsoft) are trademarks of their respective owners and used here for identification. See [NOTICE.md](./NOTICE.md).


