import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, Section } from "@/components/ui";
import { formatDate, posts } from "@/lib/content";
import { breadcrumb, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Nyheter",
  description:
    "Sesongtilbud, menyhøydepunkter og kunngjøringer fra Kaffe Diem i Bergen.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Nyheter"
        title="Oppdateringer fra baren"
        intro="Sesongtilbud, menyhøydepunkter og kunngjøringer – lagt ut for vårt lokale Bergen-samfunn."
      />

      <Section className="py-20 sm:py-24">
        {/* Lead post */}
        <article
          data-reveal
          className="group grid overflow-hidden rounded-3xl border border-espresso/10 bg-parchment shadow-card lg:grid-cols-2"
        >
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[24rem]">
            <Image
              src={lead.image.src}
              alt={lead.image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <PostMeta date={lead.date} category={lead.category} />
            <h2 className="mt-4 text-balance text-3xl sm:text-4xl">{lead.title}</h2>
            {lead.body.map((p, i) => (
              <p key={i} className="mt-4 text-pretty leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
        </article>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {rest.map((post, i) => (
            <article
              key={post.slug}
              id={post.slug}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="group overflow-hidden rounded-3xl border border-espresso/10 bg-parchment shadow-card transition-colors duration-200 hover:border-gold/60"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <PostMeta date={post.date} category={post.category} />
                <h2 className="mt-3 text-2xl">{post.title}</h2>
                {post.body.map((p, j) => (
                  <p key={j} className="mt-3 text-pretty leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <JsonLd data={breadcrumb("Nyheter", "/news")} />
    </>
  );
}

function PostMeta({ date, category }: { date: string; category: string }) {
  return (
    <p className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-clay">
      <time dateTime={date}>{formatDate(date)}</time>
      <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
      <span className="text-gold-ink">{category}</span>
    </p>
  );
}
