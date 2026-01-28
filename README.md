<p align="center">
  <img src="public/Logo.png" alt="MK Portfolio" width="120" />
</p>

<h1 align="center">MK Portfolio</h1>

<p align="center">
  <b>Evidence‑driven. Production‑ready. Built to impress.</b>
</p>

<p align="center">
  <a href="https://mandarkajbaje-portfolio.netlify.app/"><img src="https://img.shields.io/badge/🌐_LIVE-mandarkajbaje--portfolio.netlify.app-7c3aed?style=for-the-badge" alt="Live Site" /></a>
</p>

<p align="center">
  <a href="https://github.com/Mandar123454/Portfolio"><img src="https://img.shields.io/badge/Next.js-14-000?logo=nextdotjs&logoColor=white" alt="Next.js 14" /></a>
  <a href="#"><img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React 18" /></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Tailwind_CSS-3-0EA5E9?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Framer_Motion-11-FF0055?logo=framer&logoColor=white" alt="Framer Motion" /></a>
  <a href="https://mandarkajbaje-portfolio.netlify.app/"><img src="https://img.shields.io/badge/Netlify-Live-00C7B7?logo=netlify&logoColor=white" alt="Netlify Live" /></a>
</p>

<p align="center">
  <i>A professional portfolio for <b>Mandar Kajbaje</b> — showcasing real work across <b>AI</b>, <b>Cybersecurity</b>, and <b>Web Engineering</b>.</i>
</p>

---

<br/>

## ✦ Philosophy

> **Proof over promises.**  
> Every certificate, every project, every internship — verifiable in one click.

This portfolio is engineered to let recruiters, collaborators, and clients **validate outcomes instantly** — with in-site proof viewers, deep-links, and zero friction.

<br/>

---

## ✦ What's Inside

| Page | Description |
|------|-------------|
| **Home** | Hero + testimonials + emotional closing CTA |
| **About** | Story, toolkit, proof metrics, feedback form |
| **Projects** | Domain-filtered index with video demos + case studies |
| **Certifications** | CEH, Azure, NSDC, Microsoft — with in-site PDF/image viewer |
| **Experience** | Internships, Workshops, Hackathons — tabbed, proof-attached |
| **Contact** | SMTP-backed form with rate limiting, honeypot, and fallbacks |

**Legal & Policy Pages:** Terms · Privacy · Cookies · Security · Status · Docs · Community

<br/>

---

## ✦ Signature Features

<table>
<tr>
<td width="50%">

### 🔍 Proof Viewer
Certificates and evidence open **in-site** (images + PDFs) with keyboard/ESC close, scroll lock, and mobile fallback.

### 🚀 Real Contact Pipeline
SMTP via Nodemailer (Brevo recommended), optional webhook logging, Formspree fallback, 5/min rate limit, honeypot spam trap, offline retry.

### 📊 Consent-Gated Analytics
GA4 loads **only after user consent**. Manage preferences anytime at `/cookies`.

</td>
<td width="50%">

### 🎬 Video-First Demos
Project demos stream from **unlisted YouTube** (privacy-enhanced). No large binaries in repo.

### 🌐 SEO & Accessibility
Sitemap, robots.txt, canonical URLs, Twitter/OG cards, skip-to-content, focus management, aria-labels.

### ⚡ Premium UX
One-time preloader, smooth scroll (Lenis), custom cursor (desktop), micro-interactions, styled scrollbars.

</td>
</tr>
</table>

<br/>

---

## ✦ Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 11 |
| Icons | Lucide React |
| Scroll | Lenis |
| Email | Nodemailer (SMTP) |
| Hosting | Netlify / Vercel |

<br/>

---

## ✦ Quick Start

```powershell
# Clone
git clone https://github.com/Mandar123454/Portfolio.git
cd Portfolio

# Install
npm install

# Run
npm run dev
```

Open **http://localhost:3000**

<br/>

---

## ✦ Environment

Copy `.env.example` → `.env.local`

| Variable | Required | Purpose |
|----------|----------|---------|
| `SMTP_HOST` | ✅ | SMTP server (e.g. `smtp-relay.brevo.com`) |
| `SMTP_PORT` | ✅ | Port (usually `587`) |
| `SMTP_USER` | ✅ | SMTP username |
| `SMTP_PASS` | ✅ | SMTP password/key |
| `CONTACT_TO_EMAIL` | ✅ | Where messages are sent |
| `CONTACT_FROM_EMAIL` | ○ | Custom "from" address |
| `CONTACT_WEBHOOK_URL` | ○ | Google Sheet / webhook |
| `NEXT_PUBLIC_SITE_URL` | ○ | Canonical URL |
| `NEXT_PUBLIC_GA_ID` | ○ | Google Analytics ID |

<br/>

---

## ✦ Deploy

### Netlify (Recommended)
This repo includes `netlify.toml` with `@netlify/plugin-nextjs`.

1. Connect repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add env vars in site settings

### Vercel
Works out of the box — just import and deploy.

<br/>

---

## ✦ Project Structure

```
app/
├── about/          # Story, toolkit, feedback
├── certifications/ # Proof viewer for certs
├── contact/        # SMTP-backed form
├── experience/     # Internships, Workshops, Hackathons
├── projects/       # Index + [slug] case studies
├── api/contact/    # Server-side email handler
├── privacy/        # Legal pages
└── ...
components/         # Reusable UI (Hero, Footer, ProofModal, etc.)
lib/                # Utilities (cn, youtube, videos)
public/             # Static assets, icons, certificates
```

<br/>

---

## ✦ License

| What | License |
|------|---------|
| **Code** | MIT — fork, adapt, build |
| **Content** | © Mandar Kajbaje — not for republication |
| **Third-party marks** | Belong to their owners (see `NOTICE.md`) |

<br/>

---

<p align="center">
  <b>Built with precision. Presented with proof.</b>
</p>

<p align="center">
  <a href="https://mandarkajbaje-portfolio.netlify.app/">🌐 <b>View Live</b></a> · 
  <a href="https://github.com/Mandar123454/Portfolio">⭐ Star this repo</a> · 
  <a href="https://github.com/Mandar123454">Follow @Mandar123454</a>
</p>

<br/>

<p align="center">
  <sub>✨ Privacy-first analytics · 🍪 Consent-gated cookies · 🔐 GDPR-friendly</sub>
</p>


