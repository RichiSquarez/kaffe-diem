import Link from "next/link";
import { addressLine, nav, site } from "@/lib/content";
import { MapPinIcon, PhoneIcon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-espresso text-crema grain">
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-crema">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-crema/70">
            Din lokale kaffebar på {site.venue} i Bergen.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gold-soft">
            Sider
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-crema/80 transition-colors duration-200 hover:text-gold-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gold-soft">
            Kontakt
          </h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-crema/80">
            <span className="flex items-start gap-2.5">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
              {addressLine}
            </span>
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-2.5 transition-colors duration-200 hover:text-gold-soft"
            >
              <PhoneIcon className="h-4 w-4 shrink-0 text-gold-soft" />
              {site.phoneDisplay}
            </a>
          </address>
        </div>
      </div>

      <div className="relative z-10 border-t border-crema/12">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-crema/55 sm:px-8">
          © {new Date().getFullYear()} {site.name}. Alle rettigheter forbeholdt.
        </p>
      </div>
    </footer>
  );
}
