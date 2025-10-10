export const metadata = {
  title: "Projects — Mandar Kajbaje",
  description: "Selected projects across AI/ML, Security, and Full‑Stack.",
};

export default function ProjectsPage() {
  return (
    <main className="container py-24 md:py-32">
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Projects</h1>
      <p className="mt-3 max-w-2xl text-white/80">
        Curated work across AI/ML, cybersecurity tools, scalable web apps, and playful interactions.
      </p>
      {/* TODO: Replace with real project cards with animations and filters */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">Coming soon…</div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">Coming soon…</div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">Coming soon…</div>
      </div>
    </main>
  );
}
