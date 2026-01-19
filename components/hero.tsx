"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

type Testimonial = {
  org: string;
  role: string;
  quote: string;
  note?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    org: "NullClass",
    role: "Cybersecurity Intern",
    quote:
      "Demonstrated interest and learning in real-time OS security. Actively participated — showed keen ability to learn.",
  },
  {
    org: "NullClass",
    role: "Data Science Intern",
    quote:
      "Contributed to building a real-time emotional detector. Showed potential in applying DS techniques + teamwork.",
  },
  {
    org: "Main Flow Services",
    role: "MERN Stack Intern",
    quote:
      "Exceptional performance. Hard work, dedication, enthusiasm set you apart — equipped with essential skills for future success.",
  },
];

export function Hero() {
  return (
  <section className="container relative pt-10 pb-8 md:pt-14 md:pb-10">
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

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="mx-auto mt-8 max-w-5xl text-left"
        >
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wider text-white/65">Testimonials</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Real feedback — verified, not exaggerated
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/75">
              Short notes from real internship experience.
            </p>
          </div>

          {/* Mobile: swipeable cards. Desktop: 3-column grid. */}
          <div className="mt-5">
            <div className="mb-2 text-xs text-white/55 lg:hidden">Swipe</div>
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scroll-px-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-3 lg:overflow-visible lg:px-0">
              {TESTIMONIALS.map((t) => (
                <div
                  key={`${t.org}-${t.role}`}
                  className="min-w-[86%] snap-start rounded-2xl border border-white/10 bg-white/[0.06] p-5 lg:min-w-0"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{t.org}</p>
                      <p className="mt-0.5 text-xs text-white/65">{t.role}</p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/25">
                      <Quote className="h-4 w-4 text-brand" aria-hidden />
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">“{t.quote}”</p>
                  {t.note ? <p className="mt-3 text-xs text-white/55">{t.note}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.25),transparent_60%)] blur-2xl"
      />

    </section>
  );
}

