import { existsSync } from "node:fs";
import path from "node:path";
import Image from "@/components/Img";
import { founders } from "@/lib/site";

/**
 * LinkedIn serves profile pictures from signed, expiring URLs and blocks
 * hotlinking, so the photos live in `public/team/`. Until a file is dropped in
 * there we render an initials mark instead of a broken image.
 */
function hasPhoto(publicPath: string) {
  return existsSync(path.join(process.cwd(), "public", publicPath));
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.65h.05A4.17 4.17 0 0 1 17.6 8.7c4 0 4.75 2.5 4.75 5.76V21h-4v-5.75c0-1.37-.03-3.14-1.98-3.14-1.98 0-2.29 1.5-2.29 3.04V21h-4V9Z" />
    </svg>
  );
}

export default function Founders() {
  return (
    <section className="border-y border-slate bg-carbon/30">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <span className="hud flex items-center gap-3 !text-specimen">
          <span className="h-px w-8 bg-specimen" />
          Who is behind it
        </span>

        <h2 className="reveal display mt-7 max-w-3xl text-[12vw] uppercase leading-[1.05] sm:text-5xl lg:text-[4.4rem]">
          Two co-founders, one lab
        </h2>

        <p className="reveal reveal-d1 mt-8 max-w-xl text-[15px] leading-relaxed text-mist sm:text-base">
          DarkLab Games is run by two people who split the work down the middle — one deciding what a
          game is about, one making sure it actually ships.
        </p>

        <div className="mt-14 grid gap-px border border-slate bg-slate lg:grid-cols-2">
          {founders.map((f, i) => (
            <a
              key={f.linkedin}
              href={f.linkedin}
              target="_blank"
              rel="noreferrer"
              className={`viewfinder reveal reveal-d${i + 1} group relative block bg-ink p-8 transition-colors hover:bg-graphite sm:p-10`}
            >
              <div className="flex items-center gap-6">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden border border-slate bg-carbon transition-colors group-hover:border-specimen/50 sm:h-28 sm:w-28">
                  {hasPhoto(f.photo) ? (
                    <Image
                      src={f.photo}
                      alt={f.name}
                      fill
                      sizes="112px"
                      className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    />
                  ) : (
                    <span className="display flex h-full w-full items-center justify-center text-3xl text-ash transition-colors group-hover:text-specimen sm:text-4xl">
                      {initials(f.name)}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="display text-3xl uppercase leading-[1.02] transition-colors group-hover:text-specimen sm:text-[2.1rem]">
                    {f.name}
                  </h3>
                  <span className="hud mt-3 block !tracking-[0.16em] !text-specimen">{f.role}</span>
                </div>
              </div>

              <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-mist">{f.bio}</p>

              <span className="hud mt-8 inline-flex items-center gap-2.5 transition-colors group-hover:text-specimen">
                <LinkedInMark className="h-3.5 w-3.5" />
                Connect on LinkedIn
                <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>
                  <path d="M6 14L14 6M14 6H7M14 6v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                </svg>
              </span>
            </a>
          ))}
        </div>

        <div className="reveal mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-slate pt-8">
          <p className="max-w-md text-[15px] leading-relaxed text-mist">
            Working on something, hiring, or just want to talk about horror games? Both of us are
            reachable on LinkedIn.
          </p>
          <div className="flex flex-wrap gap-3">
            {founders.map((f) => (
              <a
                key={f.linkedin}
                href={f.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 border border-slate px-5 py-3 font-hud text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-specimen hover:text-specimen"
              >
                <LinkedInMark className="h-3.5 w-3.5" />
                {f.name.split(" ")[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
