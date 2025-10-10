import { Briefcase, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Internships — Mandar Kajbaje",
  description: "Online internships and practical experience.",
};

type Internship = {
  company: string;
  role: string;
  mode: "Online" | "Remote" | "Hybrid" | "Onsite";
  dates: string;
  stack?: string[];
  highlights: string[];
  link?: string;
};

const INTERNSHIPS: Internship[] = [
  // Populate with your real data; placeholders below
  {
    company: "Ed‑Tech Platform (Example)",
    role: "Data Science Intern",
    mode: "Online",
    dates: "Jun 2024 – Aug 2024",
    stack: ["Python", "Pandas", "Excel", "PowerPoint"],
    highlights: [
      "Designed and analyzed student surveys; delivered insights with visuals",
      "Built dashboards and presented findings to stakeholders",
    ],
    link: "#",
  },
  {
    company: "Security Lab (Example)",
    role: "Cybersecurity Intern",
    mode: "Online",
    dates: "Jan 2024 – Mar 2024",
    stack: ["CEH Toolkit", "Browser Security", "Automation"],
    highlights: [
      "Developed phishing detection Chrome extension prototype",
      "Documented attack vectors and mitigations",
    ],
    link: "#",
  },
];

export default function InternshipsPage() {
  return (
    <main className="container py-24 md:py-32">
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Internships</h1>
      <p className="mt-3 max-w-2xl text-white/80">All internships completed online, focused on building real solutions fast.</p>

      <div className="mt-10 grid grid-cols-1 gap-6">
        {INTERNSHIPS.map((it) => (
          <article key={it.company} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/5">
                  <Briefcase className="text-brand" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{it.role} • {it.company}</h2>
                  <p className="text-xs text-white/70">{it.mode} • {it.dates}</p>
                </div>
              </div>
              {it.link && (
                <a href={it.link} target={it.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/90 hover:bg-white/10">
                  View <ExternalLink size={14} />
                </a>
              )}
            </div>

            {it.stack && it.stack.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {it.stack.map((s) => (
                  <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80">{s}</span>
                ))}
              </div>
            )}

            <ul className="mt-4 list-disc space-y-1 pl-6 text-sm text-white/85">
              {it.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
