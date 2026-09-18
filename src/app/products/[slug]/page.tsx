import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  products,
  getProductBySlug,
  relatedProducts,
  formatPKR,
  productDisplayPrice,
  productImages,
} from "@/data/products";
import ProductDetail from "@/components/ProductDetail";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Not found" };

  const price = formatPKR(productDisplayPrice(product));
  const title = product.name;
  const description = `${product.description} ${price}. Shop ${product.name} from AYYN. — press-on nails delivered across Pakistan.`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} · AYYN.`,
      description,
      url: `/products/${product.slug}`,
      type: "website",
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default function ProductPage({ params }: { params: Params }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = relatedProducts(product);
  const images = productImages(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: images.map((src) => `https://ayyn.store${src}`),
    brand: { "@type": "Brand", name: "AYYN." },
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: productDisplayPrice(product),
      availability: "https://schema.org/InStock",
      url: `https://ayyn.store/products/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} related={related} />
    </>
  );
}
