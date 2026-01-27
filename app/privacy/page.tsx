import Link from "next/link";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata = {
  title: "Privacy — Mandar Kajbaje",
  description: "Privacy policy for this portfolio website.",
  alternates: { canonical: `${site}/privacy` },
};

export default function PrivacyPage() {
  return (
    <main className="container py-10 md:py-14">
      <header className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Privacy</h1>
        <p className="mt-3 text-sm text-white/70">A simple privacy policy for a personal portfolio site.</p>
      </header>

      <section className="mx-auto mt-8 max-w-3xl space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/75 md:mt-10 md:p-8">
        <div>
          <h2 className="text-base font-semibold text-white">What we collect</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <span className="text-white">Contact form data:</span> name, email, and message (and optional fields if you provide them).
            </li>
            <li>
              <span className="text-white">Basic technical data:</span> necessary request metadata used for security and rate limiting.
            </li>
            <li>
              <span className="text-white">Analytics (optional):</span> anonymous usage measurement only if you consent.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">How we use data</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>To respond to messages you send.</li>
            <li>To protect the site from spam/abuse.</li>
            <li>To improve the website (only with analytics consent).</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">Analytics & cookies</h2>
          <p className="mt-2">
            This site uses Google Analytics only after you opt in. Your choice is stored in your browser (local storage). You can change it anytime.
          </p>
          <p className="mt-2">
            Manage here: <Link className="text-white underline underline-offset-4" href="/cookies">Cookie preferences</Link>.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">Do not share my personal information</h2>
          <p className="mt-2">
            This site does not sell personal information. If you want your contact submission removed, request deletion.
          </p>
          <p className="mt-2">
            Shortcut: <Link className="text-white underline underline-offset-4" href="/do-not-share">Do not share / delete request</Link>.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">Data retention</h2>
          <p className="mt-2">
            Messages are kept only as long as needed for communication and record‑keeping. Analytics data is handled by Google Analytics according to
            their retention settings.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">Contact</h2>
          <p className="mt-2">
            For privacy requests, use the <Link className="text-white underline underline-offset-4" href="/contact">contact page</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
