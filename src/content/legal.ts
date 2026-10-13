import { site } from "../config/site";

export type LegalSection = {
  title: string;
  paragraphs: string[];
  contact?: boolean;
};

export const privacyIntro = {
  eyebrow: "Current implementation summary",
  h1: "How this portfolio handles information.",
  summary:
    "This page describes the data flows present in the portfolio code as currently implemented. It is informational and should be reviewed before being used as a jurisdiction-specific legal notice.",
  reviewed: "Last reviewed: October 12, 2026",
};

export const privacySections: LegalSection[] = [
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

export const termsIntro = {
  eyebrow: "Current website terms",
  h1: "Terms for using this portfolio.",
  summary:
    "These terms describe the current website and its publicly available features. They are informational and should be reviewed before being used as a jurisdiction-specific legal agreement.",
  reviewed: "Last reviewed: October 12, 2026",
};

export const termsSections: LegalSection[] = [
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
