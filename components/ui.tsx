import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

/** Section shell with consistent max-width and rhythm. */
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-clay">
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`text-balance text-3xl sm:text-4xl md:text-[2.75rem] ${className}`}>
      {children}
    </h2>
  );
}

/**
 * Variants carry their own colors. Never override colors via className —
 * conflicting Tailwind utilities resolve by stylesheet order, not prop order,
 * which silently produces invisible buttons on dark backgrounds.
 */
type ButtonVariant = "primary" | "gold" | "ghost" | "ghostLight";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-espresso text-crema shadow-card hover:bg-roast",
  gold: "bg-gold text-espresso shadow-card hover:bg-gold-soft",
  ghost:
    "border border-espresso/25 text-espresso hover:border-espresso/50 hover:bg-espresso/5",
  ghostLight:
    "border border-crema/30 text-crema hover:border-crema/70 hover:bg-crema/10",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  const external = href.startsWith("http");
  const classes = `group inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 ${buttonStyles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

/** Page header used by every inner page. */
export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-espresso pb-20 pt-32 text-crema grain sm:pb-24 sm:pt-40">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/12 blur-3xl"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">
          {eyebrow}
        </p>
        <h1 className="max-w-4xl text-balance text-4xl text-crema sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <div className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-crema/75">
          {intro}
        </div>
      </div>
    </section>
  );
}
