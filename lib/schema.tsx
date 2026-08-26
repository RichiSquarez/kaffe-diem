import { addressLine, openingHours, site } from "./content";

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

/** Opening hours in schema.org shape, derived from the same table the page renders. */
const openingHoursSpecification = openingHours
  .filter((d) => d.opens && d.closes)
  .map((d) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: d.schema,
    opens: d.opens,
    closes: d.closes,
  }));

export const cafeSchema = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "@id": `${site.url}/#cafe`,
  name: site.name,
  description: site.description,
  image: `${site.url}/img/logo.png`,
  url: site.url,
  telephone: site.phone,
  priceRange: "$",
  servesCuisine: "Coffee",
  address: postalAddress,
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  openingHoursSpecification,
};

export const breadcrumb = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Hjem", item: site.url },
    { "@type": "ListItem", position: 2, name, item: `${site.url}${path}` },
  ],
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const addressText = addressLine;

/** Renders JSON-LD. Content is authored in this repo, never user input. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
