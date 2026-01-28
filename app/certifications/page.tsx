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

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const metadata = {
  title: "Certifications — Mandar Kajbaje",
  description: "Verified certifications, courses, and internships",
  alternates: { canonical: `${site}/certifications` },
};

type Item = {
  title: string;
  provider: string;
  Icon: React.ComponentType<{ className?: string }>;
  href?: string; // external link (unused in image-only modal)
  slug?: string; // internal viewer id
  image?: string; // public path for modal viewing (image or PDF)
  thumb?: string; // optional thumbnail path for cards (when image is a PDF)
  issuedOn?: string; // optional human date
};

const CYBERSECURITY: Item[] = [
  {
    title: "CEH v13 — Certified Ethical Hacker",
    provider: "EC‑Council",
    Icon: ShieldCheck,
    slug: "ceh-v13",
    image: "/pdf_certificates/CEH v13 — Certified Ethical Hacker.pdf",
    thumb: "/ECC-CEH-Certificate.png",
    issuedOn: "July 2025",
  },
  {
    title: "Complete Ethical Hacking Masterclass",
    provider: "Udemy",
    Icon: GraduationCap,
    slug: "ethical-hacking-masterclass",
    image: "/pdf_certificates/Complete Ethical Hacking Masterclass.pdf",
    thumb: "/Ethical%20Hacking.jpg",
    issuedOn: "June 2024",
  },
  {
    title: "Real‑Time OS Hacking — Hands‑On Training",
    provider: "NULL CLASS",
    Icon: Shield,
    slug: "os-hacking-nullclass",
    image: "/pdf_certificates/NullClass-Cybersecurity-Internship-Certificate.pdf",
    thumb: "/NullClass-CyberSecurity-Training-Certificate.png",
    issuedOn: "July 2024",
  },
  {
    title: "Capture The Flag(CTF) — Rank 113 of 3,235",
    provider: "EC‑Council",
    Icon: ShieldCheck,
    slug: "ctf-aug-2025",
    image: "/pdf_certificates/Capture The Flag(CTF) — Rank 113 of 3,235.pdf",
    thumb: "/CTF%20August%20Certificate.png",
    issuedOn: "August 2025",
  },
  {
    title: "Capture The Flag(CTF) — Rank 206 of 3,009",
    provider: "EC‑Council",
    Icon: ShieldCheck,
    slug: "ctf-jul-2025",
    image: "/pdf_certificates/Capture The Flag(CTF) — Rank 206 of 3,009.pdf",
    thumb: "/CTF%20July%20Certificate.png",
    issuedOn: "July 2025",
  },
];

const DATA_SCIENCE: Item[] = [
  {
    title: "NSDC Data Science",
    provider: "NSDC ×  Skill India Digital Hub",
    Icon: LineChart,
    slug: "nsdc-ds",
    image: "/pdf_certificates/NSDC Data Science.pdf",
    thumb: "/CAN_37240536_4824911%20(NSDC).png",
    issuedOn: "May 2025",
  },
  {
    title: "Data Science Training",
    provider: "Internshala",
    Icon: LineChart,
    slug: "internshala-ds-training",
    image: "/pdf_certificates/Data Science Training.pdf",
    thumb: "/Data%20Science%20Training.png",
    issuedOn: "April 2025",
  },
  {
    title: "Real‑Time Emotion Detection — Hands‑On Training",
    provider: "NULL CLASS",
    Icon: BrainCircuit,
    slug: "emotion-detection-nullclass",
    image: "/pdf_certificates/Real‑Time Emotion Detection — Hands‑On Training.pdf",
    thumb: "/NullClass-Data%20Science-Training-Certificate.png",
    issuedOn: "September 2025",
  },
  {
    title: "Python From Zero to Hero",
    provider: "Udemy",
    Icon: GraduationCap,
    slug: "python-zero-hero",
    image: "/pdf_certificates/Python%20From%20Zero%20to%20Hero.pdf",
    thumb: "/Python%20From%20Zero%20to%20Hero.jpg",
    issuedOn: "August 2025",
  },
  {
    title: "Fundamental of Python Machine Learning",
    provider: "Udemy",
    Icon: GraduationCap,
    slug: "python-ml-fundamentals",
    image: "/pdf_certificates/Fundamental%20of%20Python%20Machine%20Learning.pdf",
    thumb: "/Fundamental%20of%20Python%20Machine%20Learning.jpg",
    issuedOn: "August 2025",
  },
];

const OTHER: Item[] = [
  {
    title: "Web Design & Development",
    provider: "NSDC × Skill India Digital Hub",
    Icon: Code2,
    slug: "web-design-sidh",
    image: "/pdf_certificates/Web%20Design%20%26%20Development%20Certificate.pdf",
    thumb: "/Web%20Design%20%26%20Development%20Certificate%20(SIDH).png",
    issuedOn: "July 2025",
  },
  {
    title: "Foundational C# with Microsoft",
    provider: "freeCodeCamp × Microsoft",
    Icon: Code2,
    slug: "fcc-csharp",
    image: "/csharp-microsoft-freecodecamp.png",
    href: "https://www.freecodecamp.org/certification/mandar1234/foundational-c-sharp-with-microsoft",
    issuedOn: "August 2025",
  },
  {
    title: "Internship & Job Readiness",
    provider: "Internshala",
    Icon: BadgeCheck,
    slug: "internshala-job-readiness",
    image: "/pdf_certificates/Internship%20%26%20Job%20Preparation%20Training%20-%20Certificate%20of%20Completion.pdf",
    thumb: "/Internship%20%26%20Job%20Readiness.png",
    issuedOn: "May 2025",
  },
  {
    title: "Full Stack Programming Course",
    provider: "Udemy",
    Icon: Code2,
    slug: "full-stack-programming",
    image: "/pdf_certificates/Full%20Stack%20Programming%20Course.pdf",
    thumb: "/Full%20Stack%20Programming%20Course.jpg",
    issuedOn: "August 2025",
  },
  {
    title: "Microsoft Azure Fundamentals",
    provider: "Udemy",
    Icon: Cloud,
    slug: "azure-fundamentals-udemy",
    image: "/Microsoft%20Azure%20Fundamentals.png",
    issuedOn: "December 2023",
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
  <main className="container py-12 md:py-16">
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Certifications</h1>
      <p className="mt-3 max-w-3xl text-white/80">
        A curated collection of industry‑recognized credentials and hands‑on trainings spanning Cybersecurity, Data Science,
        and complementary technologies. Use the category buttons below to view certifications by domain.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StatChip icon={BadgeCheck}>{totalCount} total</StatChip>
        <StatChip icon={ShieldCheck}>{cyberCount} cybersecurity</StatChip>
        <StatChip icon={LineChart}>{dataCount} data science</StatChip>
        <StatChip icon={Code2}>{otherCount} other</StatChip>
        <StatChip icon={Calendar}>Updated {lastUpdated}</StatChip>
      </div>

      <SectionsClient
        cybersecurity={CYBERSECURITY.map(({ Icon, ...rest }) => ({
          ...rest,
          image: rest.thumb ?? rest.image,
          slug: rest.slug,
        }))}
        dataScience={DATA_SCIENCE.map(({ Icon, ...rest }) => ({
          ...rest,
          image: rest.thumb ?? rest.image,
          slug: rest.slug,
        }))}
        other={OTHER.map(({ Icon, ...rest }) => ({
          ...rest,
          image: rest.thumb ?? rest.image,
          slug: rest.slug,
        }))}
      />

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
        <p className="text-sm text-white/75">
          Every certification has a purpose. No certificate is just paper — first learn, then implement.
          <span className="text-white/60"> I focus on translating training into real projects, measurable outcomes, and verifiable proof.</span>
        </p>
      </div>

      <CertModal items={VIEWABLE} />
    </main>
  );
}
