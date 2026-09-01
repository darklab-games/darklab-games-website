import type { ReactNode } from "react";

/** The standard opening for every page that is not the homepage. */
export default function PageHead({
  eyebrow,
  title,
  intro,
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <header className="relative border-b border-slate">
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-44">
        <span className="hud flex items-center gap-3 !text-specimen">
          <span className="h-px w-8 bg-specimen" />
          {eyebrow}
        </span>

        <h1 className="display mt-7 max-w-4xl text-[15vw] uppercase leading-[0.92] sm:text-[9vw] lg:text-[7rem]">
          <span className="wipe"><span>{title}</span></span>
        </h1>

        {intro && <p className="reveal reveal-d1 mt-8 max-w-xl text-[15px] leading-relaxed text-mist sm:text-base">{intro}</p>}

        {meta && (
          <dl className="reveal reveal-d2 mt-12 flex flex-wrap gap-x-14 gap-y-6 border-t border-slate pt-7">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="hud">{m.label}</dt>
                <dd className="display mt-2 text-3xl uppercase leading-none sm:text-[2.2rem]">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}
