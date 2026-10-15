import { lazy, Suspense, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import { VisitorProvider } from "@/context/VisitorContext";
import { ConsentProvider } from "@/context/ConsentContext";
import { useConsent } from "@/context/ConsentContext";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SideIndex } from "@/components/SideIndex";
import { CommandPalette } from "@/components/command-palette";
import { LenisProvider } from "./components/LenisProvider";

import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { OpenSource } from "@/sections/OpenSource";
import { TechStack } from "@/sections/TechStack";
import { Writing } from "@/sections/Writing";
import { GithubActivity } from "@/sections/GithubActivity";

import { WritingPage } from "@/pages/WritingPage";
import { ReadmeHubPage } from "@/pages/ReadmeHubPage";
import { AstraDBPage } from "@/pages/AstraDBPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { TermsPage } from "@/pages/TermsPage";

const ExperimentsPage = lazy(() =>
  import("@/pages/ExperimentsPage").then((m) => ({ default: m.ExperimentsPage })),
);
const MemoryBoxPage = lazy(() =>
  import("@/pages/experiments/MemoryBoxPage").then((m) => ({ default: m.MemoryBoxPage })),
);
const VendingMachine = lazy(() => import("./pages/experiments/VendingMachine"));
const NotFoundSign = lazy(() =>
  import("@/components/NotFoundSign").then((m) => ({ default: m.NotFoundSign })),
);

import { canonicalUrl, getSeoForPath, notFoundSeo, personAndWebsiteJsonLd } from "./seo/pages";
import CursorGuide from "./components/CursorGuide";
import Preloader from "./components/Preloader";
import BottomBlur from "./components/BottomBlur";
import { ConsentBanner } from "./components/ConsentBanner";
import MobileContactCTA from "./components/MobileContactCTA";

const VercelAnalytics = lazy(() =>
  import("@vercel/analytics/react").then(({ Analytics }) => ({
    default: Analytics,
  })),
);

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function usePageMeta(pathname: string, is404: boolean) {
  useEffect(() => {
    const page = is404 ? notFoundSeo : getSeoForPath(pathname);
    document.title = page.title;
    setMeta("name", "description", page.description);
    setMeta("name", "robots", page.robots);
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta(
      "property",
      "og:url",
      page.path === "/404" ? canonicalUrl("/") : canonicalUrl(page.path),
    );
    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (page.path === "/404") {
      canonical?.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl(page.path);
    }

    let jsonLd = document.getElementById("seo-jsonld");
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.id = "seo-jsonld";
      jsonLd.setAttribute("type", "application/ld+json");
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(personAndWebsiteJsonLd(page)).split("<").join("\\u003c");
  }, [pathname, is404]);
}

const VALID_ROUTES = [
  "/",
  "/projects",
  "/projects/astradb",
  "/projects/readmehub",
  "/experience",
  "/contact",
  "/privacy",
  "/terms",
  "/writing",
  "/experiments",
  "/experiments/memory-box",
  "/experiments/vending-machine",
  "/experiments/404",
];

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "auto" });
        }, 100);

        return;
      }
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function MainLayout({
  onOpenPalette,
}: {
  onOpenPalette: () => void;
}) {
  return (
    <>
      <Hero onOpenPalette={onOpenPalette} />

      <About />

      <Contact />

      <Projects isSearchable={false} limit={4} />

      <Experience isDetailed={false} />

      <OpenSource />

      <TechStack />

      <Writing limit={4} />

      <GithubActivity />
    </>
  );
}

function CrawlHeading({
  title,
  crumbs,
}: {
  title: string;
  crumbs?: { href: string; label: string }[];
}) {
  return (
    <div className="sr-only">
      {crumbs && crumbs.length > 1 ? (
        <nav aria-label="Breadcrumb">
          <ol>
            {crumbs.map((crumb, index) => (
              <li key={crumb.href}>
                {index === crumbs.length - 1 ? (
                  crumb.label
                ) : (
                  <Link to={crumb.href}>{crumb.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <h1>{title}</h1>
    </div>
  );
}

function NotFoundPage({ title = "Page not found" }: { title?: string }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      <CrawlHeading title={title} />
      <NotFoundSign />
    </div>
  );
}

function LazyRouteFallback({
  onLoadingChange,
}: {
  onLoadingChange: (loading: boolean) => void;
}) {
  useEffect(() => {
    onLoadingChange(true);

    return () => onLoadingChange(false);
  }, [onLoadingChange]);

  return (
    <div
      className="flex min-h-[12rem] items-center justify-center gap-3 text-sm text-[var(--muted)]"
      role="status"
      aria-live="polite"
    >
      <span
        className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
        aria-hidden="true"
      />
      <span>Loading page...</span>
    </div>
  );
}

function AppContent() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);
  const { pathname } = useLocation();

  // Only individual experiment pages use the standalone layout.
  // The /experiments gallery keeps the normal portfolio layout.
  const isStandaloneExperiment =
    pathname.startsWith("/experiments/");

  const is404 = !VALID_ROUTES.includes(pathname);
  const { status, preferencesOpen } = useConsent();
  const showMobileCTA =
    !is404 &&
    !isStandaloneExperiment &&
    pathname !== "/contact" &&
    Boolean(status) &&
    !preferencesOpen;

  usePageMeta(pathname, is404);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();

        if (!isStandaloneExperiment && !is404) {
          setPaletteOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [isStandaloneExperiment, is404]);

  useEffect(() => {
    if (isStandaloneExperiment || is404) {
      setPaletteOpen(false);
    }
  }, [isStandaloneExperiment, is404]);

  return (
    <div
      className={
        isStandaloneExperiment
          ? "relative min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--fg)]"
          : `relative min-h-screen overflow-x-hidden bg-[var(--bg)] font-sans text-[var(--fg)] antialiased transition-colors duration-300 ${
              showMobileCTA ? "pb-28 md:pb-0" : ""
            }`
      }
    >
      {!is404 && !isStandaloneExperiment && (
        <Nav onOpenPalette={() => setPaletteOpen(true)} />
      )}

      {!is404 && !isStandaloneExperiment && <SideIndex />}

      <main
        className={is404 ? "relative" : "relative z-10"}
        aria-busy={routeLoading}
      >
        <Suspense
          fallback={<LazyRouteFallback onLoadingChange={setRouteLoading} />}
        >
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout
                onOpenPalette={() => setPaletteOpen(true)}
              />
            }
          />

          <Route
            path="/projects"
            element={<Projects isSearchable={true} />}
          />

          <Route path="/projects/astradb" element={<AstraDBPage />} />
          <Route path="/projects/readmehub" element={<ReadmeHubPage />} />

          <Route
            path="/experience"
            element={
              <>
                <Experience isDetailed={true} />
                <OpenSource />
              </>
            }
          />

          <Route path="/contact" element={<ContactPage />} />

          <Route path="/privacy" element={<PrivacyPage />} />

          <Route path="/terms" element={<TermsPage />} />

          <Route path="/writing" element={<WritingPage />} />

          <Route
            path="/experiments"
            element={<ExperimentsPage />}
          />

          <Route
            path="/experiments/memory-box"
            element={
              <>
                <CrawlHeading
                  title="Memory Box"
                  crumbs={[
                    { href: "/", label: "Home" },
                    { href: "/experiments", label: "Experiments" },
                    { href: "/experiments/memory-box", label: "Memory Box" },
                  ]}
                />
                <MemoryBoxPage />
              </>
            }
          />

          <Route
            path="/experiments/vending-machine"
            element={
              <>
                <CrawlHeading
                  title="Vending Machine"
                  crumbs={[
                    { href: "/", label: "Home" },
                    { href: "/experiments", label: "Experiments" },
                    { href: "/experiments/vending-machine", label: "Vending Machine" },
                  ]}
                />
                <VendingMachine />
              </>
            }
          />
          <Route
            path="/experiments/404"
            element={<NotFoundPage title="404 Experiment" />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </main>

      {!is404 && !isStandaloneExperiment && <Footer />}

      {!is404 && !isStandaloneExperiment && (
        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
        />
      )}
    </div>
  );
}

function RouteEffects() {
  const { pathname } = useLocation();

  const isStandaloneExperiment =
    pathname.startsWith("/experiments/");

  return isStandaloneExperiment ? null : <BottomBlur />;
}

export function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <LenisProvider>
        <ConsentProvider>
          <VisitorProvider>
            <BrowserRouter>
            {loading && (
              <Preloader onDone={() => setLoading(false)} />
            )}

            <CursorGuide />

            <ConsentAwareAnalytics />

            <ScrollToTop />

            <AppContent />

            <RouteEffects />
            <ConsentBanner />
            <MobileContactCTA />
            </BrowserRouter>
          </VisitorProvider>
        </ConsentProvider>
      </LenisProvider>
    </ThemeProvider>
  );
}

function ConsentAwareAnalytics() {
  const { analyticsAllowed } = useConsent();

  return analyticsAllowed ? (
    <Suspense fallback={null}>
      <VercelAnalytics />
    </Suspense>
  ) : null;
}

export default App;
