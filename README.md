# DarkLab Games — studio website

Marketing site for DarkLab Games: a homepage built around a 20-second showreel, a page
per released game, a studio page, a press kit and a contact page.

Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**. Every page is
statically generated — there is no database and no server to run.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

---

## Deploying

**Vercel (recommended — zero config)**

1. Push this folder to a GitHub repository.
2. Go to vercel.com → *Add New Project* → import the repo.
3. Accept the defaults (Vercel detects Next.js) and deploy.
4. Add your domain under *Settings → Domains*.

**Netlify / Cloudflare Pages** — build command `npm run build`, publish directory `.next`,
and install the platform's Next.js adapter when prompted.

**One thing to change before you go live:** set your real domain in `src/lib/site.ts`
(`url`). It drives canonical URLs, `sitemap.xml`, and the link previews that appear when
someone shares the site on X, Discord or LinkedIn.

---

## Editing content

Almost everything is data, not markup. Two files cover the whole site.

### `src/lib/site.ts` — studio details and social links

Studio name, tagline, email, founder, and every social URL. Change a value here and it
updates in the header, footer, contact page, press kit and structured data at once.

It also contains the placeholders still to confirm — each is marked `// TODO`:

| Field      | Currently   | What it should be                        |
| ---------- | ----------- | ---------------------------------------- |
| `url`      | placeholder | Your real domain, once registered        |
| `founded`  | `2024`      | The year DarkLab Games started           |
| `location` | `India`     | The city / country you want shown        |
| `teamSize` | Solo studio | Update if the team grows                 |

### `src/lib/games.ts` — the four games

One object per game with its hook, summary, story, features, controls, fact sheet,
platforms and store links. The `// TODO` markers on each `year` are release years worth
confirming.

**To add a fifth game:**

1. Add an object to the `games` array. Copy an existing one and change the fields —
   `slug` becomes the URL (`/games/your-slug`).
2. Create `public/games/<slug>/` containing:
   - `key.webp` — 16:9 key art (1920px wide), used on cards and the catalogue
   - `key.jpg` — the same image as JPG, offered as a press download
   - `cover.webp` — the square-ish itch.io cover
   - `shot-1.webp` … `shot-N.webp` — screenshots, 1600px wide
   - `shot-1-thumb.webp` … — the same screenshots at 640px wide
3. Set `shots` to the number of screenshots.
4. If your key art has the game's title baked into it, set `heroShot` to a screenshot
   number. The detail page uses that image behind its `<h1>` instead, so the two sets of
   lettering do not overlap.

The new page, the sitemap entry, and the footer and catalogue links all appear on their
own. No other file needs touching.

---

## The showreel

`public/video/` holds two cuts of the same 20-second reel — five seconds per game, in
release order: The Museum, I Like You, Void Strike, Watch His Step.

| File | Use |
| ---- | --- |
| `darklab-reel-1080.mp4` | **Titled cut.** Game names burned in. For YouTube, itch, press. |
| `darklab-reel-720.mp4` / `.webm` | Titled cut, smaller |
| `darklab-reel-clean-*.mp4` / `.webm` | **Untitled cut.** Plays behind the homepage hero — the site draws its own labels, so burned-in ones would collide. |
| `darklab-reel-poster.jpg` | Link-preview image |
| `darklab-reel-clean-poster.jpg` | First frame shown while the hero video loads |

The hero video is muted so browsers will autoplay it; a **Sound off / Sound on** button
sits in the bar underneath. That bar also shows which of the four games is on screen, and
clicking a segment jumps the reel to that game.

### Recutting the reel

The reel was assembled with `ffmpeg` from the four game trailers. To rebuild it after a
fifth game ships, re-cut each five-second segment at 1920×1080 / 30fps, then concatenate.
Keep both cuts — one with titles, one without — or the hero labels will double up.

---

## How the design works

The site presents itself as a **recording device pointed at the studio's work**. Three of
the four games are about watching or being watched, so the framing comes from the games
rather than from a generic sci-fi template.

That idea shows up in a few disciplined places, and nowhere else:

- **The opening.** A calibration sequence — a scan sweep, the logo resolving out of blur,
  a progress meter, then the frame opening onto the reel. Roughly 2.3 seconds. It runs
  once per browser session, is skipped entirely for anyone who prefers reduced motion, and
  any key or click cuts it short.
- **Corner brackets.** Always on around the hero frames; on hover for cards and panels.
- **A running timecode and a REC dot** in the header.
- **Film grain** over the whole page at 2.8% opacity.

### Colour

The palette is sampled from the studio logo — the teal of the flask, the magenta of the
shield, the slate they sit on. Tokens live at the top of `src/app/globals.css`.

Teal (`--color-specimen`) is the working accent and does nearly all the work. **Magenta
(`--color-reagent`) is reserved for the REC indicator only** — that restraint is what
keeps it meaning "live". The full mint → teal → violet → magenta gradient appears exactly
twice: the boot meter and the hairline above the footer.

### Type

- **Big Shoulders** — headlines. Condensed and industrial, so a long line still lands hard.
- **Archivo** — body copy.
- **DM Mono** — the HUD furniture: labels, timecode, buttons, fact sheets.

One caution when writing headings: leading is very tight (`0.86`). If a line ends in a
comma and the line below it is shorter, that comma appears to float beside the shorter
line and reads as a typo. Either drop the comma or make the second line longer.

---

## Accessibility

- Every interactive element takes keyboard focus and shows a visible teal focus ring.
- A "Skip to content" link is the first thing in the tab order.
- All animation, including the opening sequence and the grain, is disabled under
  `prefers-reduced-motion`.
- Text colours are kept at or above 4.5:1 against the background.
- The screenshot lightbox traps Escape and arrow keys and returns focus on close.

---

## Structure

```
src/
├── app/
│   ├── layout.tsx          fonts, metadata, structured data, page chrome
│   ├── page.tsx            homepage
│   ├── globals.css         design tokens + the viewfinder / boot styles
│   ├── games/page.tsx      catalogue index
│   ├── games/[slug]/       one page per game, statically generated
│   ├── about/  contact/  press/
│   ├── sitemap.ts  robots.ts  not-found.tsx
├── components/
│   ├── Boot.tsx            the opening sequence
│   ├── Hero.tsx            reel + segment index
│   ├── Header.tsx  Footer.tsx  Ticker.tsx
│   ├── GameRow.tsx  Gallery.tsx  PageHead.tsx  Bits.tsx
│   ├── ContactForm.tsx  CopyBlock.tsx  Timecode.tsx  Reveals.tsx
└── lib/
    ├── site.ts             studio details, socials, nav
    └── games.ts            all game content
```

`public/` holds `brand/` (logo and icons), `games/<slug>/` (art) and `video/` (the reel).

---

## Notes

- **The contact form has no backend.** It composes a `mailto:` link and hands the message
  to the visitor's own email app, so it works on a static host and the sender keeps a copy.
  To collect submissions on the server instead, swap `ContactForm.tsx` for a Formspree,
  Resend or Vercel Function handler.
- **Void Strike's trailer is only available at 480p** on YouTube, so its five seconds of
  the reel are upscaled. If you still have the original recording, re-cut that segment
  from it for a sharper result.
