import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { Arrow, Chip } from "@/components/Bits";
import { games } from "@/lib/games";

export const metadata: Metadata = {
  title: "Games",
  description: "Every game DarkLab Games has released — horror, bullet-hell and arcade action, all playable now.",
};

export default function GamesPage() {
  // Two of the four are horror, so count families rather than labels —
  // otherwise this reads "4" while the rest of the site says three genres.
  const genres = new Set(games.map((g) => (/horror/i.test(g.genre) ? "Horror" : g.genre)));
  return (
    <>
      <PageHead
        eyebrow="The catalogue"
        title="Games"
        intro="Four released titles across horror, arcade and action. Nothing here is a demo and nothing here is behind a paywall."
        meta={[
          { label: "Released", value: String(games.length) },
          { label: "Genres", value: String(genres.size) },
          { label: "Platforms", value: "3" },
        ]}
      />

      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-px border border-slate bg-slate lg:grid-cols-2">
          {games.map((g) => (
            <Link
              key={g.slug}
              href={`/games/${g.slug}`}
              className="viewfinder reveal group relative flex flex-col bg-ink transition-colors hover:bg-carbon"
            >
              <span className="relative block aspect-[16/9] overflow-hidden">
                <Image
                  src={`/games/${g.slug}/key.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                <span
                  className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: `radial-gradient(120% 90% at 50% 100%, ${g.accent}26, transparent 62%)` }}
                />
                <span className="display absolute left-6 top-5 text-3xl leading-none text-specimen">{g.index}</span>
              </span>

              <span className="flex flex-1 flex-col p-7 sm:p-9">
                <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="hud !text-specimen">{g.genre}</span>
                  <span className="hud">{g.platforms.join(" · ")}</span>
                </span>

                <span className="display mt-4 block text-4xl uppercase leading-[0.9] sm:text-[3rem]">
                  {g.title}
                </span>

                <span className="mt-4 block max-w-md text-[15px] leading-relaxed text-mist">{g.hook}</span>

                <span className="mt-6 flex flex-wrap gap-2">
                  {g.facts.slice(0, 3).map((f) => (
                    <Chip key={f.label}>{f.value}</Chip>
                  ))}
                </span>

                <span className="mt-auto flex items-center gap-2.5 pt-8 font-hud text-[11px] uppercase tracking-[0.2em] text-bone transition-colors group-hover:text-specimen">
                  Open the file
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
