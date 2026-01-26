import type { InternshipItem } from "../internships/SectionsClient";
import ExperienceSectionsClient from "./SectionsClient";
import type { HackathonItem } from "./HackathonsClient";
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
    certImage: "/pdf_certificates/NullClass-Cybersecurity-Internship-Certificate.pdf",
    lorImage: "/pdf_certificates/NullClass-Cybersecurity-LOR-Letter.pdf",
    expImage: "/pdf_certificates/NullClass-Cybersecurity-Experience-Letter.pdf",
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
    certImage: "/pdf_certificates/Internship%20Certificate.pdf",
    lorImage: "/pdf_certificates/Main%20Flow-MERN%20Stack%20LOR%20Certificate.pdf",
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
    certImage: "/pdf_certificates/NullClass-Data-Science-Internship-Certificate.pdf",
    lorImage: "/pdf_certificates/NullClass-Data%20Science-LOR-Letter.pdf",
    expImage: "/pdf_certificates/NullClass-Data%20Science-Experience-Letter.pdf",
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
    certImage: "/pdf_certificates/CodeAlpha-Internship%20Certificate.pdf",
    lorImage: "/pdf_certificates/CodeAlpha-LOR%20Certificate.pdf",
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
      issuedOn: "December 2025",
      image: "/pdf_certificates/Generative%20AI%20Workshop%20Certificate.pdf",
      thumb: "/Generative%20AI%20Workshop%20Certificate%20(Government).png",
      tags: ["Generative AI", "Prompting", "Responsible AI", "Workflows"],
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
      issuedOn: "December 2025",
      image: "/pdf_certificates/Be10x%20AI%20Tools%20Workshop%20Certificate.pdf",
      thumb: "/Be10x%20AI%20Tools%20Workshop%20Certificate.png",
      tags: ["AI Tools", "Productivity", "Automation", "Frameworks"],
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
      image: "/pdf_certificates/ChatGpt%20%26%20AI%20With%20MS%20Office%20Workshop%20certificate.pdf",
      thumb: "/AI%20+%20ChatGPT%20For%20MS%20Office.png",
      tags: ["ChatGPT", "MS Office", "Prompting", "Documentation"],
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
      issuedOn: "November 2025",
      image: "/pdf_certificates/Career%20Guidance%20Webinar%20Certificate.pdf",
      thumb: "/Career%20Guidance%20Webinar%20Certificate%20(Skill%20Dunia).png",
      tags: ["Career", "Resume", "Interview", "Planning"],
      learned: [
        "How to present projects and skills clearly for recruiters",
        "Resume and interview basics (storytelling + measurable outcomes)",
        "Planning learning goals and next steps for career growth",
      ],
    },
  ];

  const hackathons: HackathonItem[] = [
    {
      title: "Hackverse CTF Hackathon",
      organizer: "EC‑Council (International Council of E‑Commerce Consultants)",
      slug: "eccouncil-ctf-hackverse",
      year: "2025",
      mode: "Online",
      tags: [
        "CTF Methodology",
        "Cybersecurity Fundamentals",
        "Linux CLI",
        "Web Security (Entry)",
        "Crypto/Encoding",
        "Analytical Thinking",
        "Persistence",
      ],
      highlights: [
        "Participated in a hands‑on cybersecurity CTF organized by EC‑Council, focused on real‑world styled challenges.",
        "Solved multiple beginner‑level challenges (Apprentice ~27%) and attempted intermediate challenges (Journeyman ~3%).",
        "Explored advanced categories (Master/Grandmaster) to understand higher-difficulty structure and expectations.",
        "Practiced CTF workflow: identify → analyze → attempt solution → validate → document learnings.",
        "Strengthened fundamentals in Linux command line usage, basic web security concepts, and crypto/encoding patterns.",
        "Improved problem-solving speed and reasoning under time constraints.",
      ],
      proof: "/CTF.png",
      links: [
        { label: "Rank PDF", href: "/pdf_certificates/Capture The Flag(CTF) — Rank 113 of 3,235.pdf" },
      ],
    },
    {
      title: "UIDAI Data Hackathon",
      organizer: "UIDAI (Government Authorized)",
      slug: "uidai-data-hackathon-2026",
      year: "2026",
      mode: "Online",
      tags: [
        "Flask",
        "Plotly",
        "Pandas",
        "Data Pipeline",
        "Dashboards",
        "Azure App Service",
        "Policy Insights",
      ],
      highlights: [
        "Built an Aadhaar Enrolment Analytics Dashboard (Maharashtra) to surface trends, disparities, seasonality, and risk flags from UIDAI monthly enrolment data.",
        "Validated dataset scale and structure (rows, districts, pincodes, monthly points) to ensure correct aggregation and performance.",
        "Cleaned and standardized mixed date formats; filtered to Maharashtra; created a reliable total metric (0–5 + 5–17 + 18+).",
        "Generated time-series trend insights (overall growth and recent MoM change) to support planning and operations.",
        "Analyzed age-group dynamics using stacked trends to identify dominant enrolment cohorts and implications.",
        "Measured district disparities (top/bottom contributors) to highlight regional inequality and operational priorities.",
        "Added pincode-level spread/variability analysis to identify uneven distribution and potential spikes.",
        "Computed seasonality index (month-of-year peaks) to guide staffing/outreach timing.",
        "Created decision signals (risk flags like saturation/volatility) and produced policy-style recommendations from computed metrics.",
        "Deployed the Flask + Plotly dashboard on Azure App Service for live evaluation and reproducibility.",
      ],
      links: [
        { label: "Live Dashboard", href: "https://uidai-maharashtra-dashboard-cwcccngcfzbwcca2.centralindia-01.azurewebsites.net/" },
        { label: "GitHub Repo", href: "https://github.com/Mandar123454/UIDAI-Data-Hackathon" },
      ],
      // proof: "/<uidai-submission-proof>.png", // add when you provide the submission screenshot
    },
  ];

  return (
    <main className="container py-12 md:py-16">
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Experience</h1>
      <p className="mt-3 max-w-2xl text-white/80">
        Hands‑on experience across cybersecurity, MERN development, and data science—covering penetration testing, secure systems hardening,
        full‑stack application delivery, and real‑time ML projects. Selected documents are available for verification.
      </p>

      <ExperienceSectionsClient internships={items} workshops={workshops} hackathons={hackathons} />
    </main>
  );
}
