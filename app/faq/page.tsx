import type { Metadata } from "next";
import { ChevronDownIcon } from "@/components/icons";
import { Button, PageHero, Section } from "@/components/ui";
import { faqs } from "@/lib/content";
import { breadcrumb, faqSchema, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Ofte stilte spørsmål",
  description:
    "Svar på vanlige spørsmål om Kaffe Diem i Bergen: tilgang, egen kopp, melkealternativer og klippekort.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Ofte stilte spørsmål"
        intro="Det gjestene våre lurer mest på. Finner du ikke svaret? Bare spør oss i baren."
      />

      <Section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={faq.q}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              className="group rounded-2xl border border-espresso/10 bg-parchment px-7 shadow-card transition-colors duration-200 open:border-gold/50 hover:border-espresso/25"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium text-espresso [&::-webkit-details-marker]:hidden">
                {faq.q}
                <ChevronDownIcon className="h-5 w-5 shrink-0 text-gold-ink transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="-mt-1 pb-6 pr-10 text-pretty leading-relaxed text-muted">
                {faq.a}
              </p>
            </details>
          ))}
        </div>

        <div
          data-reveal
          className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-between gap-6 rounded-3xl border border-espresso/10 bg-crema/40 px-8 py-9"
        >
          <div>
            <h2 className="text-2xl">Fortsatt lurer du på noe?</h2>
            <p className="mt-2 text-muted">Se menyen, eller ring oss i åpningstiden.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/menu">Se meny</Button>
            <Button href="/hours" variant="ghost">
              Åpningstider
            </Button>
          </div>
        </div>
      </Section>

      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumb("FAQ", "/faq")} />
    </>
  );
}
