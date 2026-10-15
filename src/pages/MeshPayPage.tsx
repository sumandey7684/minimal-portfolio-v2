import { Link } from "react-router-dom";
import { Shell, SectionHeader } from "@/components/Layout";

const shown = [
  "A payment form takes a sender VPA, a receiver VPA, an amount in INR, and a 4-digit PIN, then injects the payment into the simulated mesh.",
  "The topology shows phone-alice, phone-stranger1, phone-stranger2, phone-stranger3, and phone-bridge, with online, offline, and bridge states.",
  "Run Gossip Round is labeled as propagating packets between simulated devices.",
  "Upload to Bridge is labeled as sending queued packets through bridge nodes for backend settlement.",
  "The selected bridge can show status, queue size, bridge signal, and queued packet IDs.",
];

const unverified = [
  "How RSA-OAEP, AES-256-GCM, and SHA-256 are applied. The names are part of the stack. The screen does not show keys, nonces, or ciphertext.",
  "Replay protection. No nonce, timestamp window, or signature check is shown.",
  "Reconciliation after connectivity returns, beyond the bridge-upload control and the note that settlement waits for that upload.",
  "How the idempotency cache prevents a duplicate payment. The reset control names the cache. Its rules are not visible.",
  "A public repository and test suite were not found to link. The stack names are recorded without a source tree to inspect.",
];

const lifecycle = [
  "The form is filled for alice@demo to bob@demo. The captured example uses 500 INR.",
  "Inject into Mesh produces a status that the backend accepted packet c2acff19, and that settlement is not confirmed until bridge upload.",
  "The bridge node can hold that packet ID in a queue while its bridge signal is available.",
  "A completed gossip round on this screen reported 4 transfers. A completed upload reported 1 upload attempted.",
];

export function MeshPayPage() {
  return (
    <div>
      <SectionHeader
        title="MeshPay"
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
            <li className="text-[var(--fg)]">MeshPay</li>
          </ol>
        </nav>

        <div className="mb-5 flex flex-wrap gap-2">
          {["FinTech", "Backend", "Distributed Systems"].map((category) => (
            <span
              key={category}
              className="rounded-md border border-[var(--line)] bg-[var(--chip)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]"
            >
              {category}
            </span>
          ))}
        </div>

        <p className="max-w-3xl text-[15px] leading-7 text-[var(--muted)]">
          MeshPay is presented as a simulation of offline payments that move
          across nearby devices and settle later through a bridge. The screen
          is labeled Offline Payments and Mesh Simulation, and it says the
          local database is H2. No public GitHub repository or live demo URL
          was found for this project.
        </p>
      </Shell>

      <Shell className="grid border-b border-[var(--line)] sm:grid-cols-2">
        <section className="border-b border-[var(--line)] px-6 py-8 sm:border-b-0 sm:border-r sm:px-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            Connectivity problem
          </h2>
          <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">
            The interface is built around a payment that can be injected while
            settlement is still pending. Its own status text says the backend
            can accept the injection and still withhold settlement until a
            bridge upload.
          </p>
        </section>
        <section className="px-6 py-8 sm:px-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            What was inspected
          </h2>
          <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">
            The evidence is the running dashboard. The public GitHub account
            sumandey7684 has no MeshPay repository, and there is no local
            source tree, README, or test suite to read. Claims below stay
            inside that limit.
          </p>
        </section>
      </Shell>

      <Shell className="border-b border-[var(--line)] px-6 py-8 sm:px-8">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
          Shown in the interface
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {shown.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-[var(--line)] bg-[var(--card)] px-4 py-3 text-[13px] leading-6 text-[var(--muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </Shell>

      <Shell className="grid border-b border-[var(--line)] lg:grid-cols-[1.15fr_0.85fr]">
        <section className="border-b border-[var(--line)] px-6 py-8 lg:border-b-0 lg:border-r sm:px-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            Observed payment path
          </h2>
          <ol className="mt-4 space-y-3">
            {lifecycle.map((step, index) => (
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
            Consistency cues
          </h2>
          <ul className="mt-4 space-y-4">
            <li>
              <p className="text-[13px] font-medium text-[var(--fg)]">Settlement is deferred</p>
              <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">
                Accepting an injection is a different step from confirming
                settlement. The screen says confirmation waits for the bridge
                upload.
              </p>
            </li>
            <li>
              <p className="text-[13px] font-medium text-[var(--fg)]">Two stores are distinguished</p>
              <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">
                Reset clears simulation queues and an in-memory idempotency
                cache. The same control says it does not claim to delete
                persisted ledger data.
              </p>
            </li>
            <li>
              <p className="text-[13px] font-medium text-[var(--fg)]">Duplicate handling is labeled, not specified</p>
              <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">
                The cache name is the only evidence of duplicate protection.
                The page does not describe a locking rule that the source does
                not show.
              </p>
            </li>
          </ul>
        </section>
      </Shell>

      <Shell className="border-b border-[var(--line)] px-6 py-8 sm:px-8">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
          Not verified
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {unverified.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-[var(--line)] px-4 py-3 text-[13px] leading-6 text-[var(--muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-3xl text-[14px] leading-7 text-[var(--muted)]">
          Test coverage is unknown. No test files were available. The screen
          also shows a healthy backend badge and a last-updated time of 14 Oct
          2026, 10:59:14. That is a status on one run, not a test result.
        </p>
      </Shell>

      <Shell className="px-6 py-8 sm:px-8">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
          Tech stack
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[var(--line)] p-4">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--soft)]">
              Application
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Java 17", "Spring Boot 3.3", "Spring Data JPA", "H2"].map((item) => (
                <span
                  key={item}
                  className="rounded border border-[var(--line)]/30 bg-[var(--chip)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--muted)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-[var(--line)] p-4">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--soft)]">
              Packet protection
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["RSA-OAEP", "AES-256-GCM", "SHA-256"].map((item) => (
                <span
                  key={item}
                  className="rounded border border-[var(--line)]/30 bg-[var(--chip)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--muted)]"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[13px] leading-6 text-[var(--muted)]">
              No confirmed GitHub repository or demo URL.
            </p>
          </div>
        </div>
      </Shell>
    </div>
  );
}
