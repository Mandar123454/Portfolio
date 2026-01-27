import CookieControls from "@/components/cookie-controls";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata = {
  title: "Cookies — Mandar Kajbaje",
  description: "Manage cookie and analytics preferences.",
  alternates: { canonical: `${site}/cookies` },
};

export default function CookiesPage() {
  return (
    <main className="container py-10 md:py-14">
      <header className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Cookies</h1>
        <p className="mt-3 text-sm text-white/70">Manage analytics consent and read how cookies are used.</p>
      </header>

      <section className="mx-auto mt-8 max-w-3xl space-y-5 md:mt-10">
        <CookieControls />

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/75 md:p-7">
          <h2 className="text-lg font-semibold text-white">What we use</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Essential browser storage for UI preferences (where applicable).</li>
            <li>Optional analytics consent state stored locally.</li>
            <li>If you consent, Google Analytics scripts may set their own cookies.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
