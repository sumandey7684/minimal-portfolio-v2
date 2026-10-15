import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Shell, SectionHeader } from "@/components/Layout";
import { GitHubIcon } from "@/components/icons";

const SOURCE = "https://github.com/sumandey7684/AstraDB";

const features = [
  "In-memory nearest-neighbor search through HNSW, a KD-tree, and brute force.",
  "Euclidean and cosine distance, with insert and delete on the vector store.",
  "A document path that chunks text, embeds it with Ollama, and answers from the retrieved chunks.",
  "A local page that projects stored vectors to 2D and draws them on a canvas.",
];

const queryFlow = [
  "A query enters VectorDB.search with a vector, k, a metric, and an algorithm name.",
  "The call takes the store mutex, then runs brute force, the KD-tree, or HNSW.",
  "HNSW starts at the top-layer entry point, greedily descends, and finishes with a layer-0 beam search.",
  "The result records the hits and the elapsed microseconds.",
];

const documentFlow = [
  "POST /doc/insert splits the text into 250-word chunks with a 30-word overlap.",
  "Each chunk is embedded by a local Ollama client, defaulting to nomic-embed-text on port 11434.",
  "DocumentDB stores the chunk in its own HNSW index and brute-force list, using cosine distance.",
  "POST /doc/ask embeds the question, retrieves the top chunks, and sends them to llama3.2.",
];

const stackGroups = [
  {
    label: "Engine",
    items: ["C++17", "HNSW", "KD-tree", "Brute force"],
  },
  {
    label: "Distance and retrieval",
    items: ["Cosine", "Euclidean", "Ollama", "nomic-embed-text", "llama3.2"],
  },
  {
    label: "Service",
    items: ["cpp-httplib", "JSON", "localhost:8080"],
  },
  {
    label: "Interface",
    items: ["HTML", "Canvas", "PCA"],
  },
];

export function AstraDBPage() {
  return (
    <div>
      <SectionHeader
        title="AstraDB"
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
            <li className="text-[var(--fg)]">AstraDB</li>
          </ol>
        </nav>

        <div className="mb-5 flex flex-wrap gap-2">
          {["Database Systems", "Systems Engineering", "Backend"].map((category) => (
            <span
              key={category}
              className="rounded-md border border-[var(--line)] bg-[var(--chip)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]"
            >
              {category}
            </span>
          ))}
        </div>

        <p className="max-w-3xl text-[15px] leading-7 text-[var(--muted)]">
          An in-memory vector search engine in a single C++ translation unit.
          It keeps a small demo index and a separate document index, serves
          both over HTTP, and draws the demo space in the browser. The GitHub
          repository was created on 22 May 2026. There is no published demo URL.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
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
            Overview
          </h2>
          <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">
            The published tree is <span className="text-[var(--fg)]">main.cpp</span>,{" "}
            <span className="text-[var(--fg)]">index.html</span>,{" "}
            <span className="text-[var(--fg)]">httplib.h</span>, and the README.
            VectorDB holds the demo records. DocumentDB holds embedded document
            chunks. Neither index is written to disk.
          </p>
        </section>
        <section className="px-6 py-8 sm:px-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            What the demo stores
          </h2>
          <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">
            Startup inserts 20 labeled records across computer science, math,
            food, and sports. Those vectors are 16-dimensional. The page builds
            a matching 16-dimensional query by scoring category keywords, then
            asks the server to search it.
          </p>
        </section>
      </Shell>

      <Shell className="border-b border-[var(--line)] px-6 py-8 sm:px-8">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
          Features in the source
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

      <Shell className="grid border-b border-[var(--line)] lg:grid-cols-[1.15fr_0.85fr]">
        <section className="border-b border-[var(--line)] px-6 py-8 lg:border-b-0 lg:border-r sm:px-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            Query path
          </h2>
          <ol className="mt-4 space-y-3">
            {queryFlow.map((step, index) => (
              <li key={step} className="flex gap-3 text-[14px] leading-6 text-[var(--muted)]">
                <span className="font-mono text-[11px] text-[var(--soft)]">
                  0{index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <h2 className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            Document path
          </h2>
          <ol className="mt-4 space-y-3">
            {documentFlow.map((step, index) => (
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
            Indexes
          </h2>
          <ul className="mt-4 space-y-4">
            <li>
              <p className="text-[13px] font-medium text-[var(--fg)]">HNSW</p>
              <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">
                Default M is 16 and the base layer allows 32 neighbors.
                Construction uses ef 200. Search uses ef 50. Level assignment
                uses a fixed random seed of 42.
              </p>
            </li>
            <li>
              <p className="text-[13px] font-medium text-[var(--fg)]">KD-tree and brute force</p>
              <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">
                The same insert is written into all three structures. Brute
                force scans the stored vectors. The KD-tree is the exact
                partitioned alternative used by the compare endpoint.
              </p>
            </li>
            <li>
              <p className="text-[13px] font-medium text-[var(--fg)]">One lock per store</p>
              <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">
                VectorDB and DocumentDB each guard their maps with a mutex.
                Requests on one store run one at a time.
              </p>
            </li>
          </ul>
        </section>
      </Shell>

      <Shell className="border-b border-[var(--line)] px-6 py-8 sm:px-8">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
          Performance
        </h2>
        <p className="mt-4 max-w-3xl text-[14px] leading-7 text-[var(--muted)]">
          GET /benchmark times one search on the current in-memory store. It
          records brute-force, KD-tree, and HNSW elapsed time with{" "}
          <span className="text-[var(--fg)]">std::chrono</span> in microseconds,
          using k from the query and HNSW ef 50. The page draws those three
          durations as bars. The published tree has no benchmark dataset, no
          repeated-trial harness, and no throughput test.
        </p>
        <p className="mt-4 max-w-3xl text-[14px] leading-7 text-[var(--muted)]">
          Figures of 427K+ point gets per second and 405K+ range scans per
          second are not in the repository, the README, or a test. They are
          not reported here.
        </p>
      </Shell>

      <Shell className="grid border-b border-[var(--line)] lg:grid-cols-2">
        <section className="border-b border-[var(--line)] px-6 py-8 lg:border-b-0 lg:border-r sm:px-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            Design choices
          </h2>
          <ul className="mt-4 space-y-4">
            <li>
              <p className="text-[13px] font-medium text-[var(--fg)]">Three indexes, one insert</p>
              <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">
                Keeping brute force beside HNSW gives the compare view an
                exhaustive baseline without a separate correctness suite.
              </p>
            </li>
            <li>
              <p className="text-[13px] font-medium text-[var(--fg)]">Two embedding paths</p>
              <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">
                The demo chart works without Ollama. Document search and
                question answering stop when the local model server is down.
              </p>
            </li>
            <li>
              <p className="text-[13px] font-medium text-[var(--fg)]">Projection stays in the page</p>
              <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">
                index.html centers the vectors and finds two principal
                directions with power iteration, then draws them on the scatter
                canvas. That routine is not in main.cpp.
              </p>
            </li>
          </ul>
        </section>
        <section className="px-6 py-8 sm:px-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            Checked and not found
          </h2>
          <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">
            The repository does not contain 4 KB slotted pages, a buffer pool,
            LRU eviction, a B+Tree, write-ahead logging, ARIES recovery, CRC32
            log checks, crash recovery, range scans, or fault injection. There
            is no test directory. The word catch in main.cpp is exception
            handling around numeric parsing.
          </p>
          <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">
            The README describes a src/ tree and a C++ in-process PCA routine.
            The default branch does not contain that tree. The README also
            prints latency tables; the source that would generate them is not
            in the repository.
          </p>
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
                    className="rounded border border-[var(--line)]/30 bg-[var(--chip)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--muted)]"
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
