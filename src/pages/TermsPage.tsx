import { Link } from "react-router-dom";
import { Shell, GapBand, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";

const sections = [
  {
    title: "Use of this website",
    paragraphs: [
      "This portfolio is provided to present Suman Dey's work, experience, experiments, and contact information. You may browse the public pages and use the links and interactive features for their intended purposes.",
      "Do not use the site to interfere with its operation, attempt unauthorized access, misuse external services, or submit information that you are not permitted to share. Any specific acceptable-use rules or service terms beyond these general expectations require confirmation.",
    ],
  },
  {
    title: "Intellectual property",
    paragraphs: [
      "The portfolio's original text, layout, code, artwork, and other materials are presented by Suman Dey unless a page or asset identifies another source. No ownership transfer is made by displaying those materials on this site.",
      "Third-party names, logos, links, project references, fonts, and services remain subject to their respective owners' rights and terms. Permission, licensing, and reuse terms for any particular item should be confirmed before copying, modifying, or redistributing it.",
    ],
  },
  {
    title: "External links and services",
    paragraphs: [
      "The site links to external services including GitHub, LinkedIn, X, LeetCode, email, and telephone services. It also uses third-party services for analytics, visitor counting, contribution data, fonts, and other application features.",
      "External sites and services are operated independently. Their availability, content, privacy practices, terms, and security are not controlled by this portfolio. Review the applicable provider terms before using an external service.",
    ],
  },
  {
    title: "Disclaimers",
    paragraphs: [
      "The portfolio is provided for general informational and demonstration purposes. Project descriptions, links, experiments, and other content may change, become unavailable, or contain errors. No promise is made that every page or external link will always be complete, current, or uninterrupted.",
      "Nothing on this site is professional, legal, financial, employment, or other specialized advice. Any hiring, collaboration, freelance, or other arrangement requires separate confirmation and written terms where appropriate.",
    ],
  },
  {
    title: "Limitation of liability",
    paragraphs: [
      "To the extent permitted by applicable law, the site owner is not responsible for losses or damage arising from reliance on site content, interruptions, technical issues, external services, or links to third-party resources.",
      "The scope of any limitation, exclusion, or remedy depends on the applicable law and the facts of a particular situation. This page does not make a jurisdiction-specific legal claim; those details require confirmation.",
    ],
  },
  {
    title: "Changes to these terms",
    paragraphs: [
      "This page may be updated when the website, its services, or its practices change. The current version will be published at this route with its review date.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "Questions about these terms, a project reference, or a specific use of site content can be sent to:",
    ],
    contact: true,
  },
];

export function TermsPage() {
  return (
    <>
      <GapBand h="h-12" />
      <SectionHeader title="Terms of Service" />

      <Shell className="px-6 py-10 sm:px-8 sm:py-14">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--soft)]">
          Current website terms
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-[var(--fg)] sm:text-5xl">
          Terms for using this portfolio.
        </h1>
        <p className="mt-5 max-w-2xl text-[14px] leading-7 text-[var(--muted)]">
          These terms describe the current website and its publicly available
          features. They are informational and should be reviewed before being
          used as a jurisdiction-specific legal agreement.
        </p>
        <p className="mt-4 font-mono text-[11px] text-[var(--soft)]">
          Last reviewed: October 12, 2026
        </p>
      </Shell>

      <div className="border-y border-[var(--line)]">
        <Shell>
          {sections.map((section, index) => (
            <section
              key={section.title}
              className={`px-6 py-8 sm:px-8 sm:py-10 ${
                index < sections.length - 1
                  ? "border-b border-[var(--line)]"
                  : ""
              }`}
            >
              <h2 className="font-serif text-2xl text-[var(--fg)]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-[14px] leading-7 text-[var(--muted)]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.contact && (
                  <a
                    href={`mailto:${site.email}`}
                    className="font-mono text-[13px] text-[var(--fg)] underline decoration-[var(--soft)] underline-offset-4 transition-colors hover:decoration-[var(--fg)]"
                  >
                    {site.email}
                  </a>
                )}
              </div>
            </section>
          ))}
        </Shell>
      </div>

      <Shell className="px-6 py-8 text-[13px] text-[var(--muted)] sm:px-8">
        <p>
          Need to discuss a project?{" "}
          <Link
            to="/contact"
            className="text-[var(--fg)] underline decoration-[var(--soft)] underline-offset-4 transition-colors hover:decoration-[var(--fg)]"
          >
            Contact Suman
          </Link>
          .
        </p>
      </Shell>
    </>
  );
}
