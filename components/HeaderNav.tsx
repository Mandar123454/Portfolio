"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/certifications", label: "Certifications" },
  { href: "/projects", label: "Explore Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Let's talk" },
  { href: "/about", label: "About" },
];

export default function HeaderNav() {
  const pathname = usePathname();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem("headerNav:swipeHint");
      if (!seen) setShowSwipeHint(true);
    } catch {
      setShowSwipeHint(true);
    }
  }, []);

  useEffect(() => {
    if (!showSwipeHint) return;

    const markSeenAndHide = () => {
      setShowSwipeHint(false);
      try {
        localStorage.setItem("headerNav:swipeHint", "1");
      } catch {}
    };

    const el = scrollerRef.current;
    el?.addEventListener("scroll", markSeenAndHide, { passive: true });
    const t = window.setTimeout(markSeenAndHide, 3500);
    return () => {
      window.clearTimeout(t);
      el?.removeEventListener("scroll", markSeenAndHide as any);
    };
  }, [showSwipeHint]);

  return (
    <header className="sticky top-0 z-30 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/55">
      {/* Unified Nav (mobile + desktop). On small screens it becomes horizontally scrollable. */}
      <nav className="container flex items-center justify-center gap-2 py-1.5" aria-label="Primary">
        <div className="w-full md:w-auto">
          <div className="relative">
            {/* Edge fades (mobile only) to hint horizontal scroll */}
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 rounded-full bg-gradient-to-r from-background/95 to-transparent md:hidden" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 rounded-full bg-gradient-to-l from-background/95 to-transparent md:hidden" />

            <div
              ref={scrollerRef}
              onPointerDown={() => {
                if (!showSwipeHint) return;
                setShowSwipeHint(false);
                try {
                  localStorage.setItem("headerNav:swipeHint", "1");
                } catch {}
              }}
              className="pill-nav-scroll inline-flex w-full items-center justify-start gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.06] p-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] md:justify-center"
            >
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href as unknown as any}
                    className={`relative shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm transition ${
                      active
                        ? "bg-white/15 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_6px_18px_-10px_rgba(124,58,237,0.5)]"
                        : "text-white/85 hover:bg-white/10 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_5px_14px_-10px_rgba(124,58,237,0.45)]"
                    }`}
                  >
                    {active && <span className="pointer-events-none absolute inset-0 -z-10 rounded-lg opacity-70 nav-glow" />}
                    {l.label}
                  </Link>
                );
              })}
            </div>

            {showSwipeHint && (
              <div className="mt-1 px-1 text-center text-[11px] leading-4 text-white/60 md:hidden">
                Swipe left/right to see more
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
