import ProjectDetail, { Badge, ProjectDetailProps } from "@/components/project-detail";
import { notFound } from "next/navigation";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

type DetailMap = Record<string, ProjectDetailProps>;

const DETAILS: DetailMap = {
  // Top 6
  "ai-nids": {
    title: "AI-Powered Network Intrusion Detection System (AI-NIDS)",
    badge: "System-Level Project" as Badge,
    subtitle: "Detect malicious traffic using an explainable ML ensemble tuned for SOC workflows.",
    video: { fileSrc: "/demos/AI-NIDS.mp4" },
    whatItIs: [
      "An intrusion detection system that analyzes network telemetry to flag anomalous and known attack patterns.",
      "Designed for SOC teams and lab environments where explainability and iterative tuning matter.",
      "Focuses on practical signals, stable pipelines, and repeatable outcomes over flashy scoring.",
    ],
    features: [
      "Real-time traffic ingestion and feature extraction",
      "ML ensemble (e.g., XGBoost + LSTM + Autoencoder)",
      "Explainable outputs (e.g., SHAP) for analyst review",
      "Modular detectors with clear interfaces",
      "Batch replays for reproducible evaluation",
      "Docker-ready for on-prem lab setups",
    ],
    howItWorks: [
      "Network logs are ingested from Suricata/Zeek or PCAP",
      "Data is normalized and featurized for time-series windows",
      "Models score sequences and produce threat likelihood",
      "Ensemble consolidates signals and assigns severity",
      "Alerts stream to a dashboard for analyst triage",
    ],
    howBuilt: {
      stack: ["Python", "scikit-learn", "PyTorch", "SHAP", "FastAPI", "Docker", "Suricata/Zeek"],
      rationale: ["Python + PyTorch for flexible modeling", "Docker for consistent lab deployments"],
      challenge: "Stabilizing sequence windows while preserving temporal context for model inference.",
      designWin: "An explicit feature registry separates extraction from modeling, making retrains safer.",
    },
    links: { repo: "https://github.com/Mandar123454/AI-Powered-Network-Intrusion-Detection-System", live: undefined },
  },
  "smartphone-purchase-ml": {
    title: "Smartphone Purchase Prediction (ML)",
    badge: "Featured" as Badge,
    subtitle: "Predict device purchase intent from structured inputs with clear segment insights.",
    video: { fileSrc: "/demos/Smartphone%20Purchase.mp4" },
    whatItIs: [
      "A classification pipeline that predicts purchase decisions using demographic and behavior signals.",
      "Built for product teams and analysts who need interpretable outputs to drive campaigns.",
    ],
    features: [
      "Clean feature engineering with leakage checks",
      "Model comparison with baselines and calibrated probabilities",
      "Explainability with global + local views",
      "Metrics tracked with reproducible evaluation",
      "Exportable decision thresholds for integration",
    ],
    howItWorks: [
      "CSV/DB sources are standardized and validated",
      "Features are transformed and split reproducibly",
      "Models train with cross-validation and calibration",
      "Predictions and insights are visualized",
    ],
    howBuilt: {
      stack: ["Python", "pandas", "scikit-learn", "matplotlib", "Jupyter", "FastAPI (optional)"],
      rationale: ["scikit-learn for fast iteration and baselines", "Calibrated probabilities for reliable thresholds"],
    },
    links: { repo: "https://github.com/Mandar123454/Predictive-Modeling-for-Smartphone-Purchase-Behavior-ML", live: "https://smartpredict-app-a3gcecfectcudbdd.centralindia-01.azurewebsites.net/" },
  },
  "phishing-chrome-ext": {
    title: "Custom Phishing Detection Chrome Extension",
    badge: "Production-Grade" as Badge,
    subtitle: "Client-side checks and ML signals to flag risky pages before credential entry.",
    video: { fileSrc: "/demos/Custom%20Phishing.mp4" },
    whatItIs: [
      "A browser extension that evaluates current pages for phishing indicators.",
      "Intended for everyday users and internal teams to catch obvious risks early.",
    ],
    features: [
      "URL heuristics + content checks",
      "Model-assisted scoring for risky patterns",
      "Non-blocking UI with clear prompts",
      "Config for allowed/blocked domains",
      "Local logging for incident review",
    ],
    howItWorks: [
      "Content script extracts signals from DOM/URL",
      "Heuristics and model score the page",
      "User is prompted with contextual guidance",
      "Events can be exported for review",
    ],
    howBuilt: {
      stack: ["TypeScript", "Chrome APIs", "Vite", "Lightweight ML inference"],
      rationale: ["TypeScript for safer extension code", "Heuristics keep fast-path reliable"],
    },
    links: { repo: "https://github.com/Mandar123454/Custom-Phishing-Detection-Chrome-Extension", live: "https://customphishingdetection.netlify.app/dashboard.html" },
  },
  "cybersecurity-journey": {
    title: "CyberSecurity-Journey",
    badge: "Flagship" as Badge,
    subtitle: "Dashboard-style timeline of security learning, labs, and shipped artifacts.",
    video: { fileSrc: "/demos/CyberSecurity%20Journey.mp4" },
    whatItIs: [
      "A navigable dashboard documenting practical security progression and milestones.",
      "Built for reviewers to assess depth via labs, notes, and artifacts.",
    ],
    features: [
      "Structured sections for labs, notes, and tools",
      "Evidence-first layout with reproducible references",
      "Search and quick jumps to topics",
      "Embeds for demos and walkthroughs",
    ],
    howItWorks: [
      "Content indexed by topic and date",
      "Pages render evidence and references",
      "Links jump to labs or demos",
    ],
    howBuilt: {
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
      rationale: ["MDX for portable content", "Next for fast static + dynamic routes"],
    },
    links: { repo: "https://github.com/Mandar123454/CyberSecurity-Journey", live: "https://cybersecurity-journey.netlify.app/" },
  },
  "campus-connect": {
    title: "Campus-Connect — Social Media Application",
    badge: "Capstone" as Badge,
    subtitle: "A MERN app focused on clean data flows, auth, and content moderation primitives.",
    video: { fileSrc: "/demos/Campus%20Connect%20.mp4" },
    whatItIs: [
      "A social application enabling posts, follows, and messaging with sane defaults.",
      "Built for student communities with straightforward moderation hooks.",
    ],
    features: [
      "JWT auth with role checks",
      "Post/feed pipelines with pagination",
      "Image handling and basic rate limits",
      "Server logs and metrics surfaces",
    ],
    howItWorks: [
      "Client interacts with REST/GQL endpoints",
      "Server validates and processes requests",
      "DB persists entities with indexes",
      "Events update feeds and notifications",
    ],
    howBuilt: {
      stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind"],
      rationale: ["MERN for rapid prototyping", "Indexes tuned for feed queries"],
    },
    links: { repo: "https://github.com/Mandar123454/Campus-Connect---Social-Media-Application" },
  },
  "python-journey": {
    title: "Python Journey",
    badge: "Featured" as Badge,
    subtitle: "A dashboard tracking Python foundations, exercises, and small utilities.",
    video: { fileSrc: "/demos/Python%20Journey.mp4" },
    whatItIs: [
      "A structured journey through Python concepts with runnable examples.",
      "Intended for reviewers to verify fundamentals via exercises and tools.",
    ],
    features: [
      "Topic-based modules with examples",
      "Small utilities (CLI/GUI) with tests",
      "References and checklists for review",
      "Embeds for short demos",
    ],
    howItWorks: [
      "Modules group fundamentals by topic",
      "Examples run and output verifiable results",
      "Links point to repos and demos",
    ],
    howBuilt: {
      stack: ["Python", "pytest", "Tkinter/CLI", "VX (optional)"],
      rationale: ["Clear exercises over theoretical notes"],
    },
    links: { repo: "https://github.com/Mandar123454/Python-Journey", live: "https://mkpythonjourney.netlify.app/" },
  },
  // Cybersecurity
  "network-sniffer-dashboard": {
    title: "Network-Sniffer Dashboard",
    badge: "System-Level Project" as Badge,
    subtitle: "Web dashboard that visualizes captured packets/flows for quick triage and filtering.",
    video: { fileSrc: "/demos/Network%20Sniffer.mp4" },
    whatItIs: [
      "A dashboard that renders network traffic from capture tools for fast inspection.",
      "Built for analysts to filter, search, and spot anomalies during investigations.",
    ],
    features: [
      "PCAP/flow ingestion",
      "Filters by protocol, IP, port",
      "Basic indicators for suspicious patterns",
      "Export slices for sharing",
      "Responsive UI for lab machines",
    ],
    howItWorks: [
      "Captured packets/flows are parsed",
      "Metadata is normalized",
      "UI renders tables and charts",
      "Analysts filter and export selections",
    ],
    howBuilt: { stack: ["TypeScript", "Next.js", "Tailwind", "PCAP parsing libs"], rationale: ["Simple, responsive UI over raw captures"] },
    links: { repo: "https://github.com/Mandar123454/Network-Sniffer-Dashboard" },
  },
  "nids-basic": {
    title: "Network Intrusion Detection System",
    badge: "System-Level Project" as Badge,
    subtitle: "Baseline NIDS using signatures and heuristics to surface suspicious activity.",
    video: { fileSrc: "/demos/NIDS.mp4" },
    whatItIs: [
      "A foundational NIDS combining signature checks with heuristic rules.",
      "Useful for labs and teaching core detection ideas.",
    ],
    features: [
      "Signature matching",
      "Heuristic rules",
      "Alerting with severity levels",
      "Configurable rule sets",
      "Simple dashboard for review",
    ],
    howItWorks: [
      "Traffic is parsed into events",
      "Signatures and heuristics score events",
      "Alerts are generated with context",
      "Dashboard lists alerts for triage",
    ],
    howBuilt: { stack: ["Python", "Scapy", "Flask"], rationale: ["Keep core NIDS concepts clear and reproducible"] },
    links: { repo: "https://github.com/Mandar123454/Network-Intrusion-Detection-System" },
  },
  "codealpha-cyber-tasks": {
    title: "CodeAlpha Cybersecurity Tasks",
    badge: "Featured" as Badge,
    subtitle: "Focused tasks and mini-tools shipped during CodeAlpha, documented for reproducibility.",
    video: {},
    whatItIs: [
      "A set of small, practical security tasks with clear steps and artifacts.",
      "Designed to demonstrate fundamentals and disciplined execution.",
    ],
    features: [
      "Task-by-task documentation",
      "Repeatable scripts/tools",
      "Evidence-first walkthroughs",
      "Lightweight dashboards",
      "Recorded demos",
    ],
    howItWorks: [
      "Each task defines inputs and goals",
      "Scripts/tools run to produce results",
      "Outputs are recorded and summarized",
      "Artifacts are committed for review",
    ],
    howBuilt: { stack: ["Python", "Bash", "Next.js"], rationale: ["Keep tasks portable and easy to verify"] },
    links: { repo: "https://github.com/Mandar123454/Codealpha_Tasks" },
  },
  // Data Science
  "insurance-fraud-ml": {
    title: "Insurance Fraud Detection",
    badge: "Featured" as Badge,
    subtitle: "Supervised models surfacing potential claim fraud with transparent features and thresholds.",
    video: {},
    whatItIs: [
      "A classification pipeline to flag potentially fraudulent claims.",
      "Built for analysts to review features and adjust thresholds.",
    ],
    features: [
      "Feature engineering + leakage checks",
      "Model comparison + calibration",
      "Explainability (global/local)",
      "Metrics with reproducible splits",
      "Threshold export for ops",
    ],
    howItWorks: [
      "Data is cleaned and validated",
      "Features are engineered",
      "Models train with CV",
      "Scores and insights are produced",
    ],
    howBuilt: { stack: ["Python", "pandas", "scikit-learn", "matplotlib"], rationale: ["Reliable baselines and interpretable outputs"] },
    links: { repo: "https://github.com/Mandar123454/Insurance-Fraud-Detection-Project-Data-Science" },
  },
  "traffic-anomaly-ml": {
    title: "Traffic Anomaly Detection",
    badge: "Featured" as Badge,
    subtitle: "Time-series analysis of traffic sensors to flag anomalies and trend shifts.",
    video: { fileSrc: "/demos/Traffic%20Anomaly.mp4" },
    whatItIs: [
      "A pipeline to detect anomalies in traffic sensor streams.",
      "Targets planners and operators needing early warnings.",
    ],
    features: [
      "Windowing + normalization",
      "Baseline + ML comparisons",
      "Threshold tuning",
      "Charting of anomalies",
      "Exportable reports",
    ],
    howItWorks: [
      "Data streams are windowed",
      "Features computed per window",
      "Models flag anomalies",
      "Results plotted and exported",
    ],
    howBuilt: { stack: ["Python", "NumPy", "scikit-learn", "Matplotlib"], rationale: ["Simple time-series with clear metrics"] },
    links: { repo: "https://github.com/Mandar123454/Traffic-Anomaly-Detection-ML" },
  },
  "cv-internship-ml": {
    title: "ML Computer Vision Internship",
    badge: "Capstone" as Badge,
    subtitle: "Internship prototypes focused on data hygiene, augmentation, and evaluation.",
    video: {},
    whatItIs: [
      "A collection of CV experiments built during internship work.",
      "Emphasis on dataset quality and rigorous evaluation.",
    ],
    features: [
      "Dataset checks and fixes",
      "Augmentation strategies",
      "Model baselines and metrics",
      "Reproducible notebooks",
      "Demo clips of results",
    ],
    howItWorks: [
      "Data prepared and validated",
      "Baselines trained",
      "Augmentations tested",
      "Metrics tracked and compared",
    ],
    howBuilt: { stack: ["Python", "PyTorch", "OpenCV", "Jupyter"], rationale: ["Practical CV lab work over flashy models"] },
    links: { repo: "https://github.com/Mandar123454/ML-Computer-Vision-Internship" },
  },
  "pw-survey": {
    title: "Physics-Wallah Survey",
    badge: "Featured" as Badge,
    subtitle: "Survey analysis pipeline delivering segment insights and reproducible charts.",
    video: { fileSrc: "/demos/Physics%20Wallah.mp4" },
    whatItIs: [
      "A data cleaning and analysis workflow for survey responses.",
      "Built for stakeholders to quickly read segment trends.",
    ],
    features: [
      "Cleaning + normalization",
      "Charting of segments",
      "Reusable notebooks",
      "Exportable visuals",
      "Recorded walkthrough",
    ],
    howItWorks: [
      "Responses ingested and cleaned",
      "Segments computed",
      "Charts rendered",
      "Insights summarized",
    ],
    howBuilt: { stack: ["Python", "pandas", "matplotlib", "Netlify"], rationale: ["Portable results with static delivery"] },
    links: { repo: "https://github.com/Mandar123454/Physics-Wallah-Survey", live: "https://physics-wallah-survey.netlify.app/" },
  },
  // Other
  "mern-ecommerce": {
    title: "MERN E-Commerce Store",
    badge: "Capstone" as Badge,
    subtitle: "Store prototype with catalog, cart, checkout, and admin surfaces.",
    video: { fileSrc: "/demos/MERN%20Store.mp4" },
    whatItIs: [
      "A full-stack store exploring essentials of commerce flows.",
      "Targets small teams testing catalog and cart behaviors.",
    ],
    features: [
      "Product catalog",
      "Cart and checkout",
      "Admin basics",
      "Pagination and search",
      "Demo walkthrough",
    ],
    howItWorks: [
      "Client fetches catalog",
      "Cart updates run on server",
      "Checkout validates and processes",
      "Admin updates catalog",
    ],
    howBuilt: { stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind"], rationale: ["MERN for rapid prototyping"] },
    links: { repo: "https://github.com/Mandar123454/MERN-E-Commerce-Store" },
  },
  "dynamic-login": {
    title: "Login / Dynamic Login Form",
    badge: "Featured" as Badge,
    subtitle: "Robust login/validation module with clear UX states and errors.",
    video: { fileSrc: "/demos/Login%20Form.mp4" },
    whatItIs: [
      "A focused module for authentication and input validation.",
      "Useful for teaching UX states around auth flows.",
    ],
    features: [
      "Form validation",
      "Error and success states",
      "Keyboard accessibility",
      "Demo walkthrough",
      "Portable component",
    ],
    howItWorks: [
      "Inputs captured and validated",
      "Server verifies credentials",
      "UI reflects results",
      "Events logged for review",
    ],
    howBuilt: { stack: ["React", "TypeScript", "Tailwind"], rationale: ["Keep auth UX simple and clear"] },
    links: { repo: "https://github.com/Mandar123454/Dynamic-Login-Form" },
  },
  "moviebox": {
    title: "MovieBox",
    badge: "Featured" as Badge,
    subtitle: "Movie browsing interface with search, detail views, and favorites.",
    video: { fileSrc: "/demos/MovieBox.mp4" },
    whatItIs: [
      "A small app for exploring and saving movies.",
      "Targets UI polish and data fetching patterns.",
    ],
    features: [
      "Search and discovery",
      "Detail pages",
      "Favorites list",
      "Responsive layout",
      "Demo video",
    ],
    howItWorks: [
      "API queried for lists",
      "Details fetched on demand",
      "Favorites stored client-side",
      "Pages render responsive views",
    ],
    howBuilt: { stack: ["React", "TypeScript", "Tailwind"], rationale: ["Practice fetching and UI state"] },
    links: { repo: "https://github.com/Mandar123454/MovieBox---A-Dynamic-Movie-Discovery-Platform" },
  },
  "digital-clock": {
    title: "Digital Clock",
    badge: "Featured" as Badge,
    subtitle: "Responsive digital clock utility with clean formatting.",
    video: { fileSrc: "/demos/Digital%20Clock.mp4" },
    whatItIs: [
      "A tiny utility rendering time accurately with smooth updates.",
      "Built to demonstrate basic UI updates.",
    ],
    features: [
      "Accurate time updates",
      "Keyboard/accessibility friendly",
      "Responsive layout",
      "Lightweight code",
      "Demo recording",
    ],
    howItWorks: [
      "Timer ticks update state",
      "Time formatted for display",
      "UI renders updates",
      "Controls handled cleanly",
    ],
    howBuilt: { stack: ["HTML", "CSS", "JavaScript"], rationale: ["Simple utility demonstrating clean loops"] },
    links: { repo: "https://github.com/Mandar123454/Digital-Clock", live: "https://mkdigitalclock.netlify.app/" },
  },
  "mk-calculator": {
    title: "MK Calculator",
    badge: "Featured" as Badge,
    subtitle: "Simple calculator with clear operations and keyboard support.",
    video: { fileSrc: "/demos/Calculator.mp4" },
    whatItIs: [
      "A lightweight calculator application.",
      "Focus on predictable operations and edge cases.",
    ],
    features: [
      "Arithmetic operations",
      "Keyboard shortcuts",
      "Clear error handling",
      "Responsive layout",
      "Demo video",
    ],
    howItWorks: [
      "Inputs captured",
      "Operations executed",
      "Results rendered",
      "Edge cases handled",
    ],
    howBuilt: { stack: ["HTML", "CSS", "JavaScript"], rationale: ["Teach reliability over flash"] },
    links: { repo: "https://github.com/Mandar123454/MK-Calculator", live: "https://mkcalcee.netlify.app/" },
  },
  "admission-form": {
    title: "Admission Form",
    badge: "Featured" as Badge,
    subtitle: "Form flow with validation, structured fields, and exportable submissions.",
    video: { fileSrc: "/demos/Admission%20Form.mp4" },
    whatItIs: [
      "A structured admission form demo.",
      "Targets validation and clean submission UX.",
    ],
    features: [
      "Field validation",
      "Structured sections",
      "Submission export",
      "Responsive layout",
      "Demo recording",
    ],
    howItWorks: [
      "User inputs validated",
      "Form submitted",
      "Data exported",
      "Review workflow",
    ],
    howBuilt: { stack: ["HTML", "CSS", "JavaScript"], rationale: ["Focus on validation and clarity"] },
    links: { repo: "https://github.com/Mandar123454/Admission-Form", live: "https://11thadmissionform.netlify.app/" },
  },
  "hotel-menu-card": {
    title: "Hotel Menu Card",
    badge: "Featured" as Badge,
    subtitle: "Menu card UI exploring layout, pricing visibility, and accessibility.",
    video: { fileSrc: "/demos/Menu%20Card.mp4" },
    whatItIs: [
      "A static menu interface for quick browsing.",
      "Focus on legibility and clear pricing.",
    ],
    features: [
      "Clean typography",
      "Accessible contrasts",
      "Responsive grid",
      "Sections for categories",
      "Demo walkthrough",
    ],
    howItWorks: [
      "Data structured",
      "Sections rendered",
      "Layout adapts",
      "User browses efficiently",
    ],
    howBuilt: { stack: ["HTML", "CSS"], rationale: ["Demonstrate UI clarity"] },
    links: { repo: "https://github.com/Mandar123454/Hotel-Menu-Card", live: "https://mkhotelmenucard.netlify.app/" },
  },
  "vote-eligibility": {
    title: "Vote Eligibility",
    badge: "Featured" as Badge,
    subtitle: "Tiny utility that checks vote eligibility via clear rules.",
    video: { fileSrc: "/demos/Voter%20Eligibility.mp4" },
    whatItIs: [
      "A small helper that evaluates eligibility based on inputs.",
      "Designed to show clean conditional logic.",
    ],
    features: [
      "Rule-based evaluation",
      "Input validation",
      "Simple UI",
      "Demo clip",
      "Portable code",
    ],
    howItWorks: [
      "Inputs captured",
      "Rules applied",
      "Result displayed",
      "Edge cases handled",
    ],
    howBuilt: { stack: ["HTML", "CSS", "JavaScript"], rationale: ["Teach clarity in branching"] },
    links: { repo: "https://github.com/Mandar123454/Vote-Eligibility", live: "https://voteeligibility.netlify.app/" },
  },
  "puzzle-game": {
    title: "Puzzle Game",
    badge: "Featured" as Badge,
    subtitle: "Small puzzle game focusing on interactions, level state, and replayability.",
    video: { fileSrc: "/demos/Puzzle%20Game.mp4" },
    whatItIs: [
      "A browser game with simple mechanics and level state.",
      "Built to practice interaction loops and state management.",
    ],
    features: [
      "Levels and state",
      "Keyboard/mouse interactions",
      "Reset/retry flows",
      "Responsive layout",
      "Demo recording",
    ],
    howItWorks: [
      "User inputs drive game loop",
      "State updated",
      "Win/lose conditions checked",
      "UI reflects status",
    ],
    howBuilt: { stack: ["HTML", "CSS", "JavaScript"], rationale: ["Practice game loops and feedback"] },
    links: { repo: "https://github.com/Mandar123454/Puzzle-Game", live: "https://mkpuzzlegame.netlify.app/" },
  },
  "mkstream": {
    title: "MKStream",
    badge: "Featured" as Badge,
    subtitle: "Experimental media interface exploring queues and playback controls.",
    video: { fileSrc: "/demos/MK%20Stream.mp4" },
    whatItIs: [
      "A prototype for queuing and controlling media playback.",
      "Useful to explore UX and state around playlists.",
    ],
    features: [
      "Queue management",
      "Play/pause/seek controls",
      "Persisted session state",
      "Responsive UI",
      "Demo video",
    ],
    howItWorks: [
      "Tracks queued items",
      "Controls update playback",
      "State persisted",
      "UI reflects current item",
    ],
    howBuilt: { stack: ["React", "TypeScript", "Tailwind"], rationale: ["Prototype UX for media flows"] },
    links: { repo: "https://github.com/Mandar123454/MKStream", live: "https://mkstream.netlify.app/" },
  },
  "amazon-netflix-clone": {
    title: "Amazon / Netflix Clone",
    badge: "Featured" as Badge,
    subtitle: "Educational UI clone for layout practice; no branding or proprietary assets claimed.",
    video: { fileSrc: "/demos/Amazon%20Clone.mp4" },
    whatItIs: [
      "A UI clone replicating common marketplace layout elements.",
      "Built purely for educational, layout-practice purposes.",
    ],
    features: [
      "Responsive grid and headers",
      "Product cards and lists",
      "Navigation and detail views",
      "Demo walkthrough",
      "Notes on differences",
    ],
    howItWorks: [
      "Static assets rendered",
      "Pages linked via client routing",
      "Lists and details styled",
      "User navigates flows",
    ],
    howBuilt: { stack: ["React", "TypeScript", "Tailwind", "Netlify"], rationale: ["Practice clean layout composition"] },
    links: { live: "https://mkamazonclone.netlify.app/" },
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const data = DETAILS[params.slug];
  const title = data ? `${data.title} — Projects` : "Project — Projects";
  const description = data?.subtitle || "Technical case study and walkthrough.";
  return { title, description, alternates: { canonical: `${site}/projects/${params.slug}` } };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const data = DETAILS[params.slug];
  if (!data) return notFound();
  return <ProjectDetail {...data} />;
}
