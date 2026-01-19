"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ChevronDown,
  Code2,
  ExternalLink,
  Github,
  Mail,
  MessageSquare,
  Sparkles,
  Terminal,
} from "lucide-react";

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

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useFps(enabled: boolean) {
  const [fps, setFps] = useState<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setFps(null);
      return;
    }

    let rafId = 0;
    let frames = 0;
    let last = performance.now();

    const loop = (now: number) => {
      frames += 1;
      const delta = now - last;
      if (delta >= 1000) {
        setFps(Math.round((frames * 1000) / delta));
        frames = 0;
        last = now;
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [enabled]);

  return fps;
}

function useViewport(enabled: boolean) {
  const [viewport, setViewport] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    if (!enabled) {
      setViewport(null);
      return;
    }

    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [enabled]);

  return viewport;
}

function FlipCard(props: { front: string; back: string; className?: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      className={cn("group relative w-full text-left [perspective:1000px]", props.className)}
      aria-pressed={flipped}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn(
          "relative h-full min-h-[84px] rounded-xl border border-white/10 bg-white/[0.06] p-4",
          "[transform-style:preserve-3d]",
        )}
      >
        <div className="[backface-visibility:hidden]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-white">{props.front}</p>
            <ChevronDown className="h-4 w-4 text-white/50 transition group-hover:rotate-180" aria-hidden />
          </div>
          <p className="mt-2 text-xs leading-relaxed text-white/70">Tap / hover for why</p>
        </div>

        <div
          className={cn(
            "absolute inset-0 rounded-xl border border-white/10 bg-black/40 p-4",
            "[transform:rotateY(180deg)] [backface-visibility:hidden]",
          )}
        >
          <p className="text-sm font-semibold text-white">Why {props.front}</p>
          <p className="mt-2 text-xs leading-relaxed text-white/75">{props.back}</p>
        </div>
      </motion.div>
    </button>
  );
}

function StatCard(props: { label: string; end: number; suffix?: string; prefix?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-white/10 bg-white/[0.06] p-4"
    >
      <div className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {props.prefix ?? ""}
        <CountUp end={props.end} duration={reduce ? 0 : 1.2} preserveValue useEasing={!reduce} />
        {props.suffix ?? ""}
      </div>
      <p className="mt-1 text-sm text-white/70">{props.label}</p>
    </motion.div>
  );
}

export default function AboutClient() {
  const reduce = useReducedMotion();
  const [viewSourceOpen, setViewSourceOpen] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const fps = useFps(devMode);
  const viewport = useViewport(devMode);

  const heroVideoSrc = "/about-hero.mp4";
  const heroPosterSrc = "/about-hero-poster.jpg";

  const timeline = useMemo(
    () => [
      { title: "Q3 2025", text: "Build a SOC analyst dashboard (signals → decisions)." },
      { title: "Q4 2025", text: "Open‑source AI‑NIDS v2 with Docker‑first deploy." },
      { title: "2026", text: "Write + share a practical ‘security × data’ playbook." },
    ],
    [],
  );

  const dragRef = useRef<HTMLDivElement | null>(null);
  const [dragBounds, setDragBounds] = useState({ left: -520, right: 0 });

  useEffect(() => {
    if (!dragRef.current) return;
    const container = dragRef.current;

    const compute = () => {
      const overflow = Math.max(0, container.scrollWidth - container.clientWidth);
      setDragBounds({ left: -overflow, right: 0 });
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  return (
    <main className={cn("relative", devMode && "[--brand:#22c55e]")}>
      {/* Dev mode toggle */}
      <button
        type="button"
        onClick={() => setDevMode((v) => !v)}
        className={cn(
          "fixed right-4 top-20 z-40 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs text-white/80 backdrop-blur",
          "hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-brand/40",
        )}
        aria-pressed={devMode}
        title="Dev Mode"
      >
        <span className="inline-flex items-center gap-2">
          <Terminal className="h-4 w-4 text-brand" aria-hidden />
          Dev Mode
        </span>
      </button>

      <AnimatePresence>
        {devMode && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            className="fixed right-4 top-32 z-40 w-[18rem] rounded-xl border border-white/10 bg-black/70 p-3 text-xs text-white/80 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-white">Diagnostics</p>
              <button type="button" onClick={() => setDevMode(false)} className="text-white/70 hover:text-white">
                close
              </button>
            </div>
            <div className="mt-2 space-y-1">
              <p>
                <span className="text-white/60">FPS:</span> {fps ?? "…"}
              </p>
              <p>
                <span className="text-white/60">Viewport:</span> {viewport ? `${viewport.w}×${viewport.h}` : "…"}
              </p>
              <p>
                <span className="text-white/60">Motion:</span> {reduce ? "reduced" : "full"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 0: HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 hidden md:block">
          <video
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            poster={heroPosterSrc}
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black" />
        </div>

        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.26),transparent_55%)] md:hidden"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black to-black" />

        <div className="container flex min-h-[72vh] flex-col items-center justify-center py-14 text-center md:min-h-[88vh] md:py-20">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-semibold tracking-tight md:text-6xl"
          >
            Mandar Kajbaje
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-4 max-w-3xl text-sm text-white/80 md:text-base"
          >
            Builder of AI‑NIDS • Data Alchemist • MERN Craftsman • Python Builder
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, type: "spring", stiffness: 180 }}
            className="mt-7"
          >
            <button
              type="button"
              onClick={() => scrollToId("story")}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/85",
                "transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand/40",
              )}
            >
              Watch My Journey <ArrowDown className="h-4 w-4" aria-hidden />
            </button>
          </motion.div>

          <p className="mt-6 text-xs text-white/55">
            Add <span className="text-white/75">/about-hero.mp4</span> + <span className="text-white/75">/about-hero-poster.jpg</span> in <span className="text-white/75">public/</span> for the full cinematic effect.
          </p>
        </div>
      </section>

      {/* SECTION 1: STORY */}
      <section id="story" className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.98 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5">
              <div className="flex h-full w-full items-end p-6">
                <div>
                  <p className="text-sm font-semibold text-white">Portrait</p>
                  <p className="mt-1 text-xs text-white/65">
                    Drop a B&W photo into <span className="text-white/80">public/portrait-bw.jpg</span> and swap this placeholder.
                  </p>
                </div>
              </div>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.18),transparent_60%)] blur-2xl"
            />
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">The story</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/80">
              <p>
                I’m Mandar — a final‑year CS student who prefers building real systems over collecting buzzwords.
                I learn by shipping: security tools, ML models, and full‑stack apps that turn ideas into outcomes.
              </p>
              <p>
                I’m obsessed with the intersection of <span className="text-white">security</span>, <span className="text-white">data</span>, and <span className="text-white">product</span> —
                because in the real world, problems don’t stay in one domain.
              </p>
              <p className="text-white/70">If you’re looking for someone who can investigate, reason, and ship — I’m that person.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: TOOLKIT */}
      <section className="container py-12 md:py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">My toolkit (with opinions)</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/75">Not just logos — each tool is here because it earned its place.</p>
          </div>
          <div className="hidden items-center gap-2 text-xs text-white/55 md:flex">
            <Sparkles className="h-4 w-4 text-brand" aria-hidden />
            Hover to flip
          </div>
        </div>

        <div className="mt-8 grid gap-10">
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
      </section>

      {/* SECTION 3: PROOF */}
      <section className="container py-12 md:py-16">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Cold hard proof</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/75">Numbers & outcomes beat adjectives. Customize these with your real metrics.</p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <StatCard label="Apps shipped" end={38} suffix="+" />
          <StatCard label="Records analyzed (UIDAI hackathon)" end={93000} suffix="+" />
          <StatCard label="CTF global rank" prefix="#" end={113} />
        </div>
      </section>

      {/* SECTION 4: AI TRANSPARENCY */}
      <section className="container py-12 md:py-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl border border-brand/25" />
          <div aria-hidden className="pointer-events-none absolute -inset-24 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.18),transparent_60%)]" />

          <div className="relative">
            <div className="flex items-center gap-2 text-white">
              <Code2 className="h-5 w-5 text-brand" aria-hidden />
              <h2 className="text-xl font-semibold tracking-tight">📬 A Note From Me — With Full Transparency &amp; Heart 💡🤖❤️</h2>
            </div>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/80">
              <p>Hi there 👋,</p>
              <p>I’m Mandar Kajbaje — thinker, creator, builder. I believe ideas are everything.</p>
              <p>
                Every project you see here? Born in my mind 💡.
                <br />
                Every concept. Every direction. Every layout. Every vision. 100% mine.
              </p>
              <p>
                And yes — I used AI tools to bring those ideas to life 🤖.
                <br />
                Visuals? AI helped. Copy? AI touched it. Layouts, digital stamps, even this note? Yep — AI was in the room.
              </p>
              <p>
                But here’s what matters:
                <br />
                The soul? The spark? The strategy? The sweat? The edits? The judgment? That’s all me.
              </p>

              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="font-semibold text-white">✅ I consent and confirm:</p>
                <ul className="mt-2 space-y-1.5 text-sm text-white/75">
                  <li>→ All content is accurate, intentional, and true to my vision.</li>
                  <li>→ No false claims: if AI touched it, I say so — proudly.</li>
                  <li>
                    → I don’t claim misleading copyright over raw AI outputs — only over what I shaped, directed, edited, improved, and transformed.
                  </li>
                  <li>→ My digital signature/stamp? AI-assisted — labeled honestly, never disguised.</li>
                </ul>
              </div>

              <p>
                This isn’t an excuse. It’s a declaration.
                <br />
                Not hiding — it’s honesty.
                <br />
                Not regret — it’s respect.
                <br />
                For you. For the craft. For the future of creation.
              </p>

              <p className="text-white/75">
                Let me be crystal clear:
                <br />
                Using AI ≠ pasting a prompt and hitting “generate.”
                <br />
                AI makes mistakes. I catch them.
                <br />
                AI gives rough drafts. I refine them.
                <br />
                AI suggests paths. I choose the right one.
                <br />
                AI delivers “ready-made.” I ask: “Where’s the gap? What’s missing? How can this be better?”
              </p>

              <p>
                I researched. I tested. I broke things. I fixed them.
                <br />
                I compared sources. I restructured. I redesigned. I rewrote.
                <br />
                I didn’t just “use” AI — I collaborated with it.
                <br />
                Guided it. Challenged it. Improved upon it.
                <br />
                All with my human brain 🧠 — fully awake, fully in charge.
              </p>

              <p>
                If that sounds like an excuse to you? Fine.
                <br />
                I say it with pride. With confidence. With ownership.
                <br />
                Because I know the basics of software. I understand systems. I grasp design logic. I speak code-adjacent.
                <br />
                I didn’t outsource my brain — I amplified it.
              </p>

              <p>
                Thank you for being here. Your time? Means the world 🙏.
                <br />
                Let’s keep building — with heart, with tech, and with radical transparency.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-white/80">With grit, gratitude &amp; good vibes,</p>
              <p className="mt-1 text-sm font-semibold text-white">— Mandar Kajbaje</p>
              <p className="mt-2 text-sm text-white/70">✨ Human Ideas × AI Execution ✨</p>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/70">
                <span className="text-white/60">Digital Signature / Stamp:</span>
                <span className="relative inline-flex items-center">
                  <span
                    className={cn(
                      "group rounded-md border border-white/10 bg-black/30 px-2 py-0.5",
                      "focus-within:ring-2 focus-within:ring-brand/40",
                    )}
                    tabIndex={0}
                  >
                    AI-crafted with purpose — shaped by me
                    <span
                      role="tooltip"
                      className={cn(
                        "pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-[16rem] -translate-x-1/2 rounded-lg",
                        "border border-white/10 bg-black/80 p-2 text-xs text-white/80 opacity-0",
                        "transition group-hover:opacity-100 group-focus:opacity-100",
                      )}
                    >
                      Yes, AI helped. No, it didn’t think for me.
                    </span>
                  </span>
                </span>
                <span className="text-white/55">(hover)</span>
              </div>

              <p className="mt-3 text-xs text-white/55">© 2025 — Built by Mandar, powered (not replaced) by AI 💖</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 5: WHAT’S NEXT */}
      <section className="container py-12 md:py-16">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">What’s next?</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/75">A small roadmap — because I’m always building.</p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-white/60">Drag horizontally</p>
            <p className="text-xs text-white/60">Touch‑friendly</p>
          </div>

          <motion.div ref={dragRef} drag={reduce ? false : "x"} dragConstraints={dragBounds} className="mt-4 flex gap-3">
            {timeline.map((item) => (
              <div
                key={item.title}
                className="min-w-[240px] rounded-xl border border-white/10 bg-white/[0.06] p-4 md:min-w-[280px]"
              >
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm text-white/75">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: SAY HI / ROAST ME */}
      <section className="container py-12 md:py-16">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Say hi (or roast my code)</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/75">Love the portfolio? Hate the color scheme? Found a bug? I read every message.</p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white/85",
              "transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand/40",
            )}
          >
            <MessageSquare className="h-4 w-4 text-brand" aria-hidden />
            Send Feedback
          </Link>

          <a
            href="mailto:mandar@example.com?subject=Roast%20My%20Code"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white/85",
              "transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand/40",
            )}
          >
            <Mail className="h-4 w-4 text-brand" aria-hidden />
            Roast My Code
          </a>
        </div>
      </section>

      {/* SECTION 7: VIEW SOURCE */}
      <section className="container pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
          <button type="button" onClick={() => setViewSourceOpen((v) => !v)} className="flex w-full items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5 text-brand" aria-hidden />
              <p className="text-sm font-semibold text-white">View source</p>
            </div>
            <ChevronDown className={cn("h-5 w-5 text-white/60 transition", viewSourceOpen && "rotate-180")} aria-hidden />
          </button>

          <AnimatePresence initial={false}>
            {viewSourceOpen && (
              <motion.div
                initial={reduce ? false : { opacity: 0, height: 0 }}
                animate={reduce ? undefined : { opacity: 1, height: "auto" }}
                exit={reduce ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-2 text-sm text-white/75">
                  <p>Built with Next.js, TypeScript, Tailwind, and Framer Motion.</p>
                  <a
                    href="https://github.com/your-repo"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-brand hover:underline"
                  >
                    View Source on GitHub <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs text-white/55 md:flex-row">
          <Link href="/" className="hover:text-white">
            ← Back to Home
          </Link>
          <a href="https://github.com/your-repo" target="_blank" rel="noreferrer" className="hover:text-white">
            ↑ View Source
          </a>
          <p>
            Built with care by Mandar • <span className="text-white/70">mandar@example.com</span>
          </p>
        </div>
      </section>
    </main>
  );
}
