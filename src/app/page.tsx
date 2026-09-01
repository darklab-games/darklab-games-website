import Image from "@/components/Img";
import Link from "next/link";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import GameRow from "@/components/GameRow";
import { SectionHead, TextLink } from "@/components/Bits";
import { games } from "@/lib/games";
import { site } from "@/lib/site";

const PRINCIPLES = [
  {
    label: "Scope",
    title: "Small games, actually finished",
    body: "A tight fifteen minutes that lands beats the sprawling thing nobody completes. Every DarkLab title is built to be played end to end in one sitting.",
  },
  {
    label: "Access",
    title: "Free to try, no gate",
    body: "Everything is on itch.io and half of it runs in the browser. If a game cannot earn a stranger's second minute, that is the game's problem to fix.",
  },
  {
    label: "Craft",
    title: "One studio, whole pipeline",
    body: "Design, code, art, sound and the trailer. Working across all of it is slower, and it is the reason the games feel like they came from somewhere.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />

      {/* ---------------------------------------------- catalogue */}
      <section id="catalogue" className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
        <SectionHead
          eyebrow="The catalogue"
          title={<>Four games,<br />all playable now</>}
          intro="Horror that respects your evening, and arcade games that do not respect your reflexes. Every title below is out and free to try."
          right={<span className="hud">{games.length} released</span>}
        />

        {games.map((g, i) => (
          <GameRow key={g.slug} game={g} flip={i % 2 === 1} />
        ))}

        <div className="reveal mt-14 border-t border-slate pt-8">
          <TextLink href="/games">See the full catalogue</TextLink>
        </div>
      </section>

      {/* ---------------------------------------------- the studio */}
      <section className="relative overflow-hidden border-y border-slate">
        <Image
          src="/games/the-museum/shot-2.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.22]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/78 to-ink" />

        <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
          <SectionHead
            eyebrow="The studio"
            title={<>A very small lab<br />with a very long night</>}
          />

          <div className="grid gap-14 lg:grid-cols-12">
            <div className="reveal reveal-d1 lg:col-span-6">
              <p className="display text-[7vw] uppercase leading-[1.16] text-bone sm:text-[2.6rem] lg:text-[3rem]">
                DarkLab is two people, making the kind of games that keep working on you after you
                close them.
              </p>
              <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-mist">
                It started with horror — a cursed museum, a house where somebody had been watching too
                long — and then refused to stay there. A bullet-hell shooter where aiming is automatic
                and movement is everything. A street game where you are not the person walking, you are
                the world trying to keep him alive.
              </p>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-mist">
                Different genres, one habit: find the single idea a game is actually about, and cut
                everything that is not it.
              </p>
              <div className="mt-10">
                <TextLink href="/about">More about the studio</TextLink>
              </div>
            </div>

            <div className="lg:col-span-6 lg:pl-10">
              <ul>
                {PRINCIPLES.map((p, i) => (
                  <li key={p.label} className={`reveal reveal-d${i + 1} border-t border-slate py-7`}>
                    <div className="flex items-baseline gap-5">
                      <span className="hud w-16 shrink-0 !text-specimen">{p.label}</span>
                      <div>
                        <h3 className="display text-2xl uppercase leading-[1.12] sm:text-[1.75rem]">
                          {p.title}
                        </h3>
                        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-mist">{p.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- follow */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
        <SectionHead
          eyebrow="Stay in the loop"
          title={<>Next build,<br />first look</>}
          intro="Trailers land on YouTube, work-in-progress goes to Instagram and X, and every release shows up on itch.io first."
        />

        <div className="grid gap-px border border-slate bg-slate sm:grid-cols-2 lg:grid-cols-3">
          {site.socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="viewfinder reveal group relative flex items-center justify-between gap-4 bg-ink p-7 transition-colors hover:bg-graphite sm:p-9"
            >
              <span>
                <span className="display block text-2xl uppercase leading-none sm:text-[1.7rem]">
                  {s.label}
                </span>
                <span className="hud mt-2.5 block !tracking-[0.14em]">{s.handle}</span>
              </span>
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0 text-ash transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-specimen" aria-hidden>
                <path d="M6 14L14 6M14 6H7M14 6v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
            </a>
          ))}
        </div>

        <div className="reveal mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-slate pt-8">
          <p className="max-w-md text-[15px] leading-relaxed text-mist">
            Publishing, coverage or collaboration — the inbox is open and read by the people who make
            the games.
          </p>
          <Link
            href="/contact"
            className="border border-specimen bg-specimen px-7 py-3.5 font-hud text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-specimen"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
