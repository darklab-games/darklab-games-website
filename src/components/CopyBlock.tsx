"use client";
import { useState } from "react";

export default function CopyBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="border border-slate">
      <div className="flex items-center justify-between gap-4 border-b border-slate px-5 py-3">
        <span className="hud">{label}</span>
        <button onClick={copy} className="hud transition-colors hover:!text-specimen">
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <p className="px-5 py-5 text-[15px] leading-relaxed text-mist">{text}</p>
    </div>
  );
}
