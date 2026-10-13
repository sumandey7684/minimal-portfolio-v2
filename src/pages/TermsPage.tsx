import { Link } from "react-router-dom";
import { Shell, GapBand, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { termsIntro, termsSections } from "@/content/legal";

export function TermsPage() {
  return (
    <>
      <GapBand h="h-12" />
      <SectionHeader title="Terms of Service" />

      <Shell className="px-6 py-10 sm:px-8 sm:py-14">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--soft)]">
          {termsIntro.eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-[var(--fg)] sm:text-5xl">
          {termsIntro.h1}
        </h1>
        <p className="mt-5 max-w-2xl text-[14px] leading-7 text-[var(--muted)]">
          {termsIntro.summary}
        </p>
        <p className="mt-4 font-mono text-[11px] text-[var(--soft)]">
          {termsIntro.reviewed}
        </p>
      </Shell>

      <div className="border-y border-[var(--line)]">
        <Shell>
          {termsSections.map((section, index) => (
            <section
              key={section.title}
              className={`px-6 py-8 sm:px-8 sm:py-10 ${
                index < termsSections.length - 1
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
