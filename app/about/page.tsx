const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const metadata = {
  title: "About — Mandar Kajbaje",
  alternates: { canonical: `${site}/about` },
};

export default function AboutPage() {
  return (
  <main className="container py-12 md:py-16">
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">About</h1>
      <p className="mt-3 max-w-2xl text-white/80">This section is coming soon.</p>
    </main>
  );
}
