"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/certifications", label: "Certifications" },
  { href: "/projects", label: "Explore Projects" },
  { href: "/internships", label: "Internships" },
  { href: "/contact", label: "Let's talk" },
  { href: "/about", label: "About" },
];

export default function HeaderNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/55">
      <nav className="container flex items-center justify-center gap-2 py-2">
        <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href as unknown as any}
                className={`relative rounded-full px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-white/15 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_24px_-12px_rgba(124,58,237,0.5)]"
                    : "text-white/85 hover:bg-white/10 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_6px_16px_-10px_rgba(124,58,237,0.45)]"
                }`}
              >
                {active && <span className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-70 nav-glow" />}
                {l.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
