import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useConsent } from "@/context/ConsentContext";

export function ConsentBanner() {
  const {
    status,
    preferencesOpen,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    openPreferences,
    closePreferences,
  } = useConsent();
  const [analyticsChoice, setAnalyticsChoice] = useState(false);

  useEffect(() => {
    setAnalyticsChoice(status === "accepted");
  }, [status, preferencesOpen]);

  if (status && !preferencesOpen) {
    return (
      <button
        type="button"
        onClick={openPreferences}
        className="fixed bottom-4 right-4 z-50 rounded-md border border-[var(--line)] bg-[var(--bg)] px-3 py-2 font-mono text-[11px] text-[var(--muted)] shadow-lg transition-colors hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] sm:bottom-6 sm:right-6"
      >
        Privacy settings
      </button>
    );
  }

  return (
    <aside
      className="fixed inset-x-3 bottom-3 z-50 border border-[var(--line)] bg-[var(--bg)] p-4 shadow-2xl sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-xl sm:p-5"
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-description"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            id="consent-title"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--soft)]"
          >
            Privacy choices
          </p>
          <p
            id="consent-description"
            className="mt-2 max-w-lg text-[13px] leading-6 text-[var(--muted)]"
          >
            This site uses browser storage for essential preferences. Optional
            analytics and visitor counting are enabled only if you accept them.
            Read the{" "}
            <Link
              to="/privacy"
              className="text-[var(--fg)] underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        {status && (
          <button
            type="button"
            onClick={closePreferences}
            aria-label="Close privacy settings"
            className="shrink-0 px-1 text-lg leading-none text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)]"
          >
            ×
          </button>
        )}
      </div>

      {preferencesOpen && (
        <div className="mt-4 border-y border-[var(--line)] py-3">
          <p className="text-[12px] leading-5 text-[var(--muted)]">
            Optional analytics includes Vercel Analytics and the visitor count
            request. The current implementation does not identify an
            application cookie for these choices.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <input
              id="optional-analytics"
              type="checkbox"
              checked={analyticsChoice}
              onChange={(event) => setAnalyticsChoice(event.target.checked)}
              className="size-3 accent-[var(--fg)]"
            />
            <label
              htmlFor="optional-analytics"
              className="text-[12px] text-[var(--fg)]"
            >
              Optional analytics
            </label>
            <span className="ml-auto font-mono text-[10px] uppercase text-[var(--soft)]">
              Off by default
            </span>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
        <button
          type="button"
          onClick={rejectNonEssential}
          className="rounded-md border border-[var(--line)] px-3 py-2 text-[12px] text-[var(--muted)] transition-colors hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)]"
        >
          Reject non-essential
        </button>
        <button
          type="button"
          onClick={
            preferencesOpen
              ? () => savePreferences(analyticsChoice)
              : openPreferences
          }
          className="rounded-md border border-[var(--line)] px-3 py-2 text-[12px] text-[var(--muted)] transition-colors hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)]"
        >
          {preferencesOpen ? "Save preferences" : "Manage preferences"}
        </button>
        <button
          type="button"
          onClick={acceptAll}
          className="rounded-md bg-[var(--fg)] px-3 py-2 text-[12px] font-semibold text-[var(--bg)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
        >
          Accept
        </button>
      </div>
    </aside>
  );
}
