"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BadgeCheck, BookOpenText, Calendar } from "lucide-react";
import WorkshopModal, { WorkshopProofItem } from "./WorkshopModal";

export type WorkshopItem = {
  title: string;
  provider: string;
  slug: string;
  issuedOn?: string;
  image?: string;
  learned: string[];
};

export default function WorkshopsClient({ items }: { items: WorkshopItem[] }) {
  const router = useRouter();

  const open = (slug: string) => {
    router.push(`/experience?workshop=${encodeURIComponent(slug)}`, { scroll: false });
  };

  return (
    <section className="mt-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          <BookOpenText className="h-5 w-5 text-brand" aria-hidden />
          Workshops
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-white/75">
          Focused learning sessions I attended to stay sharp — practical takeaways, tools, and workflows I can apply immediately.
        </p>

        <div className="mt-5 mx-auto max-w-4xl space-y-4">
          {items.map((w) => {
            const canView = Boolean(w.image);
            return (
              <motion.article
                key={w.slug}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.22 }}
                className="rounded-2xl border border-white/10 bg-black/25 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-white">{w.title}</h3>
                    <p className="mt-1 text-xs text-white/65">Issued by: {w.provider}</p>
                    {w.issuedOn ? (
                      <p className="mt-1 inline-flex items-center gap-1 text-xs text-white/60">
                        <Calendar className="h-3.5 w-3.5 text-brand" aria-hidden /> {w.issuedOn}
                      </p>
                    ) : null}
                  </div>
                  <div className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:block">
                    {w.image ? (
                      <Image src={w.image} alt={w.title} fill className="object-cover" sizes="64px" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[11px] text-white/45">No image</div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">What I learned</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-white/80">
                    {w.learned.map((x) => (
                      <li key={x} className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 text-brand" aria-hidden />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => canView && open(w.slug)}
                    disabled={!canView}
                    className={
                      "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium ring-1 ring-white/10 transition focus:outline-none focus:ring-2 focus:ring-brand/40 " +
                      (canView
                        ? "bg-white/10 text-white hover:bg-white/15"
                        : "cursor-not-allowed bg-white/5 text-white/40")
                    }
                    title={canView ? "View certificate" : "Add certificate image to enable viewing"}
                  >
                    View certificate
                  </button>
                  {!canView ? (
                    <span className="text-xs text-white/50">Add image in /public to enable</span>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </div>
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
