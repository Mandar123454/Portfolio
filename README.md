# MK Portfolio

Professional, stylish, animated portfolio for Mandar Kajbaje — joining AI × Security × Web into one experience. Built with Next.js, TypeScript, Tailwind, and Framer Motion.

## ✨ Highlights
- Animated Hero with polished CTAs and “Class of 2026” badge
- Dedicated pages: Projects, Certifications (3-column categories), Internships, Contact
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
	3. Other Certifications & Internships
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
- Home sections: Proof bar, About, Skills
- Projects page: animated cards, category filters (AI, Security, Web, Games)
- SEO/OG polish, sitemap/robots
- Theme toggle, scrollspy nav

## 📄 License
MIT

