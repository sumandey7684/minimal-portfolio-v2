import { Link } from "react-router-dom";
import { Shell, GapBand, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";

type PolicySection = {
  title: string;
  paragraphs: string[];
  contact?: boolean;
};

const sections: PolicySection[] = [
  {
    title: "Information you provide",
    paragraphs: [
      `The contact form asks for your name, email address, and message. Submitting it opens your email application with a pre-filled message addressed to ${site.email}. This portfolio does not send that form data to its own server or store it in a portfolio database.`,
      "Your email provider and email application may process and retain the message according to their own policies. You can also contact Suman directly using the published email address or phone link.",
    ],
  },
  {
    title: "Analytics and browser storage",
    paragraphs: [
      "Optional measurement is controlled by the consent banner. Vercel Analytics, the visitor-count request, and the live GitHub contribution request are not mounted or sent until you accept optional analytics. Rejecting non-essential choices keeps them disabled; the GitHub activity section shows a local fallback until then.",
      "The site uses localStorage to remember your consent choice, selected theme, and football-game mute preference. It uses sessionStorage for the visitor counter and preloader state. These are browser storage mechanisms, not application-specific cookies found in the source reviewed for this page.",
    ],
  },
  {
    title: "Cookies and unresolved provider details",
    paragraphs: [
      "No application-specific cookies were found in the source reviewed for this implementation. The website self-hosts its font assets and does not request Google Fonts resources.",
      "The cookie behavior, retention periods, and consent requirements of Vercel Analytics, CountAPI, and other external services are controlled by those providers and require confirmation from their current documentation.",
    ],
  },
  {
    title: "Third-party services and links",
    paragraphs: [
      "The visitor count uses CountAPI. GitHub contribution activity is requested from the GitHub Contributions API. The website self-hosts its font assets rather than loading them from Google Fonts. These services may receive technical request information when your browser contacts them.",
      "The portfolio links to external sites including GitHub, LinkedIn, X, and LeetCode. Those sites operate independently and have their own privacy practices. Review their policies before sharing information with them.",
    ],
  },
  {
    title: "Retention",
    paragraphs: [
      "The portfolio does not have a server-side contact inbox or an identified application database for form submissions. Messages sent through your email application may remain in your email account, the recipient's account, or their providers' systems according to those providers' retention settings.",
      "Browser storage remains until it expires with the browser session or is cleared by you, depending on the storage type. Provider-specific analytics and API retention periods are not controlled by this portfolio and should be confirmed in the relevant provider documentation.",
    ],
  },
  {
    title: "Security",
    paragraphs: [
      "The portfolio uses HTTPS when served from its production domain. No security measure can guarantee that information sent over email or to an external service will remain secure, so avoid sending sensitive information through the contact form.",
    ],
  },
  {
    title: "Your choices and rights",
    paragraphs: [
      "You can choose not to use the contact form, clear this site's browser storage, block third-party requests in your browser, or contact the published email address with a question about information you have shared.",
      "Depending on where you live, you may have additional privacy rights. The specific process, scope, and response obligations that apply to a request require confirmation for the relevant jurisdiction. Contact Suman at",
    ],
    contact: true,
  },
];

export function PrivacyPage() {
  return (
    <>
      <GapBand h="h-12" />
      <SectionHeader title="Privacy Policy" />

      <Shell className="px-6 py-10 sm:px-8 sm:py-14">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--soft)]">
          Current implementation summary
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-[var(--fg)] sm:text-5xl">
          How this portfolio handles information.
        </h1>
        <p className="mt-5 max-w-2xl text-[14px] leading-7 text-[var(--muted)]">
          This page describes the data flows present in the portfolio code as
          currently implemented. It is informational and should be reviewed
          before being used as a jurisdiction-specific legal notice.
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
          Questions about this page?{" "}
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
