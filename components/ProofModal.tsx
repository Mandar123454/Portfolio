"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Download, ExternalLink, X } from "lucide-react";

export type ProofItem = { slug: string; title: string; image?: string };

export default function ProofModal({ items }: { items: ProofItem[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const proof = params.get("proof");
  const current = items.find((i) => i.slug === proof);

  const src = current?.image;
  const hasDoc = Boolean(src);

  const [panel, setPanel] = useState<{ w: number; h: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const isPdf = useMemo(() => {
    if (!src) return false;
    const normalized = (src.split("?")[0] ?? "").toLowerCase();
    return normalized.endsWith(".pdf");
  }, [src]);

  // Touch + screen-size based: works even if user enables browser "desktop site"
  useEffect(() => {
    const checkMobile = () => {
      const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobile(hasTouchScreen && isSmallScreen);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const close = () => {
    const sp = new URLSearchParams(params.toString());
    sp.delete("proof");
    const qs = sp.toString();
    router.push((qs ? `${pathname}?${qs}` : pathname) as any, { scroll: false });
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (current) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, params]);

  // Prevent background scroll and focus close on open
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

  // Compute a tight panel size around the image (max within viewport while preserving aspect ratio)
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
        const headerOffset = 56;
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
    img.src = src as string;
    return () => {
      isActive = false;
      if (recompute) window.removeEventListener("resize", recompute);
    };
  }, [hasDoc, src, isPdf]);

  if (!current) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
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
        {/* Header Bar */}
        <motion.div
          className="flex items-center justify-between gap-2 rounded-t-2xl bg-gradient-to-r from-black/90 via-black/85 to-black/90 border border-white/10 border-b-0 px-3 py-2.5 backdrop-blur-md"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-sm font-medium text-white/90 truncate max-w-[45%] sm:max-w-[60%]">
            {current.title}
          </h3>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {hasDoc && !isMobile ? (
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
            ) : null}
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
          style={
            panel
              ? { width: panel.w, height: panel.h - 52 }
              : { width: "min(96vw, 1200px)", height: "min(85vh, 900px)" }
          }
        >
          <div className="relative h-full w-full rounded-b-[14px] bg-black/70 backdrop-blur-sm overflow-hidden">
            {hasDoc ? (
              isPdf ? (
                isMobile ? (
                  <div className="flex h-full w-full items-center justify-center p-8 text-center">
                    <div className="max-w-md">
                      <p className="text-base font-semibold text-white">PDF preview</p>
                      <p className="mt-2 text-sm text-white/70">Preview is optimized for desktop. This item is best viewed as an image on mobile.</p>
                    </div>
                  </div>
                ) : (
                  <iframe src={src as string} title={current.title} className="h-full w-full rounded-b-[14px]" />
                )
              ) : (
                <div className="relative h-full w-full overflow-auto touch-pan-x touch-pan-y touch-pinch-zoom">
                  <Image
                    src={src as string}
                    alt={current.title}
                    fill
                    className="rounded-b-[14px] object-contain"
                    priority
                    sizes="(max-width: 768px) 96vw, 1200px"
                    unoptimized={Boolean(src?.includes("%20") || src?.includes(" "))}
                  />
                </div>
              )
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
