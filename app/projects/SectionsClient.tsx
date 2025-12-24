"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Play, ExternalLink, Github, Shield, BarChart3, Puzzle } from "lucide-react";
import VideoModal, { DemoItem } from "@/components/video-modal";

type Domain = "Cybersecurity" | "Data Science" | "Other";

type Project = {
  slug: string;
  title: string;
  domain: Domain;
  deployed: boolean;
  demoSlug: string; // opens modal
  summary: string; // small professional description
  repoUrl?: string; // required by spec, populate with real link
  liveUrl?: string; // only if deployed
  note?: string; // used for special clone note
};

const TOP_PROJECTS: Project[] = [
  {
    slug: "ai-nids",
    title: "AI-Powered Network Intrusion Detection System (AI-NIDS)",
    domain: "Cybersecurity",
    deployed: false,
    demoSlug: "ai-nids",
    summary: "ML-assisted NIDS for SOC and labs, with explainable scoring, modular detectors, and reproducible evaluation.",
    repoUrl: "https://github.com/Mandar123454/AI-Powered-Network-Intrusion-Detection-System",
  },
  {
    slug: "smartphone-purchase-ml",
    title: "Smartphone Purchase Prediction (ML)",
    domain: "Data Science",
    deployed: true,
    demoSlug: "smartphone-purchase-ml",
    summary: "Structured classification pipeline predicting purchase intent with calibrated probabilities and interpretable insights.",
    repoUrl: "https://github.com/Mandar123454/Predictive-Modeling-for-Smartphone-Purchase-Behavior-ML",
    liveUrl: "https://smartpredict-app-a3gcecfectcudbdd.centralindia-01.azurewebsites.net/",
  },
  {
    slug: "phishing-chrome-ext",
    title: "Custom Phishing Detection Chrome Extension",
    domain: "Cybersecurity",
    deployed: false,
    demoSlug: "phishing-chrome-ext",
    summary: "TypeScript Chrome extension that flags risky pages using URL heuristics and lightweight ML signals before credential entry.",
    repoUrl: "https://github.com/Mandar123454/Custom-Phishing-Detection-Chrome-Extension",
    liveUrl: "https://customphishingdetection.netlify.app/dashboard.html"
  },
  {
    slug: "cybersecurity-journey",
    title: "CyberSecurity-Journey",
    domain: "Cybersecurity",
    deployed: true,
    demoSlug: "cybersecurity-journey",
    summary: "Evidence-first dashboard mapping security labs, write-ups, and shipped tooling for quick, credible review.",
    repoUrl: "https://github.com/Mandar123454/CyberSecurity-Journey",
    liveUrl: "https://cybersecurity-journey.netlify.app/",
  },
  {
    slug: "campus-connect",
    title: "Campus-Connect — Social Media Application",
    domain: "Other",
    deployed: false,
    demoSlug: "campus-connect",
    summary: "MERN social app exploring clean data flows, role-based auth, and moderation hooks.",
    repoUrl: "https://github.com/Mandar123454/Campus-Connect---Social-Media-Application",
  },
  {
    slug: "python-journey",
    title: "Python Journey 🐍",
    domain: "Other",
    deployed: true,
    demoSlug: "python-journey",
    summary: "Curated path through Python fundamentals with runnable examples and small utilities.",
    repoUrl: "https://github.com/Mandar123454/Python-Journey",
    liveUrl: "https://mkpythonjourney.netlify.app/",
  },
];

const CYBERSECURITY: Project[] = [
  TOP_PROJECTS.find((p) => p.slug === "ai-nids")!,
  TOP_PROJECTS.find((p) => p.slug === "cybersecurity-journey")!,
  { slug: "network-sniffer-dashboard", title: "Network-Sniffer Dashboard", domain: "Cybersecurity", deployed: false, demoSlug: "network-sniffer-dashboard", summary: "Web dashboard visualizing captured packets/flows with filters and basic indicators for quick triage.", repoUrl: "https://github.com/Mandar123454/Network-Sniffer-Dashboard" },
  { slug: "nids-basic", title: "Network Intrusion Detection System", domain: "Cybersecurity", deployed: false, demoSlug: "nids-basic", summary: "Baseline NIDS using signature and heuristic checks to surface suspicious activity.", repoUrl: "https://github.com/Mandar123454/Network-Intrusion-Detection-System" },
  TOP_PROJECTS.find((p) => p.slug === "phishing-chrome-ext")!,
  { slug: "codealpha-cyber-tasks", title: "CodeAlpha Cybersecurity Tasks", domain: "Cybersecurity", deployed: false, demoSlug: "", summary: "Focused tasks and mini-tools shipped during CodeAlpha with reproducible steps and artifacts.", repoUrl: "https://github.com/Mandar123454/Codealpha_Tasks" },
];

const DATA_SCIENCE: Project[] = [
  TOP_PROJECTS.find((p) => p.slug === "smartphone-purchase-ml")!,
  { slug: "insurance-fraud-ml", title: "Insurance Fraud Detection", domain: "Data Science", deployed: false, demoSlug: "", summary: "Supervised models surfacing potential claim fraud with clear features and thresholding logic.", repoUrl: "https://github.com/Mandar123454/Insurance-Fraud-Detection-Project-Data-Science" },
  { slug: "traffic-anomaly-ml", title: "Traffic Anomaly Detection", domain: "Data Science", deployed: false, demoSlug: "traffic-anomaly-ml", summary: "Time-series analysis of traffic sensors to flag anomalies and trend shifts.", repoUrl: "https://github.com/Mandar123454/Traffic-Anomaly-Detection-ML" },
  { slug: "cv-internship-ml", title: "ML Computer Vision Internship", domain: "Data Science", deployed: false, demoSlug: "", summary: "Internship prototypes in CV focused on data hygiene, augmentation, and evaluation.", repoUrl: "https://github.com/Mandar123454/ML-Computer-Vision-Internship" },
  { slug: "pw-survey", title: "Physics-Wallah Survey", domain: "Data Science", deployed: true, demoSlug: "pw-survey", summary: "Survey analysis with data cleaning, segment insights, and reproducible charts.", repoUrl: "https://github.com/Mandar123454/Physics-Wallah-Survey", liveUrl: "https://physics-wallah-survey.netlify.app/" },
];

const OTHER: Project[] = [
  TOP_PROJECTS.find((p) => p.slug === "campus-connect")!,
  { slug: "mern-ecommerce", title: "MERN E-Commerce Store", domain: "Other", deployed: false, demoSlug: "mern-ecommerce", summary: "Store prototype with catalog, cart, checkout flow, and basic admin surfaces.", repoUrl: "https://github.com/Mandar123454/MERN-E-Commerce-Store" },
  { slug: "dynamic-login", title: "Login / Dynamic Login Form", domain: "Other", deployed: false, demoSlug: "dynamic-login", summary: "Robust login/validation module with clear UX states and error handling.", repoUrl: "https://github.com/Mandar123454/Dynamic-Login-Form" },
  { slug: "moviebox", title: "MovieBox", domain: "Other", deployed: false, demoSlug: "moviebox", summary: "Lightweight movie browsing interface with search, detail views, and favorites.", repoUrl: "https://github.com/Mandar123454/MovieBox---A-Dynamic-Movie-Discovery-Platform" },
  TOP_PROJECTS.find((p) => p.slug === "python-journey")!,
  { slug: "digital-clock", title: "Digital Clock", domain: "Other", deployed: true, demoSlug: "digital-clock", summary: "Responsive digital clock utility with clean time formatting and update loops.", repoUrl: "https://github.com/Mandar123454/Digital-Clock", liveUrl: "https://mkdigitalclock.netlify.app/" },
  { slug: "mk-calculator", title: "MK Calculator", domain: "Other", deployed: true, demoSlug: "mk-calculator", summary: "Simple calculator with clear operations, keyboard support, and tested edge cases.", repoUrl: "https://github.com/Mandar123454/MK-Calculator", liveUrl: "https://mkcalcee.netlify.app/" },
  { slug: "admission-form", title: "Admission Form", domain: "Other", deployed: true, demoSlug: "admission-form", summary: "Form flow with validation, structured fields, and exportable submissions.", repoUrl: "https://github.com/Mandar123454/Admission-Form", liveUrl: "https://11thadmissionform.netlify.app/" },
  { slug: "hotel-menu-card", title: "Hotel Menu Card", domain: "Other", deployed: true, demoSlug: "hotel-menu-card", summary: "Menu card UI exploring layout, pricing visibility, and accessibility.", repoUrl: "https://github.com/Mandar123454/Hotel-Menu-Card", liveUrl: "https://mkhotelmenucard.netlify.app/" },
  { slug: "vote-eligibility", title: "Vote Eligibility", domain: "Other", deployed: true, demoSlug: "vote-eligibility", summary: "Tiny utility that checks vote eligibility via clear rules and edge cases.", repoUrl: "https://github.com/Mandar123454/Vote-Eligibility", liveUrl: "https://voteeligibility.netlify.app/" },
  { slug: "puzzle-game", title: "Puzzle Game", domain: "Other", deployed: true, demoSlug: "puzzle-game", summary: "Small puzzle game focusing on interactions, level state, and replayability.", repoUrl: "https://github.com/Mandar123454/Puzzle-Game", liveUrl: "https://mkpuzzlegame.netlify.app/" },
  { slug: "mkstream", title: "MKStream", domain: "Other", deployed: false, demoSlug: "mkstream", summary: "Experimental media interface exploring queues and playback controls.", repoUrl: "https://github.com/Mandar123454/MKStream", liveUrl: "https://mkstream.netlify.app/" },
];

// Special case: Clone project (Amazon/Netflix) — single entry, Amazon publicly linked
const CLONE: Project = {
  slug: "amazon-netflix-clone",
  title: "Amazon / Netflix Clone",
  domain: "Other",
  deployed: true, // Amazon clone only
  demoSlug: "amazon-clone",
  summary: "Amazon-style UI clone built for educational layout practice; branding and proprietary assets are not included or claimed.",
  liveUrl: "https://mkamazonclone.netlify.app/",
};

// Demo items for modal (provide real embed URLs later)
const DEMOS: DemoItem[] = [
  { slug: "ai-nids", title: "AI-NIDS Demo", fileSrc: "/demos/AI-NIDS.mp4" },
  { slug: "smartphone-purchase-ml", title: "Smartphone Purchase Prediction Demo", fileSrc: "/demos/Smartphone%20Purchase.mp4" },
  { slug: "phishing-chrome-ext", title: "Phishing Detection Chrome Extension Demo", fileSrc: "/demos/Custom%20Phishing.mp4" },
  { slug: "cybersecurity-journey", title: "CyberSecurity-Journey Demo", fileSrc: "/demos/CyberSecurity%20Journey.mp4" },
  { slug: "campus-connect", title: "Campus-Connect Demo", fileSrc: "/demos/Campus%20Connect%20.mp4" },
  { slug: "python-journey", title: "Python Journey Demo", fileSrc: "/demos/Python%20Journey.mp4" },
  { slug: "network-sniffer-dashboard", title: "Network Sniffer Dashboard Demo", fileSrc: "/demos/Network%20Sniffer.mp4" },
  { slug: "nids-basic", title: "NIDS Demo", fileSrc: "/demos/NIDS.mp4" },
  { slug: "traffic-anomaly-ml", title: "Traffic Anomaly Detection Demo", fileSrc: "/demos/Traffic%20Anomaly.mp4" },
  { slug: "pw-survey", title: "Physics-Wallah Survey Demo", fileSrc: "/demos/Physics%20Wallah.mp4" },
  { slug: "mern-ecommerce", title: "MERN E-Commerce Demo", fileSrc: "/demos/MERN%20Store.mp4" },
  { slug: "dynamic-login", title: "Dynamic Login Demo", fileSrc: "/demos/Login%20Form.mp4" },
  { slug: "moviebox", title: "MovieBox Demo", fileSrc: "/demos/MovieBox.mp4" },
  { slug: "digital-clock", title: "Digital Clock Demo", fileSrc: "/demos/Digital%20Clock.mp4" },
  { slug: "mk-calculator", title: "MK Calculator Demo", fileSrc: "/demos/Calculator.mp4" },
  { slug: "admission-form", title: "Admission Form Demo", fileSrc: "/demos/Admission%20Form.mp4" },
  { slug: "hotel-menu-card", title: "Hotel Menu Card Demo", fileSrc: "/demos/Menu%20Card.mp4" },
  { slug: "vote-eligibility", title: "Vote Eligibility Demo", fileSrc: "/demos/Voter%20Eligibility.mp4" },
  { slug: "puzzle-game", title: "Puzzle Game Demo", fileSrc: "/demos/Puzzle%20Game.mp4" },
  { slug: "mkstream", title: "MKStream Demo", fileSrc: "/demos/MK%20Stream.mp4" },
  { slug: "amazon-clone", title: "Amazon UI Clone Demo", fileSrc: "/demos/Amazon%20Clone.mp4" },
];

function Pill({ active, icon: Icon, label, onClick }: { active: boolean; icon: React.ElementType; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium transition",
        active ? "border-brand/40 bg-brand/20 text-white shadow" : "border-white/10 bg-white/5 text-white/75 hover:bg-white/7"
      )}
      aria-pressed={active}
    >
      <Icon size={16} className={active ? "text-brand" : "text-white/70"} /> {label}
    </button>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const DomainIcon = p.domain === "Cybersecurity" ? Shield : p.domain === "Data Science" ? BarChart3 : Puzzle;
  const actions = (
    <div className="mt-4 flex flex-wrap gap-2">
      {/* Watch Demo */}
      <Link
        href={{ pathname: "/projects", query: { demo: p.demoSlug } }}
        scroll={false}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15",
          p.demoSlug ? "" : "pointer-events-none opacity-50"
        )}
        aria-label={`Watch demo for ${p.title}`}
      >
        <Play size={16} /> Watch Demo
      </Link>
      {/* Read Case Study */}
      <Link
        href={`/projects/${p.slug}`}
        className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
        aria-label={`Read case study for ${p.title}`}
      >
        <ExternalLink size={16} /> Read Case Study
      </Link>
      {/* Live Demo (only if deployed and URL provided) */}
      {p.deployed && p.liveUrl ? (
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
          aria-label={`Open live demo for ${p.title}`}
        >
          <ExternalLink size={16} /> Live Demo
        </a>
      ) : null}
      {/* GitHub */}
      {p.repoUrl ? (
        <a
          href={p.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
          aria-label={`Open GitHub repository for ${p.title}`}
        >
          <Github size={16} /> GitHub
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-sm text-white/70 ring-1 ring-white/10">
          <Github size={16} /> GitHub
        </span>
      )}
    </div>
  );

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 10px 28px rgba(124,58,237,0.15)" }}
      whileTap={{ y: -1 }}
      className="rounded-xl border border-white/10 bg-white/[0.06] p-5"
    >
      <div className="flex items-start gap-3">
        <DomainIcon size={20} className="mt-0.5 text-brand" />
        <div className="flex-1">
          <h3 className="text-base font-semibold text-white">{p.title}</h3>
          <p className="mt-1 text-sm text-white/80">{p.summary}</p>
          {p.note ? <p className="mt-1 text-[13px] text-white/70">{p.note}</p> : null}
        </div>
      </div>
      {actions}
    </motion.div>
  );
}

export default function SectionsClient() {
  const [active, setActive] = useState<Domain>("Cybersecurity");

  const filtered = useMemo(() => {
    switch (active) {
      case "Cybersecurity":
        return CYBERSECURITY;
      case "Data Science":
        return DATA_SCIENCE;
      default:
        return OTHER;
    }
  }, [active]);

  return (
    <main className="container py-12 md:py-16">
      {/* Page Header */}
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Projects</h1>
      <p className="mt-3 max-w-3xl text-white/80 leading-7 md:leading-8">
        A growing collection of hands-on work across cybersecurity, machine learning, full-stack systems, and foundational engineering.
        This section evolves as I ship more production-ready systems.
      </p>

      {/* One-time disclaimer (optional, subtle) */}
      <p className="mt-4 text-[13px] text-white/70 leading-6">
        Some systems are demonstrated via recorded walkthroughs due to infrastructure, security, or resource constraints.
      </p>

      {/* Top Projects */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Top Projects</h2>
            <p className="mt-1 text-[13px] text-white/70">A curated selection of my strongest completed work across cybersecurity, machine learning, full-stack systems, and foundational engineering.</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {TOP_PROJECTS.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Browse by Domain</h2>
        </div>
        <div className="mt-3 overflow-x-auto">
          <div className="flex w-max items-center gap-2">
            <Pill active={active === "Cybersecurity"} icon={Shield} label="Cybersecurity" onClick={() => setActive("Cybersecurity")} />
            <Pill active={active === "Data Science"} icon={BarChart3} label="Data Science" onClick={() => setActive("Data Science")} />
            <Pill active={active === "Other"} icon={Puzzle} label="Other" onClick={() => setActive("Other")} />
          </div>
        </div>
      </div>

      {/* Category Content */}
      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
        {/* Special case: Clone project */}
        {active === "Other" ? <ProjectCard p={CLONE} /> : null}
      </div>

      {/* Bottom honesty note (mandatory — exact) */}
      <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.06] p-4">
        <p className="text-sm text-white/80">More projects are actively being refined and documented.</p>
        <p className="mt-1 text-sm text-white/80">I believe in shipping responsibly — not rushing half-baked demos.</p>
      </div>

      {/* Video modal lives at page level to allow deep-linking */}
      <VideoModal items={DEMOS} />
    </main>
  );
}
