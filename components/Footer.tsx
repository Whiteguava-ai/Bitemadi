import Link from "next/link";
import { ScallopTop } from "./Waves";
import Logo from "./Logo";
import { site } from "@/lib/site";

const cols = [
  {
    title: "Menu",
    links: [
      { href: "/menu", label: "Menu" },
      { href: "/offer", label: "Offers" },
      { href: "/#categories", label: "Categories" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/event", label: "Catering" },
      { href: "/#gallery", label: "Gallery" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/#faq", label: "FAQ" },
      { href: "/book", label: "Book a Table" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-conditions/terms-conditions", label: "Terms of Service" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-burgundy text-cream">
      <ScallopTop fill="#fff7e8" />
      <div className="mx-auto max-w-[1320px] px-5 pb-10 pt-24 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <div className="mb-6">
              <Logo light />
            </div>
            <h4 className="font-display text-2xl uppercase text-white">
              Address
            </h4>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block max-w-[260px] text-[15px] leading-relaxed text-white/80 hover:text-white"
            >
              {site.name}
              <br />
              {site.addressLines.join(", ")}
            </a>
            <a
              href={site.phoneHref}
              className="mt-4 inline-block text-[15px] text-white/90 hover:text-white"
            >
              📞 {site.phone}
            </a>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-2xl uppercase text-white">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-white/75 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/15 pt-6 text-center text-sm text-white/70">
          © 2026 Bite Maadi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
