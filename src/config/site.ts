
export const projectCategories = [
  "Frontend",
  "Backend",
  "Fullstack",
  "AI/ML",
  "Systems",
  "Developer Tools",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  title: string;
  blurb: string;
  story?: string;
  stack?: string[];
  year?: string;
  links?: { live?: string; source?: string };
  featured?: boolean;
  status?: string;
  image?: string;
  imageAlt?: string;
  categories?: ProjectCategory[];
  href?: string;
};

export type Job = {
  company: string;
  role: string;
  period: string;
  blurb: string | string[];
  url?: string;
  location?: string;
};

export type EducationItem = {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  detail?: string;
  coursework?: string[];
};

export type FreelanceProject = {
  title: string;
  category: string;
  description: string;
  overview: string;
  responsibilities: string[];
  technologies: string[];
  fullStack: string[];
};

export type Post = {
  title: string;
  summary: string;
  date: string;
  url: string;
  readingTime?: string;
};

export type OpenSourceContribution = {
  title: string;
  repo: string;
  prNumber: number;
  url: string;
  status: "Merged";
  description: string;
  technologies: string[];
};

export const site = {
  // =========================================================
  // PERSONAL INFORMATION
  // =========================================================

  name: "Suman Dey",

  firstName: "Suman",

  lastName: "Dey",

  url: "https://www.sumandey.tech",

  quote: {
    text: "In life, if you don't risk anything, you risk everything.",
    author: "",
  },

  profileImages: [
    "/profile.webp",
    "/profile2.webp",
  ],

  bannerImage: "/social-banner.gif",

  socialBannerImage: "/social-banner.gif",

  initials: "SD",

  role: "Software Engineer / Full Stack Developer",

  location: "Bhubaneswar, Odisha, India",

  timezone: "Asia/Kolkata",

  email: "sumandey7684@gmail.com",

  phone: "+91-7684093868",

  greeting: "Hey, I'm Suman",

  tagline:
    "I build full-stack applications, intelligent AI systems, and reliable software infrastructure.",

  // =========================================================
  // ABOUT
  // =========================================================

  about: [
    "CSE student building full-stack applications, AI-powered products, and backend systems.",
    "Skilled in React, Next.js, TypeScript, JavaScript, Python, Node.js, FastAPI, and SQL.",
    "Interested in applied AI, multi-agent systems, backend engineering, database internals, and developer tools.",
    "Experienced in API development, semantic code retrieval, persistent storage, and AI workflow orchestration.",
    "AI/ML Intern at MindBrain Innovation Pvt. Ltd., working on MCP tooling, multi-agent workflows, and an AI-powered news-to-podcast application.",
  ],

  tldr: [
    "Building full-stack web applications.",
    "Developing agentic AI systems and LLM-powered tools.",
    "Exploring backend engineering and database internals.",
    "Engineering developer-focused applications.",
    "Working with semantic retrieval and retrieval-augmented generation.",
    "Studying software engineering fundamentals and systems design.",
  ],

  // =========================================================
  // CURRENT STATUS
  // =========================================================

  status: {
    available: true,

    availableText: "open for internships, full-time employment, and freelancing",

    nowLearning:
      "DSA • System Design • Backend Engineering • DevOps",

    nowBuilding:
      "Developer-focused products",

    nowListening:
      "focus playlists",
  },

  // =========================================================
  // SOCIAL LINKS
  // =========================================================

  socials: {
    github:
      "https://github.com/sumandey7684",

    twitter:
      "https://x.com/sumxnnn",

    linkedin:
      "https://linkedin.com/in/sumandey7684",

    leetcode:
      "https://leetcode.com/u/suman_dey",

    email:
      "mailto:sumandey7684@gmail.com",

    phone:
      "tel:+91-7684093868",

    resume:
      "",

    discord:
      "",

    medium:
      "",
  },

  // =========================================================
  // EXPERIENCE
  // =========================================================

experience: [
  {
    company: "MindBrain Innovation Pvt. Ltd.",
    role: "AI/ML Intern",
    period: "June 2026 – July 2026",
    location: "Bhubaneswar, Odisha, India",
    blurb: [
      "Built a multi-agent workflow using LangGraph with specialized Research, Code, and Document agents, supported by FAISS-based semantic search and contextual retrieval.",
      "Developed a Python MCP server using the MCP SDK and STDIO transport, exposing six reusable tools for Claude Desktop and LangChain integration.",
      "Developed Podcast Buddy, an AI-powered news-to-podcast pipeline using Gemini, LangChain, Hugging Face embeddings, Edge TTS, and FFmpeg, with FastAPI backend services and a Next.js frontend.",
    ],
  },
] as Job[],

  education: [
    {
      degree: "B.Tech — Computer Science and Engineering",
      institution: "Trident Academy of Technology",
      location: "Bhubaneswar, Odisha, India",
      period: "2023–2027",
      detail: "CGPA: 7.56",
      coursework: [
        "Data Structures and Algorithms",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Artificial Intelligence",
        "Machine Learning",
      ],
    },
  ] as EducationItem[],

  // =========================================================
  // FREELANCE PROJECTS
  // =========================================================
  // No freelance client work is listed in the developer profile.
  // =========================================================

  freelanceProjects: [] as FreelanceProject[],

  // =========================================================
  // PROJECTS
  // =========================================================


projects: [
  {
    title: "AstraDB",
    blurb:
      "A persistent, single-file B+Tree storage engine designed around database storage fundamentals, efficient indexing, buffer-pool management, and crash recovery.",
    story:
      "AstraDB is an embeddable storage engine built around 4 KB slotted pages and persistent indexing. It includes buffer-pool management with LRU eviction, dirty-page handling, and write-ahead logging.\n\nRecovery follows ARIES with analysis, redo, and undo, plus compensation log records and checkpointing. The log tail is validated with CRC32. The engine also includes multi-process fault injection and simulated fsync and pwrite failures.\n\nReported benchmarks: 427K+ point gets per second and 405K+ range scans per second.\n\nPositioning: database internals, persistence, crash consistency, and performance.",
    stack: ["C++20", "B+Tree", "WAL", "ARIES", "Buffer Pool", "LRU"],
    featured: true,
    year: "2026",
    links: {
      source: "https://github.com/sumandey7684/AstraDB",
    },
    href: "/projects/astradb",
    image: "/projects/astradb.png",
    imageAlt: "AstraDB interface showing a semantic-space chart and search results.",
    categories: ["Systems", "Backend"],
  },
  {
    title: "MeshPay",
    blurb:
      "Simulated mesh-routed offline payments with deferred settlement.",
    story:
      "The interface is labeled Offline Payments and Mesh Simulation. It includes payment entry in INR, a mesh network topology, gossip and bridge controls, and a local H2 database.\n\nThe screen identifies the view as simulation mode.",
    stack: [
      "Java 17",
      "Spring Boot 3.3",
      "Spring Data JPA",
      "H2",
      "RSA-OAEP",
      "AES-256-GCM",
      "SHA-256",
    ],
    year: "2026",
    featured: true,
    href: "/projects/meshpay",
    image: "/projects/meshpay.png",
    imageAlt: "MeshPay simulation of mesh-routed offline payments.",
    categories: ["Frontend", "Fullstack"],
  },
  {
    title: "DeepTrace",
    blurb:
      "A deep packet inspection dashboard presented as a Phase 3 frontend shell. The screen uses temporary fixture data and states that no backend is integrated in this phase.",
    story:
      "The interface is labeled Deep Packet Inspection and includes a dashboard, blocking rules, engine performance, PCAP files, recent packets, and detected domains.\n\nThe screenshot labels this as a Phase 3 frontend shell with temporary fixture data and no backend integration.",
    featured: true,
    image: "/projects/deeptrace.png",
    imageAlt: "DeepTrace deep packet inspection dashboard.",
    categories: ["Frontend"],
  },
  {
    title: "Podcast Buddy",
    blurb:
      "An AI-powered platform that converts live news into two-host podcast episodes through automated dialogue generation, text-to-speech synthesis, and audio processing.",
    story:
      "Podcast Buddy ingests live news and turns it into two-host audio episodes. Dialogue and episode content are generated with AI, speech is synthesized with Edge TTS, and audio is processed with FFmpeg.\n\nThe backend exposes asynchronous FastAPI endpoints. A Next.js frontend handles interaction and playback. The pipeline also uses Gemini, LangChain, and Hugging Face embeddings.\n\nPositioning: end-to-end AI product engineering and multimedia automation.",
    stack: ["Next.js", "FastAPI", "Gemini", "LangChain", "Hugging Face embeddings", "Edge TTS", "FFmpeg"],
    featured: true,
    categories: ["Fullstack", "AI/ML"],
  },
  {
    title: "RailGaadi",
    blurb:
      "A railway journey platform that brings train tracking, route visualization, station information, and journey progress into an interactive interface.",
    story:
      "RailGaadi shows real-time train tracking and running status, ETA and delay information, and the current and next station. Routes are drawn on an interactive map with animated train markers, station highlighting, camera-follow mode, and map controls.\n\nThe interface integrates railway, weather, and geospatial services, including MapLibre, MapTiler, OpenWeather, OpenTopography, Overpass, and Turf.js. Layouts are responsive, and journey views can be shared.\n\nPositioning: frontend engineering, external API integration, and geospatial UI.",
    stack: ["React", "TypeScript", "REST APIs", "MapLibre", "MapTiler", "OpenWeather", "OpenTopography", "Overpass", "Turf.js"],
    featured: true,
    image: "/projects/railgaadi.png",
    imageAlt: "RailGaadi page for tracking trains in real time.",
    categories: ["Frontend", "Fullstack"],
  },
  {
    title: "PDFly",
    blurb:
      "A browser-based PDF processing platform designed around modular components and asynchronous client-side file processing.",
    story:
      "PDFly supports multiple PDF operations through modular React and TypeScript components. The core workflow runs in the browser without a server dependency, with asynchronous processing and memory use aimed at large files.\n\nPositioning: browser-based tooling, frontend performance, and file processing.",
    stack: ["React", "TypeScript", "Node.js"],
    featured: true,
    categories: ["Frontend", "Developer Tools"],
  },
  {
    title: "ReadmeHub",
    blurb:
      "A fully client-side GitHub README generator for project and profile READMEs, featuring 15 structurally distinct themes, live Markdown preview, a resizable split editor, 90+ technology badges, GitHub statistics widgets, automatic local persistence, and Markdown copy/download.",
    year: "2026",
    links: {
      live: "https://readme-hub.sumandey.in/",
      source: "https://github.com/sumandey7684/readme-hub",
    },
    href: "/projects/readmehub",
    categories: ["Frontend", "Developer Tools"],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "Wouter",
      "React Query",
      "react-markdown",
      "remark-gfm",
      "pnpm",
    ],
  },
  {
    title: "ChatWrapped",
    blurb:
      "A dashboard that transforms exported WhatsApp conversations into interactive analytics and visual summaries.",
    story:
      "ChatWrapped turns an exported WhatsApp conversation into conversation statistics, message trends, activity patterns, and streaks. The dashboard includes interactive charts, PDF report generation, and client-side processing so the chat stays on the device.\n\nLayouts work on desktop and mobile.\n\nPositioning: data visualization, frontend architecture, and privacy-conscious UX.",
    stack: ["React", "JavaScript", "Data Visualization"],
    featured: false,
    categories: ["Frontend"],
  },
  {
    title: "Tale",
    blurb:
      "A responsive wellness and mental well-being web application focused on structured layouts, consistent visual design, and interactive user experiences.",
    story:
      "Tale is built from reusable UI components and design-system-oriented layouts. It includes interactive cards and dashboards, progress insights, wellness journeys, and responsive product sections, with attention to typography, spacing, and visual hierarchy.\n\nPositioning: UI/UX implementation, design systems, and frontend development.",
    stack: ["React", "UI/UX", "Responsive Design"],
    featured: false,
    categories: ["Frontend"],
  },
] as Project[],



  // =========================================================
  // SKILLS
  // =========================================================

  skills: [
    "JavaScript",
    "TypeScript",
    "Python",
    "C++",
    "Java",
    "SQL",
    "React",
    "Next.js",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "FastAPI",
    "REST APIs",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "LLMs",
    "Generative AI",
    "Agentic AI",
    "Prompt Engineering",
    "Retrieval-Augmented Generation (RAG)",
    "Semantic Search",
    "Embeddings",
    "LangChain",
    "LangGraph",
    "Agent Orchestration",
    "Git",
    "GitHub Actions",
    "CMake",
    "Docker",
    "Postman",
    "Vercel",
    "Netlify",
    "Bun",
  ],

  // =========================================================
  // WRITING
  // =========================================================
  // Empty until you have your own articles.
  // =========================================================

  writing: [] as Post[],

  // =========================================================
  // OPEN SOURCE
  // =========================================================
  // Empty until genuine contributions are added.
  // =========================================================

  openSourceContributions: [] as OpenSourceContribution[],

  // =========================================================
  // GITHUB
  // =========================================================

  github: {
    username: "sumandey7684",
  },

  // =========================================================
  // FOOTER
  // =========================================================

  footerNote: "Built by Suman Dey",
} as const;

export type Site = typeof site;

