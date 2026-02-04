"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/cn";

type ToolkitItem = {
  tool: string;
  why: string;
};

type ToolkitGroup = {
  label: string;
  items: ToolkitItem[];
};

const TOOLKIT: ToolkitGroup[] = [
  {
    label: "🔐 CyberSec",
    items: [
      { tool: "Scapy", why: "Packet crafting forced me to understand how networks breathe — and break." },
      { tool: "Snort / Suricata", why: "Detection rules teach you what attackers actually do, not what slides say." },
      { tool: "Zeek", why: "I like evidence. Zeek turns traffic into stories you can investigate." },
      { tool: "Kali", why: "A toolbox — but the real weapon is methodology and restraint." },
    ],
  },
  {
    label: "📊 Data Science",
    items: [
      { tool: "Pandas", why: "Fast iteration. Clean data. Repeat." },
      { tool: "XGBoost", why: "Strong baselines that actually win — reliably." },
      { tool: "SHAP", why: "If a model can’t explain itself, it’s not ready for real decisions." },
      { tool: "Plotly", why: "Insight should be interactive — not trapped in static charts." },
    ],
  },
  {
    label: "⚡ MERN",
    items: [
      { tool: "React", why: "UI is the product. Ergonomics matter." },
      { tool: "Node.js", why: "Shipping beats perfection — but correctness still wins." },
      { tool: "MongoDB", why: "Flexible schemas help early; discipline keeps it clean later." },
      { tool: "Socket.IO", why: "Real‑time isn’t a feature anymore — it’s an expectation." },
    ],
  },
  {
    label: "🐍 Python",
    items: [
      { tool: "OOP", why: "Readable systems scale. Spaghetti doesn’t." },
      { tool: "Threading / Async", why: "Latency is a bug users can feel." },
      { tool: "Tkinter", why: "Desktop apps aren’t dead — they’re waiting for practical builders." },
    ],
  },
  {
    label: "🎨 Web",
    items: [
      { tool: "Tailwind", why: "Speed + consistency — without fighting CSS." },
      { tool: "Framer Motion", why: "Motion is a UX tool, not decoration. I use it sparingly and on purpose." },
      { tool: "Next.js", why: "Great defaults: routing, performance, and SEO — so I can focus on product." },
    ],
  },
];

function FlipCard({ front, back }: { front: string; back: string }) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Detect touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = () => {
    if (isMobile) {
      setFlipped((prev) => !prev);
    }
  };

  return (
    <button 
      type="button" 
      className="relative h-[92px] w-full [perspective:900px]"
      onClick={handleClick}
    >
      <motion.div
        animate={isMobile ? { rotateY: flipped ? 180 : 0 } : undefined}
        whileHover={!isMobile && !reduce ? { rotateY: 180 } : undefined}
        whileTap={reduce ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className={cn(
          "relative h-full w-full rounded-xl",
          "[transform-style:preserve-3d]",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-xl border border-white/10 bg-black/25 p-4",
            "[backface-visibility:hidden]",
          )}
        >
          <p className="text-sm font-semibold text-white">{front}</p>
          <p className="mt-2 text-xs leading-relaxed text-white/70">Tap / hover for why</p>
        </div>

        <div
          className={cn(
            "absolute inset-0 rounded-xl border border-white/10 bg-black/40 p-4",
            "[transform:rotateY(180deg)] [backface-visibility:hidden]",
          )}
        >
          <p className="text-sm font-semibold text-white">Why {front}</p>
          <p className="mt-2 text-xs leading-relaxed text-white/75">{back}</p>
        </div>
      </motion.div>
    </button>
  );
}

export default function ToolkitSection() {
  return (
    <section className="mt-12 md:mt-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">My toolkit (with opinions)</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/75">Not just logos — each tool is here because it earned its place.</p>
          </div>
          <div className="hidden items-center gap-2 text-xs text-white/55 md:flex">
            <Sparkles className="h-4 w-4 text-brand" aria-hidden />
            Tap / hover
          </div>
        </div>

        <div className="mt-6 grid gap-6">
          {TOOLKIT.map((group) => (
            <div key={group.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-white">{group.label}</h3>
                <p className="text-xs text-white/55">Tap on mobile • Hover on desktop</p>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <FlipCard key={item.tool} front={item.tool} back={item.why} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
