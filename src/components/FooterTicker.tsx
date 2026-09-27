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

function Flower() {
  return (
    <svg
      className="marquee-flower"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <g fill="currentColor">
        <ellipse cx="32" cy="19" rx="9.5" ry="13.5" />
        <ellipse cx="32" cy="19" rx="9.5" ry="13.5" transform="rotate(72 32 32)" />
        <ellipse cx="32" cy="19" rx="9.5" ry="13.5" transform="rotate(144 32 32)" />
        <ellipse cx="32" cy="19" rx="9.5" ry="13.5" transform="rotate(216 32 32)" />
        <ellipse cx="32" cy="19" rx="9.5" ry="13.5" transform="rotate(288 32 32)" />
      </g>
    </svg>
  );
}

function TrackGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="marquee-track-group" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item} className="marquee-item">
          {item}
          <Flower />
        </span>
      ))}
    </div>
  );
}

export default function FooterTicker({
  hero = false,
}: {
  hero?: boolean;
}) {
  return (
    <div
      className={`marquee-ticker${hero ? " marquee-ticker--hero" : ""}`}
      role="note"
      aria-label={ITEMS.join(" · ")}
    >
      <div className="marquee-track">
        <TrackGroup />
        <TrackGroup hidden />
      </div>
    </div>
  );
}
