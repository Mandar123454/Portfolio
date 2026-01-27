import Link from "next/link";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata = {
  title: "Security — Mandar Kajbaje",
  description: "How to report security issues for this website.",
  alternates: { canonical: `${site}/security` },
};

export default function SecurityPage() {
  return (
    <main className="container py-10 md:py-14">
      <header className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Security</h1>
        <p className="mt-3 text-sm text-white/70">Responsible disclosure info for the live website.</p>
      </header>

      <section className="mx-auto mt-8 max-w-3xl space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/75 md:mt-10 md:p-8">
        <div>
          <h2 className="text-base font-semibold text-white">Report an issue</h2>
          <p className="mt-2">
            Please do not publish exploits or sensitive details. Send a report via the <Link className="text-white underline underline-offset-4" href="/contact">contact page</Link>.
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">What to include</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Steps to reproduce</li>
            <li>Impact (what an attacker can do)</li>
            <li>Screenshots/logs (if safe)</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
