"use client";

import BrandLogo from "./BrandLogo";
import SiteLink from "./SiteLink";
import { BRAND, NAV_LINKS, WA } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-6 border-t border-blush bg-blush/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 md:flex-row md:items-start md:justify-between md:gap-8 md:py-7">
        <div className="max-w-xs">
          <SiteLink href="/#home" className="inline-flex items-center" aria-label="AYYN. home">
            <BrandLogo
              size={120}
              href={null}
              className="h-8 w-auto sm:h-9"
            />
          </SiteLink>
          <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
            {BRAND.tagline} Press-ons delivered nationwide.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-charcoal/75">
          {NAV_LINKS.map((l) => (
            <SiteLink key={l.href} href={`/${l.href}`} className="hover:text-mauve-dark">
              {l.label}
            </SiteLink>
          ))}
          <SiteLink href="/checkout" className="hover:text-mauve-dark">
            Checkout
          </SiteLink>
        </div>

        <div className="text-xs text-charcoal/75">
          <a
            href={WA.generic}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-mauve-dark hover:underline"
          >
            {BRAND.whatsappDisplay}
          </a>
          <p className="mt-1 text-[11px] text-charcoal/60">
            Pay to {BRAND.payment.accountHolder} · {BRAND.payment.accountDisplay}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {BRAND.payment.methods.map((p) => (
              <span
                key={p}
                className="rounded-full border border-mauve/35 bg-cream px-2 py-0.5 text-[10px] text-mauve-dark"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-blush/80 px-4 py-3 text-center text-[10px] text-charcoal/50">
        © {new Date().getFullYear()} AYYN. All rights reserved.
      </div>
    </footer>
  );
}
