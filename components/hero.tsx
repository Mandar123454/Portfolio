"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Award,
  Briefcase,
} from "lucide-react";

const TAGS = [
  "B.Sc CS ’26",
  "20+ Projects",
  "CEH v13",
  "NSDC Data Science",
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
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-brand"></span>
          Class of 2026
        </div>

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
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
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
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
          >
            <Award size={18} /> Certifications
          </a>
          <a
            href="/internships"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
          >
            <Briefcase size={18} /> Internships
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
          >
            Let’s Talk
          </a>
          <a
            href="https://www.linkedin.com/in/mandar-kajbaje-29988531a/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
          <a
            href="https://github.com/Mandar123454?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
          >
            <Github size={18} /> GitHub
          </a>
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
