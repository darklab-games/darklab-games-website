import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import CopyBlock from "@/components/CopyBlock";
import { games } from "@/lib/games";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Press kit",
  description: `Logos, key art, screenshots, fact sheets and boilerplate for anyone covering ${site.name}.`,
};

const BOILERPLATE_SHORT = `${site.name} is an independent game studio founded by ${site.founder}. It makes horror, action and arcade games built to be finished in one sitting — four titles released so far, all free to play.`;

const BOILERPLATE_LONG = `${site.name} is an independent studio run by ${site.founder} in ${site.location}. It builds short, sharp games across horror, arcade and action: The Museum, a survival horror shot through a camcorder; I Like You, a fifteen-minute psychological horror about being watched at home; Void Strike, a bullet-hell shooter where weapons aim themselves so movement becomes the whole skill; and Watch His Step, a reaction game where you play the environment trying to keep a distracted pedestrian alive. Every title is released on itch.io and free to play.`;

const ASSETS = [
  { label: "Logo — full lockup, transparent PNG", href: "/brand/darklab-logo.png" },
  { label: "Logo — 512px PNG", href: "/brand/logo-512.png" },
  { label: "Logo — original artwork", href: "/brand/darklab-logo-original.png" },
  { label: "App icon — 180px PNG", href: "/brand/icon-180.png" },
  { label: "Studio showreel — 1080p MP4, 20s", href: "/video/darklab-reel-1080.mp4" },
  { label: "Showreel poster frame — JPG", href: "/video/darklab-reel-poster.jpg" },
];

export default function PressPage() {
  return (
    <>
      <PageHead
        eyebrow="Press kit"
        title="Press"
        intro="Everything you need to write about, stream or cover a DarkLab game. All assets here are cleared for editorial use — no permission request needed."
        meta={[
          { label: "Studio", value: site.name },
          { label: "Founded", value: site.founded },
          { label: "Titles", value: String(games.length) },
        ]}
      />

      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* left: text assets */}
          <div className="lg:col-span-7">
            <h2 className="reveal display mb-8 text-[10vw] uppercase leading-none sm:text-4xl lg:text-[3rem]">
              Boilerplate
            </h2>
            <div className="reveal space-y-5">
              <CopyBlock label="Short — one line" text={BOILERPLATE_SHORT} />
              <CopyBlock label="Long — full paragraph" text={BOILERPLATE_LONG} />
            </div>

            <h2 className="reveal display mb-8 mt-20 text-[10vw] uppercase leading-none sm:text-4xl lg:text-[3rem]">
              Studio fact sheet
            </h2>
            <dl className="reveal border-t border-slate">
              {[
                { label: "Studio name", value: site.name },
                { label: "Founder", value: site.founder },
                { label: "Founded", value: site.founded },
                { label: "Based in", value: site.location },
                { label: "Team size", value: site.teamSize },
                { label: "Titles released", value: String(games.length) },
                { label: "Platforms", value: "Windows, Browser, Android" },
                { label: "Press contact", value: site.email },
                { label: "Storefront", value: "darklabgames.itch.io" },
              ].map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-6 border-b border-slate py-3.5">
                  <dt className="hud">{f.label}</dt>
                  <dd className="text-right text-[15px] text-bone">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* right: downloads */}
          <aside className="lg:col-span-5">
            <div className="reveal reveal-d1 lg:sticky lg:top-28">
              <h2 className="hud mb-6 border-t border-slate pt-5">Brand assets</h2>
              <div className="viewfinder relative mb-6 flex items-center justify-center border border-slate bg-carbon/40 p-10">
                <Image src="/brand/logo-512.png" alt={`${site.name} logo`} width={240} height={240} className="h-auto w-48" />
              </div>
              <ul className="border-t border-slate">
                {ASSETS.map((a) => (
                  <li key={a.href}>
                    <a
                      href={a.href}
                      download
                      className="group flex items-center justify-between gap-4 border-b border-slate py-3.5 transition-colors hover:text-specimen"
                    >
                      <span className="text-[14px] text-mist transition-colors group-hover:text-specimen">{a.label}</span>
                      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0 text-ash transition-colors group-hover:text-specimen" aria-hidden>
                        <path d="M10 3v10m0 0l-4-4m4 4l4-4M4 17h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[13px] leading-relaxed text-ash">
                Please do not recolour, stretch or add effects to the logo. Keep clear space around it
                equal to the height of the flask.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* per game */}
      <section className="border-t border-slate bg-carbon/30">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="reveal display mb-14 text-[12vw] uppercase leading-none sm:text-5xl lg:text-[4.4rem]">
            Game assets
          </h2>

          <div className="grid gap-px border border-slate bg-slate lg:grid-cols-2">
            {games.map((g) => (
              <article key={g.slug} className="bg-ink p-7 sm:p-9">
                <Link href={`/games/${g.slug}`} className="viewfinder group relative mb-7 block aspect-[16/9] overflow-hidden border border-slate">
                  <Image
                    src={`/games/${g.slug}/key.webp`}
                    alt={`${g.title} key art`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </Link>

                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="display text-2xl leading-none text-specimen">{g.index}</span>
                  <h3 className="display text-3xl uppercase leading-none sm:text-4xl">{g.title}</h3>
                </div>
                <p className="hud mt-3">{g.genre} · {g.platforms.join(" · ")} · {g.year}</p>
                <p className="mt-5 text-[15px] leading-relaxed text-mist">{g.summary}</p>

                <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 border-t border-slate pt-5">
                  <a href={`/games/${g.slug}/key.jpg`} download className="hud transition-colors hover:!text-specimen">
                    Key art JPG ↓
                  </a>
                  <Link href={`/games/${g.slug}`} className="hud transition-colors hover:!text-specimen">
                    {g.shots} screenshots →
                  </Link>
                  <a href={g.links[0].href} target="_blank" rel="noreferrer" className="hud transition-colors hover:!text-specimen">
                    Store page →
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="reveal mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-slate pt-8">
            <p className="max-w-lg text-[15px] leading-relaxed text-mist">
              Need something that is not here — a build key, a longer cut of the trailer, or a quote for
              a piece? Ask and it will be sent the same week.
            </p>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Press enquiry")}`}
              className="border border-specimen bg-specimen px-7 py-3.5 font-hud text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-specimen"
            >
              Email the studio
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
