import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { getIcon, Icon } from "@iconify/react";
import "@/icons/skill-icons";
import {
  AppWindow,
  Atom,
  Binary,
  Bot,
  BrainCircuit,
  Braces,
  Coffee,
  CodeXml,
  Container,
  Cylinder,
  Database,
  DatabaseZap,
  FileCode,
  GitBranch,
  Globe,
  Leaf,
  Library,
  Link2,
  MessageSquareCode,
  Palette,
  Play,
  Rabbit,
  Route,
  ScanSearch,
  Send,
  Server,
  Settings,
  Share2,
  Sparkles,
  Terminal,
  Triangle,
  Waypoints,
  Webhook,
  Wind,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, string> = {
  All: "lucide:layers",
  "Programming Languages": "lucide:code-2",
  "Frontend Development": "lucide:layout",
  "Backend Development & APIs": "lucide:server",
  "Databases & Storage": "lucide:database",
  "Artificial Intelligence & Generative AI": "lucide:sparkles",
  "DevOps & Development Tools": "lucide:wrench",
};

const SKILL_ICONS: Record<string, { icon: string; fallback: LucideIcon }> = {
  JavaScript: { icon: "logos:javascript", fallback: FileCode },
  TypeScript: { icon: "logos:typescript-icon", fallback: Braces },
  Python: { icon: "logos:python", fallback: Terminal },
  "C++": { icon: "logos:c-plusplus", fallback: Binary },
  Java: { icon: "logos:java", fallback: Coffee },
  SQL: { icon: "vscode-icons:file-type-sql", fallback: Database },

  React: { icon: "logos:react", fallback: Atom },
  "Next.js": { icon: "simple-icons:nextdotjs", fallback: AppWindow },
  HTML5: { icon: "logos:html-5", fallback: CodeXml },
  CSS3: { icon: "logos:css-3", fallback: Palette },
  "Tailwind CSS": { icon: "logos:tailwindcss-icon", fallback: Wind },

  "Node.js": { icon: "logos:nodejs-icon", fallback: Server },
  "Express.js": { icon: "simple-icons:express", fallback: Route },
  FastAPI: { icon: "simple-icons:fastapi", fallback: Zap },
  "REST APIs": { icon: "simple-icons:openapiinitiative", fallback: Webhook },

  PostgreSQL: { icon: "logos:postgresql", fallback: Cylinder },
  MySQL: { icon: "logos:mysql", fallback: DatabaseZap },
  MongoDB: { icon: "logos:mongodb-icon", fallback: Leaf },

  LLMs: { icon: "lucide:brain-circuit", fallback: BrainCircuit },
  "Generative AI": { icon: "lucide:sparkles", fallback: Sparkles },
  "Agentic AI": { icon: "lucide:bot", fallback: Bot },
  "Prompt Engineering": {
    icon: "lucide:message-square-code",
    fallback: MessageSquareCode,
  },
  "Retrieval-Augmented Generation (RAG)": {
    icon: "lucide:library",
    fallback: Library,
  },
  "Semantic Search": { icon: "lucide:scan-search", fallback: ScanSearch },
  Embeddings: { icon: "lucide:waypoints", fallback: Waypoints },
  LangChain: { icon: "simple-icons:langchain", fallback: Link2 },
  LangGraph: { icon: "simple-icons:langgraph", fallback: Share2 },
  "Agent Orchestration": { icon: "lucide:workflow", fallback: Workflow },

  Git: { icon: "logos:git-icon", fallback: GitBranch },
  "GitHub Actions": { icon: "logos:github-actions", fallback: Play },
  CMake: { icon: "simple-icons:cmake", fallback: Settings },
  Docker: { icon: "logos:docker-icon", fallback: Container },
  Postman: { icon: "logos:postman-icon", fallback: Send },
  Vercel: { icon: "simple-icons:vercel", fallback: Triangle },
  Netlify: { icon: "logos:netlify-icon", fallback: Globe },
  Bun: { icon: "simple-icons:bun", fallback: Rabbit },
};

const skillCategories: Record<string, string[]> = {
  "Programming Languages": [
    "JavaScript",
    "TypeScript",
    "Python",
    "C++",
    "Java",
    "SQL",
  ],
  "Frontend": [
    "React",
    "Next.js",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
  ],
  "Backend & APIs": [
    "Node.js",
    "Express.js",
    "FastAPI",
    "REST APIs",
  ],
  "Databases": ["PostgreSQL", "MySQL", "MongoDB"],
  "AI & Gen AI": [
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
  ],
  "DevOps & Dev Tools": [
    "Git",
    "GitHub Actions",
    "CMake",
    "Docker",
    "Postman",
    "Vercel",
    "Netlify",
    "Bun",
  ],
};

function SkillMark({ skill }: { skill: string }) {
  const spec = SKILL_ICONS[skill];
  const Fallback = spec?.fallback;
  const missing = !spec || !getIcon(spec.icon);

  if (!spec || missing) {
    if (!Fallback) return null;
    return <Fallback className="size-4 shrink-0" aria-hidden strokeWidth={2} />;
  }

  return (
    <Icon
      icon={spec.icon}
      width={16}
      height={16}
      aria-hidden
      className="size-4 shrink-0 transition-colors group-hover:brightness-110"
      fallback={
        <Fallback className="size-4 shrink-0" aria-hidden strokeWidth={2} />
      }
    />
  );
}

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  if (!site.skills.length) return null;

  const categories = ["All", ...Object.keys(skillCategories)];

  const filteredSkills =
    activeCategory === "All"
      ? site.skills
      : site.skills.filter((skill) =>
          skillCategories[activeCategory]?.includes(skill)
        );

  return (
    <div id="skills">
      <SectionHeader
        title="Tech Stack"
        aside={
          <span className="hidden font-mono text-[10px] tracking-wider text-[var(--soft)] sm:inline">
            ( select tab to filter )
          </span>
        }
      />

      <Shell className="px-6 py-6 sm:px-8">
        <div className="flex flex-wrap gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-1">
          {categories.map((cat) => {
            const iconName = CATEGORY_ICONS[cat] || "lucide:layers";
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium cursor-pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-category-pill"
                    className="absolute inset-0 rounded-md bg-[var(--fg)] shadow-sm"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      mass: 0.8,
                    }}
                  />
                )}

                <span
                  className={`relative z-10 flex items-center gap-1.5 transition-colors duration-200 ${
                    isActive
                      ? "font-semibold text-[var(--bg)]"
                      : "text-[var(--muted)]"
                  }`}
                >
                  <Icon
                    icon={iconName}
                    width={14}
                    height={14}
                    className="size-3.5"
                  />

                  {cat}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-6 flex flex-wrap gap-2.5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              return (
                <motion.span
                  key={skill}
                  layout
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  className="
                    flex
                    cursor-default
                    items-center
                    gap-2
                    rounded-md
                    border
                    border-[var(--line)]
                    bg-[var(--card)]
                    px-3
                    py-1.5
                    font-mono
                    text-[12px]
                    text-[var(--muted)]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-[var(--fg)]
                    hover:bg-[var(--fg)]
                    hover:text-[var(--bg)]
                    shadow-xs
                    group
                  "
                >
                  <SkillMark skill={skill} />

                  {skill}
                </motion.span>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Shell>
    </div>
  );
}

export default TechStack;
