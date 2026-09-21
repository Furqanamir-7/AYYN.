import type { Metadata } from "next";
import ProductPage, {
  generateMetadata as productMetadata,
  generateStaticParams,
} from "../../../../products/[slug]/page";

export { generateStaticParams };

export function generateMetadata(props: {
  params: { slug: string };
}): Metadata {
  const meta = productMetadata(props);
  return {
    ...meta,
    robots: { index: false, follow: false },
  };
}

export default ProductPage;
