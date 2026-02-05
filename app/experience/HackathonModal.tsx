"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { X, ExternalLink, Download } from "lucide-react";

export type HackathonProofItem = {
  slug: string;
  title: string;
  organizer: string;
  rankProof?: string; // PNG/JPG
  participationCertificate?: string; // PDF or image
  certThumb?: string; // Image fallback for mobile PDF viewing (participation certificate)
  rankLabel?: string;
  certLabel?: string;
};

export default function HackathonModal({ items }: { items: HackathonProofItem[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const view = params.get("hackathon");
  const current = items.find((i) => i.slug === view);

  const [panel, setPanel] = useState<{ w: number; h: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const doc = (params.get("doc") as "rank" | "cert" | null) ?? "cert";
  const proofLabel = doc === "rank" ? current?.rankLabel ?? "Rank Proof" : current?.certLabel ?? "Participation Certificate";
  const src = doc === "rank" ? current?.rankProof : current?.participationCertificate;
  const thumb = doc === "cert" ? current?.certThumb : undefined; // Only certs have thumb (rank is usually already an image)
  const hasDoc = Boolean(src);
  const isPdf = useMemo(() => {
    const normalized = ((src ?? "").split("?")[0] ?? "").toLowerCase();
    return normalized.endsWith(".pdf");
  }, [src]);

  // Detect mobile via touch capability + screen size (works even with "desktop mode" enabled)
  useEffect(() => {
    const checkMobile = () => {
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      // Mobile if has touch AND small screen (catches tablets too)
      setIsMobile(hasTouchScreen && isSmallScreen);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const close = () => {
    const sp = new URLSearchParams(params.toString());
    sp.delete("hackathon");
    sp.delete("doc");
    const qs = sp.toString();
    router.push(qs ? `/experience?${qs}` : "/experience", { scroll: false });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (current) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, close]);

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

  // For mobile + PDF: use thumb image dimensions; for desktop PDF: use default size
  const displaySrc = (isMobile && isPdf && thumb) ? thumb : (!isPdf ? src : null);
  useEffect(() => {
    if (!displaySrc) return;
    let isActive = true;
    const img = new window.Image();
    let recompute: (() => void) | null = null;
    img.onload = () => {
      if (!isActive) return;
      recompute = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        // Reserve space for header on mobile
        const headerOffset = isMobile ? 56 : 0;
        const maxW = Math.min(vw - 16, 1200);
        const maxH = Math.min(vh - 16 - headerOffset, 950);
        const ratio = img.naturalWidth / img.naturalHeight || 1.414;
        let w = maxW;
        let h = w / ratio;
        if (h > maxH) {
          h = maxH;
          w = h * ratio;
        }
        setPanel({ w: Math.floor(w), h: Math.floor(h + headerOffset) });
      };
      recompute();
      window.addEventListener("resize", recompute);
    };
    img.src = displaySrc as string;
    return () => {
      isActive = false;
      if (recompute) window.removeEventListener("resize", recompute);
    };
  }, [displaySrc, isMobile]);

  if (!current) return null;

  // Should we show thumb image? (mobile + PDF + thumb available)
  const showThumbOnMobile = isMobile && isPdf && thumb;

  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${current.title} — ${proofLabel}`}
      onClick={close}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative flex flex-col max-h-[96vh]"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        {/* Polished Header Bar - Always visible, never overlaps */}
        <motion.div 
          className="flex items-center justify-between gap-2 rounded-t-2xl bg-gradient-to-r from-black/90 via-black/85 to-black/90 border border-white/10 border-b-0 px-3 py-2.5 backdrop-blur-md"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-sm font-medium text-white/90 truncate max-w-[45%] sm:max-w-[60%]">
            {current.title} — {proofLabel}
          </h3>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {hasDoc && (
              <>
                <a
                  href={src as string}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5 text-[11px] font-medium text-white/90 hover:bg-white/20 transition"
                  title="Open in new tab"
                >
                  <ExternalLink size={12} />
                  <span className="hidden sm:inline">Open</span>
                </a>
                <a
                  href={src as string}
                  download
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5 text-[11px] font-medium text-white/90 hover:bg-white/20 transition"
                  title="Download"
                >
                  <Download size={12} />
                  <span className="hidden sm:inline">Download</span>
                </a>
              </>
            )}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={close}
              ref={closeRef}
              className="inline-flex items-center gap-1 rounded-full bg-red-500/90 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-lg shadow-red-500/20 hover:bg-red-500 transition"
            >
              <X size={12} />
              <span className="hidden sm:inline">Close</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Content Area */}
        <div
          className="rounded-b-2xl bg-gradient-to-r from-brand/40 via-fuchsia-400/20 to-cyan-400/25 p-[2px] shadow-xl shadow-black/30"
          style={panel ? { width: panel.w, height: panel.h - 52 } : { width: "min(96vw, 1200px)", height: "min(85vh, 900px)" }}
        >
          <div className="relative h-full w-full rounded-b-[14px] bg-black/70 backdrop-blur-sm overflow-hidden">
            {hasDoc ? (
              isPdf ? (
                showThumbOnMobile ? (
                  /* Mobile: Always show thumb image in lightviewer */
                  <div className="relative h-full w-full overflow-auto touch-pan-x touch-pan-y touch-pinch-zoom">
                    <Image 
                      src={thumb} 
                      alt={`${current.title} — ${proofLabel}`} 
                      fill 
                      className="rounded-b-[14px] object-contain" 
                      priority 
                      sizes="(max-width: 768px) 96vw, 1200px"
                      unoptimized={thumb.includes('%20') || thumb.includes(' ')}
                    />
                  </div>
                ) : isMobile && !thumb ? (
                  /* Mobile without thumb: fallback message */
                  <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                    <div className="max-w-md">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                        <svg className="h-8 w-8 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/>
                        </svg>
                      </div>
                      <p className="text-base font-semibold text-white">{current.title}</p>
                      <p className="mt-2 text-sm text-white/70">Use the buttons above to open or download this PDF.</p>
                    </div>
                  </div>
                ) : (
                  /* Desktop: Show PDF in iframe */
                  <iframe
                    src={src as string}
                    title={`${current.title} — ${proofLabel}`}
                    className="h-full w-full rounded-b-[14px]"
                  />
                )
              ) : (
                /* Image certificates */
                <div className="relative h-full w-full overflow-auto touch-pan-x touch-pan-y touch-pinch-zoom">
                  <Image 
                    src={src as string} 
                    alt={`${current.title} — ${proofLabel}`} 
                    fill 
                    className="rounded-b-[14px] object-contain" 
                    priority 
                    sizes="(max-width: 768px) 96vw, 1200px"
                    unoptimized={src?.includes('%20') || src?.includes(' ')}
                  />
                </div>
              )
            ) : (
              <div className="flex h-full w-full items-center justify-center p-8 text-center">
                <div>
                  <p className="text-base font-semibold text-white">Proof file not set</p>
                  <p className="mt-2 text-sm text-white/70">Add a PDF/PNG/JPG path for this hackathon entry in the data.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
