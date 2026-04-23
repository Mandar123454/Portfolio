"use client";

import { motion } from "framer-motion";
import { BookOpenText } from "lucide-react";
import { useRouter } from "next/navigation";
import ResearchModal, { type ResearchProofItem } from "./ResearchModal";

export type ResearchItem = {
  title: string;
  organization: string;
  slug: string;
  location?: string;
  date?: string;
  overview: string;
  highlights: string[];
  proofs?: {
    key: string;
    href?: string;
    label: string;
    thumb?: string; // optional image preview (useful when PDF preview is unreliable on mobile)
    row?: 1 | 2;
    colSpan?: 1 | 2 | 3 | 4 | 5;
  }[];
};

export default function ResearchClient({ items }: { items: ResearchItem[] }) {
  const router = useRouter();

  const open = (slug: string, proofKey: string) => {
    const sp = new URLSearchParams();
    sp.set("research", slug);
    sp.set("proof", proofKey);
    router.push(`/experience?${sp.toString()}`, { scroll: false });
  };

  return (
    <section className="mt-8">
      <div className="mt-8 grid grid-cols-1 gap-6">
        {items.map((r, i) => {
          const proofs = r.proofs ?? [];
          const canViewProofs = proofs.length > 0;

          return (
            <motion.article
              key={r.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.03 + i * 0.04 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/5">
                    <BookOpenText className="text-brand" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{r.title}</h2>
                    <p className="text-xs text-white/70">
                      {r.organization}
                      {r.location ? ` • ${r.location}` : ""}
                      {r.date ? ` • ${r.date}` : ""}
                    </p>
                  </div>
                </div>
              </div>

              {canViewProofs ? (
                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                    {proofs.map((p, idx) => (
                      <motion.button
                        key={p.key}
                        type="button"
                        whileHover={{ y: -1, scale: 1.01 }}
                        whileTap={{ y: 0, scale: 0.995 }}
                        onClick={() => p.href && open(r.slug, p.key)}
                        title={p.label}
                        disabled={!p.href}
                        className={
                          "inline-flex w-full items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium text-white shadow-sm ring-1 ring-white/15 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 " +
                          (idx % 2 === 0
                            ? "bg-gradient-to-r from-brand/80 to-fuchsia-500/60"
                            : "bg-gradient-to-r from-cyan-500/80 to-violet-500/60")
                        }
                      >
                        {p.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : null}

              <p className="mt-4 text-sm text-white/85">{r.overview}</p>

              <ul className="mt-4 list-disc space-y-1 pl-6 text-sm text-white/85">
                {r.highlights.map((x, idx) => (
                  <li key={idx}>{x}</li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
        <p className="text-sm text-white/75">
          Best work only: a real-world computer literacy initiative and an end-to-end startup concept — both backed by clear, downloadable proof.
        </p>
      </div>

      {/* Lightviewer modal wiring */}
      <ResearchModal
        items={items.map<ResearchProofItem>((r) => ({
          slug: r.slug,
          title: r.title,
          organization: r.organization,
          proofs: r.proofs,
        }))}
      />
    </section>
  );
}
