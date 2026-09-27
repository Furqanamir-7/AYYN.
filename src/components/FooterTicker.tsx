import { OFFER, BRAND } from "@/lib/constants";
import { formatPKR } from "@/data/products";

const ITEMS = [
  `ANY 2 SETS FOR ${formatPKR(OFFER.pairPrice).replace("PKR ", "RS. ")}`,
  "FREE APPLICATION KIT",
  "NATIONWIDE DELIVERY",
  "REUSABLE PRESS-ONS",
  `${BRAND.payment.methods[0]} & ${BRAND.payment.methods[1]}`.toUpperCase(),
  "HANDMADE IN PAKISTAN",
  BRAND.tagline.toUpperCase(),
];

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center gap-5 px-5 sm:gap-6 sm:px-6"
        >
          <span aria-hidden className="text-[11px] leading-none sm:text-sm">
            ★
          </span>
          <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.22em] sm:text-xs">
            {item}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function FooterTicker() {
  return (
    <div
      className="relative z-10 w-full overflow-hidden bg-mauve py-3.5 text-cream [transform:translateZ(0)] sm:py-4"
      role="note"
      aria-label={ITEMS.join(" · ")}
    >
      <div className="ayyn-marquee-x flex w-max flex-nowrap">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
