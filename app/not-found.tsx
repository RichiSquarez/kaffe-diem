import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-espresso px-5 py-40 text-center text-crema grain">
      <div className="relative z-10 mx-auto max-w-lg">
        <p className="font-display text-6xl text-gold-soft">404</p>
        <h1 className="mt-5 text-3xl text-crema sm:text-4xl">
          Denne koppen er tom
        </h1>
        <p className="mt-4 text-crema/70">
          Siden du leter etter finnes ikke. Kanskje du er ute etter menyen?
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button href="/" variant="gold">
            Til forsiden
          </Button>
          <Button href="/menu" variant="ghostLight">
            Se meny
          </Button>
        </div>
      </div>
    </section>
  );
}
