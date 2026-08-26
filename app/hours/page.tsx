import type { Metadata } from "next";
import { ClockIcon, PhoneIcon } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { Button, PageHero, Section } from "@/components/ui";
import { openingHours, site } from "@/lib/content";
import { breadcrumb, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Åpningstider",
  description:
    "Åpningstider for Kaffe Diem i Bergen. Vi holder åpent på hverdager på Amalie Skram videregående skole.",
  alternates: { canonical: "/hours" },
};

export default function HoursPage() {
  return (
    <>
      <PageHero
        eyebrow="Åpningstider"
        title="Når vi er på plass bak baren"
        intro="Planlegg kaffebesøket ditt med våre oppdaterte åpningstider. Vi følger skoledagen, så helgene er stengt."
      />

      <Section className="py-20 sm:py-24">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div
            data-reveal
            className="overflow-hidden rounded-3xl border border-espresso/10 bg-parchment shadow-card"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-espresso/10 px-8 py-6">
              <h2 className="flex items-center gap-3 text-xl">
                <ClockIcon className="h-5 w-5 text-gold-ink" />
                Ukeplan
              </h2>
              <OpenStatus tone="light" />
            </div>
            <ul>
              {openingHours.map((d) => {
                const closed = !d.opens;
                return (
                  <li
                    key={d.day}
                    className={`flex items-baseline justify-between gap-4 border-b border-espresso/8 px-8 py-4 last:border-0 ${
                      closed ? "text-muted" : ""
                    }`}
                  >
                    <span className="font-medium">{d.day}</span>
                    {closed ? (
                      <span className="rounded-full bg-espresso/6 px-3 py-1 text-sm">
                        Stengt
                      </span>
                    ) : (
                      <span className="font-display text-lg tabular-nums text-gold-ink">
                        {d.opens}–{d.closes}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            data-reveal
            style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
            className="flex flex-col gap-6"
          >
            <div className="rounded-3xl bg-espresso p-8 text-crema grain">
              <h2 className="text-xl text-crema">Ring oss</h2>
              <p className="mt-2 text-sm text-crema/70">
                Lurer du på om vi har vafler i dag? Bare ta kontakt.
              </p>
              <a
                href={`tel:${site.phone}`}
                className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-espresso transition-colors duration-200 hover:bg-gold-soft"
              >
                <PhoneIcon className="h-4 w-4" />
                {site.phoneDisplay}
              </a>
            </div>

            <div className="rounded-3xl border border-espresso/10 bg-crema/40 p-8">
              <h2 className="text-xl">Vaffelfredag</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Hver fredag serverer vi ferske vafler til 5 kr. De pleier å bli
                utsolgt, så kom tidlig.
              </p>
              <Button href="/menu" variant="ghost" className="mt-6">
                Se menyen
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <JsonLd data={breadcrumb("Åpningstider", "/hours")} />
    </>
  );
}
