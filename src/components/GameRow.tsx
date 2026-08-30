import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/lib/games";
import { Arrow, Chip } from "./Bits";

export default function GameRow({ game, flip }: { game: Game; flip?: boolean }) {
  return (
    <article className="reveal border-t border-slate py-10 sm:py-14">
      {/* the row header reads like a specimen label */}
      <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="display text-3xl leading-none text-specimen sm:text-4xl">{game.index}</span>
        <span className="hud">{game.genre}</span>
        <span className="hidden h-px flex-1 bg-slate sm:block" />
        <span className="hud">{game.platforms.join(" · ")}</span>
        <span className="hud !text-specimen">{game.status}</span>
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <Link
          href={`/games/${game.slug}`}
          className={`viewfinder group relative block aspect-[16/9] overflow-hidden border border-slate bg-carbon lg:col-span-7 ${
            flip ? "lg:order-2" : ""
          }`}
          tabIndex={-1}
          aria-hidden
        >
          <Image
            src={`/games/${game.slug}/key.webp`}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{ background: `radial-gradient(120% 90% at 50% 100%, ${game.accent}22, transparent 62%)` }}
          />
        </Link>

        <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
          <h3 className="display text-[11vw] uppercase leading-[0.86] sm:text-6xl lg:text-[4rem]">
            <Link href={`/games/${game.slug}`} className="transition-colors hover:text-specimen">
              {game.title}
            </Link>
          </h3>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mist">{game.hook}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {game.facts.slice(0, 3).map((f) => (
              <Chip key={f.label}>{f.value}</Chip>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              href={`/games/${game.slug}`}
              className="group inline-flex items-center gap-2.5 font-hud text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:text-specimen"
            >
              Open the file
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            {game.links[0] && (
              <a
                href={game.links[0].href}
                target="_blank"
                rel="noreferrer"
                className="font-hud text-[11px] uppercase tracking-[0.2em] text-ash transition-colors hover:text-specimen"
              >
                {game.links[0].label}
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
