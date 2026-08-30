"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Adds `.is-in` to every `.reveal` / `.wipe` once it scrolls into view. */
export default function Reveals() {
  const pathname = usePathname();
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .wipe"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    nodes.forEach((n) => (n.getBoundingClientRect().top < window.innerHeight ? n.classList.add("is-in") : io.observe(n)));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
