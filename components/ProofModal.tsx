"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";

export type ProofItem = { slug: string; title: string; image?: string };

export default function ProofModal({ items }: { items: ProofItem[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const proof = params.get("proof");
  const current = items.find((i) => i.slug === proof);
  // Panel size state must be declared before any conditional returns (hook order)
  const [panel, setPanel] = useState<{ w: number; h: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const src = current?.image;
  const hasDoc = Boolean(src);
  const isPdf = useMemo(() => {
    if (!src) return false;
    const normalized = (src.split("?")[0] ?? "").toLowerCase();
    return normalized.endsWith(".pdf");
  }, [src]);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/", { scroll: false });
    };
    if (current) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, router]);
  // Prevent background scroll while open and manage focus
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!current) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus close button on open for keyboard users
    setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [current]);

  useEffect(() => {
    if (!hasDoc || !src || isPdf) return;
    let isActive = true;
    const img = new window.Image();
    let recompute: (() => void) | null = null;
    img.onload = () => {
      if (!isActive) return;
      recompute = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const maxW = Math.min(vw - 16, 1200); // slightly larger, smaller outer margin
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
    img.src = src as string;
    return () => {
      isActive = false;
      if (recompute) window.removeEventListener("resize", recompute);
    };
  }, [src, hasDoc, isPdf]);

  if (!current) return null;

  const close = () => router.push("/", { scroll: false });

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
            <div className="absolute right-3 top-3 z-[2] flex items-center gap-2">
              {hasDoc ? (
                <>
                  <a
                    href={src as string}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[12px] font-semibold text-white/95 shadow-lg shadow-black/30 backdrop-blur-sm hover:bg-black/55"
                    title="Open in new tab"
                  >
                    Open
                  </a>
                  <a
                    href={src as string}
                    download
                    className="inline-flex items-center rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[12px] font-semibold text-white/95 shadow-lg shadow-black/30 backdrop-blur-sm hover:bg-black/55"
                    title="Download"
                  >
                    Download
                  </a>
                </>
              ) : null}
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

            {hasDoc ? (
              isPdf ? (
                isMobile ? (
                  <div className="flex h-full w-full items-center justify-center p-8 text-center">
                    <div className="max-w-md">
                      <p className="text-base font-semibold text-white">PDF preview</p>
                      <p className="mt-2 text-sm text-white/70">On some mobile browsers, PDFs open more reliably in a new tab.</p>
                      <div className="mt-4 flex items-center justify-center gap-2">
                        <a
                          href={src as string}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
                        >
                          Open PDF
                        </a>
                        <a
                          href={src as string}
                          download
                          className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <iframe src={src as string} title={current.title} className="h-full w-full rounded-[1rem]" />
                )
              ) : (
                <Image src={src as string} alt={current.title} fill className="rounded-[1rem] object-contain" priority sizes="100vw" />
              )
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
