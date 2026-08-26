"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Reveals [data-reveal] elements on scroll.
 *
 * Keyed on the pathname: this lives in the root layout, which does NOT
 * remount during client-side navigation. Running only on mount would leave
 * every page after the first stuck at opacity 0 until a hard refresh.
 *
 * Anything already at or above the fold is revealed synchronously, because
 * relying on IntersectionObserver alone can leave above-the-fold content
 * hidden if the first callback batch is throttled. Without JS the CSS leaves
 * everything visible, so content never depends on this running.
 */
export function RevealScript() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const show = (el: Element) => el.classList.add("is-visible");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach(show);
      return;
    }

    const pending = nodes.filter((node) => {
      if (node.classList.contains("is-visible")) return false;
      // Already in view (or scrolled past): show it now, don't wait on the observer.
      if (node.getBoundingClientRect().top < window.innerHeight) {
        show(node);
        return false;
      }
      return true;
    });

    if (pending.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    pending.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
