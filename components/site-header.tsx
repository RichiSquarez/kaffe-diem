"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { CloseIcon, MenuIcon } from "./icons";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-espresso/10 bg-parchment/85 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" aria-label="Kaffe Diem – til forsiden" className="shrink-0">
          <Image
            src="/img/logo.png"
            alt="Kaffe Diem"
            width={168}
            height={94}
            priority
            className={`h-11 w-auto transition-[filter] duration-300 sm:h-12 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
        </Link>

        <nav aria-label="Hovedmeny" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? scrolled
                          ? "bg-espresso text-crema"
                          : "bg-crema/15 text-crema"
                        : scrolled
                          ? "text-roast hover:bg-espresso/8 hover:text-espresso"
                          : "text-crema/75 hover:bg-crema/10 hover:text-crema"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href="/menu"
          className="hidden shrink-0 items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-espresso shadow-card transition-colors duration-200 hover:bg-gold-soft md:inline-flex"
        >
          Se meny
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Lukk meny" : "Åpne meny"}
          className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full transition-colors duration-200 md:hidden ${
            scrolled || open
              ? "text-espresso hover:bg-espresso/8"
              : "text-crema hover:bg-crema/10"
          }`}
        >
          {open ? <MenuIconSwap open /> : <MenuIconSwap />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-espresso/10 bg-parchment md:hidden"
      >
        <nav aria-label="Mobilmeny" className="mx-auto max-w-6xl px-5 py-4">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? "bg-espresso text-crema"
                      : "text-roast hover:bg-espresso/8"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

const MenuIconSwap = ({ open }: { open?: boolean }) =>
  open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />;
