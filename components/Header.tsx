"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";
import { ArrowIcon } from "./Button";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <div
        className={`pointer-events-auto mx-auto flex max-w-[1320px] items-center justify-between rounded-b-[32px] rounded-t-[22px] bg-cream px-4 py-3 shadow-[0_10px_40px_rgba(44,2,5,0.12)] transition-all duration-300 md:px-7 ${
          scrolled ? "py-2.5" : "py-3.5"
        }`}
      >
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[15px] transition-colors ${
                  active
                    ? "font-semibold text-burgundy"
                    : "text-muted hover:text-burgundy"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-full bg-burgundy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-burgundy-dark md:px-5"
          >
            Order from Table
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
              <ArrowIcon className="h-3.5 w-3.5" />
            </span>
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-brown/10 text-brown lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 w-full bg-brown transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 w-full bg-brown transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 w-full bg-brown transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="pointer-events-auto mx-auto mt-2 max-w-[1320px] rounded-[24px] bg-cream p-5 shadow-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-brown hover:bg-burgundy/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="rounded-xl px-3 py-3 font-medium text-burgundy hover:bg-burgundy/5"
            >
              Order from Table
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
