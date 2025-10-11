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
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

## 🚀 Getting Started (dev)
```powershell
cd "e:\Internships and Projects\MK Portfolio"
npm install
npm run dev
```
Open http://localhost:3000

## 🔐 Environment Variables
Create a `.env.local` at project root:
```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xzzjjvjl
```
Restart the dev server after editing envs.

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
## ♻️ Reuse Policy (TL;DR)
- You can use and adapt the code under MIT.
- Do not publish this portfolio with my name/content. Replace all personal text, images, badges, and proofs with your own.
- Keep third‑party marks respectful and within their brand guidelines.

- NSDC: https://trainings.internshala.com/certificate/view/nsdc/6glr84cp6od/e52s9kdy5a2/
- Microsoft (freeCodeCamp): https://www.freecodecamp.org/certification/mandar1234/foundational-c-sharp-with-microsoft
- CEH v13: coming soon
- SIDH: coming soon

## 📄 License
- Code: MIT (see `LICENSE`). You may copy, modify, and reuse the code with attribution.
- Content, media, and branding (text, images, badges, screenshots, profile details): Copyright © 2025 Mandar Kajbaje. Not licensed for republication or redistribution. Do not publish as your own; you may adapt the code for your portfolio and replace my content with yours.
- Third‑party names, logos, and badges (e.g., EC‑Council/CEH, NSDC, SIDH, Microsoft) are trademarks of their respective owners and used here for identification. See `NOTICE.md`.


