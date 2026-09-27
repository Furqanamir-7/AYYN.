import Image from "next/image";
import { OFFER, BRAND } from "@/lib/constants";
import { formatPKR } from "@/data/products";

export default function OfferBanner() {
  return (
    <section
      id="offer"
      className="scroll-mt-16 px-4 py-5 sm:px-6 sm:py-7"
      aria-label="Limited time offer"
    >
      <a
        href="#collections"
        className="mx-auto block max-w-5xl overflow-hidden rounded-xl ring-1 ring-mauve/25 transition hover:ring-mauve/50 sm:rounded-2xl"
      >
        <Image
          src="/offer-banner.png"
          alt={`${BRAND.name} limited time offer — ${OFFER.headline} ${formatPKR(OFFER.pairPrice).replace("PKR ", "Rs. ")} ${OFFER.pill}`}
          width={1024}
          height={320}
          className="h-auto w-full"
          sizes="(min-width: 1024px) 64rem, 100vw"
          priority
        />
      </a>
    </section>
  );
}
