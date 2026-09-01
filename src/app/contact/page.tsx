import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} about publishing, collaboration, coverage or a bug you found.`,
};

const REASONS = [
  { label: "Coverage", body: "Reviewing, streaming or writing about a game? Ask and the art, screenshots and studio details come straight back." },
  { label: "Publishing", body: "Open to conversations about funding, porting or getting a title onto a new storefront." },
  { label: "Collaboration", body: "Sound design, music, art, writing — if you want to make something together, say what you do." },
  { label: "Players", body: "Found a bug, got stuck, or just want to argue about an ending? Genuinely welcome." },
];

export default function ContactPage() {
  return (
    <>
      <PageHead
        eyebrow="Transmission"
        title="Contact"
        intro="One inbox, read by the people who make the games. No form routing, no ticket number — it lands with the founders directly."
      />

      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-7">
            <h2 className="hud mb-8 border-t border-slate pt-5">Write a message</h2>
            <ContactForm />
          </div>

          <aside className="lg:col-span-5">
            <div className="reveal reveal-d1">
              <h2 className="hud mb-1 border-t border-slate pt-5">Direct</h2>
              <a
                href={`mailto:${site.email}`}
                className="display block break-all py-4 text-[6vw] uppercase leading-none transition-colors hover:text-specimen sm:text-[2.1rem]"
              >
                {site.email}
              </a>

              <h2 className="hud mb-5 mt-12 border-t border-slate pt-5">Good reasons to write</h2>
              <dl>
                {REASONS.map((r) => (
                  <div key={r.label} className="border-b border-slate py-4">
                    <dt className="hud !text-specimen">{r.label}</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-mist">{r.body}</dd>
                  </div>
                ))}
              </dl>

              <h2 className="hud mb-5 mt-12 border-t border-slate pt-5">Elsewhere</h2>
              <ul className="grid grid-cols-2 gap-px border border-slate bg-slate">
                {site.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block bg-ink p-5 transition-colors hover:bg-graphite"
                    >
                      <span className="display block text-xl uppercase leading-none">{s.label}</span>
                      <span className="hud mt-2 block !text-[10px] !tracking-[0.14em]">{s.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
