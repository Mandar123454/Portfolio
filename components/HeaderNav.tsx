"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-30 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/55">
      {/* Desktop Nav */}
      <nav className="container hidden md:flex items-center justify-center gap-2 py-1.5">
        <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href as unknown as any}
                className={`relative rounded-lg px-2.5 py-1.5 text-sm transition ${
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
      </nav>

      {/* Mobile Nav */}
      <nav className="md:hidden flex items-center justify-between px-4 py-2">
        <Link href="/" className="text-lg font-bold text-white">MK</Link>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/15 transition"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="md:hidden fixed inset-0 top-[52px] z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            {/* Menu Panel */}
            <motion.div
              className="md:hidden fixed top-[52px] left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-white/10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col p-4 gap-1">
                {links.map((l) => {
                  const active = pathname === l.href;
                  return (
                    <Link
                      key={l.href}
                      href={l.href as unknown as any}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-xl px-4 py-3 text-base font-medium transition ${
                        active
                          ? "bg-brand/20 text-white border border-brand/30"
                          : "text-white/85 hover:bg-white/10"
                      }`}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
