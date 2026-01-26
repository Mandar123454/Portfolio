"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, BookOpenText, Trophy } from "lucide-react";
import { useSearchParams } from "next/navigation";

import type { InternshipItem } from "../internships/SectionsClient";
import InternshipsSection from "../internships/SectionsClient";
import WorkshopsClient, { type WorkshopItem } from "./WorkshopsClient";
import HackathonsClient, { type HackathonItem } from "./HackathonsClient";

type ActiveTab = "internships" | "workshops" | "hackathons";

export default function ExperienceSectionsClient({
  internships,
  workshops,
  hackathons,
}: {
  internships: InternshipItem[];
  workshops: WorkshopItem[];
  hackathons: HackathonItem[];
}) {
  const params = useSearchParams();

  const queryTab: ActiveTab | null = React.useMemo(() => {
    if (params?.get("hackathon")) return "hackathons";
    if (params?.get("workshop")) return "workshops";
    if (params?.get("intern")) return "internships";
    return null;
  }, [params]);

  const [active, setActive] = React.useState<ActiveTab>(queryTab ?? "internships");

  React.useEffect(() => {
    if (queryTab && queryTab !== active) setActive(queryTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryTab]);

  return (
    <div className="mt-8">
      <div className="text-xs uppercase tracking-wide text-white/60">Filter by category</div>
      <div
        role="tablist"
        aria-label="Filter by category"
        className="mt-2 inline-flex overflow-hidden rounded-full border border-white/10 bg-white/5 p-1 text-sm"
      >
        {[
          { key: "internships" as const, label: "Virtual Internships", Icon: Briefcase },
          { key: "workshops" as const, label: "Workshops", Icon: BookOpenText },
          { key: "hackathons" as const, label: "Hackathons", Icon: Trophy },
        ].map(({ key, label, Icon }) => {
          const selected = active === key;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(key)}
              className={
                "flex items-center gap-2 rounded-full px-4 py-1.5 transition focus:outline-none " +
                (selected ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10")
              }
            >
              <Icon className="h-4 w-4 text-brand" aria-hidden />
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {active === "internships" && (
            <motion.div
              key="internships"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-lg font-semibold tracking-tight text-white">Virtual Internships</h2>
                <p className="mt-2 max-w-3xl text-sm text-white/75">
                  Remote internships where I shipped real work, documented outcomes, and learned by doing — with certificates and (where available) LOR proof.
                </p>
              </div>
              <InternshipsSection internships={internships} />
            </motion.div>
          )}

          {active === "workshops" && (
            <motion.div
              key="workshops"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-lg font-semibold tracking-tight text-white">Workshops</h2>
                <p className="mt-2 max-w-3xl text-sm text-white/75">
                  Focused learning sessions I attended to stay sharp — practical takeaways, tools, and workflows I can apply immediately.
                </p>
              </div>
              <WorkshopsClient items={workshops} />
            </motion.div>
          )}

          {active === "hackathons" && (
            <motion.div
              key="hackathons"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-lg font-semibold tracking-tight text-white">Hackathons</h2>
                <p className="mt-2 max-w-3xl text-sm text-white/75">
                  Competitions where I solved real problems under time pressure — focusing on security, data, and practical execution.
                </p>
              </div>
              <HackathonsClient items={hackathons} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
