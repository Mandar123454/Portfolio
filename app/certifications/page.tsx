import Link from "next/link";
import Image from "next/image";
import CertModal from "./CertModal";
import SectionsClient from "./SectionsClient";
import {
  Cloud,
  ShieldCheck,
  Shield,
  LineChart,
  Code2,
  BrainCircuit,
  GraduationCap,
  BadgeCheck,
  Calendar,
} from "lucide-react";

export const metadata = {
  title: "Certifications — Mandar Kajbaje",
  description: "Verified certifications, courses, and internships",
};

type Item = {
  title: string;
  provider: string;
  Icon: React.ComponentType<{ className?: string }>;
  href?: string; // external link (unused in image-only modal)
  slug?: string; // internal viewer id
  image?: string; // public path for modal viewing
  issuedOn?: string; // optional human date
};

const CYBERSECURITY: Item[] = [
  {
    title: "CEH v13 — Certified Ethical Hacker",
    provider: "EC‑Council",
    Icon: ShieldCheck,
    slug: "ceh-v13",
    image: "/ECC-CEH-Certificate.png",
    issuedOn: "Apr 2025",
  },
  {
    title: "Complete Ethical Hacking Masterclass",
    provider: "Udemy",
    Icon: GraduationCap,
    slug: "ethical-hacking-masterclass",
    image: "/Ethical%20Hacking.jpg",
    issuedOn: "Jun 2024",
  },
  {
    title: "Real‑Time OS Hacking — Hands‑On Training",
    provider: "NULL CLASS",
    Icon: Shield,
    slug: "os-hacking-nullclass",
    image: "/NullClass-CyberSecurity-Training-Certificate.png",
    issuedOn: "May 2024",
  },
  { title: "EC‑Council CTF (August) — Rank 113 of 3,235", provider: "EC‑Council", Icon: ShieldCheck, slug: "ctf-aug-2025", image: "/CTF%20August%20Certificate.png" },
  { title: "EC‑Council CTF (July) — Rank 206 of 3,009", provider: "EC‑Council", Icon: ShieldCheck, slug: "ctf-jul-2025", image: "/CTF%20July%20Certificate.png" },
];

const DATA_SCIENCE: Item[] = [
  {
    title: "NSDC Data Science",
    provider: "NSDC ×  Skill India Digital Hub",
    Icon: LineChart,
    slug: "nsdc-ds",
    image: "/CAN_37240536_4824911%20(NSDC).png",
    issuedOn: "Mar 2024",
  },
  {
    title: "Data Science Training",
    provider: "Internshala",
    Icon: LineChart,
    slug: "internshala-ds-training",
    image: "/Data%20Science%20Training.png",
    issuedOn: "Feb 2024",
  },
  {
    title: "Real‑Time Emotion Detection — Hands‑On Training",
    provider: "NULL CLASS",
    Icon: BrainCircuit,
    slug: "emotion-detection-nullclass",
    image: "/NullClass-Data%20Science-Training-Certificate.png",
    issuedOn: "May 2024",
  },
  { title: "Python From Zero to Hero", provider: "Udemy", Icon: GraduationCap, slug: "python-zero-hero", image: "/Python%20From%20Zero%20to%20Hero.jpg" },
  { title: "Fundamental of Python Machine Learning", provider: "Udemy", Icon: GraduationCap, slug: "python-ml-fundamentals", image: "/Fundamental%20of%20Python%20Machine%20Learning.jpg" },
];

const OTHER: Item[] = [
  {
    title: "Web Design & Development",
    provider: "NSDC × Skill India Digital Hub",
    Icon: Code2,
    slug: "web-design-sidh",
    image: "/Web%20Design%20%26%20Development%20Certificate%20(SIDH).png",
    issuedOn: "Jan 2024",
  },
  {
    title: "AI + ChatGPT for MS Office",
    provider: "Skill Nation",
    Icon: BrainCircuit,
    slug: "ai-chatgpt-ms-office",
    image: "/AI%20+%20ChatGPT%20For%20MS%20Office.png",
    issuedOn: "Nov 2023",
  },
  {
    title: "Foundational C# with Microsoft",
    provider: "freeCodeCamp × Microsoft",
    Icon: Code2,
    slug: "fcc-csharp",
    image: "/C%23%20Microsoft%20%2B%20Freecodecamp.png",
    href: "https://www.freecodecamp.org/certification/mandar1234/foundational-c-sharp-with-microsoft",
  },
  { title: "Internship & Job Readiness", provider: "Internshala", Icon: BadgeCheck, slug: "internshala-job-readiness", image: "/Internship%20%26%20Job%20Readiness.png" },
  { title: "Full Stack Programming Course", provider: "Udemy", Icon: Code2, slug: "full-stack-programming", image: "/Full%20Stack%20Programming%20Course.jpg" },
  {
    title: "Microsoft Azure Fundamentals",
    provider: "Udemy",
    Icon: Cloud,
    slug: "azure-fundamentals-udemy",
    image: "/Microsoft%20Azure%20Fundamentals.png",
    issuedOn: "Aug 2023",
  },
];

function StatChip({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      <Icon className="h-3.5 w-3.5 text-brand" />
      {children}
    </span>
  );
}

export default function CertificationsPage() {
  const VIEWABLE = [...CYBERSECURITY, ...DATA_SCIENCE, ...OTHER]
    .filter((i) => i.slug && i.image)
    .map((i) => ({ slug: i.slug as string, image: i.image, title: i.title }));
  const cyberCount = CYBERSECURITY.length;
  const dataCount = DATA_SCIENCE.length;
  const otherCount = OTHER.length;
  const totalCount = cyberCount + dataCount + otherCount;
  const lastUpdated = "Oct 2025";
  return (
    <main className="container py-16 md:py-24">
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Certifications</h1>
      <p className="mt-3 max-w-3xl text-white/80">
        A curated collection of industry‑recognized credentials and hands‑on trainings spanning Cybersecurity, Data Science,
        and complementary technologies. Use the category buttons below to view certifications by domain. Tap any item to view
        the certificate in full.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StatChip icon={BadgeCheck}>{totalCount} total</StatChip>
        <StatChip icon={ShieldCheck}>{cyberCount} cybersecurity</StatChip>
        <StatChip icon={LineChart}>{dataCount} data science</StatChip>
        <StatChip icon={Code2}>{otherCount} other</StatChip>
        <StatChip icon={Calendar}>Updated {lastUpdated}</StatChip>
      </div>

      <SectionsClient
        cybersecurity={CYBERSECURITY.map(({ Icon, ...rest }) => ({ ...rest }))}
        dataScience={DATA_SCIENCE.map(({ Icon, ...rest }) => ({ ...rest }))}
        other={OTHER.map(({ Icon, ...rest }) => ({ ...rest }))}
      />
      <CertModal items={VIEWABLE} />
    </main>
  );
}
