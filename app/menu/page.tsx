import type { Metadata } from "next";
import Image from "next/image";
import { LeafIcon, SparkleIcon } from "@/components/icons";
import { Button, Eyebrow, PageHero, Section, SectionTitle } from "@/components/ui";
import { menuGroups, milks, syrups } from "@/lib/content";
import { breadcrumb, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Meny",
  description:
    "Se hele menyen til Kaffe Diem i Bergen: kaffe, espresso, sesongdrikker, bakverk og snacks. Finn også siruper, melketyper og priser.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Meny"
        title="Alt vi serverer, og hva det koster"
        intro="Kvernet på stedet og trukket til bestilling. Spør oss gjerne om anbefalinger – vi tilpasser styrke, melk og sirup etter smak."
      />

      <Section className="py-20 sm:py-24">
        <div className="space-y-20">
          {menuGroups.map((group) => (
            <article
              key={group.id}
              id={group.id}
              data-reveal
              className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]"
            >
              {group.image && (
                <div className="overflow-hidden rounded-3xl border border-espresso/10 shadow-card">
                  <Image
                    src={group.image.src}
                    alt={group.image.alt}
                    width={800}
                    height={600}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              )}

              <div>
                <Eyebrow>{group.blurb}</Eyebrow>
                <SectionTitle>{group.title}</SectionTitle>

                <ul className="mt-8 divide-y divide-espresso/10">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline gap-4 py-3.5 transition-colors duration-200 hover:text-espresso"
                    >
                      <span className="font-medium">
                        {item.name}
                        {item.note && (
                          <span className="ml-2 text-sm font-normal text-muted">
                            ({item.note})
                          </span>
                        )}
                      </span>
                      <span
                        aria-hidden
                        className="mx-1 h-px flex-1 border-b border-dotted border-espresso/25"
                      />
                      <span className="font-display text-lg tabular-nums text-gold-ink">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>

                {group.footnote && (
                  <p className="mt-5 text-sm text-muted">{group.footnote}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Options */}
      <Section className="pb-24">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>Tilvalg</Eyebrow>
          <SectionTitle>Sirup og melk</SectionTitle>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { title: "Siruper", items: syrups, Icon: SparkleIcon, note: "Tilgjengelighet kan variere." },
            { title: "Melk og alternativer", items: milks, Icon: LeafIcon, note: "Alle alternativer koster det samme." },
          ].map((box, i) => (
            <article
              key={box.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="rounded-3xl border border-espresso/10 bg-parchment p-8 shadow-card"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-espresso text-gold-soft">
                <box.Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl">{box.title}</h3>
              <p className="mt-2 text-sm text-muted">{box.note}</p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {box.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-espresso/15 bg-crema/40 px-4 py-1.5 text-sm text-roast"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <div
          data-reveal
          className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-espresso/10 bg-crema/40 px-8 py-10"
        >
          <div>
            <h2 className="text-2xl">Før du besøker oss</h2>
            <p className="mt-2 text-muted">
              Sjekk åpningstider og finn veien til 3. etasje.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/hours">Åpningstider</Button>
            <Button href="/location" variant="ghost">
              Finn veien
            </Button>
          </div>
        </div>
      </Section>

      <JsonLd data={breadcrumb("Meny", "/menu")} />
    </>
  );
}
