import Link from "next/link";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata = {
  title: "Community — Mandar Kajbaje",
  description: "Where to connect and collaborate.",
  alternates: { canonical: `${site}/community` },
};

export default function CommunityPage() {
  return (
    <main className="container py-10 md:py-14">
      <header className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Community</h1>
        <p className="mt-3 text-sm text-white/70">Connect with me or reach out for collaboration.</p>
      </header>

      <section className="mx-auto mt-8 max-w-3xl space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/75 md:mt-10 md:p-8">
        <p>
          Best way to reach me is <Link className="text-white underline underline-offset-4" href="/contact">Contact</Link>.
        </p>
        <p>
          GitHub: <a className="text-white underline underline-offset-4" href="https://github.com/Mandar123454" target="_blank" rel="noreferrer">Mandar123454</a>
        </p>
        <p>
          LinkedIn: <a className="text-white underline underline-offset-4" href="https://www.linkedin.com/in/mandar-kajbaje" target="_blank" rel="noreferrer">mandar-kajbaje</a>
        </p>
      </section>
    </main>
  );
}
