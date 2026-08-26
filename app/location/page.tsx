import type { Metadata } from "next";
import { MapPinIcon, PhoneIcon } from "@/components/icons";
import { Button, PageHero, Section } from "@/components/ui";
import { addressLine, site } from "@/lib/content";
import { breadcrumb, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Finn oss",
  description:
    "Kaffe Diem ligger på Lungegårdskaien 40 i Bergen, inne på Amalie Skram videregående skole. Se kart og veibeskrivelse.",
  alternates: { canonical: "/location" },
};

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `Kaffe Diem, ${addressLine}`,
)}`;

export default function LocationPage() {
  return (
    <>
      <PageHero
        eyebrow="Finn oss"
        title="Midt i 3. etasje på Amalie Skram"
        intro="Besøk oss på vår sentrale adresse i Bergen for fersk kaffe, bakverk og vennlig service."
      />

      <Section className="py-20 sm:py-24">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div data-reveal className="flex flex-col gap-6">
            <div className="rounded-3xl border border-espresso/10 bg-parchment p-8 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-espresso text-gold-soft">
                <MapPinIcon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-xl">Adresse</h2>
              <address className="mt-3 space-y-1 not-italic leading-relaxed text-muted">
                <strong className="block font-semibold text-espresso">{site.name}</strong>
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
                <br />
                {site.venue}
              </address>
              <a
                href={`tel:${site.phone}`}
                className="mt-6 inline-flex items-center gap-2.5 text-sm font-semibold text-roast transition-colors duration-200 hover:text-gold-ink"
              >
                <PhoneIcon className="h-4 w-4" />
                {site.phoneDisplay}
              </a>
            </div>

            <div className="rounded-3xl bg-espresso p-8 text-crema grain">
              <h2 className="text-xl text-crema">Slik finner du fram</h2>
              <ol className="mt-5 space-y-4 text-sm text-crema/75">
                {[
                  "Gå inn hovedinngangen på Amalie Skram videregående skole.",
                  "Ta trappen eller heisen opp til 3. etasje.",
                  "Følg skiltingen mot midten av etasjen – der finner du oss.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3.5">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-xs font-bold text-espresso">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-xs text-crema/50">
                Merk: du trenger studenttilgang for å komme inn i bygget.
              </p>
              <Button href={directionsUrl} variant="gold" className="mt-7">
                Åpne i Google Maps
              </Button>
            </div>
          </div>

          <div
            data-reveal
            style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
            className="overflow-hidden rounded-3xl border border-espresso/10 shadow-card"
          >
            <iframe
              src={site.mapEmbed}
              title="Kart som viser Kaffe Diem i Bergen"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[26rem] w-full border-0"
            />
          </div>
        </div>
      </Section>

      <JsonLd data={breadcrumb("Finn oss", "/location")} />
    </>
  );
}
