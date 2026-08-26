"use client";

import { useEffect } from "react";

/**
 * Reveals [data-reveal] elements on scroll.
 *
 * Anything already at or above the fold is revealed synchronously on mount —
 * relying on IntersectionObserver alone can leave above-the-fold content stuck
 * at opacity 0 if the first callback batch is throttled. Without JS the CSS
 * leaves everything visible, so content never depends on this running.
 */
export function RevealScript() {
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
  }, []);

  return null;
}
