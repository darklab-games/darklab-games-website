export type Link = { label: string; href: string; primary?: boolean };

export type Game = {
  slug: string;
  index: string;
  title: string;
  genre: string;
  /** One line. Shown under the title in the catalogue. */
  hook: string;
  /** The pitch, 1–2 sentences. */
  summary: string;
  /** Longer body copy, one paragraph per entry. */
  story: string[];
  features: { title: string; body: string }[];
  controls?: { key: string; action: string }[];
  facts: { label: string; value: string }[];
  platforms: string[];
  status: "Released" | "In development";
  year: string;
  shots: number;
  /** Screenshot to use behind the detail-page title. Key art with baked-in
   *  lettering makes a poor bed for an h1, so those titles point elsewhere. */
  heroShot?: number;
  /** Accent used for this title's panel. Drawn from the game's own art. */
  accent: string;
  links: Link[];
};

export const games: Game[] = [
  {
    slug: "the-museum",
    index: "01",
    title: "The Museum",
    genre: "Survival Horror",
    hook: "A content creator walks into a sealed museum for the views. Something inside has been waiting for an audience.",
    summary:
      "Survival horror in a house of cursed artifacts. Solve the museum's puzzles, track the thing that hunts you by sound, and find out what happened to the girl who never left.",
    story: [
      "In 2010 the Ghosh family lived in a house filled with disturbing artifacts and darker secrets. After a tragedy and the disappearance of their daughter, the place was sealed and left to rot. A decade later you walk in with a camera, and the museum wakes up.",
      "Anya was never found because she never truly left. Bound to a cursed wooden doll, her spirit still moves through the halls — restless, and no longer patient. She hunts in intervals. She listens. One wrong step and she knows exactly where you are.",
      "You have a camcorder, a floorplan you do not understand, and a set of locks that only open for someone willing to learn what this family did. Uncover the truth, survive her, and help her move on — or stay here with her.",
    ],
    features: [
      { title: "She hunts on a timer", body: "Anya's pursuit comes in waves. The quiet between them is when you work, and it is never quite long enough." },
      { title: "Sound gives you away", body: "The museum reacts to noise. Every drawer, every run, every panicked step narrows the distance between you and her." },
      { title: "Locks worth solving", body: "Puzzles are built into the collection itself — the artifacts, the photographs, the numbers the family left behind." },
      { title: "Shot through a camcorder", body: "The whole game is framed by your own recording. The viewfinder is the only light you get." },
    ],
    facts: [
      { label: "Genre", value: "Survival horror" },
      { label: "Mode", value: "Single player" },
      { label: "Perspective", value: "First person" },
      { label: "Session", value: "Full-length" },
    ],
    platforms: ["Windows"],
    status: "Released",
    year: "2025", // TODO: confirm release year
    shots: 7,
    heroShot: 6,
    accent: "#E0472F",
    links: [
      { label: "Play on itch.io", href: "https://darklabgames.itch.io/the-museum", primary: true },
      { label: "Watch the trailer", href: "https://www.youtube.com/watch?v=hKeXztiy64E" },
    ],
  },
  {
    slug: "i-like-you",
    index: "02",
    title: "I Like You",
    genre: "Psychological Horror",
    hook: "Finish the chores. Ignore the feeling. Are you sure no one is watching you?",
    summary:
      "A short psychological horror about being watched in your own home. You do ordinary things in ordinary rooms, and somebody is very glad you are back.",
    story: [
      "You get home. There is a mop, a message on the counter, some stains on the floor. The list is short and the house is quiet, and for a while the worst thing here is how normal it all is.",
      "Then the corners start to matter. A door you left closed. A hallway that runs longer than it should. A new message. The game never stops handing you chores — it just changes who else is in the room while you do them.",
      "Fifteen minutes, one house, and the growing certainty that the attention you have been enjoying was never yours to enjoy.",
    ],
    features: [
      { title: "Horror in a task list", body: "Mop the floor. Collect the trash. Check your phone. Everything frightening arrives while you are busy doing something mundane." },
      { title: "A house that is off by degrees", body: "Nothing announces itself. Rooms change quietly and you are left to decide whether you had remembered them wrong." },
      { title: "Built to be finished", body: "A tight ten to fifteen minutes with no filler — designed to be played in one sitting and talked about afterwards." },
      { title: "High-poly interiors", body: "Detailed, warmly lit rooms that make the dark parts of the house feel much darker." },
    ],
    controls: [
      { key: "WASD", action: "Move" },
      { key: "Mouse", action: "Look around" },
      { key: "Left click / E", action: "Interact" },
      { key: "Esc", action: "Pause" },
    ],
    facts: [
      { label: "Genre", value: "Psychological horror" },
      { label: "Mode", value: "Single player" },
      { label: "Perspective", value: "First person" },
      { label: "Session", value: "10–15 minutes" },
    ],
    platforms: ["Windows"],
    status: "Released",
    year: "2025", // TODO: confirm release year
    shots: 6,
    heroShot: 5,
    accent: "#C4433F",
    links: [
      { label: "Play on itch.io", href: "https://darklabgames.itch.io/i-like-you", primary: true },
      { label: "Watch the trailer", href: "https://www.youtube.com/watch?v=MXdICIvnpI8" },
    ],
  },
  {
    slug: "void-strike",
    index: "03",
    title: "Void Strike",
    genre: "Bullet-hell Shooter",
    hook: "Your guns aim themselves. Flying is the whole skill.",
    summary:
      "Deep space, one laser, three hits of hull. Weapons lock the nearest target on their own, so every decision you make is about movement — read the field, thread the bullets, dash through the wall instead of around it.",
    story: [
      "Void Strike starts you with almost nothing: a single laser, a dash, and a hull that gives up after three mistakes. Because your weapons pick their own targets, you never spend attention on aiming. You spend all of it on where you are.",
      "Clear a wave, take one upgrade from three. Do that forty times and the starter laser has become a chain-lightning storm with homing rockets, orbiting drones and frag rounds that take out half the screen.",
      "Every fifth wave a boss arrives. They loop back harder, forever. Every attack telegraphs first — the red lines are the only warning you get, and they are enough if you are actually looking.",
    ],
    features: [
      { title: "Movement is the skill", body: "Auto-targeting weapons mean no aiming. Positioning, spacing and dash timing decide every run." },
      { title: "Endless escalating waves", body: "Nine enemy archetypes on a schedule — darting speeders, sniping void-casters, tanks, and splitters that burst into swarms when killed." },
      { title: "Four named bosses", body: "THE MAW, TWIN LANCE, HIVE QUEEN and the VOID SOVEREIGN arrive every fifth wave and keep coming back meaner." },
      { title: "18 stacking upgrades", body: "Common, rare and epic tiers. Three of one always beats one of three. Three of them unlock whole new weapons — SPREAD, HOMING ROCKET, ARC CANNON — hot-swappable mid-fight." },
      { title: "Combos up to 10×", body: "Chain kills fast and the multiplier climbs through RAMPAGE and ANNIHILATION all the way to VOID LORD." },
      { title: "A dash with real i-frames", body: "Brief invincibility, up to three charges. It is an offensive tool, not a panic button." },
    ],
    facts: [
      { label: "Genre", value: "Bullet-hell / arcade shooter" },
      { label: "Mode", value: "Single player" },
      { label: "Perspective", value: "Top down" },
      { label: "Session", value: "Endless runs" },
    ],
    platforms: ["Browser", "Android"],
    status: "Released",
    year: "2026", // TODO: confirm release year
    shots: 9,
    heroShot: 9,
    accent: "#2DE0CE",
    links: [
      { label: "Play in browser", href: "https://darklabgames.itch.io/void-strike", primary: true },
      { label: "Watch the trailer", href: "https://youtu.be/9mTLFLB9pFw" },
    ],
  },
  {
    slug: "watch-his-step",
    index: "04",
    title: "Watch His Step",
    genre: "Reaction Action",
    hook: "He will never look up from his phone. You are not him — you are the world.",
    summary:
      "A man walks down the street reading his phone and will not stop for anything. You are everything around him: drag planks over open manholes, catch a falling piano, and keep him alive one hazard at a time.",
    story: [
      "He is not going to look up. That is the whole premise and the game never softens it. He strolls through an escalating apocalypse with his thumb moving, completely unbothered, and the only thing standing between him and an open manhole is you.",
      "So you rearrange the city. Drag a plank over the hole. Throw the junk into the road before he trips on it. Grab the piano out of the air. Plug a bollard into the pavement before a car mounts the kerb.",
      "Defuse a hazard at the last possible moment and the near miss is worth far more than a clean save. Every eight saves bumps the multiplier, up to five times — which means the safest way to play is also the cheapest.",
    ],
    features: [
      { title: "You play the environment", body: "You never control him. You control everything else, which turns out to be much more stressful." },
      { title: "Near misses pay", body: "Solving a hazard early is worth a fraction of solving it at the last possible frame. The scoring pushes you to hold your nerve." },
      { title: "Multipliers up to 5×", body: "Every eight saves raises the stakes. One missed manhole and you find out what you were actually risking." },
      { title: "Everything is draggable", body: "Pick up planks, junk and falling objects mid-air. Tap a plank to rotate it ninety degrees. No menus, no tutorial to sit through." },
    ],
    controls: [
      { key: "Drag", action: "Pick up and move anything" },
      { key: "Drop in road", action: "Dispose of junk" },
      { key: "Tap plank", action: "Rotate 90°" },
      { key: "P / M / R", action: "Pause · Mute · Retry" },
    ],
    facts: [
      { label: "Genre", value: "Reaction action" },
      { label: "Mode", value: "Single player" },
      { label: "Perspective", value: "Side on" },
      { label: "Session", value: "Endless runs" },
    ],
    platforms: ["Browser"],
    status: "Released",
    year: "2026", // TODO: confirm release year
    shots: 6,
    accent: "#FA5C5C",
    links: [
      { label: "Play in browser", href: "https://darklabgames.itch.io/watch-his-step", primary: true },
      { label: "Watch the trailer", href: "https://www.youtube.com/watch?v=G4EZ3NurK0s" },
    ],
  },
];

export const getGame = (slug: string) => games.find((g) => g.slug === slug);
