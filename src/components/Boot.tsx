"use client";
import Image from "@/components/Img";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

/**
 * Calibration sequence. The site presents itself as a recording device,
 * so it powers on before it shows you anything: a sweep, the mark
 * resolving, then the frame opening. ~2.3s, once per session, skippable.
 */
export default function Boot() {
  const [state, setState] = useState<"pending" | "running" | "done">("pending");

  useLayoutEffect(() => {
    const seen = sessionStorage.getItem("darklab:boot") === "1";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      setState("done");
      return;
    }
    setState("running");
    document.body.style.overflow = "hidden";
  }, []);

  const finish = useCallback(() => {
    sessionStorage.setItem("darklab:boot", "1");
    document.body.style.overflow = "";
    setState("done");
  }, []);

  useEffect(() => {
    if (state !== "running") return;
    const t = setTimeout(finish, 2650);
    const skip = () => finish();
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [state, finish]);

  if (state === "done") return null;

  return (
    <div
      aria-hidden
      className={`boot fixed inset-0 z-[150] bg-ink ${state === "running" ? "boot-run" : ""}`}
    >
      <div className="boot-stage absolute inset-0 flex flex-col items-center justify-center gap-7">
        <div className="boot-mark relative h-24 w-24 sm:h-28 sm:w-28">
          <Image src="/brand/logo-256.png" alt="" fill sizes="112px" priority className="object-contain" />
        </div>

        <div className="boot-meter h-px w-40 overflow-hidden bg-slate sm:w-56">
          <div className="rule-gradient boot-fill h-full w-full origin-left scale-x-0" />
        </div>

        <p className="boot-label hud !text-[10px] !tracking-[0.42em] text-ash">Calibrating</p>
      </div>

      {/* the sweep */}
      <div className="boot-sweep pointer-events-none absolute inset-x-0 h-px bg-specimen/70 shadow-[0_0_22px_4px] shadow-specimen/40" />

      {/* the frame opening */}
      <div className="boot-shutter-t absolute inset-x-0 top-0 h-1/2 bg-ink" />
      <div className="boot-shutter-b absolute inset-x-0 bottom-0 h-1/2 bg-ink" />

    </div>
  );
}
