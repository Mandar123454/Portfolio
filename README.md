# MK Portfolio

A professional, fast, and evidence‑driven portfolio for Mandar Kajbaje. It showcases work across AI, security, and web engineering. Built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

<div align="left">

<!-- Tech badges -->
<img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white" />
<img alt="React" src="https://img.shields.io/badge/React-18-20232A?logo=react&logoColor=61DAFB" />
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
<img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3-0EA5E9?logo=tailwindcss&logoColor=white" />
<img alt="Framer Motion" src="https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white" />
<img alt="Netlify" src="https://img.shields.io/badge/Netlify-Build-00C7B7?logo=netlify&logoColor=white" />
<img alt="Vercel" src="https://img.shields.io/badge/Vercel-Ready-000000?logo=vercel&logoColor=white" />

<!-- CI badges removed -->

</div>

## Features
- Focused home section with a clear snapshot and a concise “What I do” summary
- In‑site lightviewer for certificates and evidence (mobile friendly), with ESC/overlay close, focus management, and scroll lock
- Internships: dual‑document viewer (Certificate and LOR) with animated top‑right Close; per‑card actions “View Internship Certificate” and “View LOR Certificate”
- Centered navigation with compact link pills and a subtle active glow; minimal footer with social links
- Contact pipeline: SMTP via Nodemailer (Brevo recommended), optional Google Sheet webhook, and Formspree fallback; per‑IP rate limit (5/min), honeypot, offline retry, and success toast
- Privacy‑respecting analytics (GA4) gated by consent
- Search optimization: filesystem‑generated sitemap, robots.txt, per‑page canonical URLs, and a stable metadataBase
- Analytics with consent: a banner gates GA4 loading; IP is anonymized; fully environment‑driven
- User experience details: one‑time preloader, lightweight micro‑interactions, desktop custom cursor, smooth scrolling, styled scrollbars
- Accessibility: dialogs use appropriate roles; keyboard and ESC support; a skip‑to‑content link is provided

## Pages and routes
- `/` Home: snapshot and “What I do.” Evidence chips open the image lightviewer
- `/certifications`: category tabs (Cybersecurity, Data Science, Other) with animated cards; click to view the certificate
- `/projects`: projects index (scaffolding in place)
- `/internships`: online internships with roles, stacks, and highlights
	- Includes a lightviewer for Internship Certificate and LOR; open via the two buttons on each card
- `/contact`: SMTP‑backed form with validation and fallbacks
- `/about`: about page copy placeholder

## Architecture and technology
- Next.js 14 (App Router), React 18, and TypeScript
- Tailwind CSS for styling and Framer Motion for micro‑interactions
- Lucide icons
- Email: Nodemailer (SMTP), optional Apps Script webhook, and Formspree fallback
- Deployment: Netlify (with `@netlify/plugin-nextjs`) or Vercel

## Getting started (development)
```powershell
cd "e:\Internships and Projects\MK Portfolio"
npm install
npm run dev
```
Open http://localhost:3000

## Environment and contact setup
See `.env.example` for all variables.

Required (email):
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL

Optional (email):
- CONTACT_FROM_EMAIL, CONTACT_WEBHOOK_URL

Optional (site and analytics):
- NEXT_PUBLIC_SITE_URL=https://your-domain.com
- NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX



Brevo quick start:
```env
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_username
SMTP_PASS=your_brevo_smtp_key
CONTACT_TO_EMAIL=you@example.com
```

Delivery flow
1. SMTP email
2. Fire‑and‑forget webhook to Google Sheet (if configured)
3. If email fails: log to Sheet (await)
4. If Sheet unavailable: Formspree fallback

Rate limiting and user experience
- 5 requests per minute per IP, with Retry‑After header and submit‑button cooldown
- Honeypot spam trap, offline retry, and a success toast

## Analytics and SEO
Analytics (GA4)
- Create a GA4 property and set NEXT_PUBLIC_GA_ID in `.env.local`.
- A consent banner appears on first visit; selecting Allow loads Google Analytics.
- Use the Realtime report in Google Analytics to verify events.

SEO (Search Console)
- Add your site in Google Search Console (domain or URL prefix) and verify ownership (DNS TXT preferred).
- Submit `https://your-domain.com/sitemap.xml`.
- Set NEXT_PUBLIC_SITE_URL in `.env.local` so canonical URLs, robots, and sitemap use your real domain.

For a concise checklist, see `remaining.md`.



## Customization notes
- Navbar links: `components/HeaderNav.tsx` (edit `links`)
- Footer icons: `components/Footer.tsx` (`public/icons/*.svg`)
- Certifications cards: `components/CertCard.tsx`
- Certifications tabs/animations: `app/certifications/SectionsClient.tsx`
- Global styles/cursor/scrollbar: `app/globals.css`
- Lightviewer modals: `components/ProofModal.tsx`, `app/certifications/CertModal.tsx`, and `app/internships/InternModal.tsx`
- Internships list and actions: `app/internships/SectionsClient.tsx`
- Internships data and document mapping: `app/internships/page.tsx` (set `certImage` and `lorImage` for each item to filenames in `public/`)


## Recent updates
- Removed hero tag chips and redundant social buttons
- Added a polished “Snapshot” and “What I do” section
- Slimmer navbar pills; reduced vertical paddings across pages; removed header/footer divider lines
- Improved lightviewer accessibility (role=dialog, focus, ESC/overlay close, scroll lock)
- Added consent‑gated GA4, filesystem sitemap, robots, and per‑page canonicals
- Internships: introduced dual Certificate/LOR viewer; card has two actions (“View Internship Certificate” and “View LOR Certificate”)
- Adjusted internship modal Close button to top‑right outside the image area to avoid overlap
- Refined internships page description to highlight cybersecurity, MERN, and data science outcomes


---

## Build
```powershell
npm run build
npm start
```

## Deploy
Netlify (recommended):
- Build command: `npm run build`
- Publish: `.next`
- Plugin: `@netlify/plugin-nextjs`

Vercel works out of the box.

## Troubleshooting
- Stale chunk (ChunkLoadError) during local dev or right after deploy: the app includes a narrow auto‑reload handler to recover from rare stale assets. If you still see it, hard refresh, stop the dev server, clear `.next`, and restart.

## 🔗 Evidence links (examples)
- NSDC: https://trainings.internshala.com/certificate/view/nsdc/6glr84cp6od/e52s9kdy5a2/
- Microsoft × freeCodeCamp: https://www.freecodecamp.org/certification/mandar1234/foundational-c-sharp-with-microsoft

## Reuse policy (summary)
Use the code, not the identity.

Do:
- Fork and adapt under MIT
- Replace all personal content (text/images/proofs) with your own
- Keep attribution (e.g., in README)

Don’t:
- Republish this portfolio with Mandar’s name, content, or branding
- Reuse badges/proofs that belong to Mandar
- Misuse third‑party marks (EC‑Council/CEH, NSDC, SIDH, Microsoft, etc.)

Attribution example:
> Portfolio template based on Mandar Kajbaje’s MK Portfolio (MIT).

## License
- Code: MIT (see [LICENSE](./LICENSE))
- Content/media/branding: Copyright © 2025 Mandar Kajbaje
- Third‑party names and marks belong to their respective owners (see [NOTICE.md](./NOTICE.md))


