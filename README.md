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

<!-- Azure & CI badges -->
<img alt="Microsoft Azure" src="https://img.shields.io/badge/Azure-Cloud_Ready-0078D4?logo=microsoftazure&logoColor=white" />
<img alt="Azure Functions" src="https://img.shields.io/badge/Azure_Functions-Node_18-0062AD?logo=azurefunctions&logoColor=white" />
<img alt="Application Insights" src="https://img.shields.io/badge/Application_Insights-Enabled-5E5E5E?logo=microsoftazure&logoColor=white" />
<img alt="Azure Cosmos DB" src="https://img.shields.io/badge/Cosmos_DB-Optional-2E7BCF?logo=azurecosmosdb&logoColor=white" />
<img alt="Azure Bicep" src="https://img.shields.io/badge/Azure_Bicep-IaC-2C7DF7?logo=microsoftazure&logoColor=white" />
<img alt="GitHub Actions" src="https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white" />

[![Deploy Azure Functions](https://github.com/Mandar123454/Portfolio/actions/workflows/azure-functions-deploy.yml/badge.svg?branch=main)](https://github.com/Mandar123454/Portfolio/actions/workflows/azure-functions-deploy.yml)

</div>

## Features
- Focused home section with a clear snapshot and a concise “What I do” summary
- In‑site lightviewer for certificates and evidence (mobile friendly), with ESC/overlay close, focus management, and scroll lock
- Internships: dual‑document viewer (Certificate and LOR) with animated top‑right Close; per‑card actions “View Internship Certificate” and “View LOR Certificate”
- Centered navigation with compact link pills and a subtle active glow; minimal footer with social links
- Contact pipeline: SMTP via Nodemailer (Brevo recommended), optional Google Sheet webhook, and Formspree fallback; per‑IP rate limit (5/min), honeypot, offline retry, and success toast
- Azure‑powered evidence: Contact prioritizes Azure Functions (fallback to Next API), consent‑gated Application Insights telemetry, and an Azure status chip in the footer
- Optional sentiment mini‑demo on Contact page (uses Azure Text Analytics via a Function)
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
- `/contact`: SMTP‑backed form with validation and fallbacks; shows an optional “Feedback sentiment” widget when Azure Sentiment is configured
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

Optional (Azure front‑end endpoints):
- NEXT_PUBLIC_AZURE_FUNCTION_CONTACT_URL
- NEXT_PUBLIC_AZURE_FUNCTION_PING_URL
- NEXT_PUBLIC_AZURE_SENTIMENT_URL

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

## Azure integration (Functions, App Insights, Cosmos)
Phased adoption — enable what you need:

1) Azure Functions backend (Contact)
- Set `NEXT_PUBLIC_AZURE_FUNCTION_CONTACT_URL` to your deployed HTTP trigger (e.g., `https://<app>.azurewebsites.net/api/contact?code=...`).
- The contact form will call this first; if unavailable, it falls back to the built‑in Next.js API.
- Function source: `azure/functions/contact` (Node 18). Local settings sample: `azure/functions/local.settings.sample.json`.

2) Application Insights (consent‑gated)
- Set `NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING`.
- Client loader lives in `components/app-insights.tsx`; loaded only when consent is granted (similar to GA).
- Tracks page views and a `contact_submit` event.

3) Cosmos DB persistence (optional)
- Configure `COSMOS_ENDPOINT`, `COSMOS_KEY`, `COSMOS_DB`, `COSMOS_CONTAINER` in Function App settings.
- Contact function writes one document per submission (email partition suggested).

4) Azure status chip (optional)
- Set `NEXT_PUBLIC_AZURE_FUNCTION_PING_URL` (from `azure/functions/ping`).
- Footer shows a small “Azure” dot: green when reachable.

5) Sentiment analysis mini‑demo (optional)
- Deploy `azure/functions/sentiment` (Node 18) and note the HTTP trigger URL.
- Set `NEXT_PUBLIC_AZURE_SENTIMENT_URL` to that endpoint (no key needed if you secure at the function level or via CORS).
- UI component: `components/sentiment-widget.tsx` (only renders when the env is present). It posts `{ text }` and shows positive/neutral/negative with a confidence score.

CI/CD
- Workflow: `.github/workflows/azure-functions-deploy.yml` (Deploys the `azure/functions` folder with publish profile).
- Required GitHub Secrets: `AZURE_FUNCTIONAPP_NAME`, `AZURE_FUNCTIONAPP_PUBLISH_PROFILE`.
- Status: see the badge above or open the workflow run history.

Infrastructure as Code (IaC)
- Bicep template: `azure/bicep/main.bicep` (Function App, App Insights, Storage; optional Cosmos DB).
- Suggested flow: deploy Bicep → set Function App settings (Cosmos/CORS/keys) → update Next.js envs → redeploy site.

## Customization notes
- Navbar links: `components/HeaderNav.tsx` (edit `links`)
- Footer icons: `components/Footer.tsx` (`public/icons/*.svg`)
- Certifications cards: `components/CertCard.tsx`
- Certifications tabs/animations: `app/certifications/SectionsClient.tsx`
- Global styles/cursor/scrollbar: `app/globals.css`
- Lightviewer modals: `components/ProofModal.tsx`, `app/certifications/CertModal.tsx`, and `app/internships/InternModal.tsx`
- Internships list and actions: `app/internships/SectionsClient.tsx`
- Internships data and document mapping: `app/internships/page.tsx` (set `certImage` and `lorImage` for each item to filenames in `public/`)
- Contact page sentiment widget: `components/sentiment-widget.tsx` (gates on `NEXT_PUBLIC_AZURE_SENTIMENT_URL`)

## Recent updates
- Removed hero tag chips and redundant social buttons
- Added a polished “Snapshot” and “What I do” section
- Slimmer navbar pills; reduced vertical paddings across pages; removed header/footer divider lines
- Improved lightviewer accessibility (role=dialog, focus, ESC/overlay close, scroll lock)
- Added consent‑gated GA4, filesystem sitemap, robots, and per‑page canonicals
- Internships: introduced dual Certificate/LOR viewer; card has two actions (“View Internship Certificate” and “View LOR Certificate”)
- Adjusted internship modal Close button to top‑right outside the image area to avoid overlap
- Refined internships page description to highlight cybersecurity, MERN, and data science outcomes
- Azure: added Functions scaffold (contact, ping, sentiment), CI workflow, and Bicep IaC; contact now prefers Azure Function and falls back to Next API
- Footer: added Azure status chip (pings Function health)
- Contact: added optional “Feedback sentiment” widget powered by Azure Sentiment Function

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


