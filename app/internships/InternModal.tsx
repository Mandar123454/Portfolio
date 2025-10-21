"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";

export type InternDocItem = {
  slug: string;
  title: string;
  certImage?: string; // Internship certificate (preview default)
  lorImage?: string;  // Letter of Recommendation
};

export default function InternModal({ items }: { items: InternDocItem[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const slug = params.get("intern");
  const doc = (params.get("doc") as "cert" | "lor" | null) || "cert";
  const current = items.find((i) => i.slug === slug);

  // Choose the active image based on the requested doc; fallback to available one
  const active = useMemo(() => {
    if (!current) return { src: undefined as string | undefined, kind: doc };
    const wanted = doc === "lor" ? current.lorImage : current.certImage;
    if (wanted) return { src: wanted, kind: doc };
    // Fallback if requested doc missing
    const alt = doc === "lor" ? current.certImage : current.lorImage;
    return { src: alt, kind: alt === current.lorImage ? "lor" : "cert" as const };
  }, [current, doc]);

  // Panel sizing
  const [panel, setPanel] = useState<{ w: number; h: number } | null>(null);
  const hasImage = Boolean(active.src);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/internships", { scroll: false });
    };
    if (current) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, router]);

  // Scroll lock and focus management
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!current) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [current]);

  // Measure to fit image within viewport preserving aspect ratio
  useEffect(() => {
    if (!hasImage || !active.src) return;
    let isActive = true;
    const img = new window.Image();
    let recompute: (() => void) | null = null;
    img.onload = () => {
      if (!isActive) return;
      recompute = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const maxW = Math.min(vw - 16, 1200);
        const maxH = Math.min(vh - 16, 950);
        const ratio = img.naturalWidth / img.naturalHeight || 1.414;
        let w = maxW;
        let h = w / ratio;
        if (h > maxH) {
          h = maxH;
          w = h * ratio;
        }
        setPanel({ w: Math.floor(w), h: Math.floor(h) });
      };
      recompute();
      window.addEventListener("resize", recompute);
    };
    img.src = active.src as string;
    return () => {
      isActive = false;
      if (recompute) window.removeEventListener("resize", recompute);
    };
  }, [active.src, hasImage]);

  if (!current) return null;

  const close = () => router.push("/internships", { scroll: false });

  const titleSuffix = active.kind === "lor" ? " — Letter of Recommendation" : " — Internship Certificate";

  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${current.title}${titleSuffix}`}
      onClick={close}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <div
          className="relative rounded-2xl bg-gradient-to-r from-brand/40 via-fuchsia-400/20 to-cyan-400/25 p-[2px] shadow-xl shadow-black/30"
          style={panel ? { width: panel.w, height: panel.h } : { width: "min(96vw, 1200px)", height: "min(92vh, 950px)" }}
        >
          {/* Close sits slightly outside the inner image area to avoid overlap */}
          <div className="absolute -right-2 -top-2 z-[2]">
            <motion.button
              type="button"
              whileHover={{ y: -1, backgroundColor: "#ef4444" }}
              whileTap={{ y: 0 }}
              onClick={close}
              ref={closeRef}
              className="inline-flex items-center gap-1 rounded-full bg-red-500/95 px-3 py-1.5 text-[12px] font-semibold text-white shadow-lg shadow-black/30 ring-1 ring-red-300/50"
            >
              Close <X size={14} />
            </motion.button>
          </div>
          <div className="relative h-full w-full rounded-[1rem] bg-black/65 backdrop-blur-sm overflow-hidden">
            {hasImage ? (
              <Image src={active.src as string} alt={`${current.title}${titleSuffix}`} fill className="rounded-[1rem] object-contain" priority sizes="100vw" />
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
