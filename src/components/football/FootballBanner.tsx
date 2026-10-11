import { lazy, Suspense, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { sound } from "./Sound";
import { PixelPitch } from "./PixelPitch";

const GameModal = lazy(() =>
  import("./GameModal").then((m) => ({ default: m.GameModal })),
);

export function FootballBanner() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openGame = () => { sound.unlock(); setOpen(true); };

  return (
    <>
      <div
        className="group relative h-36 cursor-pointer overflow-hidden border border-[var(--line)] bg-neutral-950 sm:h-44"
        onClick={openGame}
        data-cursor-label="click to play football vs me"
      >
        {/* Unmount the demo while the modal is open so we only ever run one game loop */}
        {!open && <PixelPitch demo />}

        {/* same CRT-ish overlays as the old banner */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)]/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_5px)]" />

        <button
          ref={triggerRef}
          type="button"
          onClick={(e) => { e.stopPropagation(); openGame(); }}
          className="absolute bottom-2 right-2 flex items-center gap-2 border border-white/30 bg-black/70 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur transition-colors hover:bg-white hover:text-black"
          aria-label="Play football against Suman"
        >
          Play me
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <Suspense fallback={null}>
            <GameModal onClose={() => { setOpen(false); triggerRef.current?.focus(); }} />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
}
