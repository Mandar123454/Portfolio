import Link from "next/link";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata = {
  title: "Do Not Share — Mandar Kajbaje",
  description: "Request deletion of your contact submission and confirm data sharing policy.",
  alternates: { canonical: `${site}/do-not-share` },
};

export default function DoNotSharePage() {
  return (
    <main className="container py-10 md:py-14">
      <header className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Do not share my personal information</h1>
        <p className="mt-3 text-sm text-white/70">This site does not sell your personal information.</p>
      </header>

      <section className="mx-auto mt-8 max-w-3xl space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/75 md:mt-10 md:p-8">
        <div>
          <h2 className="text-base font-semibold text-white">What this means</h2>
          <p className="mt-2">
            Your contact form submission is used only to respond to you and protect the site from abuse. It is not sold.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">Request deletion</h2>
          <p className="mt-2">
            If you previously submitted a message and want it removed, send a request with the email you used.
          </p>
          <p className="mt-2">
            Go to <Link className="text-white underline underline-offset-4" href="/contact">Contact</Link> and write “Delete my data”.
          </p>
        </div>
      </section>
    </main>
  );
}
