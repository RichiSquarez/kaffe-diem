/**
 * Single source of truth for all site content.
 * Pages, navigation and schema.org JSON-LD all read from here,
 * so business details are edited in exactly one place.
 */

export const site = {
  name: "Kaffe Diem",
  url: "https://www.kaffediem.online",
  locale: "nb_NO",
  lang: "no",
  tagline: "Beste kaffe i Bergen, laget fersk hver dag",
  description:
    "Besøk Kaffe Diem for håndlaget kaffe, ferske bakverk og sesongbaserte spesialiteter i Bergen. Se menyen vår og stikk innom i dag.",
  phone: "+4795110435",
  phoneDisplay: "+47 95 11 04 35",
  venue: "Amalie Skram videregående skole",
  address: {
    street: "Lungegårdskaien 40",
    postalCode: "5015",
    city: "Bergen",
    region: "Vestland",
    country: "NO",
  },
  geo: { lat: 60.3938718, lng: 5.3408847 },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15768.874764249194!2d5.3408847!3d60.39387180000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463cff8cd52958d3%3A0x3d0bc54f20fcfa6e!2sKaffe%20Diem!5e0!3m2!1sru!2sno!4v1776335810809!5m2!1sru!2sno",
  googleVerification: "Gf-GygjSYhNZcRJfJzmaI36b4UbI8T_41XEERAH3zDg",
} as const;

export const addressLine = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

export const nav = [
  { href: "/menu", label: "Meny" },
  { href: "/location", label: "Finn oss" },
  { href: "/news", label: "Nyheter" },
  { href: "/hours", label: "Åpningstider" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "Om oss" },
] as const;

/* ---------------------------------- Menu ---------------------------------- */

export type MenuItem = { name: string; price: string; note?: string };
export type MenuGroup = {
  id: string;
  title: string;
  blurb: string;
  image?: { src: string; alt: string };
  items: MenuItem[];
  footnote?: string;
};

export const menuGroups: MenuGroup[] = [
  {
    id: "coffee",
    title: "Vanlige drikker",
    blurb: "Kvernet på stedet og trukket til bestilling.",
    image: {
      src: "/img/coffee-espresso.jpg",
      alt: "Nybrygget espresso i kopp på Kaffe Diem",
    },
    items: [
      { name: "Espresso", price: "10 kr" },
      { name: "Americano", price: "10 kr" },
      { name: "Cortado", price: "10 kr" },
      { name: "Chai Latte", price: "10 kr" },
      { name: "Cappuccino", price: "10 kr" },
      { name: "Latte", price: "10 kr" },
      { name: "Varm sjokolade m/uten krem", price: "10 kr" },
      { name: "Is Latte", price: "10 kr" },
      { name: "Mocca", price: "10 kr" },
      { name: "Is Mocca", price: "10 kr" },
      { name: "Is Te", price: "10 kr" },
      { name: "Matcha", price: "15 kr" },
      { name: "Filterkaffe", price: "5 kr", note: "når tilgjengelig" },
      { name: "Ekstra shot", price: "5 kr" },
    ],
    footnote: "Pris kan variere etter størrelse og tilvalg.",
  },
  {
    id: "seasonal",
    title: "Sesongbaserte drikker",
    blurb: "Tidsbegrensede drikker inspirert av sesongen.",
    image: {
      src: "/img/coffee-seasonal.jpg",
      alt: "Sesongens kaffetilbud hos Kaffe Diem",
    },
    items: [
      { name: "Pumpkin spice latte", price: "10 kr" },
      { name: "Cappuccino med julekrydder", price: "10 kr" },
      { name: "Påske-iste", price: "10 kr" },
    ],
    footnote: "Spør i baren hva vi brygger i dag.",
  },
  {
    id: "bakery",
    title: "Bakverk og snacks",
    blurb: "Enkelt, godt og perfekt til pausen.",
    image: {
      src: "/img/bakery.jpg",
      alt: "Ferske vafler og snacks hos Kaffe Diem i Bergen",
    },
    items: [
      { name: "Vafler", price: "5 kr", note: "fredag" },
      { name: "Kjeks, 3 stk", price: "5 kr" },
    ],
    footnote: "Utvalg kan variere fra dag til dag.",
  },
];

export const syrups = [
  "Karamell",
  "Vanilje",
  "Hasselnøtt",
  "Sukkerfri karamell",
  "Sukkerfri vanilje",
];

export const milks = [
  "Helmelk",
  "Lettmelk",
  "Laktosefri",
  "Havremelk",
  "Mandelmelk",
  "Soyamelk",
];

/* --------------------------------- Perks ---------------------------------- */

/**
 * Things a guest saves money on. These were only mentioned in the FAQ before,
 * so nobody reading the menu ever learned they existed.
 */
export const perks: { icon: "card" | "cup" | "milk"; title: string; text: string }[] = [
  {
    icon: "card",
    title: "Klippekort",
    text: "Kjøp klippekort og få i praksis 10 eller 20 kr gratis. Spør i baren.",
  },
  {
    icon: "cup",
    title: "Egen kopp, bedre pris",
    text: "Tar du med din egen kopp, får du kaffen til redusert pris.",
  },
  {
    icon: "milk",
    title: "Alltid samme pris på melk",
    text: "Havre, mandel, soya og laktosefri koster ikke ekstra.",
  },
];

/* --------------------------------- Hours ---------------------------------- */

export type OpeningDay = {
  day: string;
  schema: string;
  opens: string | null;
  closes: string | null;
};

export const openingHours: OpeningDay[] = [
  { day: "Mandag", schema: "Monday", opens: "09:00", closes: "12:00" },
  { day: "Tirsdag", schema: "Tuesday", opens: "09:00", closes: "12:30" },
  { day: "Onsdag", schema: "Wednesday", opens: "09:00", closes: "12:30" },
  { day: "Torsdag", schema: "Thursday", opens: "09:00", closes: "12:30" },
  { day: "Fredag", schema: "Friday", opens: "09:00", closes: "12:00" },
  { day: "Lørdag", schema: "Saturday", opens: null, closes: null },
  { day: "Søndag", schema: "Sunday", opens: null, closes: null },
];

/* ---------------------------------- FAQ ----------------------------------- */

export const faqs = [
  {
    q: "Hvordan får jeg tilgang til kafeen?",
    a: "Du trenger studenttilgang og må ta turen til midten av 3. etasje.",
  },
  {
    q: "Må jeg ha med egen kopp?",
    a: "Nei, men du får en bedre pris om du har med din egen.",
  },
  {
    q: "Er kaffen fersk?",
    a: "Ja, vi kverner bønnene rett i prosessen.",
  },
  {
    q: "Har dere laktosefri og alternativ melk?",
    a: "Selvfølgelig. Vi har helmelk, lettmelk, laktosefri melk, havremelk, mandelmelk og soyamelk.",
  },
  {
    q: "Hva er poenget med klippekort?",
    a: "Du sparer penger. Det er i praksis 10 eller 20 kr gratis for deg.",
  },
];

/* ---------------------------------- News ---------------------------------- */

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: { src: string; alt: string };
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "tilbakemelding",
    title: "Hva synes du om Kaffe Diem?",
    date: "2026-04-24",
    category: "Oppdateringer",
    image: {
      src: "/img/news-feedback.jpg",
      alt: "Gjester og kaffe hos Kaffe Diem i Bergen",
    },
    body: [
      "Vi elsker å høre fra gjestene våre. Har du en favorittkaffe eller en vaffelopplevelse du vil dele?",
      "Din tilbakemelding hjelper oss å bli enda bedre.",
    ],
  },
  {
    slug: "vaffelfredag",
    title: "Vaffelfredag i dag hos Kaffe Diem",
    date: "2026-04-17",
    category: "Arrangementer",
    image: {
      src: "/img/bakery.jpg",
      alt: "Ferske vafler servert på vaffelfredag",
    },
    body: [
      "Vi serverer ferske vafler på Amalie Skram VGS – perfekt sammen med kaffe og en hyggelig pause.",
      "Kom innom før det blir utsolgt.",
    ],
  },
  {
    slug: "velkommen",
    title: "Velkommen til Kaffe Diem",
    date: "2026-04-15",
    category: "Oppdateringer",
    image: {
      src: "/img/news-welcome.jpg",
      alt: "Kaffebaren Kaffe Diem på Amalie Skram VGS i Bergen",
    },
    body: [
      "Din lokale kaffebar på Amalie Skram VGS i Bergen. Hos oss får du god kaffe, en hyggelig pause i skolehverdagen og et sted å slappe av med venner.",
      "Enten du trenger en rask kaffe før timen eller vil ta en pause i løpet av dagen, er Kaffe Diem stedet for deg.",
    ],
  },
];

/** Lowest price in a group, for "Fra X kr" labels. */
export const fromPrice = (group: MenuGroup): string => {
  const numbers = group.items
    .map((i) => Number.parseInt(i.price, 10))
    .filter((n) => Number.isFinite(n));
  return numbers.length ? `${Math.min(...numbers)} kr` : "";
};

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));

/* ------------------------------- Open state ------------------------------- */

export type OpenState =
  | { isOpen: true; closesAt: string }
  | { isOpen: false; nextDay: string; nextOpensAt: string };

const MINUTES_PER_HOUR = 60;
const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * MINUTES_PER_HOUR + m;
};

/**
 * Whether the bar is open right now, evaluated in the cafe's own timezone
 * (Europe/Oslo) rather than the visitor's.
 */
export function getOpenState(now: Date = new Date()): OpenState {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Oslo",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekday = part("weekday");
  const nowMinutes = toMinutes(`${part("hour")}:${part("minute")}`);

  const todayIndex = openingHours.findIndex((d) => d.schema === weekday);
  const today = todayIndex >= 0 ? openingHours[todayIndex] : undefined;

  if (today?.opens && today.closes) {
    const open = toMinutes(today.opens);
    const close = toMinutes(today.closes);
    if (nowMinutes >= open && nowMinutes < close) {
      return { isOpen: true, closesAt: today.closes };
    }
    // Earlier the same day still counts as opening today.
    if (nowMinutes < open) {
      return { isOpen: false, nextDay: "i dag", nextOpensAt: today.opens };
    }
  }

  // Walk forward to the next day that has hours.
  const start = todayIndex >= 0 ? todayIndex : 0;
  for (let step = 1; step <= openingHours.length; step += 1) {
    const day = openingHours[(start + step) % openingHours.length];
    if (day.opens) {
      return {
        isOpen: false,
        nextDay: step === 1 ? "i morgen" : day.day.toLowerCase(),
        nextOpensAt: day.opens,
      };
    }
  }

  return { isOpen: false, nextDay: "mandag", nextOpensAt: "09:00" };
}
