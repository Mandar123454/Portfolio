const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata = {
  title: "Status — Mandar Kajbaje",
  description: "Service status for this portfolio website.",
  alternates: { canonical: `${site}/status` },
};

export default function StatusPage() {
  return (
    <main className="container py-10 md:py-14">
      <header className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Status</h1>
        <p className="mt-3 text-sm text-white/70">Current status of the portfolio website.</p>
      </header>

      <section className="mx-auto mt-8 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/75 md:mt-10 md:p-8">
        <div className="rounded-xl border border-white/10 bg-black/25 p-4">
          <p className="text-sm text-white/85">
            <span className="font-semibold text-white">Operational</span> — Pages and contact endpoint are expected to work normally.
          </p>
        </div>
        <p className="mt-4 text-sm text-white/70">
          If something looks broken, please report it via the contact page.
        </p>
      </section>
    </main>
  );
}
