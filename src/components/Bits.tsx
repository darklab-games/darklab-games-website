import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHead({
  eyebrow,
  title,
  intro,
  right,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  right?: ReactNode;
}) {
  return (
    <div className="reveal mb-14 border-t border-slate pt-6 sm:mb-20">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <span className="hud flex items-center gap-3 !text-specimen">
          <span className="h-px w-6 bg-specimen" />
          {eyebrow}
        </span>
        {right}
      </div>
      <h2 className="display mt-6 max-w-3xl text-[13vw] uppercase leading-[1.02] sm:text-6xl lg:text-[5.2rem]">
        {title}
      </h2>
      {intro && <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-mist">{intro}</p>}
    </div>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={`h-3.5 w-3.5 ${className}`} aria-hidden>
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

export function TextLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const cls =
    "group inline-flex items-center gap-2.5 font-hud text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:text-specimen";
  const inner = (
    <>
      {children}
      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="border border-slate px-2.5 py-1 font-hud text-[10px] uppercase tracking-[0.18em] text-ash">
      {children}
    </span>
  );
}
