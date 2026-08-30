"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import Timecode from "./Timecode";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
        solid ? "border-b border-slate/70 bg-ink/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-5 sm:h-[72px] sm:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={`${site.name} — home`}>
          <Image
            src="/brand/logo-128.png"
            alt=""
            width={34}
            height={34}
            className="h-[34px] w-auto transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <span className="display hidden text-[19px] uppercase tracking-[0.16em] sm:block">
            Dark<span className="text-specimen">Lab</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-9 md:flex">
          {nav.map((n) => {
            const active = pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`hud !text-[11px] transition-colors hover:text-bone ${
                  active ? "!text-specimen" : ""
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-8">
          <div className="hidden items-center gap-2 border border-slate px-3 py-1.5 lg:flex">
            <span className="rec-dot" />
            <Timecode className="text-[11px] text-ash" />
          </div>

          <a
            href={site.socials[0].href}
            target="_blank"
            rel="noreferrer"
            className="hidden border border-specimen/40 px-4 py-2 font-hud text-[11px] uppercase tracking-[0.2em] text-specimen transition-colors hover:bg-specimen hover:text-ink sm:block"
          >
            Play now
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-[110] flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={`h-px w-5 bg-bone transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-bone transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-[105] bg-ink transition-[opacity,visibility] duration-400 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center gap-2 px-8">
          {nav.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              className="display border-b border-slate py-4 text-[13vw] uppercase leading-none transition-colors hover:text-specimen"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {n.label}
            </Link>
          ))}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {site.socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="hud hover:text-specimen">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
