import { pressOnProducts } from "@/data/products";
import { reviews, reviewSummary } from "@/data/reviews";
import { BRAND } from "@/lib/constants";

const SITE = "https://ayyn.store";

export default function JsonLd() {
  const productSchemas = pressOnProducts().slice(0, 8).map((p) => ({
    "@type": "Product",
    name: `${p.name} (Design #${p.designNumber})`,
    description: p.description,
    image: `${SITE}${p.image}`,
    brand: { "@type": "Brand", name: "AYYN." },
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: p.price,
      availability: "https://schema.org/InStock",
      url: `${SITE}/products/${p.slug}`,
    },
  }));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: BRAND.name,
        url: SITE,
        logo: `${SITE}/logo.png`,
        image: `${SITE}/logo-original.png`,
        sameAs: [BRAND.instagram],
      },
      {
        "@type": "WebSite",
        name: BRAND.name,
        url: SITE,
        description: BRAND.tagline,
      },
      {
        "@type": "AggregateRating",
        ratingValue: reviewSummary.average,
        reviewCount: 200,
        itemReviewed: { "@type": "Brand", name: "AYYN." },
      },
      ...reviews.slice(0, 3).map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.name },
        reviewBody: r.text,
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
        },
      })),
      ...productSchemas,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
