"use client";
import { useState } from "react";
import { site } from "@/lib/site";

const TOPICS = ["Coverage", "Publishing", "Collaboration", "Bug report", "Something else"];

const field =
  "w-full border border-slate bg-carbon/50 px-4 py-3.5 text-[15px] text-bone placeholder:text-ash focus:border-specimen focus:outline-none disabled:opacity-50";

/**
 * The site is a static export, so there is no server of ours to post to.
 * Web3Forms takes the submission and emails it to the studio inbox instead.
 */
const ENDPOINT = "https://api.web3forms.com/submit";
const keyMissing = !site.web3formsKey || site.web3formsKey.startsWith("PASTE_");

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const mailto = () => {
    const body = `${message}\n\n—\n${name}${from ? `\n${from}` : ""}`;
    return `mailto:${site.email}?subject=${encodeURIComponent(
      `[${topic}] ${name || "Website enquiry"}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    // No key configured yet — hand the message to the visitor's mail app
    // rather than posting it into a void.
    if (keyMissing) {
      window.location.href = mailto();
      return;
    }

    setStatus("sending");

    // The honeypot: bots fill every field they find, people never see this one.
    const form = new FormData(e.currentTarget);
    if (form.get("botcheck")) {
      setStatus("sent");
      return;
    }

    // Posted as FormData, not JSON, on purpose: a JSON content type makes the
    // browser send a CORS preflight, and the endpoint answers OPTIONS with a
    // 403. Multipart is a "simple" request, so it goes straight through.
    form.set("access_key", site.web3formsKey);
    form.set("subject", `[${topic}] ${name} — ${site.name} website`);
    form.set("from_name", `${site.name} website`);
    form.set("topic", topic);

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: form,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? "Send failed");

      setStatus("sent");
      setName("");
      setFrom("");
      setMessage("");
      setTopic(TOPICS[0]);
    } catch {
      setStatus("error");
    }
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

  const sending = status === "sending";

  if (status === "sent") {
    return (
      <div className="border border-specimen bg-specimen/5 p-8" role="status">
        <p className="display text-[2rem] uppercase leading-none text-specimen">Message sent</p>
        <p className="mt-4 text-[15px] leading-relaxed text-mist">
          It landed in the studio inbox and one of the founders reads it — usually within a couple of
          days. If it is urgent, {site.email} reaches the same place.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 border border-slate px-7 py-3.5 font-hud text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-bone"
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={send} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="hud mb-2.5 block">Your name</span>
          <input
            className={field}
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Who is writing"
            disabled={sending}
            required
          />
        </label>
        <label className="block">
          <span className="hud mb-2.5 block">Your email</span>
          <input
            className={field}
            type="email"
            name="email"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Where to reply"
            disabled={sending}
            required
          />
        </label>
      </div>

      <fieldset disabled={sending}>
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
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Say what you need. Short is fine."
          disabled={sending}
          required
        />
      </label>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={sending}
          className="border border-specimen bg-specimen px-7 py-3.5 font-hud text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-specimen disabled:cursor-wait disabled:opacity-60 disabled:hover:bg-specimen disabled:hover:text-ink"
        >
          {sending ? "Sending…" : keyMissing ? "Open in your email app" : "Send message"}
        </button>
        <button
          type="button"
          onClick={copy}
          className="border border-slate px-7 py-3.5 font-hud text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-bone"
        >
          {copied ? "Address copied" : "Copy the address"}
        </button>
      </div>

      {status === "error" && (
        <p className="border border-reagent/60 bg-reagent/10 p-4 text-[14px] leading-relaxed text-bone" role="alert">
          That did not go through — the network or the form service refused it. Nothing was lost:{" "}
          <a href={mailto()} className="border-b border-specimen text-specimen">
            open this message in your email app
          </a>{" "}
          or write to {site.email}.
        </p>
      )}

      <p className="pt-1 text-[13px] leading-relaxed text-ash">
        {keyMissing
          ? `The form is not connected to the inbox yet, so this hands your message to your own email app. Prefer to write it yourself? ${site.email}`
          : `Goes straight to the studio inbox — the founders read it, no ticket number. Your email address is only used to reply. Prefer to write it yourself? ${site.email}`}
      </p>
    </form>
  );
}
