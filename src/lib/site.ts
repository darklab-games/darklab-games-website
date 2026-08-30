export const site = {
  name: "DarkLab Games",
  short: "DARKLAB",
  tagline: "We make games that watch you back.",
  description:
    "DarkLab Games is an independent game studio making horror, action and arcade games. Four titles shipped and counting.",
  url: "https://darklabgames.com", // TODO: replace with your real domain once registered
  email: "darklabgaming24@gmail.com",

  // ---------------------------------------------------------------
  // TODO — fill these in and they update everywhere on the site.
  // ---------------------------------------------------------------
  founder: "Ashish",
  founded: "2024",          // TODO: confirm the year DarkLab Games started
  location: "India",        // TODO: confirm city / country to show publicly
  teamSize: "Solo studio",  // TODO: update if the team has grown

  socials: [
    { label: "itch.io",  handle: "darklabgames",       href: "https://darklabgames.itch.io/" },
    { label: "YouTube",  handle: "@DarkLabGames",      href: "https://www.youtube.com/@DarkLabGames" },
    { label: "Instagram",handle: "@dark.labgames",     href: "https://www.instagram.com/dark.labgames/" },
    { label: "X",        handle: "@darklabgames",      href: "https://x.com/darklabgames" },
    { label: "LinkedIn", handle: "darklab-games",      href: "https://www.linkedin.com/company/darklab-games/" },
    { label: "Steam",    handle: "DarkLab Games",      href: "https://steamcommunity.com/profiles/76561199856591186/" },
  ],
} as const;

export const nav = [
  { label: "Games",   href: "/games" },
  { label: "Studio",  href: "/about" },
  { label: "Press",   href: "/press" },
  { label: "Contact", href: "/contact" },
] as const;
