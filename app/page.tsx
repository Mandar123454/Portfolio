import { Hero } from "@/components/hero";
import ProofModal, { ProofItem } from "@/components/ProofModal";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Briefcase, FolderKanban, Mail } from "lucide-react";

export default function HomePage() {
  const PROOFS: ProofItem[] = [
    { slug: "ctf-aug-2025", title: "EC‑Council CTF (August)", image: "/CTF%20August%20Certificate.png" },
    { slug: "ceh-v13", title: "CEH v13 — Certified Ethical Hacker", image: "/ECC-CEH-Certificate.png" },
    { slug: "nsdc-ds", title: "NSDC Data Science", image: "/CAN_37240536_4824911%20(NSDC).png" },
    { slug: "web-design-sidh", title: "Web Design & Development", image: "/Web%20Design%20%26%20Development%20Certificate%20(SIDH).png" },
    { slug: "fcc-csharp", title: "Foundational C# with Microsoft", image: "/C%23%20Microsoft%20%2B%20Freecodecamp.png" },
  ];
  return (
    <main>
      <Hero />

      <section className="container pb-10 md:pb-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-white/65">Proof-driven portfolio</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Certified learning. Real projects. Verifiable impact.
              </h2>
              <p className="mt-2 text-sm text-white/75">
                I don’t collect certificates for show — I learn, implement, and document. Every proof here connects to a real skill: security practice, data work, or full‑stack delivery.
              </p>
            </div>

            <div className="hidden shrink-0 md:block">
              <div aria-hidden className="h-24 w-24 rounded-2xl border border-white/10 bg-black/25" />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/certifications"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand/80 to-fuchsia-500/60 px-3 py-1.5 text-xs font-medium text-white shadow-sm ring-1 ring-white/15 hover:brightness-110"
            >
              <BadgeCheck className="h-4 w-4" aria-hidden />
              Certifications
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/80 to-violet-500/60 px-3 py-1.5 text-xs font-medium text-white shadow-sm ring-1 ring-white/15 hover:brightness-110"
            >
              <Briefcase className="h-4 w-4" aria-hidden />
              Experience
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/80 to-teal-500/60 px-3 py-1.5 text-xs font-medium text-white shadow-sm ring-1 ring-white/15 hover:brightness-110"
            >
              <FolderKanban className="h-4 w-4" aria-hidden />
              Projects
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400/80 to-rose-400/60 px-3 py-1.5 text-xs font-medium text-white shadow-sm ring-1 ring-white/15 hover:brightness-110"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Contact
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/25 px-4 py-3">
            <p className="text-sm text-white/80">
              If you’re hiring or collaborating, tell me the outcome you want — I’ll reply with a clear plan and the strongest proof I can share.
            </p>
          </div>
        </div>
      </section>

      <ProofModal items={PROOFS} />
    </main>
  );
}
