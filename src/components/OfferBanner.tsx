import { OFFER, BRAND } from "@/lib/constants";
import { formatPKR } from "@/data/products";

export default function OfferBanner() {
  return (
    <section
      id="offer"
      className="scroll-mt-16 px-4 py-6 sm:px-6 sm:py-8"
      aria-label="Limited time offer"
    >
      <a
        href="#collections"
        className="relative mx-auto block max-w-lg overflow-hidden rounded-[1.75rem] bg-cream px-6 py-8 text-center shadow-soft ring-1 ring-mauve/35 transition hover:ring-mauve/60 sm:px-10 sm:py-10"
      >
        <span className="pointer-events-none absolute left-5 top-8 text-lg text-mauve/50 sm:left-8">♡</span>
        <span className="pointer-events-none absolute right-6 top-10 text-xl text-mauve/45 sm:right-9">✿</span>
        <span className="pointer-events-none absolute bottom-8 left-7 text-lg text-mauve/40">♡</span>
        <span className="pointer-events-none absolute bottom-10 right-8 text-lg text-mauve/45">✦</span>

        <p className="font-display text-2xl tracking-[0.28em] text-mauve-dark sm:text-3xl">
          {BRAND.name}
        </p>
        <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.28em] text-mauve-dark sm:text-xs">
          Limited time offer
        </p>
        <span className="mx-auto mt-2 block h-px w-16 bg-mauve/50" />
        <p className="mt-4 font-display text-2xl tracking-wide text-charcoal sm:text-3xl">
          {OFFER.headline}
        </p>
        <p className="mt-2 font-display text-5xl font-semibold tracking-wide text-mauve-dark sm:text-6xl">
          {formatPKR(OFFER.pairPrice).replace("PKR ", "Rs. ")}
        </p>
        <span className="mx-auto mt-3 block h-px w-40 bg-mauve/45 sm:w-48" />
        <span className="mt-5 inline-flex rounded-full bg-mauve px-5 py-2 text-xs font-medium tracking-wide text-cream sm:px-6 sm:text-sm">
          {OFFER.pill}
        </span>
        <p className="mt-4 text-sm tracking-wide text-mauve-dark">{BRAND.instagramHandle}</p>
        <p className="mt-1 font-display text-lg tracking-wide text-charcoal/80">
          Pretty nails, delivered nationwide
        </p>
      </a>
    </section>
  );
}
