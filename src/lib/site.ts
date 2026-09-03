export const site = {
  name: "DarkLab Games",
  short: "DARKLAB GAMES",
  tagline: "We make games that hit different.",
  description:
    "DarkLab Games is an independent game studio making horror, action and arcade games. Four titles shipped and counting.",
  url: "https://darklabgames.com",
  email: "darklabgaming24@gmail.com",

  // ---------------------------------------------------------------
  // TODO — fill these in and they update everywhere on the site.
  // ---------------------------------------------------------------
  founded: "2024",             // TODO: confirm the year DarkLab Games started
  location: "India",           // TODO: confirm city / country to show publicly
  teamSize: "Two co-founders", // TODO: update if the team has grown

  socials: [
    { label: "itch.io",  handle: "darklabgames",       href: "https://darklabgames.itch.io/" },
    { label: "YouTube",  handle: "@DarkLabGames",      href: "https://www.youtube.com/@DarkLabGames" },
    { label: "Instagram",handle: "@dark.labgames",     href: "https://www.instagram.com/dark.labgames/" },
    { label: "X",        handle: "@darklabgames",      href: "https://x.com/darklabgames" },
    { label: "LinkedIn", handle: "darklab-games",      href: "https://www.linkedin.com/company/darklab-games/" },
    { label: "Steam",    handle: "DarkLab Games",      href: "https://steamcommunity.com/profiles/76561199856591186/" },
  ],
} as const;

/**
 * The two people behind the studio.
 *
 * `photo` points at a file in `public/team/`. LinkedIn does not allow its
 * profile pictures to be hotlinked — the URLs are signed and expire — so save
 * each profile picture from LinkedIn into `public/team/` under the filename
 * below. Until a file is there, the card falls back to the initials mark.
 */
export const founders = [
  {
    name: "Ashish Mittal",
    role: "Co-founder · Design & direction",
    photo: "/team/ashish-mittal.jpg",
    linkedin: "https://www.linkedin.com/in/ashish-mittal2/",
    bio: "Ashish leads design and direction at DarkLab — the person deciding what a game is actually about before a single system gets built. He drove the studio's horror work, from the camcorder in The Museum to the quiet wrongness of I Like You. He would rather ship fifteen minutes that land than fifteen hours that do not.",
  },
  {
    name: "Sarthak Aggarwal",
    role: "Co-founder · Engineering & production",
    photo: "/team/sarthak-aggarwal.jpg",
    linkedin: "https://www.linkedin.com/in/sarthakaggarwal0402/",
    bio: "Sarthak handles engineering and production — turning the one-line idea into something that runs, on the platforms players are actually on. He keeps the build honest: scope cut early, releases out in public, feedback read and acted on. Four titles are out because someone kept saying the word ship.",
  },
] as const;

export const nav = [
  { label: "Home",    href: "/" },
  { label: "Games",   href: "/games" },
  { label: "Studio",  href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
