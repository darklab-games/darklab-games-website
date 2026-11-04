import type { Metadata } from "next";
import { site } from "@/lib/site";
import GameFrame from "./GameFrame";

const { launch } = site;

export const metadata: Metadata = {
  title: `${launch.title} — Play now`,
  description: launch.tagline,
  alternates: { canonical: `/${launch.slug}` },
  openGraph: {
    title: `${launch.title} — DarkLab Games`,
    description: launch.tagline,
    images: [{ url: `/games/${launch.slug}/banner.jpg`, width: 1600, height: 900, alt: launch.title }],
  },
};

/**
 * darklabgames.com/diwali-clash
 *
 * The game is hosted on AWS and runs here in a full-screen frame, so the
 * address bar stays on darklabgames.com. The game server must allow this
 * origin to frame it (Content-Security-Policy frame-ancestors, set in
 * platform_clash/server/src/index.ts).
 */
export default function DiwaliClash() {
  return <GameFrame title={launch.title} src={launch.playUrl} />;
}
