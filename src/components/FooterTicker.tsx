import { OFFER, BRAND } from "@/lib/constants";
import { formatPKR } from "@/data/products";

const ITEMS = [
  `ANY 2 SETS FOR ${formatPKR(OFFER.pairPrice).replace("PKR ", "RS. ")}`,
  "FREE APPLICATION KIT",
  "NATIONWIDE DELIVERY",
  "REUSABLE PRESS-ONS",
  `${BRAND.payment.methods[0]} & ${BRAND.payment.methods[1]}`,
  "HANDMADE IN PAKISTAN",
  BRAND.tagline.toUpperCase(),
];

function TickerCopy({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-5 px-3 py-3.5 sm:gap-7 sm:py-4"
      aria-hidden={hidden}
    >
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-5 sm:gap-7">
          <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.28em] sm:text-xs">
            {item}
          </span>
          <span aria-hidden className="text-[11px] opacity-85 sm:text-xs">
            ★
          </span>
        </span>
      ))}
    </div>
  );
}

export default function FooterTicker() {
  return (
    <div
      className="overflow-hidden bg-mauve text-cream"
      role="note"
      aria-label={ITEMS.join(" · ")}
    >
      <div className="ayyn-marquee-x flex w-max">
        <TickerCopy />
        <TickerCopy hidden />
      </div>
    </div>
  );
}
