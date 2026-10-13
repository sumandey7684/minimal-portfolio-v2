import { site } from "../config/site";
import {
  privacyIntro,
  privacySections,
  termsIntro,
  termsSections,
  type LegalSection,
} from "../content/legal";

export const CANONICAL_ORIGIN = "https://www.sumandey.tech";

export type Crumb = { name: string; path: string };

export type SeoBlock = {
  heading?: string;
  paragraphs?: string[];
  items?: readonly string[];
};

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  h1: string;
  robots: string;
  inSitemap: boolean;
  crumbs?: Crumb[];
  blocks: SeoBlock[];
};

const HOME_DESCRIPTION =
  "Personal portfolio of Suman Dey, a software engineer in Bhubaneswar building full-stack applications, AI-powered products, and backend systems.";

function jobItems() {
  return site.experience.flatMap((job) => {
    const blurbs = Array.isArray(job.blurb) ? job.blurb : [job.blurb];
    return [
      `${job.role}, ${job.company}, ${job.period}, ${job.location ?? site.location}`,
      ...blurbs,
    ];
  });
}

function educationItems() {
  return site.education.flatMap((item) => [
    `${item.degree}, ${item.institution}, ${item.period}${item.detail ? `, ${item.detail}` : ""}`,
    ...(item.coursework ?? []),
  ]);
}

function legalBlocks(intro: { summary: string; reviewed: string }, sections: LegalSection[]): SeoBlock[] {
  return [
    { paragraphs: [intro.summary, intro.reviewed] },
    ...sections.map((section) => ({
      heading: section.title,
      paragraphs: section.contact
        ? [...section.paragraphs, site.email]
        : section.paragraphs,
    })),
  ];
}

export const seoPages: SeoPage[] = [
  {
    path: "/",
    title: "Suman Dey — Software Engineer",
    description: HOME_DESCRIPTION,
    h1: site.name,
    robots: "index, follow",
    inSitemap: true,
    blocks: [
      { paragraphs: [site.role, site.location, site.tagline, site.status.availableText] },
      { heading: "About", items: site.about },
      {
        heading: "Projects",
        items: site.projects.slice(0, 4).map((project) => `${project.title}. ${project.blurb}`),
      },
      { heading: "Experience", items: jobItems() },
      { heading: "Education", items: educationItems() },
      { heading: "Skills", items: site.skills },
    ],
  },
  {
    path: "/projects",
    title: "Projects — Suman Dey",
    description:
      "Projects by Suman Dey, including AstraDB, LoopCode, Podcast Buddy, RailGaadi, Flare, and PDFly.",
    h1: "Projects",
    robots: "index, follow",
    inSitemap: true,
    blocks: [
      {
        items: site.projects.map((project) => `${project.title}. ${project.blurb}`),
      },
    ],
  },
  {
    path: "/experience",
    title: "Experience — Suman Dey",
    description:
      "Suman Dey's AI/ML internship at MindBrain Innovation and B.Tech in Computer Science at Trident Academy of Technology.",
    h1: "Experience",
    robots: "index, follow",
    inSitemap: true,
    blocks: [
      { heading: "Work", items: jobItems() },
      { heading: "Education", items: educationItems() },
    ],
  },
  {
    path: "/contact",
    title: "Contact — Suman Dey",
    description: `Contact Suman Dey by email at ${site.email} or phone ${site.phone}.`,
    h1: "Contact",
    robots: "index, follow",
    inSitemap: true,
    blocks: [
      {
        paragraphs: [
          site.email,
          site.phone,
          `Suman Dey is ${site.status.availableText}.`,
        ],
      },
    ],
  },
  {
    path: "/privacy",
    title: "Privacy Policy — Suman Dey",
    description:
      "Privacy information for Suman Dey's portfolio, including contact forms, analytics, browser storage, and third-party services.",
    h1: privacyIntro.h1,
    robots: "index, follow",
    inSitemap: true,
    blocks: legalBlocks(privacyIntro, privacySections),
  },
  {
    path: "/terms",
    title: "Terms of Service — Suman Dey",
    description:
      "Terms for using Suman Dey's portfolio, including website use, intellectual property, external services, and disclaimers.",
    h1: termsIntro.h1,
    robots: "index, follow",
    inSitemap: true,
    blocks: legalBlocks(termsIntro, termsSections),
  },
  {
    path: "/writing",
    title: "Writing — Suman Dey",
    description: "Writing by Suman Dey. No articles are published yet.",
    h1: "Writing & Thoughts",
    robots: "noindex, follow",
    inSitemap: false,
    blocks: [
      {
        paragraphs: [
          "Technical write-ups, architecture breakdowns, system design insights, and lessons learned while engineering software.",
          "No articles yet. Published writing will show up here.",
        ],
      },
    ],
  },
  {
    path: "/experiments",
    title: "Experiments — Suman Dey",
    description: "Interactive experiments on Suman Dey's portfolio.",
    h1: "Experiments",
    robots: "index, follow",
    inSitemap: true,
    blocks: [
      {
        paragraphs: ["Things I make when I should be doing something else."],
        items: [
          "Memory Box. Memories, photos and sounds on a string.",
          "Vending Machine. A vending machine that dispenses items.",
          "404. A page that is not found.",
        ],
      },
    ],
  },
  {
    path: "/experiments/memory-box",
    title: "Memory Box — Suman Dey",
    description: "A memory board experiment on Suman Dey's portfolio.",
    h1: "Memory Box",
    robots: "index, follow",
    inSitemap: true,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Experiments", path: "/experiments" },
      { name: "Memory Box", path: "/experiments/memory-box" },
    ],
    blocks: [
      {
        paragraphs: [
          "Memories, photos and sounds on a string.",
        ],
      },
    ],
  },
  {
    path: "/experiments/vending-machine",
    title: "Vending Machine — Suman Dey",
    description: "A vending machine experiment on Suman Dey's portfolio.",
    h1: "Vending Machine",
    robots: "index, follow",
    inSitemap: true,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Experiments", path: "/experiments" },
      { name: "Vending Machine", path: "/experiments/vending-machine" },
    ],
    blocks: [
      {
        paragraphs: [
          "A vending machine that dispenses items.",
          "Drag the coin into the slot, press a button, take what drops.",
        ],
      },
    ],
  },
];

export const notFoundSeo: SeoPage = {
  path: "/404",
  title: "Page not found — Suman Dey",
  description: "This page is not on Suman Dey's portfolio.",
  h1: "Page not found",
  robots: "noindex, follow",
  inSitemap: false,
  blocks: [
    {
      paragraphs: ["This page is not on Suman Dey's portfolio."],
    },
  ],
};

export function canonicalUrl(pagePath: string) {
  if (pagePath === "/") return `${CANONICAL_ORIGIN}/`;
  return `${CANONICAL_ORIGIN}${pagePath}`;
}

export function getSeoForPath(pathname: string) {
  return seoPages.find((page) => page.path === pathname) ?? seoPages[0];
}

export function personAndWebsiteJsonLd(page: SeoPage) {
  const sameAs = [
    site.socials.github,
    site.socials.linkedin,
    site.socials.twitter,
    site.socials.leetcode,
  ].filter((url) => url.startsWith("http"));

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      name: site.name,
      url: `${CANONICAL_ORIGIN}/`,
      description: HOME_DESCRIPTION,
    },
    {
      "@type": "Person",
      name: site.name,
      url: `${CANONICAL_ORIGIN}/`,
      jobTitle: site.role,
      email: `mailto:${site.email}`,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhubaneswar",
        addressRegion: "Odisha",
        addressCountry: "IN",
      },
      alumniOf: site.education[0]
        ? {
            "@type": "CollegeOrUniversity",
            name: site.education[0].institution,
          }
        : undefined,
      sameAs,
    },
  ];

  if (page.crumbs && page.crumbs.length > 1) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: page.crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: canonicalUrl(crumb.path),
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function sitemapXml() {
  const urls = seoPages
    .filter((page) => page.inSitemap)
    .map((page) => `  <url>\n    <loc>${canonicalUrl(page.path)}</loc>\n  </url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
