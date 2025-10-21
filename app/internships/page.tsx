import SectionsClient, { InternshipItem } from "./SectionsClient";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const metadata = {
  title: "Internships — Mandar Kajbaje",
  description: "Online internships and practical experience.",
  alternates: { canonical: `${site}/internships` },
};

type Internship = {
  company: string;
  role: string;
  mode: "Online" | "Remote" | "Hybrid" | "Onsite";
  dates: string;
  stack?: string[];
  highlights: string[];
  link?: string;
  // New: document images
  certImage?: string; // Internship certificate (preview)
  lorImage?: string;  // Letter of Recommendation
};

const INTERNSHIPS: Internship[] = [
  {
    company: "NullClass",
    role: "Cybersecurity Intern",
    mode: "Remote",
    dates: "Jul 2025 – Sep 2025",
    certImage: "/NullClass Internship Certificate.png",
    lorImage: "/NullClass LOR Certificate.png",
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
    certImage: "/MERN Internship Certificate.png",
    lorImage: undefined,
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
    certImage: "/NullClass-Data Science-Training-Certificate.png",
    lorImage: "/Data Science Training.png",
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
  const items = INTERNSHIPS satisfies InternshipItem[];
  return (
    <main className="container py-12 md:py-16">
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Internships</h1>
      <p className="mt-3 max-w-2xl text-white/80">
        Hands‑on internships across cybersecurity, MERN development, and data science—covering penetration testing, secure systems hardening,
        full‑stack application delivery, and real‑time ML projects. Selected highlights and certifications are available for verification.
      </p>

      <SectionsClient internships={items} />
    </main>
  );
}
