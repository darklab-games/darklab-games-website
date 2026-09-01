"use client";
import Image from "@/components/Img";
import { useCallback, useEffect, useState } from "react";

export default function Gallery({ slug, count, title }: { slug: string; count: number; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const shots = Array.from({ length: count }, (_, i) => i + 1);

  const move = useCallback(
    (d: number) => setOpen((c) => (c === null ? c : (c + d + count) % count)),
    [count],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, move]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {shots.map((n, i) => (
          <button
            key={n}
            onClick={() => setOpen(i)}
            className="viewfinder group relative aspect-[16/9] overflow-hidden border border-slate bg-carbon"
            aria-label={`${title} — screenshot ${n} of ${count}`}
          >
            <Image
              src={`/games/${slug}/shot-${n}-thumb.webp`}
              alt={`${title} screenshot ${n}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 30vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
            <span className="hud absolute bottom-2 left-2.5 !text-[10px] opacity-0 transition-opacity group-hover:opacity-100">
              {String(n).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[160] flex flex-col bg-ink/97 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} screenshots`}
        >
          <div className="flex items-center justify-between border-b border-slate px-5 py-4 sm:px-8">
            <span className="hud">
              {title} · <span className="text-specimen">{String(open + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
            </span>
            <button onClick={() => setOpen(null)} className="hud transition-colors hover:!text-specimen" autoFocus>
              Close ✕
            </button>
          </div>

          <div className="relative flex-1 p-4 sm:p-10">
            <Image
              src={`/games/${slug}/shot-${open + 1}.webp`}
              alt={`${title} screenshot ${open + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <div className="flex items-center justify-center gap-3 border-t border-slate px-5 py-4">
            <button onClick={() => move(-1)} className="hud border border-slate px-5 py-2.5 transition-colors hover:border-specimen hover:!text-specimen">
              ← Prev
            </button>
            <button onClick={() => move(1)} className="hud border border-slate px-5 py-2.5 transition-colors hover:border-specimen hover:!text-specimen">
              Next →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
