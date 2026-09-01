const ITEMS = [
  "Four titles shipped",
  "Horror · Action · Arcade",
  "Play free on itch.io",
  "Windows · Browser · Android",
  "Built by two people",
  "New builds in the lab",
];

export default function Ticker() {
  const run = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-host relative overflow-hidden border-y border-slate bg-carbon/40 py-3.5">
      <div className="marquee">
        {run.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center whitespace-nowrap">
            <span className="hud !text-mist">{t}</span>
            <span className="mx-7 h-1 w-1 rotate-45 bg-specimen" aria-hidden />
          </span>
        ))}
      </div>
      {/* feather the ends into the page */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
