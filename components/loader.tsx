"use client";

import { motion } from "framer-motion";

export function Loader() {
  return (
    <div className="relative grid place-items-center">
      <motion.div
        aria-hidden
        className="h-12 w-12 rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-brand via-white to-brand blur-[2px]"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      />
      <div className="absolute h-9 w-9 rounded-full border border-white/20 bg-black/50 backdrop-blur" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
