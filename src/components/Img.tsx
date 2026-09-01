import NextImage, { type ImageProps } from "next/image";

/**
 * `next/image` with hydration warnings suppressed on the underlying `<img>`.
 *
 * next/image generates an inline `style` for every image it renders, and
 * extensions that restyle pages — Dark Reader being the common one — rewrite
 * that style while the HTML is parsing, before React hydrates. React then
 * reports a hydration mismatch on whichever image it reaches first. No
 * application code can prevent that DOM difference, which is precisely what
 * `suppressHydrationWarning` is for.
 *
 * Import this instead of `next/image` so a new image cannot reintroduce it.
 */
export default function Img(props: ImageProps) {
  return <NextImage {...props} suppressHydrationWarning />;
}
