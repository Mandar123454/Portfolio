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
  // Add internship certificates here when available
];

const DATA_SCIENCE: Item[] = [
  { title: "NSDC Data Science", provider: "NSDC & Internshala", Icon: LineChart, href: "#" },
  { title: "Data Science Training", provider: "Internshala", Icon: LineChart, href: "#" },
  // Add internship certificates here when available
];

const OTHER: Item[] = [
  { title: "Microsoft Azure Fundamentals", provider: "Microsoft", Icon: Cloud, href: "#" },
  { title: "Web Development", provider: "Skill India Digital Hub", Icon: Code2, href: "#" },
  { title: "AI + ChatGPT for MS Office", provider: "Skill Nation", Icon: BrainCircuit, href: "#" },
  { title: "Internship & Job Readiness", provider: "Internshala", Icon: BadgeCheck, href: "#" },
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
    <main className="container py-24 md:py-32">
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Certifications</h1>
      <p className="mt-3 max-w-2xl text-white/80">
        Three pillars: Ethical Hacking & Cybersecurity, Data Science, and everything else that rounds out my toolkit.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Section title="Ethical Hacking & Cybersecurity" items={CYBERSECURITY} />
        <Section title="Data Science" items={DATA_SCIENCE} />
        <Section title="Other Certifications & Internships" items={OTHER} />
      </div>
    </main>
  );
}
