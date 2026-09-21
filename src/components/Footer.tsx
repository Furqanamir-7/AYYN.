"use client";

import { usePathname } from "next/navigation";
import BrandLogo from "./BrandLogo";
import SiteLink from "./SiteLink";
import { BRAND, NAV_LINKS, WA } from "@/lib/constants";
import { isTemplatePath } from "@/lib/template";

export default function Footer() {
  const template = isTemplatePath(usePathname());

  return (
    <footer
      className={`mt-6 border-t ${
        template ? "border-cream/15 bg-mauve text-cream" : "border-blush bg-blush/40"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 md:flex-row md:items-start md:justify-between md:gap-8 md:py-7">
        <div className="max-w-xs">
          <SiteLink href="/#home" className="inline-flex items-center" aria-label="AYYN. home">
            <BrandLogo
              size={120}
              href={null}
              className="h-8 w-auto sm:h-9"
            />
          </SiteLink>
          <p
            className={`mt-2 text-xs leading-relaxed ${
              template ? "text-cream/80" : "text-charcoal/70"
            }`}
          >
            {BRAND.tagline} Press-ons delivered nationwide.
          </p>
        </div>

        <div
          className={`flex flex-wrap gap-x-4 gap-y-1 text-xs ${
            template ? "text-cream/80" : "text-charcoal/75"
          }`}
        >
          {NAV_LINKS.map((l) => (
            <SiteLink
              key={l.href}
              href={`/${l.href}`}
              className={template ? "hover:text-cream" : "hover:text-mauve-dark"}
            >
              {l.label}
            </SiteLink>
          ))}
          <SiteLink
            href="/checkout"
            className={template ? "hover:text-cream" : "hover:text-mauve-dark"}
          >
            Checkout
          </SiteLink>
        </div>

        <div className={`text-xs ${template ? "text-cream/80" : "text-charcoal/75"}`}>
          <a
            href={WA.generic}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium hover:underline ${
              template ? "text-cream" : "text-mauve-dark"
            }`}
          >
            {BRAND.whatsappDisplay}
          </a>
          <p
            className={`mt-1 text-[11px] ${
              template ? "text-cream/70" : "text-charcoal/60"
            }`}
          >
            Pay to {BRAND.payment.accountHolder} · {BRAND.payment.accountDisplay}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {BRAND.payment.methods.map((p) => (
              <span
                key={p}
                className={`rounded-full border px-2 py-0.5 text-[10px] ${
                  template
                    ? "border-cream/35 bg-cream text-mauve"
                    : "border-mauve/35 bg-cream text-mauve-dark"
                }`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`border-t px-4 py-3 text-center text-[10px] ${
          template ? "border-cream/15 text-cream/60" : "border-blush/80 text-charcoal/50"
        }`}
      >
        © {new Date().getFullYear()} AYYN. All rights reserved.
      </div>
    </footer>
  );
}
