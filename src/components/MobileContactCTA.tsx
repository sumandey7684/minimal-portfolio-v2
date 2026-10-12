import { ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useConsent } from "@/context/ConsentContext";

export function MobileContactCTA() {
  const { pathname } = useLocation();
  const { status, preferencesOpen } = useConsent();

  if (
    pathname === "/contact" ||
    pathname.startsWith("/experiments/") ||
    !status ||
    preferencesOpen
  ) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-40 md:hidden">
      <Link
        to="/contact"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--fg)] px-4 py-3 font-mono text-[12px] font-semibold text-[var(--bg)] shadow-lg transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] motion-reduce:transform-none motion-reduce:transition-none"
      >
        Contact me
        <ArrowUpRight size={14} aria-hidden="true" />
      </Link>
    </div>
  );
}

export default MobileContactCTA;
