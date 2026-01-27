# MK Portfolio

Mandar Kajbaje’s evidence‑driven portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## What makes it different
- Proof-first UX: certificates and evidence open in an in-site viewer (images + PDFs), with keyboard/ESC support.
- Experience hub: internships, workshops, and hackathons with deep-links and proof.
- Real contact pipeline: SMTP (Nodemailer), optional webhook logging, Formspree fallback, rate limiting, and honeypot.
- Production basics: sitemap/robots/canonicals and consent-gated analytics.

## Run locally
```powershell
npm install
npm run dev
```
Open http://localhost:3000

## Environment
Copy `.env.example` to `.env.local`.

Required for email:
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
- CONTACT_TO_EMAIL

Optional:
- CONTACT_FROM_EMAIL
- CONTACT_WEBHOOK_URL
- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_GA_ID

## Deploy (Netlify)
This repo includes [netlify.toml](netlify.toml) and uses `@netlify/plugin-nextjs`.

- Build: `npm run build`
- Publish: `.next`
- Set env vars in Netlify site settings (do not commit `.env.local`).

## Demos
Project demos are embedded from unlisted YouTube videos (privacy-enhanced `youtube-nocookie.com`). No large video binaries are committed.

## License
- Code: MIT (see [LICENSE](./LICENSE))
- Portfolio content/branding: not licensed for republication (see [NOTICE.md](./NOTICE.md))


