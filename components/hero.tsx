"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, GraduationCap, Globe, LayoutGrid, Flame, Trophy } from "lucide-react";


export function Hero() {
  return (
  <section className="container pt-10 pb-8 md:pt-14 md:pb-10">
      <motion.div className="text-center">
        <motion.div
          whileHover={{ y: -1, boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 6px 18px rgba(255,255,255,0.14)" }}
          whileTap={{ y: -0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:bg-white/7"
        >
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-brand"></span>
          Class of 2026
        </motion.div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">
          Hi, I’m <span className="text-brand">Mandar Kajbaje</span> — Full‑Spectrum Technologist & Certified Builder
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80 md:text-base">
          I turn theory into tools, data into decisions, and code into impact. From ML predictions to ethical hacking and full‑stack systems, I build, break, analyze, and rebuild smarter—fast and clean.
        </p>

        {/* Tags removed per request — evidence chips remain below */}

        {/* Polished snapshot and "What I do" */}
        <div className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-3 text-left">
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
            <h3 className="text-sm font-semibold text-white">Snapshot</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              B.Sc Computer Science ’26 • Certified Ethical Hacker (CEH v13) • 20+ shipped projects • Ranked Top 113 / 3,235 in CTFs.
              I design and ship pragmatic, production-ready solutions across AI/ML, full-stack web, and security — with clean code,
              rapid iteration, and measurable impact.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
            <h3 className="text-sm font-semibold text-white">What I do</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-white/85">
              <li>🔍 Predictive ML features that drive decisions</li>
              <li>🔐 Secure, scalable web apps with defense-in-depth</li>
              <li>⚙️ Automation tools that turn ideas into outcomes — fast</li>
            </ul>
            <p className="mt-2 text-sm text-white/70">I measure everything. Harden surfaces. Iterate with evidence.</p>
          </div>
        </div>

        {/* Evidence bar */}
  <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-white/65">Evidence</span>
          {/* CTF evidence (open local modal) */}
          <Link href={{ pathname: "/", query: { proof: "ctf-aug-2025" } }} scroll={false} className="inline-block" aria-label="View CTF rank proof">
            <motion.span
              whileHover={{ y: -2, boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 8px 24px rgba(124,58,237,0.25)" }}
              whileTap={{ y: -1 }}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70 transition hover:bg-white/7 focus:outline-none focus:ring-2 focus:ring-brand/40"
            >
              <Trophy size={14} className="text-brand" /> CTF Top 113/3,235
            </motion.span>
          </Link>
          {/* CEH */}
          <Link href={{ pathname: "/", query: { proof: "ceh-v13" } }} scroll={false} className="inline-block" aria-label="View CEH v13 proof">
            <motion.span
              whileHover={{ y: -2, boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 8px 24px rgba(124,58,237,0.25)" }}
              whileTap={{ y: -1 }}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70 transition hover:bg-white/7 focus:outline-none focus:ring-2 focus:ring-brand/40"
            >
              <ShieldCheck size={14} className="text-brand" /> CEH v13
            </motion.span>
          </Link>
          {/* NSDC */}
          <Link href={{ pathname: "/", query: { proof: "nsdc-ds" } }} scroll={false} className="inline-block" aria-label="View NSDC proof">
            <motion.span
              whileHover={{ y: -2, boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 8px 24px rgba(124,58,237,0.25)" }}
              whileTap={{ y: -1 }}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70 transition hover:bg-white/7 focus:outline-none focus:ring-2 focus:ring-brand/40"
            >
              <GraduationCap size={14} className="text-brand" /> NSDC-DS
            </motion.span>
          </Link>
          {/* SIDH */}
          <Link href={{ pathname: "/", query: { proof: "web-design-sidh" } }} scroll={false} className="inline-block" aria-label="View SIDH proof">
            <motion.span
              whileHover={{ y: -2, boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 8px 24px rgba(124,58,237,0.25)" }}
              whileTap={{ y: -1 }}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70 transition hover:bg-white/7 focus:outline-none focus:ring-2 focus:ring-brand/40"
            >
              <Globe size={14} className="text-brand" /> SIDH
            </motion.span>
          </Link>
          {/* Microsoft */}
          <Link href={{ pathname: "/", query: { proof: "fcc-csharp" } }} scroll={false} className="inline-block" aria-label="View Microsoft proof">
            <motion.span
              whileHover={{ y: -2, boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 8px 24px rgba(124,58,237,0.25)" }}
              whileTap={{ y: -1 }}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70 transition hover:bg-white/7 focus:outline-none focus:ring-2 focus:ring-brand/40"
            >
              <LayoutGrid size={14} className="text-brand" /> Microsoft
            </motion.span>
          </Link>
          {/* freeCodeCamp */}
          <Link href={{ pathname: "/", query: { proof: "fcc-csharp" } }} scroll={false} className="inline-block" aria-label="View freeCodeCamp proof">
            <motion.span
              whileHover={{ y: -2, boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 8px 24px rgba(124,58,237,0.25)" }}
              whileTap={{ y: -1 }}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70 transition hover:bg-white/7 focus:outline-none focus:ring-2 focus:ring-brand/40"
            >
              <Flame size={14} className="text-brand" /> freeCodeCamp
            </motion.span>
          </Link>
          {/* See all proofs LAST */}
          <Link href="/certifications" className="inline-block">
            <motion.span
              whileHover={{ y: -2, boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 8px 24px rgba(124,58,237,0.25)" }}
              whileTap={{ y: -1 }}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/75 transition hover:bg-white/7 focus:outline-none focus:ring-2 focus:ring-brand/40"
            >
              <LayoutGrid size={14} className="text-brand" /> See all proofs
            </motion.span>
          </Link>
        </div>
      </motion.div>

      {/* Subtle gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.25),transparent_60%)] blur-2xl"
      />

    </section>
  );
}

