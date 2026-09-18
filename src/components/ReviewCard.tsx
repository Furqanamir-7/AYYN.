import { Review } from "@/data/reviews";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-3xl bg-blush/45 p-5 sm:p-6">
      <div className="flex items-center gap-1 text-mauve-dark" aria-label={`${review.rating} stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < review.rating ? "opacity-100" : "opacity-25"}>
            ★
          </span>
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-charcoal/85">&ldquo;{review.text}&rdquo;</p>
      <p className="mt-4 font-display text-lg tracking-wide text-mauve-dark">
        {review.name}
      </p>
      {review.city && (
        <p className="text-xs uppercase tracking-wider text-charcoal/50">{review.city}</p>
      )}
    </article>
  );
}
