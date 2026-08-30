import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { Arrow } from "@/components/Bits";
import { games, getGame } from "@/lib/games";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return {};
  return {
    title: game.title,
    description: game.summary,
    openGraph: {
      title: `${game.title} — DarkLab Games`,
      description: game.summary,
      images: [{ url: `/games/${game.slug}/key.jpg`, width: 1600, height: 900, alt: game.title }],
    },
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const i = games.findIndex((g) => g.slug === game.slug);
  const next = games[(i + 1) % games.length];

  return (
    <>
      {/* ------------------------------------------------ hero */}
      <header className="relative flex min-h-[78svh] items-end overflow-hidden border-b border-slate pt-28">
        <Image
          src={`/games/${game.slug}/${game.heroShot ? `shot-${game.heroShot}` : "key"}.webp`}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/55" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-ink to-transparent" />
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: `radial-gradient(90% 70% at 12% 100%, ${game.accent}30, transparent 60%)` }}
        />
        <div className="brackets pointer-events-none absolute inset-x-5 bottom-5 top-24 sm:inset-x-8 sm:bottom-8 sm:top-28">
          <span /><span /><span /><span />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-14 sm:px-8 sm:pb-20">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="display text-3xl leading-none text-specimen">{game.index}</span>
            <span className="hud">{game.genre}</span>
            <span className="hud">{game.platforms.join(" · ")}</span>
            <span className="hud !text-specimen">{game.status}</span>
          </div>

          <h1 className="display mt-6 max-w-5xl text-[16vw] uppercase leading-[0.84] sm:text-[10vw] lg:text-[8rem]">
            <span className="wipe"><span>{game.title}</span></span>
          </h1>

          <p className="reveal reveal-d1 mt-7 max-w-xl text-[15px] leading-relaxed text-mist sm:text-base">
            {game.hook}
          </p>

          <div className="reveal reveal-d2 mt-9 flex flex-wrap gap-3">
            {game.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={
                  l.primary
                    ? "border border-specimen bg-specimen px-7 py-3.5 font-hud text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-specimen"
                    : "border border-slate px-7 py-3.5 font-hud text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-bone"
                }
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ------------------------------------------------ overview + fact sheet */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 xl:col-span-8">
            <p className="reveal display max-w-3xl text-[6vw] leading-[1.06] text-bone sm:text-[2.1rem] lg:text-[2.45rem]">
              {game.summary}
            </p>
            <div className="mt-10 max-w-2xl space-y-5">
              {game.story.map((p, n) => (
                <p key={n} className={`reveal reveal-d${n + 1} text-[15px] leading-relaxed text-mist sm:text-base`}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="reveal reveal-d1 lg:sticky lg:top-28">
              <h2 className="hud mb-5 border-t border-slate pt-5">Fact sheet</h2>
              <dl>
                {[
                  ...game.facts,
                  { label: "Platforms", value: game.platforms.join(", ") },
                  { label: "Status", value: game.status },
                  { label: "Released", value: game.year },
                ].map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-6 border-b border-slate py-3.5">
                    <dt className="hud">{f.label}</dt>
                    <dd className="text-right text-[15px] text-bone">{f.value}</dd>
                  </div>
                ))}
              </dl>

              {game.controls && (
                <>
                  <h2 className="hud mb-5 mt-12 border-t border-slate pt-5">Controls</h2>
                  <dl>
                    {game.controls.map((c) => (
                      <div key={c.key} className="flex items-baseline justify-between gap-6 border-b border-slate py-3.5">
                        <dt className="font-hud text-[12px] text-specimen">{c.key}</dt>
                        <dd className="text-right text-[15px] text-mist">{c.action}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* ------------------------------------------------ features */}
      <section className="border-y border-slate bg-carbon/30">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="reveal display mb-14 text-[11vw] uppercase leading-none sm:text-5xl lg:text-[4rem]">
            What you are getting
          </h2>
          <div className={`grid gap-px border border-slate bg-slate sm:grid-cols-2 ${game.features.length % 3 === 0 ? "lg:grid-cols-3" : ""}`}>
            {game.features.map((f) => (
              <div key={f.title} className="viewfinder reveal relative bg-ink p-7 sm:p-9">
                <h3 className="display text-2xl uppercase leading-tight sm:text-[1.7rem]">{f.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-mist">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ screenshots */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="reveal mb-12 flex flex-wrap items-baseline justify-between gap-4 border-t border-slate pt-6">
          <h2 className="display text-[11vw] uppercase leading-none sm:text-5xl lg:text-[4rem]">Screens</h2>
          <span className="hud">{String(game.shots).padStart(2, "0")} stills · click to enlarge</span>
        </div>
        <div className="reveal">
          <Gallery slug={game.slug} count={game.shots} title={game.title} />
        </div>
      </section>

      {/* ------------------------------------------------ next */}
      <section className="border-t border-slate">
        <Link href={`/games/${next.slug}`} className="group relative block overflow-hidden">
          <Image
            src={`/games/${next.slug}/key.webp`}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/40" />
          <div className="relative mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-6 px-5 py-20 sm:px-8 sm:py-24">
            <div>
              <span className="hud !text-specimen">Next in the catalogue</span>
              <span className="display mt-4 block text-[12vw] uppercase leading-none sm:text-6xl lg:text-[5rem]">
                {next.title}
              </span>
            </div>
            <Arrow className="!h-10 !w-10 text-specimen transition-transform duration-500 group-hover:translate-x-2" />
          </div>
        </Link>
      </section>
    </>
  );
}
