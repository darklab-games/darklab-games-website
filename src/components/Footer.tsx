import Image from "next/image";
import Link from "next/link";
import { games } from "@/lib/games";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate bg-carbon/30">
      <div className="rule-gradient h-px w-full opacity-60" />
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/brand/logo-128.png" alt="" width={42} height={42} className="h-[42px] w-auto" />
              <span className="display text-2xl uppercase tracking-[0.14em]">
                Dark<span className="text-specimen">Lab</span> Games
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-mist">{site.tagline}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-7 inline-block border-b border-slate pb-1 font-hud text-[13px] text-bone transition-colors hover:border-specimen hover:text-specimen"
            >
              {site.email}
            </a>
          </div>

          <div className="lg:col-span-3">
            <h3 className="hud mb-5">Games</h3>
            <ul className="space-y-2.5">
              {games.map((g) => (
                <li key={g.slug}>
                  <Link href={`/games/${g.slug}`} className="text-[15px] text-mist transition-colors hover:text-specimen">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="hud mb-5">Studio</h3>
            <ul className="space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-[15px] text-mist transition-colors hover:text-specimen">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="hud mb-5">Follow</h3>
            <ul className="space-y-2.5">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[15px] text-mist transition-colors hover:text-specimen"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-slate pt-7">
          <span className="hud">© {new Date().getFullYear()} {site.name}</span>
          <span className="hud">{site.location} · {site.teamSize}</span>
        </div>
      </div>
    </footer>
  );
}
