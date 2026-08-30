"use client";
import { useState } from "react";
import { site } from "@/lib/site";

const TOPICS = ["Press or coverage", "Publishing", "Collaboration", "Bug report", "Something else"];

const field =
  "w-full border border-slate bg-carbon/50 px-4 py-3.5 text-[15px] text-bone placeholder:text-ash focus:border-specimen focus:outline-none";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${message}\n\n—\n${name}${from ? `\n${from}` : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `[${topic}] ${name || "Website enquiry"}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <form onSubmit={send} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="hud mb-2.5 block">Your name</span>
          <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Who is writing" required />
        </label>
        <label className="block">
          <span className="hud mb-2.5 block">Your email</span>
          <input className={field} type="email" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Where to reply" />
        </label>
      </div>

      <fieldset>
        <legend className="hud mb-3">What is this about</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={`border px-4 py-2 font-hud text-[11px] uppercase tracking-[0.16em] transition-colors ${
                topic === t
                  ? "border-specimen bg-specimen text-ink"
                  : "border-slate text-ash hover:border-bone hover:text-bone"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="hud mb-2.5 block">Message</span>
        <textarea
          className={`${field} min-h-44 resize-y`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Say what you need. Short is fine."
          required
        />
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          className="border border-specimen bg-specimen px-7 py-3.5 font-hud text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-specimen"
        >
          Open in your email app
        </button>
        <button
          type="button"
          onClick={copy}
          className="border border-slate px-7 py-3.5 font-hud text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-bone"
        >
          {copied ? "Address copied" : "Copy the address"}
        </button>
      </div>

      <p className="pt-1 text-[13px] leading-relaxed text-ash">
        This form has no server behind it — it hands your message to your own email app so you keep a
        copy of what you sent. Prefer to write it yourself? {site.email}
      </p>
    </form>
  );
}
