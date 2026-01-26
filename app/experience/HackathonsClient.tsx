"use client";

import { motion } from "framer-motion";
import { ExternalLink, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import HackathonModal, { type HackathonProofItem } from "./HackathonModal";

export type HackathonLink = {
  label: string;
  href: string;
};

export type HackathonItem = {
  title: string;
  organizer: string;
  slug: string;
  year?: string;
  mode?: "Online" | "Remote" | "Hybrid" | "Onsite";
  tags?: string[];
  highlights: string[];
  proof?: string; // PDF/PNG/JPG path
  proofTitle?: string;
  proofButtonLabel?: string;
  links?: HackathonLink[];
};

export default function HackathonsClient({ items }: { items: HackathonItem[] }) {
  const router = useRouter();

  const open = (slug: string) => {
    router.push(`/experience?hackathon=${encodeURIComponent(slug)}`, { scroll: false });
  };

  return (
    <section className="mt-8">
      <div className="mt-8 grid grid-cols-1 gap-6">
        {items.map((h, i) => {
          const canView = Boolean(h.proof);
          const hasLinks = Boolean(h.links && h.links.length > 0);
          const proofButtonLabel = h.proofButtonLabel ?? "View Proof";
          return (
            <motion.article
              key={h.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.03 + i * 0.04 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/5">
                    <Trophy className="text-brand" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{h.title}</h2>
                    <p className="text-xs text-white/70">
                      {h.organizer}
                      {h.year ? ` • ${h.year}` : ""}
                      {h.mode ? ` • ${h.mode}` : ""}
                    </p>
                  </div>
                </div>

                {canView ? (
                  <div className="flex flex-col items-end gap-2">
                    <motion.button
                      type="button"
                      whileHover={{ y: -1, scale: 1.01 }}
                      whileTap={{ y: 0, scale: 0.995 }}
                      onClick={() => open(h.slug)}
                      title="Open proof"
                      className="inline-flex items-center rounded-md bg-gradient-to-r from-brand/80 to-fuchsia-500/60 px-3 py-1.5 text-xs font-medium text-white shadow-sm ring-1 ring-white/15 hover:brightness-110"
                    >
                      {proofButtonLabel}
                    </motion.button>
                  </div>
                ) : null}
              </div>

              {h.tags && h.tags.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {h.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              <ul className="mt-4 list-disc space-y-1 pl-6 text-sm text-white/85">
                {h.highlights.map((x, idx) => (
                  <li key={idx}>{x}</li>
                ))}
              </ul>

              {hasLinks ? (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {(h.links ?? []).map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/80 hover:bg-white/10"
                      title={l.label}
                    >
                      <ExternalLink size={12} />
                      {l.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </motion.article>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
        <p className="text-sm text-white/75">
          I treat hackathons as execution proof: clear problem understanding, structured approach, and reproducible work (code, dashboards, and documentation). Proof is attached where available.
        </p>
      </div>

      <HackathonModal
        items={items.map<HackathonProofItem>((h) => ({
          slug: h.slug,
          title: h.proofTitle ?? h.title,
          organizer: h.organizer,
          image: h.proof,
        }))}
      />
    </section>
  );
}
