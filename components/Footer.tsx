import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 py-8">
      <div className="container flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label="Portfolio">
            <span className="inline-block h-6 w-6 rounded bg-brand/90" />
          </Link>
          <a href="https://www.linkedin.com/in/mandar-kajbaje" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img src="/icons/linkedin.svg" alt="LinkedIn" className="h-6 w-6" />
          </a>
          <a href="https://github.com/Mandar123454" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <img src="/icons/github.svg" alt="GitHub" className="h-6 w-6" />
          </a>
        </div>
        <p className="text-xs text-white/60">© 2025 Mandar Kajbaje. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
