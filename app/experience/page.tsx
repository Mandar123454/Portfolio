import type { InternshipItem } from "../internships/SectionsClient";
import ExperienceSectionsClient from "./SectionsClient";
import type { WorkshopItem } from "./WorkshopsClient";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const metadata = {
  title: "Experience — Mandar Kajbaje",
  description: "Hands-on experience and practical outcomes.",
  alternates: { canonical: `${site}/experience` },
};

type ExperienceItem = {
  company: string;
  role: string;
  mode: "Online" | "Remote" | "Hybrid" | "Onsite";
  dates: string;
  stack?: string[];
  highlights: string[];
  link?: string;
  certImage?: string;
  lorImage?: string;
  expImage?: string;
};

const EXPERIENCE: ExperienceItem[] = [
  {
    company: "NullClass",
    role: "Cybersecurity Intern",
    mode: "Remote",
    dates: "Jul 2025 – Sep 2025",
    certImage: "/NullClass Internship Certificate.png",
    lorImage: "/NullClass LOR Certificate.png",
    expImage: "/NullClass%20CyberSecurity%20Experience%20Letter.png",
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
  },
  {
    company: "Main Flow",
    role: "MERN Stack Intern",
    mode: "Remote",
    dates: "Aug 2025 – Oct 2025",
    certImage: "/MERN Internship Certificate.png",
    lorImage: "/Main%20Flow-MERN%20Stack%20LOR%20Certificate.png",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "JavaScript", "HTML", "CSS"],
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
  },
  {
    company: "NullClass",
    role: "Data Science Intern",
    mode: "Remote",
    dates: "Sep 24, 2025 – Nov 24, 2025",
    certImage: "/NullClass-Data Science-Training-Certificate.png",
    lorImage: "/NullClass-Data%20Science-LOR-Letter.png",
    expImage: "/NullClass%20Data%20Science%20Experience%20Letter.png",
    stack: ["Python", "OpenCV", "TensorFlow", "Keras", "Pandas", "NumPy", "Matplotlib"],
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
  },
    {
    company: "CodeAlpha",
    role: "Cybersecurity Intern",
    mode: "Remote",
    dates: "Dec 2025 (1 month)",
    certImage: "/CodeAlpha%20Internship%20Certificate.png",
    stack: [
      "Python",
      "Scapy",
      "Flask",
      "Snort",
      "JSON Logging",
      "Network Packet Analysis",
      "Windows/Linux",
      "Security Documentation",
    ],
    highlights: [
      "Designed and implemented a real-time network sniffer using Python, Flask, and Scapy, enabling live packet capture, protocol analysis, filtering, and authenticated sessions with exportable logs (PCAP/CSV).",
      "Built a Python-based Network Intrusion Detection System (NIDS) with rule-based inspection, JSON alert logging, and dashboard-style visualization; configured Snort for comparative analysis.",
      "Performed secure coding reviews and practical security audits, documenting common vulnerability patterns and remediation guidance aligned with secure SDLC principles.",
      "Created phishing awareness and social-engineering training materials, translating real-world attack techniques into clear, user-friendly security education.",
      "Maintained clean repository structure, documentation, and deployment steps to support reproducible setup across Windows, macOS, and Linux with administrator-level security considerations.",
    ],
  },
];

export default function ExperiencePage() {
  const items = EXPERIENCE satisfies InternshipItem[];

  const workshops: WorkshopItem[] = [
    {
      title: "Generative AI Literacy",
      provider: "Futureskills Prime (MeitY × NASSCOM)",
      slug: "futureskills-generative-ai-literacy",
      issuedOn: "—",
      image: "/Generative%20AI%20Workshop%20Certificate%20(Government).png",
      learned: [
        "Core concepts of Generative AI and where it fits in real workflows",
        "Responsible usage basics (limitations, hallucinations, and verification)",
        "Prompting foundations and how to iterate for better outputs",
      ],
    },
    {
      title: "AI Tools Workshop",
      provider: "Be10x",
      slug: "be10x-ai-tools",
      issuedOn: "—",
      image: "/Be10x%20AI%20Tools%20Workshop%20Certificate.png",
      learned: [
        "Using AI tools to speed up research, drafting, and structured thinking",
        "Creating repeatable workflows for productivity and content execution",
        "Choosing the right tool for the task (quality vs. speed tradeoffs)",
      ],
    },
    {
      title: "ChatGPT & AI with MS Office",
      provider: "Skill Nation",
      slug: "skillnation-chatgpt-ms-office",
      issuedOn: "July 2024",
      image: "/AI%20+%20ChatGPT%20For%20MS%20Office.png",
      learned: [
        "Using AI to speed up Word/PowerPoint drafting while keeping accuracy",
        "Building better prompts for tables, summaries, and slide structure",
        "Turning rough notes into clean documents faster (with review)",
      ],
    },
    {
      title: "Career Guidance Webinar",
      provider: "Skill Dunia",
      slug: "skilldunia-career-guidance-webinar",
      issuedOn: "—",
      image: "/Career%20Guidance%20Webinar%20Certificate%20(Skill%20Dunia).png",
      learned: [
        "How to present projects and skills clearly for recruiters",
        "Resume and interview basics (storytelling + measurable outcomes)",
        "Planning learning goals and next steps for career growth",
      ],
    },
  ];

  return (
    <main className="container py-12 md:py-16">
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Experience</h1>
      <p className="mt-3 max-w-2xl text-white/80">
        Hands‑on experience across cybersecurity, MERN development, and data science—covering penetration testing, secure systems hardening,
        full‑stack application delivery, and real‑time ML projects. Selected documents are available for verification.
      </p>

      <ExperienceSectionsClient internships={items} workshops={workshops} />
    </main>
  );
}
