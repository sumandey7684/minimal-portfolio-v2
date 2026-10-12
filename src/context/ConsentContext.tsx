import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

const CONSENT_STORAGE_KEY = "suman_portfolio_consent";

type ConsentStatus = "accepted" | "rejected" | null;

type ConsentContextValue = {
  status: ConsentStatus;
  analyticsAllowed: boolean;
  preferencesOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (analytics: boolean) => void;
  openPreferences: () => void;
  closePreferences: () => void;
};

const ConsentContext = createContext<ConsentContextValue | undefined>(
  undefined,
);

function readStoredConsent(): ConsentStatus {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === "accepted" || stored === "rejected" ? stored : null;
  } catch {
    return null;
  }
}

function writeStoredConsent(status: Exclude<ConsentStatus, null>) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, status);
  } catch {
    // Consent remains active for this render if browser storage is unavailable.
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>(readStoredConsent);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const setConsent = useCallback((nextStatus: Exclude<ConsentStatus, null>) => {
    writeStoredConsent(nextStatus);
    setStatus(nextStatus);
    setPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => setConsent("accepted"), [setConsent]);
  const rejectNonEssential = useCallback(
    () => setConsent("rejected"),
    [setConsent],
  );
  const savePreferences = useCallback(
    (analytics: boolean) => setConsent(analytics ? "accepted" : "rejected"),
    [setConsent],
  );
  const openPreferences = useCallback(() => setPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setPreferencesOpen(false), []);

  const value = useMemo(
    () => ({
      status,
      analyticsAllowed: status === "accepted",
      preferencesOpen,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      openPreferences,
      closePreferences,
    }),
    [
      status,
      preferencesOpen,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      openPreferences,
      closePreferences,
    ],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);

  if (!context) {
    throw new Error("useConsent must be used within ConsentProvider");
  }

  return context;
}
