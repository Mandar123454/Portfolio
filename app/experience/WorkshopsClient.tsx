"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BookOpenText } from "lucide-react";
import WorkshopModal, { WorkshopProofItem } from "./WorkshopModal";

export type WorkshopItem = {
  title: string;
  provider: string;
  slug: string;
  issuedOn?: string;
  image?: string; // viewer source (image or PDF)
  thumb?: string; // optional card thumbnail (image)
  tags?: string[];
  learned: string[];
};

export default function WorkshopsClient({ items }: { items: WorkshopItem[] }) {
  const router = useRouter();

  const open = (slug: string) => {
    router.push(`/experience?workshop=${encodeURIComponent(slug)}`, { scroll: false });
  };

  return (
    <section className="mt-8">
      <div className="mt-8 grid grid-cols-1 gap-6">
        {items.map((w, i) => {
          const canView = Boolean(w.image);
          return (
            <motion.article
              key={w.slug}
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
                    <h2 className="text-lg font-semibold">{w.title}</h2>
                    <p className="text-xs text-white/70">
                      {w.provider}
                      {w.issuedOn ? ` • ${w.issuedOn}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ y: -1, scale: 1.01 }}
                    whileTap={{ y: 0, scale: 0.995 }}
                    onClick={() => canView && open(w.slug)}
                    disabled={!canView}
                    title={canView ? "Open workshop certificate" : "Certificate not set"}
                    className={
                      "inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium shadow-sm ring-1 ring-white/15 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 " +
                      (canView
                        ? "bg-gradient-to-r from-brand/80 to-fuchsia-500/60 text-white"
                        : "bg-white/10 text-white")
                    }
                  >
                    View Certificate
                  </motion.button>
                </div>
              </div>

              {w.tags && w.tags.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {w.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              <ul className="mt-4 list-disc space-y-1 pl-6 text-sm text-white/85">
                {w.learned.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>

      {/* Lightviewer modal wiring */}
      <WorkshopModal
        items={items.map<WorkshopProofItem>((w) => ({
          slug: w.slug,
          title: w.title,
          provider: w.provider,
          image: w.image,
        }))}
      />
    </section>
  );
}
