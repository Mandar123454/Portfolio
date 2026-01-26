import Image from "next/image";

import ContactForm from "@/components/contact-form";

import AiTransparencyNote from "@/app/about/AiTransparencyNote";
import PortfolioRating from "@/app/about/PortfolioRating";
import ProofGrid from "@/app/about/ProofGrid";
import ToolkitSection from "@/app/about/ToolkitSection";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata = {
  title: "About — Mandar Kajbaje",
  description: "A quick look at my work, my toolkit, and how this portfolio is built.",
  alternates: { canonical: `${site}/about` },
};

export default function AboutPage() {
  return (
    <main className="container py-10 md:py-14">
      {/* HEADER (LOCKED) */}
      <header className="mx-auto max-w-3xl text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-white shadow-sm">
          MK
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">About</h1>
        <p className="mt-3 text-sm text-white/75 md:text-base">
          “A quick look at my work, my toolkit, and how this portfolio is built.”
        </p>
      </header>

      {/* SECTION 1 — ABOUT ME */}
      <section className="mx-auto mt-10 max-w-6xl rounded-2xl border border-white/10 bg-white/5 p-5 md:mt-12 md:p-7">
        <div className="grid gap-8 md:grid-cols-[320px_1fr]">
          {/* Portrait */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c10]">
              <Image
                src="/portrait-bw.jpg"
                alt="Portrait"
                fill
                sizes="(max-width: 768px) 90vw, 320px"
                className="object-cover grayscale"
                priority={false}
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
            </div>
            <p className="mt-2 text-xs text-white/55">
              Drop a B&amp;W photo into public/portrait-bw.jpg and replace this placeholder.
            </p>
          </div>

          {/* Story + Proof */}
          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">The story</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/80">
              <p>
                I’m Mandar — a final-year CS student who prefers building real systems over collecting buzzwords. I learn by shipping: security tools, ML models, and full-stack apps that turn ideas into outcomes.
              </p>
              <p>
                I’m obsessed with the intersection of security, data, and product — because in the real world, problems don’t stay in one domain.
              </p>
              <p>If you’re looking for someone who can investigate, reason, and ship — I’m that person.</p>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-white">Proof</h3>
                <p className="text-xs text-white/55">Cold hard metrics</p>
              </div>
              <div className="mt-3">
                <ProofGrid />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — MY TOOLKIT */}
      <ToolkitSection />

      {/* SECTION 3 — ABOUT THIS PORTFOLIO (VLC STYLE INFO ONLY) */}
      <section className="mt-12 md:mt-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">About this portfolio</h2>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-white">MK Portfolio — Mandar Kajbaje</p>
                <p className="text-xs text-white/55">VLC-style info</p>
              </div>
              <p>
                <span className="text-white/60">Version:</span> v1.0.0
              </p>
              <p>
                <span className="text-white/60">Last Updated:</span> Jan 2026
              </p>
              <p>
                <span className="text-white/60">Built for:</span> Desktop + Mobile + Touch friendly
              </p>
              <p>
                <span className="text-white/60">Design goal:</span> Evidence-first + production-ready
              </p>

              <details className="group mt-4 rounded-xl border border-white/10 bg-black/25 p-4">
                <summary className="cursor-pointer select-none text-sm font-semibold text-white outline-none">
                  Libraries / Tech Stack
                </summary>
                <div className="mt-3 space-y-2 text-sm text-white/75">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Next.js 14 (App Router)</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Framer Motion</li>
                    <li>Nodemailer + Brevo</li>
                    <li>Consent-gated GA4</li>
                    <li>Sitemap + robots + canonicals</li>
                    <li>Next.js API route + rate limiting + honeypot</li>
                    <li>PDF/image proof viewer (Lightviewer modals)</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEEDBACK + RATE */}
      <section className="mt-12 md:mt-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Feedback</h2>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
              <h3 className="text-lg font-semibold text-white">Send feedback</h3>
              <p className="mt-2 text-sm text-white/70">Short notes are welcome. If it’s a bug, tell me what you saw.</p>
              <div className="mt-5">
                <ContactForm includePhone={false} intent="about_feedback" submitLabel="Send Feedback" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
              <PortfolioRating />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FUN SIDE */}
      <section className="mt-12 md:mt-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Fun side</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white">Online internships reason</p>
              <p className="mt-2 text-sm text-white/75">
                I completed internships online because my college schedule runs full day (9 to 6). That’s not an excuse — it’s the real constraint I learned to build around.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white">Creative / marketing side</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/75">
                <li>T-shirt designing + selling (Redbubble/Teespring etc.)</li>
                <li>Social media marketing work (Udemy learning)</li>
                <li>Image/video editing + design tools practice</li>
              </ul>
              <p className="mt-4 text-sm text-white/70">
                <span className="text-white/60">Past → Future:</span> Capstone → Predictive Modeling • NIDS → AI-NIDS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — AI TRANSPARENCY NOTE */}
      <section className="mt-12 pb-2 md:mt-16 md:pb-4">
        <div className="mx-auto max-w-6xl">
          <AiTransparencyNote />
        </div>
      </section>
    </main>
  );
}
