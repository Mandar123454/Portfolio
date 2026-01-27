const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata = {
  title: "Docs — Mandar Kajbaje",
  description: "Technical notes about this portfolio (stack, proof viewer, contact pipeline).",
  alternates: { canonical: `${site}/docs` },
};

export default function DocsPage() {
  return (
    <main className="container py-10 md:py-14">
      <header className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Docs</h1>
        <p className="mt-3 text-sm text-white/70">A short technical overview of how this portfolio works.</p>
      </header>

      <section className="mx-auto mt-8 max-w-3xl space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/75 md:mt-10 md:p-8">
        <div>
          <h2 className="text-base font-semibold text-white">Stack</h2>
          <p className="mt-2">Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion (light), Nodemailer (SMTP).</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">Proof viewer</h2>
          <p className="mt-2">Evidence opens in-site (images + PDFs) with keyboard/ESC and overlay-close.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">Contact pipeline</h2>
          <p className="mt-2">
            Contact submissions use SMTP first, with anti-spam protection (honeypot + rate limit). Optional webhook logging and Formspree fallback can be enabled via env vars.
          </p>
        </div>
      </section>
    </main>
  );
}
