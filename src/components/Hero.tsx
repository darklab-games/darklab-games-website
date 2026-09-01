"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { games } from "@/lib/games";
import { site } from "@/lib/site";

const SEGMENT = 5; // the reel gives every game exactly five seconds

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      const t = v.currentTime;
      setActive(Math.min(games.length - 1, Math.floor(t / SEGMENT)));
      setProgress((t % SEGMENT) / SEGMENT);
    };
    v.addEventListener("timeupdate", onTime);
    v.play().catch(() => {});
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  const jump = (i: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = i * SEGMENT + 0.05;
    v.play().catch(() => {});
  };

  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/video/darklab-reel-clean-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="DarkLab Games showreel"
      >
        <source src="/video/darklab-reel-clean-720.webm" type="video/webm" />
        <source src="/video/darklab-reel-clean-1080.mp4" type="video/mp4" />
      </video>

      {/* scrims — keep the footage readable without flattening it */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/72 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/70" />

      {/* the frame */}
      <div className="brackets pointer-events-none absolute inset-x-5 bottom-24 top-20 sm:inset-x-8 sm:bottom-28 sm:top-24">
        <span /><span /><span /><span />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-36 pt-28 sm:px-8 sm:pb-40 lg:justify-center lg:pb-28">
        <div className="max-w-4xl">
          <div className="wipe mb-7">
            <span className="hud flex items-center gap-3 !text-specimen">
              <span className="h-px w-8 bg-specimen" />
              Independent game studio · Est. {site.founded}
            </span>
          </div>

          <h1 className="display text-[14vw] uppercase leading-[0.92] sm:text-[11vw] lg:text-[6.6rem] xl:text-[7.6rem]">
            <span className="wipe"><span>We make games</span></span>
            <span className="wipe"><span>that <em className="not-italic text-specimen">watch</em></span></span>
            <span className="wipe"><span>you back.</span></span>
          </h1>

          <div className="wipe mt-8 max-w-lg">
            <span className="block text-[15px] leading-relaxed text-mist sm:text-base">
              Horror, action and arcade games built by a small studio that cares more about the
              minute you remember than the hours you log. Four titles out now — all playable today.
            </span>
          </div>

          <div className="reveal reveal-d2 mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/games"
              className="group relative overflow-hidden border border-specimen bg-specimen px-7 py-3.5 font-hud text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-specimen"
            >
              Enter the catalogue
            </Link>
            <a
              href={site.socials[0].href}
              target="_blank"
              rel="noreferrer"
              className="border border-slate px-7 py-3.5 font-hud text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-bone"
            >
              Play free on itch.io
            </a>
          </div>
        </div>
      </div>

      {/* reel index — which of the four you are looking at, right now */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-slate/60 bg-ink/60 backdrop-blur-md">
        <div className="mx-auto max-w-[1600px] px-5 py-3 sm:px-8">
          {/* narrow screens have no room for four labels — name the live one instead */}
          <div className="mb-2.5 flex items-center justify-between gap-3 sm:hidden">
            <span className="hud flex min-w-0 items-center gap-2 !text-bone">
              <span className="rec-dot shrink-0" />
              <span className="truncate">
                <span className="text-specimen">{games[active].index}</span> {games[active].title}
              </span>
            </span>
            <button onClick={toggleSound} className="hud shrink-0 border border-slate px-2.5 py-1.5" aria-pressed={!muted}>
              {muted ? "Sound off" : "Sound on"}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="hud hidden shrink-0 items-center gap-2 sm:flex">
              <span className="rec-dot" /> Showreel
            </span>

            <ul className="flex flex-1 gap-2 sm:gap-3">
              {games.map((g, i) => (
                <li key={g.slug} className="min-w-0 flex-1">
                  <button onClick={() => jump(i)} className="group block w-full text-left" aria-label={`Jump to ${g.title} in the showreel`}>
                    <span className="block h-[2px] w-full overflow-hidden bg-slate">
                      <span
                        className="block h-full bg-specimen transition-[width] duration-150 ease-linear"
                        style={{ width: i < active ? "100%" : i === active ? `${progress * 100}%` : "0%" }}
                      />
                    </span>
                    <span className={`hud mt-2 hidden truncate !text-[10px] transition-colors group-hover:!text-bone sm:block ${i === active ? "!text-bone" : ""}`}>
                      <span className="text-specimen">{g.index}</span> {g.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={toggleSound}
              className="hud hidden shrink-0 border border-slate px-3 py-2 transition-colors hover:border-specimen hover:!text-specimen sm:block"
              aria-pressed={!muted}
            >
              {muted ? "Sound off" : "Sound on"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
