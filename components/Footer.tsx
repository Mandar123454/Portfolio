import Link from "next/link";
import dynamic from "next/dynamic";

const AzureStatus = dynamic(() => import("@/components/azure-status"), { ssr: false });

export default function Footer() {
  return (
  <footer className="mt-4 py-3.5">
      <div className="container flex flex-col items-center gap-3">
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
          <AzureStatus />
        </div>
        <p className="text-xs text-white/60">© 2025 Mandar Kajbaje. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
