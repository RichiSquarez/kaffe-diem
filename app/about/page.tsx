import type { Metadata } from "next";
import Image from "next/image";
import {
  BookIcon,
  CoffeeIcon,
  LeafIcon,
  MapPinIcon,
  SparkleIcon,
  UsersIcon,
  WalletIcon,
} from "@/components/icons";
import { Button, Eyebrow, PageHero, Section, SectionTitle } from "@/components/ui";
import { site } from "@/lib/content";
import { breadcrumb, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Kaffe Diem er en hyggelig kaffebar i Bergen, inne på Amalie Skram videregående skole. Rimelig kaffe, enkle snacks og rolige omgivelser.",
  alternates: { canonical: "/about" },
};

const highlights = [
  { Icon: WalletIcon, text: "Rimelig kaffe og snacks" },
  { Icon: SparkleIcon, text: "Ferske vafler hver fredag" },
  { Icon: CoffeeIcon, text: "Enkle og gode drikker" },
  { Icon: BookIcon, text: "Perfekt pause i skolehverdagen" },
  { Icon: UsersIcon, text: "Et hyggelig sted å være med venner" },
  { Icon: LeafIcon, text: "Rolig og avslappet miljø" },
  { Icon: MapPinIcon, text: `Midt på ${site.venue}` },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Om oss"
        title="En hyggelig kaffebar i Bergen"
        intro="Et rolig sted for kaffe, pause og studier for elever og ansatte på Amalie Skram videregående skole."
      />

      <Section className="py-20 sm:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div data-reveal>
            <Eyebrow>Hvem vi er</Eyebrow>
            <SectionTitle>Kaffe, ro og en pause som teller</SectionTitle>
            <div className="mt-8 space-y-5 text-pretty text-lg leading-relaxed text-muted">
              <p>
                Kaffe Diem er en hyggelig kaffebar i Bergen, lokalisert inne på
                Amalie Skram videregående skole. Vi tilbyr fersk kaffe og enkle
                snacks i rolige omgivelser.
              </p>
              <p>
                Dette er et perfekt sted for elever og ansatte som ønsker en pause,
                studere, eller nyte en kopp kaffe i løpet av dagen. Vi fokuserer på
                rimelige priser og en avslappet atmosfære.
              </p>
              <p>
                Ser du etter en kafé i Bergen, kaffe nær deg, eller et rolig sted å
                studere, er Kaffe Diem et naturlig valg.
              </p>
            </div>
            <Button href="/menu" className="mt-9">
              Se hva vi serverer
            </Button>
          </div>

          <div
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="overflow-hidden rounded-[2rem] border border-espresso/10 shadow-lift"
          >
            <Image
              src="/img/coffee-seasonal.jpg"
              alt="Kaffe og sesongdrikker hos Kaffe Diem i Bergen"
              width={900}
              height={900}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>
      </Section>

      <Section className="pb-24">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>Kort fortalt</Eyebrow>
          <SectionTitle>Hva du får hos oss</SectionTitle>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h, i) => (
            <li
              key={h.text}
              data-reveal
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              className="flex items-center gap-4 rounded-2xl border border-espresso/10 bg-parchment px-6 py-5 shadow-card"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-crema/60 text-roast">
                <h.Icon className="h-5 w-5" />
              </span>
              <span className="font-medium">{h.text}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pb-24">
        <div
          data-reveal
          className="rounded-[2.5rem] bg-espresso px-8 py-14 text-center text-crema grain sm:px-14"
        >
          <SectionTitle className="mx-auto max-w-2xl text-crema">
            Passer for deg som studerer på Amalie Skram
          </SectionTitle>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-crema/70">
            Perfekt for kaffe på skolen i Bergen – en rolig kafé med billig kaffe for
            studenter.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/hours" variant="gold">
              Åpningstider
            </Button>
            <Button href="/location" variant="ghostLight">
              Finn veien
            </Button>
          </div>
        </div>
      </Section>

      <JsonLd data={breadcrumb("Om oss", "/about")} />
    </>
  );
}
