import Image from "next/image";
import { site } from "@/lib/content";
import { Button } from "./ui";

/** Animated steam wisps drifting off the hero image. */
function Steam() {
  return (
    <div aria-hidden className="pointer-events-none absolute -top-6 left-1/2 flex -translate-x-1/2 gap-3">
      {[0, 0.9, 1.8].map((delay, i) => (
        <span
          key={i}
          className="animate-steam block h-16 w-1.5 rounded-full bg-crema/50 blur-[3px]"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-espresso text-crema grain">
      {/* Warm glow pools */}
      <div aria-hidden className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-gold/12 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-clay/18 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:pb-32">
        <div>
          <p
            data-reveal
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-crema/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-70" />
            </span>
            {site.venue}
          </p>

          <h1
            data-reveal
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            className="text-balance text-[2.6rem] leading-[1.05] text-crema sm:text-6xl lg:text-[4.25rem]"
          >
            Beste kaffe i Bergen,{" "}
            <span className="relative whitespace-nowrap text-gold-soft">
              laget fersk
              <svg
                aria-hidden
                viewBox="0 0 300 12"
                fill="none"
                className="absolute -bottom-2 left-0 w-full"
              >
                <path
                  d="M2 8c60-6 130-7 296-3"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-pour"
                  strokeDasharray="240"
                />
              </svg>
            </span>{" "}
            hver dag
          </h1>

          <p
            data-reveal
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-crema/75"
          >
            Fra signatur-espresso til hjemmebakte bakverk – Kaffe Diem er kaffebaren
            midt i skolehverdagen. Kvernet på stedet, priset for studentbudsjett.
          </p>

          <div
            data-reveal
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="/menu" variant="gold" className="shadow-lift">
              Se meny
            </Button>
            <Button href="/location" variant="ghostLight">
              Finn veien
            </Button>
          </div>

          <dl
            data-reveal
            style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
            className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-crema/15 pt-8"
          >
            {[
              { v: "10 kr", l: "De fleste drikker" },
              { v: "6", l: "Melkealternativer" },
              { v: "Fredag", l: "Vaffeldag" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-display text-2xl text-gold-soft sm:text-3xl">{s.v}</dt>
                <dd className="mt-1 text-xs leading-snug text-crema/60">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          data-reveal
          style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="animate-float relative">
            <Steam />
            <div className="relative overflow-hidden rounded-[2rem] border border-crema/15 shadow-lift">
              <Image
                src="/img/coffee-espresso.jpg"
                alt="Nybrygget kaffe servert på Kaffe Diem i Bergen"
                width={900}
                height={900}
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-transparent"
              />
            </div>
          </div>

          <div className="absolute -bottom-6 -left-4 rounded-2xl border border-crema/15 bg-espresso/92 px-5 py-4 shadow-lift backdrop-blur-sm sm:-left-8">
            <p className="font-display text-xl text-crema">Kvernet på stedet</p>
            <p className="mt-0.5 text-xs text-crema/60">Bønnene males rett før trakting</p>
          </div>
        </div>
      </div>
    </section>
  );
}
