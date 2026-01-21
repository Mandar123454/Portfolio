"use client";

import { Briefcase, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import InternModal, { InternDocItem } from "./InternModal";

export type InternshipItem = {
  company: string;
  role: string;
  mode: "Online" | "Remote" | "Hybrid" | "Onsite";
  dates: string;
  stack?: string[];
  highlights: string[];
  link?: string;
  certImage?: string;
  lorImage?: string;
  expImage?: string;
};

export default function SectionsClient({ internships }: { internships: InternshipItem[] }) {
  const router = useRouter();

  const toSlug = (it: InternshipItem) => `${it.company}-${it.role}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const open = (it: InternshipItem, kind: "cert" | "lor" | "exp" = "cert") => {
    const slug = toSlug(it);
    const sp = new URLSearchParams();
    sp.set("intern", slug);
    sp.set("doc", kind);
    router.push(`/experience?${sp.toString()}`, { scroll: false });
  };

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-6">
        {internships.map((it) => (
          <article key={toSlug(it)} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/5">
                  <Briefcase className="text-brand" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{it.role} • {it.company}</h2>
                  <p className="text-xs text-white/70">{it.mode} • {it.dates}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <motion.button
                  type="button"
                  whileHover={{ y: -1, scale: 1.01 }}
                  whileTap={{ y: 0, scale: 0.995 }}
                  onClick={() => open(it, "cert")}
                  title="Open Internship certificate"
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-brand/80 to-fuchsia-500/60 px-3 py-1.5 text-xs font-medium text-white shadow-sm ring-1 ring-white/15 hover:brightness-110"
                >
                  View Internship Certificate
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ y: -1, scale: 1.01 }}
                  whileTap={{ y: 0, scale: 0.995 }}
                  onClick={() => open(it, "lor")}
                  title="Open Letter of Recommendation"
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-cyan-500/80 to-violet-500/60 px-3 py-1.5 text-xs font-medium text-white shadow-sm ring-1 ring-white/15 hover:brightness-110"
                >
                  View LOR Certificate
                </motion.button>
                {it.expImage ? (
                  <motion.button
                    type="button"
                    whileHover={{ y: -1, scale: 1.01 }}
                    whileTap={{ y: 0, scale: 0.995 }}
                    onClick={() => open(it, "exp")}
                    title="Open Experience Letter"
                    className="inline-flex items-center rounded-md bg-gradient-to-r from-emerald-500/80 to-teal-500/60 px-3 py-1.5 text-xs font-medium text-white shadow-sm ring-1 ring-white/15 hover:brightness-110"
                  >
                    View Experience Letter
                  </motion.button>
                ) : null}
                {it.link ? (
                  <a
                    href={it.link}
                    target={it.link.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/80 hover:bg-white/10"
                    title="External details"
                  >
                    <ExternalLink size={12} />
                    Link
                  </a>
                ) : null}
              </div>
            </div>

            {/* Preview removed per request: keep cards compact with header actions only */}

            {it.stack && it.stack.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {it.stack.map((s) => (
                  <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80">{s}</span>
                ))}
              </div>
            )}

            <ul className="mt-4 list-disc space-y-1 pl-6 text-sm text-white/85">
              {it.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* Lightviewer modal wiring */}
      <InternModal
        items={internships.map<InternDocItem>((it) => ({
          slug: toSlug(it),
          title: `${it.role} • ${it.company}`,
          certImage: it.certImage,
          lorImage: it.lorImage,
          expImage: it.expImage,
        }))}
      />
    </>
  );
}
