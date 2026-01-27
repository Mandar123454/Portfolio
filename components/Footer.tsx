import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-6 border-t border-white/10 py-6">
      <div className="container flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label="Portfolio">
            <img src="/icons/portfolio.svg" alt="MK Portfolio" className="h-7 w-7" />
          </Link>
          <a href="https://www.linkedin.com/in/mandar-kajbaje" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img src="/icons/linkedin.svg" alt="LinkedIn" className="h-6 w-6" />
          </a>
          <a href="https://github.com/Mandar123454" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <img src="/icons/github.svg" alt="GitHub" className="h-6 w-6" />
          </a>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/70">
          <Link className="hover:text-white" href="/contact">Contact</Link>
          <Link className="hover:text-white" href="/terms">Terms</Link>
          <Link className="hover:text-white" href="/privacy">Privacy</Link>
          <Link className="hover:text-white" href="/cookies">Manage cookies</Link>
          <Link className="hover:text-white" href="/do-not-share">Do not share</Link>
          <Link className="hover:text-white" href="/security">Security</Link>
          <Link className="hover:text-white" href="/status">Status</Link>
          <Link className="hover:text-white" href="/docs">Docs</Link>
          <Link className="hover:text-white" href="/community">Community</Link>
        </nav>

        <p className="text-xs text-white/60">© 2026 Mandar Kajbaje. All rights reserved.</p>
      </div>
    </footer>
  );
}
