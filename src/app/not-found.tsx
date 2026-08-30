import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-[1600px] flex-col justify-center px-5 py-32 sm:px-8">
      <span className="hud flex items-center gap-3 !text-specimen">
        <span className="h-px w-8 bg-specimen" />
        Signal lost
      </span>
      <h1 className="display mt-7 text-[18vw] uppercase leading-[0.82] sm:text-[10rem]">404</h1>
      <p className="mt-7 max-w-md text-[15px] leading-relaxed text-mist">
        Nothing is recorded at this address. The page may have moved, or it never existed and something
        is having fun with you.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="border border-specimen bg-specimen px-7 py-3.5 font-hud text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-specimen">
          Back to the start
        </Link>
        <Link href="/games" className="border border-slate px-7 py-3.5 font-hud text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-bone">
          See the games
        </Link>
      </div>
    </section>
  );
}
