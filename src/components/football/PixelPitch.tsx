import { useEffect, useRef } from "react";
import {
  AWAY_NAME,
  FootballGame,
  emptyControls,
  type Controls,
  type SfxName,
  type UiState,
} from "./engine";

const STEP_MS = 1000 / 60;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

type PitchProps = {
  /** demo = bot vs bot, auto-restarting, no input */
  demo?: boolean;
  getControls?: () => Controls;
  onUi?: (u: UiState) => void;
  onSfx?: (e: SfxName, v: number) => void;
  gameRef?: React.MutableRefObject<FootballGame | null>;
};

export function PixelPitch({ demo = false, getControls, onUi, onSfx, gameRef }: PitchProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cb = useRef({ getControls, onUi, onSfx });
  cb.current = { getControls, onUi, onSfx };

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const staticMode = demo && reduce;

    let game: FootballGame | null = null;
    let raf = 0;
    let last = 0;
    let acc = 0;
    let visible = true;
    let lastUi = "";
    const none = emptyControls();

    const build = () => {
      const r = wrap.getBoundingClientRect();
      if (r.width < 60 || r.height < 30) return;
      // Pick a small logical resolution, then let CSS scale it up (pixelated).
      const W = clamp(Math.round(r.width / 2.25), 240, 380);
      const scale = r.width / W;
      const H = Math.max(64, Math.round(r.height / scale));
      if (game) {
        const aspectOld = game.W / game.H;
        const keep = demo
          ? Math.abs(W - game.W) < 12 && Math.abs(H - game.H) < 8
          : Math.abs(W / H - aspectOld) / aspectOld < 0.12; // never restart a live match on a tiny resize
        if (keep) return;
      }
      game = new FootballGame(W, H, { demo });
      game.sfx = (e, v) => cb.current.onSfx?.(e, v);
      canvas.width = W;
      canvas.height = H;
      ctx.imageSmoothingEnabled = false;
      if (gameRef) gameRef.current = game;
      lastUi = "";
      if (staticMode) {
        for (let i = 0; i < 260; i++) game.step();
        game.render(ctx);
      }
    };

    const stopLoop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    };

    const startLoop = () => {
      if (raf || staticMode || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const frame = (t: number) => {
      if (!game || staticMode || !visible || document.hidden) {
        raf = 0;
        last = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
      if (!last) last = t;
      acc += Math.min(100, t - last);
      last = t;
      let n = 0;
      while (acc >= STEP_MS && n < 5) {
        game.setControls(cb.current.getControls ? cb.current.getControls() : none);
        game.step();
        acc -= STEP_MS;
        n++;
      }
      if (n === 5) acc = 0;
      game.render(ctx);
      const u = game.ui();
      const key = `${u.phase}|${u.left}|${u.right}`;
      if (key !== lastUi) { lastUi = key; cb.current.onUi?.(u); }
    };

    build();
    startLoop();

    let rz = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rz);
      rz = requestAnimationFrame(build);
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) startLoop();
      else stopLoop();
    }, { threshold: 0.05 });
    io.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopLoop();
      cancelAnimationFrame(rz);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (gameRef) gameRef.current = null;
    };
  }, [demo, gameRef, AWAY_NAME]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden bg-[#09101f]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full select-none"
        style={{ imageRendering: "pixelated" }}
        // NOTE: don't use aria-hidden here — index.css hides `canvas[aria-hidden="true"]`
        // on touch devices (that rule is for the PixelCursor trail).
        role="img"
        aria-label="Pixel football match"
      />
    </div>
  );
}
