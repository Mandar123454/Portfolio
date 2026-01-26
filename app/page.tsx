import { Hero } from "@/components/hero";
import ProofModal, { ProofItem } from "@/components/ProofModal";

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
        <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
            <p className="text-sm text-white/80">
              If you’re hiring or collaborating, tell me the outcome you want — I’ll reply with a clear plan and the strongest proof I can share.
            </p>
        </div>
      </section>

      <ProofModal items={PROOFS} />
    </main>
  );
}
