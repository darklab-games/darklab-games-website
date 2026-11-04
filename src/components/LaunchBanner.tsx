import Link from "next/link";
import { getImageProps } from "next/image";
import { site } from "@/lib/site";

const { launch } = site;

// Art direction: the 16:9 banner for landscape screens, the 4:5 one for portrait.
const {
  props: { srcSet: wide },
} = getImageProps({ src: `/games/${launch.slug}/banner.webp`, width: 1920, height: 1080, sizes: "100vw", alt: "" });
const { props: tall } = getImageProps({
  src: `/games/${launch.slug}/banner-portrait.webp`,
  width: 1080,
  height: 1350,
  sizes: "100vw",
  alt: "",
  loading: "eager",
  fetchPriority: "high",
});

/**
 * First screen of the homepage while a title is launching: the key banner,
 * full bleed, with a strip underneath to play or read more. The showreel
 * hero sits directly below it.
 *
 * Landscape screens get the 16:9 banner, portrait screens the 4:5 one, each
 * shown edge to edge at its own aspect ratio.
 */
export default function LaunchBanner() {
  const href = `/${launch.slug}`;
  return (
    <section className="relative bg-ink" aria-label={`${launch.title} is live`}>
      {/* Full width at the banner's own shape — nothing cropped, no side bars.
          On wide screens that runs a little past the fold, which is fine.
          Starts below the fixed header so the bar never sits on the artwork. */}
      <Link
        href={href}
        className="relative mt-16 block aspect-[4/5] w-full overflow-hidden sm:mt-[72px] landscape:aspect-[16/9]"
        aria-label={`Play ${launch.title}`}
      >
        {/* one <picture>, so each device downloads only the banner it shows */}
        <picture>
          <source media="(orientation: landscape)" srcSet={wide} sizes="100vw" />
          <img
            {...tall}
            alt={`${launch.title} — lights go out, everyone aims blind, every rocket launches at once`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
      </Link>

      <div className="relative z-10 border-t border-slate bg-ink/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-8">
          <span className="hud flex items-center gap-2.5 !text-bone">
            <span className="rec-dot" />
            <span>
              {launch.title} <span className="text-reagent">is live</span>
              <span className="hidden text-ash md:inline"> · free in your browser · up to 4 players</span>
            </span>
          </span>

          <div className="flex items-center gap-3">
            <Link
              href={`/games/${launch.slug}`}
              className="hidden border border-slate px-5 py-2.5 font-hud text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-bone sm:block"
            >
              Game details
            </Link>
            <Link
              href={href}
              className="border border-reagent bg-reagent px-6 py-2.5 font-hud text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-reagent"
            >
              Play now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
