import { lazy, Suspense, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import { VisitorProvider } from "@/context/VisitorContext";

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
import { ContactPage } from "./pages/ContactPage";

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

import { Analytics } from "@vercel/analytics/react";
import CursorGuide from "./components/CursorGuide";
import Preloader from "./components/Preloader";
import BottomBlur from "./components/BottomBlur";

const PAGE_META: { test: (path: string) => boolean; title: string; description: string }[] = [
  {
    test: (path) => path === "/",
    title: "Suman Dey — Software Engineer",
    description:
      "Personal portfolio of Suman Dey, a software engineer in Bhubaneswar building full-stack applications, AI-powered products, and backend systems.",
  },
  {
    test: (path) => path === "/projects",
    title: "Projects — Suman Dey",
    description:
      "Projects by Suman Dey, including AstraDB, LoopCode, Podcast Buddy, RailGaadi, Flare, and PDFly.",
  },
  {
    test: (path) => path === "/experience",
    title: "Experience — Suman Dey",
    description:
      "Suman Dey's AI/ML internship at MindBrain Innovation and B.Tech in Computer Science at Trident Academy of Technology.",
  },
  {
    test: (path) => path === "/contact",
    title: "Contact — Suman Dey",
    description:
      "Contact Suman Dey by email at sumandey7684@gmail.com or phone +91-7684093868.",
  },
  {
    test: (path) => path === "/writing",
    title: "Writing — Suman Dey",
    description: "Writing by Suman Dey. No articles are published yet.",
  },
  {
    test: (path) => path === "/experiments",
    title: "Experiments — Suman Dey",
    description: "Interactive experiments on Suman Dey's portfolio.",
  },
  {
    test: (path) => path.startsWith("/experiments/memory-box"),
    title: "Memory Box — Suman Dey",
    description: "A memory board experiment on Suman Dey's portfolio.",
  },
  {
    test: (path) => path.startsWith("/experiments/vending-machine"),
    title: "Vending Machine — Suman Dey",
    description: "A vending machine experiment on Suman Dey's portfolio.",
  },
];

function usePageMeta(pathname: string, is404: boolean) {
  useEffect(() => {
    const match = is404
      ? {
          title: "Page not found — Suman Dey",
          description: "This page is not on Suman Dey's portfolio.",
        }
      : PAGE_META.find((page) => page.test(pathname)) ?? PAGE_META[0];

    document.title = match.title;

    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }
    description.setAttribute("content", match.description);
  }, [pathname, is404]);
}

const VALID_ROUTES = [
  "/",
  "/projects",
  "/experience",
  "/contact",
  "/writing",
  "/experiments",
  "/experiments/memory-box",
  "/experiments/vending-machine",
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

function NotFoundPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      <NotFoundSign />
    </div>
  );
}

function AppContent() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { pathname } = useLocation();

  // Only individual experiment pages use the standalone layout.
  // The /experiments gallery keeps the normal portfolio layout.
  const isStandaloneExperiment =
    pathname.startsWith("/experiments/");

  const is404 = !VALID_ROUTES.includes(pathname);

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
          : "relative min-h-screen overflow-x-hidden bg-[var(--bg)] font-sans text-[var(--fg)] antialiased transition-colors duration-300"
      }
    >
      {!is404 && !isStandaloneExperiment && (
        <Nav onOpenPalette={() => setPaletteOpen(true)} />
      )}

      {!is404 && !isStandaloneExperiment && <SideIndex />}

      <main className={is404 ? "relative" : "relative z-10"}>
        <Suspense fallback={null}>
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

          <Route path="/writing" element={<WritingPage />} />

          <Route
            path="/experiments"
            element={<ExperimentsPage />}
          />

          <Route
            path="/experiments/memory-box"
            element={<MemoryBoxPage />}
          />

          <Route
            path="/experiments/vending-machine"
            element={<VendingMachine />}
          />
          <Route
            path="/experiments/404"
            element={<NotFoundPage />}
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
        <VisitorProvider>
          <BrowserRouter>
            {loading && (
              <Preloader onDone={() => setLoading(false)} />
            )}

            <CursorGuide />

            <Analytics />

            <ScrollToTop />

            <AppContent />

            <RouteEffects />
          </BrowserRouter>
        </VisitorProvider>
      </LenisProvider>
    </ThemeProvider>
  );
}

export default App;
