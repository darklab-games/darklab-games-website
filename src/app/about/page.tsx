import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { TextLink } from "@/components/Bits";
import { games } from "@/lib/games";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Studio",
  description: `How ${site.name} works, what it makes, and why every game is built to be finished.`,
};

const HOW = [
  {
    label: "Start",
    title: "One idea, stated in a sentence",
    body: "Every project begins as a single line. “You are not the man walking — you are the world.” “Your guns aim themselves.” If it does not survive being said out loud, it does not get built.",
  },
  {
    label: "Cut",
    title: "Everything that is not that idea goes",
    body: "Features get removed until only the sentence is left standing. It is why a DarkLab game is short, and why the short version is the good version.",
  },
  {
    label: "Ship",
    title: "Out in public, free, early",
    body: "Games go up on itch.io where strangers can be honest about them. Comments and ratings shape what gets fixed and what gets made next.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow="The studio"
        title="DarkLab"
        intro={`${site.name} is an independent studio run by ${site.founder}, making horror, action and arcade games that are built to be finished rather than farmed.`}
        meta={[
          { label: "Founded", value: site.founded },
          { label: "Based in", value: site.location },
          { label: "Size", value: site.teamSize },
          { label: "Shipped", value: `${games.length} games` },
        ]}
      />

      {/* statement */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="reveal display text-[7vw] uppercase leading-[0.96] text-bone sm:text-[2.6rem] lg:text-[3.1rem]">
              The lab makes games about attention — who has yours, and who is paying it to you.
            </p>
            <div className="mt-10 max-w-2xl space-y-5 text-[15px] leading-relaxed text-mist sm:text-base">
              <p className="reveal reveal-d1">
                DarkLab started in horror and never fully left. The Museum puts a camera in your hands
                and something patient in the hallway. I Like You gives you a list of chores and quietly
                changes who else is in the house. Watch His Step flips it — now you are the one watching,
                and a man with a phone is walking into an open manhole.
              </p>
              <p className="reveal reveal-d2">
                Void Strike is the odd one out and the point is the same. Its weapons aim themselves so
                that your attention has somewhere better to go: the field, the gaps, the moment before
                the red lines land.
              </p>
              <p className="reveal reveal-d3">
                Four games, three genres, one habit — find the single thing a game is actually about,
                then remove everything else until that thing has room.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="reveal reveal-d1 viewfinder relative aspect-[4/5] overflow-hidden border border-slate bg-carbon">
              <Image
                src="/games/the-museum/shot-4.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="hud !text-specimen">Currently</span>
                <p className="display mt-3 text-3xl uppercase leading-none sm:text-4xl">
                  Building the next one
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* the record — this genuinely is a sequence, so it is numbered */}
      <section className="border-y border-slate bg-carbon/30">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="reveal display mb-14 text-[12vw] uppercase leading-none sm:text-5xl lg:text-[4.4rem]">
            The record so far
          </h2>
          <ol>
            {games.map((g) => (
              <li key={g.slug} className="reveal border-t border-slate">
                <Link
                  href={`/games/${g.slug}`}
                  className="group grid items-baseline gap-x-6 gap-y-3 py-7 sm:grid-cols-12"
                >
                  <span className="display text-2xl leading-none text-specimen sm:col-span-1">{g.index}</span>
                  <span className="display text-4xl uppercase leading-none transition-colors group-hover:text-specimen sm:col-span-5 sm:text-[2.6rem]">
                    {g.title}
                  </span>
                  <span className="hud sm:col-span-3">{g.genre}</span>
                  <span className="hud sm:col-span-2">{g.platforms.join(" · ")}</span>
                  <span className="hud sm:col-span-1 sm:text-right">{g.year}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* how it is made */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="reveal display mb-14 text-[12vw] uppercase leading-none sm:text-5xl lg:text-[4.4rem]">
          How a game gets made here
        </h2>
        <div className="grid gap-px border border-slate bg-slate lg:grid-cols-3">
          {HOW.map((h) => (
            <div key={h.label} className="viewfinder reveal relative bg-ink p-8 sm:p-10">
              <span className="hud !text-specimen">{h.label}</span>
              <h3 className="display mt-5 text-3xl uppercase leading-tight sm:text-[2rem]">{h.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-mist">{h.body}</p>
            </div>
          ))}
        </div>

        <div className="reveal mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-slate pt-8">
          <p className="max-w-md text-[15px] leading-relaxed text-mist">
            Want to work together, cover a game, or just tell {site.founder} something broke?
          </p>
          <TextLink href="/contact">Get in touch</TextLink>
        </div>
      </section>
    </>
  );
}
