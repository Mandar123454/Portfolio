"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Explore Projects" },
  { href: "/internships", label: "Internships" },
  { href: "/contact", label: "Let's talk" },
  { href: "/about", label: "About" },
];

export default function HeaderNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex items-center justify-center gap-2 py-3">
        <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href as unknown as any}
                className={`rounded-full px-3 py-1.5 text-sm transition ${active ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
