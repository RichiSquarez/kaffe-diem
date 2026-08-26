import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/hero";
import {
  BookIcon,
  ClockIcon,
  CoffeeIcon,
  MapPinIcon,
  PhoneIcon,
  WalletIcon,
} from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { Button, Eyebrow, Section, SectionTitle } from "@/components/ui";
import { addressLine, fromPrice, menuGroups, openingHours, site } from "@/lib/content";

const reasons = [
  {
    Icon: CoffeeIcon,
    title: "Kvalitet på skolen",
    text: "Fersk kaffe og smakfull snacks midt på Amalie Skram vgs. Perfekt for en energiboost mellom timene.",
  },
  {
    Icon: WalletIcon,
    title: "Studentvennlige priser",
    text: "Byens kanskje rimeligste kaffe – uten å gå på kompromiss med smaken. Skreddersydd for studentbudsjettet.",
  },
  {
    Icon: BookIcon,
    title: "Ro til å studere",
    text: "Ser du etter et rolig sted å studere i Bergen? Omgivelsene våre er skapt for konsentrasjon og velfortjente pauser.",
  },
];

const marqueeItems = [
  "Espresso",
  "Cortado",
  "Cappuccino",
  "Latte",
  "Matcha",
  "Chai Latte",
  "Mocca",
  "Is Latte",
  "Varm sjokolade",
  "Filterkaffe",
];

export default function HomePage() {
  const today = openingHours.filter((d) => d.opens).slice(0, 5);

  return (
    <>
      <Hero />

      {/* Drinks marquee — motion band that separates hero from content. */}
      <div className="overflow-hidden border-y border-espresso/10 bg-crema/50 py-4">
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-8 font-display text-lg text-roast/70"
            >
              {item}
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
          ))}
        </div>
      </div>

      {/* Why us */}
      <Section className="py-24 sm:py-28">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>Hvorfor Kaffe Diem</Eyebrow>
          <SectionTitle>En pause som faktisk føles som en pause</SectionTitle>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reasons.map((r, i) => (
            <article
              key={r.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="group rounded-3xl border border-espresso/10 bg-parchment p-8 shadow-card transition-colors duration-200 hover:border-gold/60"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-espresso text-gold-soft transition-colors duration-200 group-hover:bg-gold group-hover:text-espresso">
                <r.Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-xl">{r.title}</h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">{r.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Menu preview */}
      <Section className="pb-24 sm:pb-28">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>Fra menyen</Eyebrow>
            <SectionTitle>Det vi brygger</SectionTitle>
          </div>
          <Button href="/menu" variant="ghost">
            Hele menyen
          </Button>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {menuGroups.map((group, i) => (
            <Link
              key={group.id}
              href={`/menu#${group.id}`}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="group overflow-hidden rounded-3xl border border-espresso/10 bg-parchment shadow-card transition-colors duration-200 hover:border-gold/60"
            >
              {group.image && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={group.image.src}
                    alt={group.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-7">
                <h3 className="text-xl">{group.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{group.blurb}</p>
                <p className="mt-5 text-sm font-semibold text-roast transition-colors duration-200 group-hover:text-gold-ink">
                  Fra {fromPrice(group)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Visit strip */}
      <Section className="pb-24 sm:pb-28">
        <div
          data-reveal
          className="relative overflow-hidden rounded-[2.5rem] bg-espresso px-7 py-14 text-crema grain sm:px-14"
        >
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/12 blur-3xl"
          />
          <div className="relative z-10 grid gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>
                <span className="text-gold-soft">Besøk oss</span>
              </Eyebrow>
              <SectionTitle className="text-crema">
                Stikk innom i 3. etasje
              </SectionTitle>
              <address className="mt-8 space-y-4 not-italic text-crema/80">
                <span className="flex items-start gap-3">
                  <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-gold-soft" />
                  <span>
                    <strong className="block font-semibold text-crema">{site.name}</strong>
                    {addressLine}
                  </span>
                </span>
                <a
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-3 transition-colors duration-200 hover:text-gold-soft"
                >
                  <PhoneIcon className="h-5 w-5 shrink-0 text-gold-soft" />
                  {site.phoneDisplay}
                </a>
              </address>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button href="/location" variant="gold">
                  Veibeskrivelse
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-crema/15 bg-crema/6 p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="flex items-center gap-2.5 text-lg text-crema">
                  <ClockIcon className="h-5 w-5 text-gold-soft" />
                  Åpningstider
                </h3>
                <OpenStatus />
              </div>
              <ul className="mt-5 space-y-3 text-sm">
                {today.map((d) => (
                  <li
                    key={d.day}
                    className="flex items-baseline justify-between gap-4 border-b border-crema/10 pb-3 last:border-0"
                  >
                    <span className="text-crema/75">{d.day}</span>
                    <span className="font-medium tabular-nums text-crema">
                      {d.opens}–{d.closes}
                    </span>
                  </li>
                ))}
                <li className="flex items-baseline justify-between gap-4 text-crema/50">
                  <span>Lørdag – søndag</span>
                  <span>Stengt</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
