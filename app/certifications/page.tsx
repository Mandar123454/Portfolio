import {
  Cloud,
  ShieldCheck,
  Shield,
  LineChart,
  Code2,
  BrainCircuit,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";

export const metadata = {
  title: "Certifications — Mandar Kajbaje",
  description: "Verified certifications, courses, and internships",
};

type Item = { title: string; provider: string; Icon: React.ComponentType<{ className?: string }>; href?: string };

const CYBERSECURITY: Item[] = [
  { title: "CEH v13 — Certified Ethical Hacker", provider: "EC‑Council", Icon: ShieldCheck, href: "#" },
  { title: "Complete Ethical Hacking Masterclass", provider: "Udemy", Icon: GraduationCap, href: "#" },
  { title: "Real‑Time OS Hacking — Hands‑On Training", provider: "NULL CLASS", Icon: Shield, href: "#" },
  { title: "EC‑Council CTF (August) — Rank 113 of 3,235", provider: "EC‑Council", Icon: ShieldCheck, href: "#" },
];

const DATA_SCIENCE: Item[] = [
  { title: "NSDC Data Science", provider: "NSDC ×  Skill India Digital Hub", Icon: LineChart, href: "#" },
  { title: "Data Science Training", provider: "Internshala", Icon: LineChart, href: "#" },
  { title: "Real‑Time Emotion Detection — Hands‑On Training", provider: "NULL CLASS", Icon: BrainCircuit, href: "#" },
  { title: "Python From Zero to Hero", provider: "Udemy", Icon: GraduationCap, href: "#" },
  { title: "Fundamental of Python Machine Learning", provider: "Udemy", Icon: GraduationCap, href: "#" },
];

const OTHER: Item[] = [
  { title: "Microsoft Azure Fundamentals", provider: "Udemy", Icon: Cloud, href: "#" },
  { title: "Web Design & Development", provider: "NSDC × Skill India Digital Hub", Icon: Code2, href: "#" },
  { title: "AI + ChatGPT for MS Office", provider: "Skill Nation", Icon: BrainCircuit, href: "#" },
  { title: "Foundational C# with Microsoft", provider: "freeCodeCamp × Microsoft", Icon: Code2, href: "#" },
  { title: "Internship & Job Readiness", provider: "Internshala", Icon: BadgeCheck, href: "#" },
  { title: "Full Stack Programming Course", provider: "Udemy", Icon: Code2, href: "#" },
];

function Section({ title, items }: { title: string; items: Item[] }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.map(({ title, provider, Icon, href }) => {
          const content = (
            <div className="group flex items-center gap-4 rounded-xl border border-transparent p-3 transition hover:border-white/10 hover:bg-white/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/5">
                <Icon className="text-brand" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{title}</span>
                <span className="text-xs text-white/70">{provider}</span>
              </div>
            </div>
          );
          return href ? (
            <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {content}
            </a>
          ) : (
            <div key={title}>{content}</div>
          );
        })}
      </div>
    </section>
  );
}

export default function CertificationsPage() {
  return (
    <main className="container py-16 md:py-24">
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Certifications</h1>
      <p className="mt-3 max-w-2xl text-white/80">
        Three pillars: Ethical Hacking & Cybersecurity, Data Science, and everything else that rounds out my toolkit.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Section title="Ethical Hacking & Cybersecurity" items={CYBERSECURITY} />
        <Section title="Data Science" items={DATA_SCIENCE} />
        <Section title="Other Certifications" items={OTHER} />
      </div>
    </main>
  );
}
