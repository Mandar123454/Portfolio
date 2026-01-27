const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata = {
  title: "Terms — Mandar Kajbaje",
  description: "Terms of use for this portfolio website.",
  alternates: { canonical: `${site}/terms` },
};

export default function TermsPage() {
  return (
    <main className="container py-10 md:py-14">
      <header className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Terms</h1>
        <p className="mt-3 text-sm text-white/70">
          These terms apply to the public website and its content. If you do not agree, please do not use the site.
        </p>
      </header>

      <section className="mx-auto mt-8 max-w-3xl space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/75 md:mt-10 md:p-8">
        <div>
          <h2 className="text-base font-semibold text-white">Use of the site</h2>
          <p className="mt-2">
            You may browse and share links to this site. You may not attempt to disrupt the site, probe it, or abuse the contact endpoint.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">Content ownership</h2>
          <p className="mt-2">
            Portfolio content (text, proofs, images, branding) belongs to Mandar Kajbaje unless otherwise noted. Third‑party marks belong to their
            respective owners.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">No warranties</h2>
          <p className="mt-2">
            The site is provided “as is” without warranties of any kind. Information may change over time.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">Contact submissions</h2>
          <p className="mt-2">
            By submitting the contact form, you confirm the information is accurate to the best of your knowledge and you’re not sending abusive or
            illegal content.
          </p>
        </div>
      </section>
    </main>
  );
}
