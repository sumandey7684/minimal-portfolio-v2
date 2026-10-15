import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Shell, SectionHeader } from "@/components/Layout";
import { GitHubIcon } from "@/components/icons";

const SOURCE = "https://github.com/sumandey7684/readme-hub";
const LIVE = "https://readme-hub.sumandey.in/";

const features = [
  "15 themes that change the README structure, not only the colors.",
  "Separate flows for a project README and a GitHub profile README.",
  "Live Markdown preview beside the source.",
  "A divider that resizes the editor and the preview.",
  "More than 90 technology badges.",
  "GitHub statistics widgets for profile READMEs.",
  "Copy to the clipboard or download a README.md file.",
];

const workflow = [
  "Choose a project or profile README and one of the 15 themes.",
  "Fill the form, including technology badges and, for a profile, statistics widgets.",
  "Edit the Markdown while the preview updates.",
  "Copy the result or download README.md.",
];

const stackGroups = [
  {
    label: "Interface",
    items: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
  },
  {
    label: "Application",
    items: ["Vite", "Wouter", "React Query"],
  },
  {
    label: "Markdown",
    items: ["react-markdown", "remark-gfm"],
  },
  {
    label: "Tooling",
    items: ["pnpm"],
  },
];

export function ReadmeHubPage() {
  return (
    <div>
      <SectionHeader
        title="ReadmeHub"
        heading="h1"
        aside={
          <span className="font-mono text-[10px] text-[var(--muted)]">2026</span>
        }
      />

      <Shell className="border-b border-[var(--line)] px-6 py-8 sm:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--soft)]">
            <li>
              <Link to="/" className="transition-colors hover:text-[var(--fg)]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/projects" className="transition-colors hover:text-[var(--fg)]">
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[var(--fg)]">ReadmeHub</li>
          </ol>
        </nav>

        <div className="mb-5 flex flex-wrap gap-2">
          {["Frontend", "Developer Tools"].map((category) => (
            <span
              key={category}
              className="rounded-md border border-[var(--line)] bg-[var(--chip)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]"
            >
              {category}
            </span>
          ))}
        </div>

        <p className="max-w-3xl text-[15px] leading-7 text-[var(--muted)]">
          A fully client-side GitHub README generator for project and profile
          READMEs. It builds the Markdown in the browser, previews it as you
          edit, and keeps the draft on the device.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={LIVE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--fg)] px-4 py-2.5 text-[12px] font-medium text-[var(--bg)] transition-opacity hover:opacity-80"
          >
            Live Demo
            <ArrowUpRight className="size-3.5" />
          </a>
          <a
            href={SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--chip)] px-4 py-2.5 text-[12px] font-medium text-[var(--fg)] transition-colors hover:bg-[var(--hover)]"
          >
            <GitHubIcon className="size-4" />
            Source
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </Shell>

      <Shell className="grid border-b border-[var(--line)] sm:grid-cols-2">
        <section className="border-b border-[var(--line)] px-6 py-8 sm:border-b-0 sm:border-r sm:px-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            Problem
          </h2>
          <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">
            A project README and a GitHub profile README need different
            sections, badges, and statistics. Assembling that Markdown by hand
            is slow to repeat and easy to leave inconsistent.
          </p>
        </section>
        <section className="px-6 py-8 sm:px-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            Solution
          </h2>
          <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">
            ReadmeHub turns a guided form and a chosen theme into Markdown,
            then shows the rendered result beside the source. The repository
            was created in 2026.
          </p>
        </section>
      </Shell>

      <Shell className="border-b border-[var(--line)] px-6 py-8 sm:px-8">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
          Key features
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {features.map((feature) => (
            <li
              key={feature}
              className="rounded-lg border border-[var(--line)] bg-[var(--card)] px-4 py-3 text-[13px] leading-6 text-[var(--muted)]"
            >
              {feature}
            </li>
          ))}
        </ul>
      </Shell>

      <Shell className="grid border-b border-[var(--line)] lg:grid-cols-[1.2fr_0.8fr]">
        <section className="border-b border-[var(--line)] px-6 py-8 lg:border-b-0 lg:border-r sm:px-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            Architecture
          </h2>
          <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">
            The app is a Vite and React client. Wouter moves between the
            landing page, theme gallery, form, and editor. Theme functions in
            the client generate the Markdown. react-markdown and remark-gfm
            render the preview. React Query is part of the client stack. No
            application server receives the draft.
          </p>
          <h2 className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            Workflow
          </h2>
          <ol className="mt-4 space-y-3">
            {workflow.map((step, index) => (
              <li key={step} className="flex gap-3 text-[14px] leading-6 text-[var(--muted)]">
                <span className="font-mono text-[11px] text-[var(--soft)]">
                  0{index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="px-6 py-8 sm:px-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            Engineering decisions
          </h2>
          <ul className="mt-4 space-y-4">
            <li>
              <p className="text-[13px] font-medium text-[var(--fg)]">Browser-based processing</p>
              <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">
                Theme generation, preview, and export run in the browser.
              </p>
            </li>
            <li>
              <p className="text-[13px] font-medium text-[var(--fg)]">Local persistence</p>
              <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">
                The draft is saved to localStorage, so a refresh keeps the work.
              </p>
            </li>
            <li>
              <p className="text-[13px] font-medium text-[var(--fg)]">No backend or sign-up</p>
              <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">
                There is no account and no portfolio server storing the README.
              </p>
            </li>
          </ul>
        </section>
      </Shell>

      <Shell className="px-6 py-8 sm:px-8">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
          Tech stack
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {stackGroups.map((group) => (
            <div key={group.label} className="rounded-lg border border-[var(--line)] p-4">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--soft)]">
                {group.label}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded bg-[var(--chip)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--muted)] border border-[var(--line)]/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </div>
  );
}
