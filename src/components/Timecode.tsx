"use client";
import { useEffect, useRef } from "react";

const pad = (n: number, w = 2) => String(n).padStart(w, "0");

/** Running timecode, counting from page load. The site is recording. */
export default function Timecode({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      const el = ref.current;
      if (el) {
        el.textContent = `${pad(Math.floor(t / 3600))}:${pad(Math.floor(t / 60) % 60)}:${pad(
          Math.floor(t) % 60,
        )}:${pad(Math.floor((t % 1) * 25))}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <span ref={ref} className={`font-hud tabular-nums ${className}`} suppressHydrationWarning>
      00:00:00:00
    </span>
  );
}
