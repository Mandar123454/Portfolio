"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Maximize } from "lucide-react";

export type DemoItem = {
  slug: string;
  title: string;
  embedUrl?: string; // youtube-nocookie embed URL
  poster?: string; // poster image (YouTube-derived)
};

export default function VideoModal({ items }: { items: DemoItem[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const demo = params.get("demo");
  const current = items.find((i) => i.slug === demo);

  const [panel, setPanel] = useState<{ w: number; h: number } | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  // HTML5 fallback removed; using YouTube-only embeds.

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/projects", { scroll: false });
    };
    if (current) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, router]);

  // Prevent background scroll while open and manage focus
  useEffect(() => {
    if (!current) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [current]);

  // Compute panel size for typical 16:9 video
  useEffect(() => {
    if (!current) return;
    const recompute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const maxW = Math.min(vw - 16, 1200);
      const maxH = Math.min(vh - 16, 950);
      const ratio = 16 / 9;
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
    return () => window.removeEventListener("resize", recompute);
  }, [current]);

  const close = () => router.push("/projects", { scroll: false });
  const hasVideo = Boolean(current?.embedUrl);
  const hasPoster = Boolean(current?.poster);

  // Compute iframe src with permanent mute (and optional autoplay)
  // Use provided embed URL when present (YouTube nocookie with params)
  const embedSrc = current?.embedUrl;

  // No HTML5 video; mute is enforced via YouTube embed params.

  // Guard rendering after hooks are declared to keep hook order stable
  if (!current) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
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
          className="rounded-2xl bg-gradient-to-r from-brand/40 via-fuchsia-400/20 to-cyan-400/25 p-[2px] shadow-xl shadow-black/30"
          style={panel ? { width: panel.w, height: panel.h } : { width: "min(96vw, 1200px)", height: "min(92vh, 950px)" }}
        >
          <div className="relative h-full w-full rounded-[1rem] bg-black/65 backdrop-blur-sm overflow-hidden">
            <div className="absolute right-3 top-3 z-[1]">
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
            {/* Video content */}
            {embedSrc ? (
              <iframe
                src={embedSrc}
                title={current.title}
                className="h-full w-full rounded-[1rem]"
                allow="autoplay; fullscreen; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : hasPoster ? (
              <img src={current.poster} alt={current.title} className="h-full w-full rounded-[1rem] object-contain bg-black/60" />
            ) : (
              <div className="flex h-full w-full items-center justify-center p-6 text-center text-white/80">
                <p className="text-sm">Demo video will appear here once linked.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
