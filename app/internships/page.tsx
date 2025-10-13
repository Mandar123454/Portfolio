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
  {
    company: "NullClass",
    role: "Cybersecurity Intern",
    mode: "Remote",
    dates: "Jul 2025 – Sep 2025",
    stack: [
      "Kali Linux",
      "Nmap",
      "Burp Suite",
      "Gobuster",
      "Python",
      "CIS-CAT",
      "Windows Security Policy",
    ],
    highlights: [
      "Performed full penetration testing on a Windows-based HackTheBox machine using reconnaissance, enumeration, and exploitation techniques.",
      "Discovered and exploited a Local File Inclusion (LFI) vulnerability to gain shell access and escalate privileges.",
      "Created a custom Python script (lfi.py) for automated vulnerability exploitation and file retrieval.",
      "Conducted a system hardening assessment using CIS-CAT on Windows 11, improving security compliance from 20% to 70%.",
      "Applied remediation through Local Security Policy and Group Policy Editor, addressing critical issues like SMBv1 and Guest Account vulnerabilities.",
      "Documented all findings, results, and remediations in professional cybersecurity reports and attack flow diagrams.",
    ],
    // link: "#", // Optional: add proof/report link when available
  },
  {
    company: "Main Flow",
    role: "MERN Stack Intern",
    mode: "Remote",
    dates: "Aug 2025 – Oct 2025",
    stack: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    highlights: [
      "Completed six key projects demonstrating end-to-end MERN stack development skills.",
      "Task 1 – Basic React Application: Built an interactive frontend using components, props, and state management.",
      "Task 2 – Movie Website: Designed a dynamic movie browsing site with API integration to fetch and display movie data.",
      "Task 3 – CRUD with MongoDB: Implemented Create, Read, Update, and Delete operations using Express.js, Node.js, and MongoDB.",
      "Task 4 – Login Page: Created a functional login interface with input validation and session simulation.",
      "Task 5 – Dynamic Login Form (JavaScript): Developed a form with real-time validation, error handling, and responsive UI behavior.",
      "Task 6 – E-Commerce (MERN): Built a full-stack shopping platform with product listing, cart, and authentication modules using MongoDB, Express, React, and Node.",
      "Documented project setup and run guidelines for each task to ensure smooth local deployment and execution.",
    ],
    // link: "#", // Optional: add portfolio/proof link when available
  },
  {
    company: "NullClass",
    role: "Data Science Intern",
    mode: "Remote",
    dates: "Sep 24, 2025 – Nov 24, 2025",
    stack: [
      "Python",
      "OpenCV",
      "TensorFlow",
      "Keras",
      "Pandas",
      "NumPy",
      "Matplotlib",
    ],
    highlights: [
      "Developed six real-time machine learning models including Attendance, Animal, Drowsiness, Nationality, Sign Language, and Car Color Detection systems.",
      "Built a Student Attendance System using face and emotion recognition, automating attendance logging into Excel with real-time timestamps.",
      "Designed an Animal Detection Model to classify multiple animals in frames, highlighting carnivores and generating count-based alerts via GUI.",
      "Implemented a Drowsiness Detection System to detect sleepy drivers and predict age using image/video inputs with visual alerts.",
      "Created a Nationality Detection Model predicting nationality, age, dress color, and emotion based on region-specific logic.",
      "Developed a Sign Language Recognition System operational during specific hours (6 PM–10 PM) using deep learning and image processing.",
      "Built a Car Color Detection Model to detect car colors, count vehicles, and identify nearby pedestrians at traffic signals.",
      "Learned to build real-time emotion detection applications integrating multiple ML models with GUIs and live video feeds.",
    ],
    // link: "#", // Optional: add portfolio/proof link when available
  },
];

export default function InternshipsPage() {
  return (
    <main className="container py-16 md:py-24">
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Internships</h1>
      <p className="mt-3 max-w-2xl text-white/80">All internships completed online, focused on building real solutions fast.</p>

  <div className="mt-8 grid grid-cols-1 gap-6">
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
              {it.link ? (
                <a
                  href={it.link}
                  target={it.link.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/90 hover:bg-white/10"
                >
                  View <ExternalLink size={14} />
                </a>
              ) : (
                <span
                  className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 opacity-60 cursor-not-allowed"
                  title="Link coming soon"
                >
                  View <ExternalLink size={14} />
                </span>
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
