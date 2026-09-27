import { formatPKR } from "@/data/products";
import { OFFER } from "@/lib/constants";
import type { CartPricing } from "@/lib/order";

export default function CartTotals({
  pricing,
  count,
}: {
  pricing: CartPricing;
  count: number;
}) {
  return (
    <div className="space-y-1.5">
      {pricing.neededForNextPair > 0 && (
        <p className="rounded-2xl bg-blush/70 px-3 py-2 text-[11px] leading-relaxed text-mauve-dark">
          Add {pricing.neededForNextPair} more{" "}
          {pricing.neededForNextPair === 1 ? "set" : "sets"} — any 2 are{" "}
          {formatPKR(OFFER.pairPrice)} + a free {OFFER.kitName.toLowerCase()}.
        </p>
      )}
      {pricing.pairs > 0 && (
        <p className="rounded-2xl bg-mauve/10 px-3 py-2 text-[11px] leading-relaxed text-mauve-dark">
          2-set offer applied{pricing.pairs > 1 ? ` × ${pricing.pairs}` : ""}.{" "}
          {OFFER.kitName}
          {pricing.kitCount > 1 ? ` × ${pricing.kitCount}` : ""} is free.
        </p>
      )}
      <div className="flex items-center justify-between text-sm">
        <span className="text-charcoal/70">
          {count} {count === 1 ? "item" : "items"}
        </span>
        <span
          className={
            pricing.savings > 0
              ? "text-sm text-charcoal/45 line-through"
              : "font-display text-xl tracking-wide text-mauve-dark"
          }
        >
          {formatPKR(pricing.original)}
        </span>
      </div>
      {pricing.savings > 0 && (
        <>
          <div className="flex items-center justify-between text-xs text-mauve-dark">
            <span>2-set offer</span>
            <span>−{formatPKR(pricing.savings)}</span>
          </div>
          {pricing.kitCount > 0 && (
            <div className="flex items-center justify-between text-xs text-mauve-dark">
              <span>
                {OFFER.kitName}
                {pricing.kitCount > 1 ? ` × ${pricing.kitCount}` : ""}
              </span>
              <span>FREE</span>
            </div>
          )}
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm text-charcoal/70">Total</span>
            <span className="font-display text-xl tracking-wide text-mauve-dark">
              {formatPKR(pricing.total)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
