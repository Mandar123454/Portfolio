"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Award,
  Briefcase,
  ShieldCheck,
  GraduationCap,
  Globe,
  LayoutGrid,
} from "lucide-react";

const TAGS = [
  "B.Sc CS ’26",
  "20+ Projects",
  "CEH v13",
  "CTF Top 113/3,235",
  "NSDC-DS",
  "Full‑Stack",
  "AI/ML",
];

export function Hero() {
  return (
    <section className="container py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
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

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {TAGS.map((t) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ y: -2, boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 8px 24px rgba(124,58,237,0.25)" }}
              whileTap={{ y: -1 }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition will-change-transform hover:bg-white/7 hover:text-white"
            >
              {t}
            </motion.span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand/30 transition hover:shadow-brand/50"
          >
            Explore Projects <ArrowRight size={16} />
          </a>
          <a
            href="/certifications"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 shadow-md shadow-black/0 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.08)]"
          >
            <Award size={18} /> Certifications
          </a>
          <a
            href="/internships"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 shadow-md shadow-black/0 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.08)]"
          >
            <Briefcase size={18} /> Internships
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 shadow-md shadow-black/0 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.08)]"
          >
            Let’s Talk
          </a>
          <a
            href="https://www.linkedin.com/in/mandar-kajbaje-29988531a/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10 shadow-md shadow-black/0 transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.08)]"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
          <a
            href="https://github.com/Mandar123454?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10 shadow-md shadow-black/0 transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.08)]"
          >
            <Github size={18} /> GitHub
          </a>
        </div>

        {/* Evidence bar */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-white/65">Evidence</span>
          <motion.a
            href="#"
            aria-label="CEH v13 proof (coming soon)"
            whileHover={{ y: -2, boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 8px 24px rgba(124,58,237,0.25)" }}
            whileTap={{ y: -1 }}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70 transition hover:bg-white/7 focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            <ShieldCheck size={14} className="text-brand" /> CEH v13
          </motion.a>
          <motion.a
            href="https://trainings.internshala.com/certificate/view/nsdc/6glr84cp6od/e52s9kdy5a2/"
            target="_blank"
            rel="noreferrer"
            aria-label="View NSDC proof"
            whileHover={{ y: -2, boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 8px 24px rgba(124,58,237,0.25)" }}
            whileTap={{ y: -1 }}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70 transition hover:bg-white/7 focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            <GraduationCap size={14} className="text-brand" /> NSDC
          </motion.a>
          <motion.a
            href="#"
            aria-label="SIDH proof (coming soon)"
            whileHover={{ y: -2, boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 8px 24px rgba(124,58,237,0.25)" }}
            whileTap={{ y: -1 }}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70 transition hover:bg-white/7 focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            <Globe size={14} className="text-brand" /> SIDH
          </motion.a>
          <motion.a
            href="https://www.freecodecamp.org/certification/mandar1234/foundational-c-sharp-with-microsoft"
            target="_blank"
            rel="noreferrer"
            aria-label="View Microsoft proof"
            whileHover={{ y: -2, boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 8px 24px rgba(124,58,237,0.25)" }}
            whileTap={{ y: -1 }}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70 transition hover:bg-white/7 focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            <LayoutGrid size={14} className="text-brand" /> Microsoft
          </motion.a>
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
