"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * Full-viewport game player. Sits above the site header and footer so the game
 * gets the whole screen, with a thin bar to get back to the studio site.
 */
export default function GameFrame({ title, src }: { title: string; src: string }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // the page behind the player must not scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const fullscreen = () => {
    const el = shellRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else el.requestFullscreen?.().catch(() => {});
  };

  return (
    <div ref={shellRef} className="fixed inset-0 z-[120] flex flex-col bg-black">
      <div className="flex h-11 shrink-0 items-center justify-between gap-4 border-b border-slate bg-ink px-4 sm:px-6">
        <Link href="/" className="hud flex items-center gap-2 transition-colors hover:!text-specimen">
          <span aria-hidden>←</span> DarkLab Games
        </Link>
        <span className="hud hidden items-center gap-2 !text-bone sm:flex">
          <span className="rec-dot" /> {title}
        </span>
        <button onClick={fullscreen} className="hud transition-colors hover:!text-specimen">
          Fullscreen
        </button>
      </div>

      <iframe
        ref={frameRef}
        src={src}
        title={title}
        className="block w-full flex-1 border-0"
        allow="fullscreen; autoplay; gamepad; clipboard-write"
        allowFullScreen
        // keyboard input goes to the game without the player clicking first
        onLoad={() => frameRef.current?.focus()}
      />
    </div>
  );
}
