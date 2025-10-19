"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, LineChart, Code2 } from "lucide-react";
import CertCard from "@/components/CertCard";

type Item = {
  title: string;
  provider: string;
  href?: string;
  slug?: string;
  image?: string;
  issuedOn?: string;
};

export default function SectionsClient({
  cybersecurity,
  dataScience,
  other,
}: {
  cybersecurity: Item[];
  dataScience: Item[];
  other: Item[];
}) {
  const [active, setActive] = React.useState<"cybersecurity" | "data-science" | "other">("cybersecurity");

  function Section({ id, title, items, TitleIcon }: { id: string; title: string; items: Item[]; TitleIcon: React.ComponentType<{ className?: string }> }) {
    return (
      <section id={id} className="scroll-mt-header rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <TitleIcon className="h-5 w-5 text-brand" />
          {title}
        </h2>
        <div className="mt-4 space-y-3">
          {items.map((it) => (
            <CertCard
              key={it.title}
              item={{
                title: it.title,
                provider: it.provider,
                slug: it.slug,
                image: it.image,
                href: it.href,
                issuedOn: it.issuedOn,
              }}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <div>
      <div className="mt-4 text-xs uppercase tracking-wide text-white/60">Filter by category</div>
      <div
        role="tablist"
        aria-label="Filter by category"
        className="mt-2 inline-flex overflow-hidden rounded-full border border-white/10 bg-white/5 p-1 text-sm"
      >
        {[
          { key: "cybersecurity" as const, label: "Cybersecurity", Icon: ShieldCheck },
          { key: "data-science" as const, label: "Data Science", Icon: LineChart },
          { key: "other" as const, label: "Other", Icon: Code2 },
        ].map(({ key, label, Icon }) => {
          const selected = active === key;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(key)}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 transition focus:outline-none ${
                selected ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10"
              }`}
            >
              <Icon className="h-4 w-4 text-brand" />
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {active === "cybersecurity" && (
            <motion.div
              key="cyber"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                <Section id="cybersecurity" TitleIcon={ShieldCheck} title="Ethical Hacking & Cybersecurity" items={cybersecurity} />
              </motion.div>
            </motion.div>
          )}
          {active === "data-science" && (
            <motion.div
              key="data"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                <Section id="data-science" TitleIcon={LineChart} title="Data Science" items={dataScience} />
              </motion.div>
            </motion.div>
          )}
          {active === "other" && (
            <motion.div
              key="other"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                <Section id="other" TitleIcon={Code2} title="Other Certifications" items={other} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
