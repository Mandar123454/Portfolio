# MK Portfolio

Professional, stylish, animated portfolio for Mandar Kajbaje — joining AI × Security × Web into one experience. Built with Next.js, TypeScript, Tailwind, and Framer Motion.

## ✨ Highlights
- Animated Hero with polished CTAs, “Class of 2026” badge, and micro‑motion
- High‑signal hero tags: B.Sc CS ’26 • 20+ Projects • CEH v13 • CTF Top 113/3,235 • NSDC‑DS • Full‑Stack • AI/ML
- Dedicated pages: Projects, Certifications (3-column categories), Internships, Contact
- Evidence bar with badges (CEH v13, NSDC, SIDH, Microsoft)
- Evidence links wired: NSDC, Microsoft (CEH & SIDH placeholders ready)
- Professional Contact pipeline (server-side):
	- Primary: SMTP via Nodemailer (Brevo recommended)
	- Backup: Google Sheet (Apps Script webhook)
	- Fallback: Formspree forward (kept for reliability)
	- 5/min IP rate limit with cooldown UI, anti-spam honeypot, offline retry, success toast
- Dark-first theme, electric-violet accent, pro icon set (Lucide)
 - Fast perceived performance:
   - One-time full-screen spinner overlay on first open only (removed after ~600ms minimum)
   - Route-level loading states for page navigations and back/forward actions

## 🧭 Pages & Routes
- `/` Home — Hero with links: Explore Projects → Certifications → Internships → Let’s Talk → LinkedIn → GitHub
- `/projects` — Placeholder grid for animated project cards & filters (coming next)
- `/certifications` — Three sections:
	1. Ethical Hacking & Cybersecurity
	2. Data Science
	3. Other Certifications
- `/internships` — Online internships with role, dates, stack tags, and highlights
- `/contact` — SMTP-backed contact form with validation, anti-spam, success screen + toast, and delivery fallbacks
 
Loading behavior:
- First visit: CSS-only preloader overlay with spinner and “MK” tagline; hidden permanently for the session after first load.
- Navigations/back/forward: Next.js app route `loading.tsx` files provide lightweight in-page loaders per route.

## 🛠 Tech Stack

## 🚀 Getting Started (dev)
```powershell
cd "e:\Internships and Projects\MK Portfolio"
npm install
npm run dev
```
Open http://localhost:3000

## 🔐 Environment & Contact Setup

Required envs (see `.env.example`):
- `SMTP_HOST` — SMTP host (Brevo: smtp-relay.brevo.com)
- `SMTP_PORT` — Port (Brevo: 587; SSL: 465)
- `SMTP_USER` — SMTP user/login
- `SMTP_PASS` — SMTP key/password
- `CONTACT_TO_EMAIL` — Destination mailbox (inbox)
- Optional: `CONTACT_FROM_EMAIL` — From header (defaults to SMTP_USER)
- Optional: `CONTACT_WEBHOOK_URL` — Google Apps Script Web App URL to log to a Sheet

Quick start (Brevo recommended):
```env
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_username
SMTP_PASS=your_brevo_smtp_key
CONTACT_TO_EMAIL=you@example.com
# CONTACT_FROM_EMAIL="Portfolio Contact <no-reply@yourdomain.com>"
# CONTACT_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
```

Delivery flow:
1) Try SMTP → send email
2) Also log to Google Sheet if `CONTACT_WEBHOOK_URL` is set (fire-and-forget)
3) If SMTP misconfigured or fails → try Sheet as backup (await)
4) If Sheet unavailable → fallback to Formspree

Rate limiting & UX:
- 5 requests/min per IP, Retry-After header, submit button cooldown timer
- Honeypot spam trap, client offline retry, success toast (“We reply within 24–48 hours”)

Deploy notes:
- Netlify: set env vars in Site settings → Environment variables; build command `npm run build`, publish `.next`, plugin `@netlify/plugin-nextjs`.
- Gmail alternative: use an App Password (2FA on) if using smtp.gmail.com:465.

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
- Microsoft × freeCodeCamp: https://www.freecodecamp.org/certification/mandar1234/foundational-c-sharp-with-microsoft
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


