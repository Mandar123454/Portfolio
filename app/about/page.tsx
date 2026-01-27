import Image from "next/image";

import ContactForm from "@/components/contact-form";

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
        <div
          className={
            "mx-auto relative overflow-hidden rounded-2xl " +
            "h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 " +
            "bg-white/95 border border-black/10 ring-1 ring-white/20 " +
            "shadow-[0_14px_40px_rgba(0,0,0,0.45)]"
          }
        >
          <Image src="/Logo.png" alt="MK logo" fill sizes="128px" className="object-contain p-3" priority />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.10),transparent_60%)]" />
        </div>
        
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">About</h1>
        <p className="mt-3 text-sm text-white/75 md:text-base">
          “A quick look at my work, my toolkit, and how this portfolio is built.”
        </p>
      </header>

      {/* SECTION 1 — ABOUT ME */}
      <section className="mx-auto mt-10 max-w-6xl rounded-2xl border border-white/10 bg-white/5 p-5 md:mt-12 md:p-7">
        <div className="max-w-4xl">
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
      </section>

      {/* SECTION 2 — MY TOOLKIT */}
      <ToolkitSection />

      {/* SECTION 3 — ABOUT THIS PORTFOLIO (VLC STYLE INFO ONLY) */}
      <section className="mt-12 md:mt-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">About this portfolio</h2>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
              <h3 className="text-lg font-semibold text-white">Built for trust</h3>
              <p className="mt-2 text-sm text-white/75">
                This portfolio is engineered to be fast, verifiable, and production-ready — so reviewers can validate outcomes without guessing.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-white/75">
                <li>Mobile-first layout + touch-friendly components</li>
                <li>Proof-first modals for PDFs/images</li>
                <li>Spam-protected contact pipeline (honeypot + rate limit + fallbacks)</li>
                <li>SEO basics: sitemap, robots, canonicals</li>
                <li>Consent-gated analytics</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
              <h3 className="text-lg font-semibold text-white">Libraries used</h3>
              <p className="mt-2 text-sm text-white/70">Core stack used in this repo:</p>
              <div className="mt-4 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/25 p-3">Next.js (App Router)</div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-3">React 18</div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-3">TypeScript</div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-3">Tailwind CSS</div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-3">Framer Motion (light)</div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-3">Lucide Icons</div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-3">Nodemailer (SMTP)</div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-3">Lenis (smooth scroll)</div>
              </div>
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

      {/* ABOUT FOOTER */}
      <footer className="mt-12 pb-2 md:mt-16 md:pb-4">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-black/25 p-5">
          <p className="text-sm text-white/75">
            This portfolio is built to make verification easy: real outcomes, clear proof, and fast navigation — on mobile or desktop.
          </p>
        </div>
      </footer>
    </main>
  );
}
