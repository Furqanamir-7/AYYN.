export type ProductOption = {
  id: string;
  label: string;
  price: number;
  hint?: string;
};

export type Product = {
  slug: string;
  name: string;
  designNumber: number;
  price: number;
  category: "Press-Ons" | "Accessories";
  collectionId: string;
  description: string;
  image: string;
  /** Extra angles; `image` is always the cover / first slide. */
  images?: string[];
  badges?: string[];
  shapes?: string[];
  waCollection?: string | null;
  latest?: boolean;
  options?: ProductOption[];
};

export function productImages(product: Product) {
  return product.images?.length
    ? product.images
    : [product.image];
}

export type Collection = {
  id: string;
  name: string;
  emoji: string;
  vibe: string;
};

export const latestCollection: Collection = {
  id: "latest",
  name: "Latest designs",
  emoji: "✦",
  vibe: "Fresh drops — just added to the shop.",
};

export const collections: Collection[] = [
  {
    id: "soft-blush",
    name: "Soft Blush",
    emoji: "🌸",
    vibe: "Creamy nudes, peach & matcha — everyday pretty.",
  },
  {
    id: "cherry-crush",
    name: "Cherry Crush",
    emoji: "🍒",
    vibe: "Glossy reds, hearts & kiss-me cherry moments.",
  },
  {
    id: "coquette",
    name: "Coquette & Bows",
    emoji: "🎀",
    vibe: "Ribbons, pearls & love-letter soft girl energy.",
  },
  {
    id: "glaze-luxe",
    name: "Glaze & Luxe",
    emoji: "✨",
    vibe: "Caramel, champagne & golden glazed finishes.",
  },
  {
    id: "french",
    name: "French Tips",
    emoji: "💅",
    vibe: "Classic & peachy french tips with a soft AYYN. twist.",
  },
  {
    id: "accessories",
    name: "Accessories",
    emoji: "♡",
    vibe: "Pretty extras — keep your sets safe and cute.",
  },
];

export const products: Product[] = [
  {
    slug: "blush-ice",
    name: "Blush Ice",
    designNumber: 1,
    price: 600,
    category: "Press-Ons",
    collectionId: "soft-blush",
    description: "Cool blush glaze with a soft icy sheen.",
    image: "/products/blush-ice-2.jpg",
    images: ["/products/blush-ice-2.jpg", "/products/blush-ice.jpg"],
    badges: ["Reusable"],
    shapes: ["Almond", "Coffin", "Square"],
    waCollection: null,
  },
  {
    slug: "iced-latte",
    name: "Iced Latte",
    designNumber: 2,
    price: 600,
    category: "Press-Ons",
    collectionId: "soft-blush",
    description: "Warm latte nude with a milky gloss finish.",
    image: "/products/iced-latte.jpg",
    images: ["/products/iced-latte.jpg", "/products/iced-latte-2.jpg"],
    badges: ["Reusable"],
    shapes: ["Almond", "Coffin", "Square"],
    waCollection: null,
  },
  {
    slug: "matcha-blush",
    name: "Matcha Blush",
    designNumber: 3,
    price: 600,
    category: "Press-Ons",
    collectionId: "soft-blush",
    description: "Matcha-meets-blush chrome with tiny gems.",
    image: "/products/matcha-blush.jpg",
    badges: ["Reusable"],
    shapes: ["Almond", "Square"],
    waCollection: null,
  },
  {
    slug: "peach-blush",
    name: "Peach Blush",
    designNumber: 4,
    price: 600,
    category: "Press-Ons",
    collectionId: "soft-blush",
    description: "Peachy blush tips that flatter every skin tone.",
    image: "/products/peach-blush-2.jpg",
    images: ["/products/peach-blush-2.jpg", "/products/peach-blush.jpg"],
    badges: ["Reusable"],
    shapes: ["Almond", "Coffin", "Square"],
    waCollection: null,
  },
  {
    slug: "peach-pearl",
    name: "Peach Pearl",
    designNumber: 5,
    price: 700,
    category: "Press-Ons",
    collectionId: "soft-blush",
    description: "Peach ombré with tiny crystal clusters.",
    image: "/products/peach-pearl.jpg",
    badges: ["Reusable", "Pearl details"],
    shapes: ["Almond", "Coffin"],
    waCollection: null,
  },
  {
    slug: "cherry-gloss",
    name: "Cherry Gloss",
    designNumber: 6,
    price: 650,
    category: "Press-Ons",
    collectionId: "cherry-crush",
    description: "High-shine cherry gloss for a juicy finish.",
    image: "/products/cherry-gloss.jpg",
    badges: ["Reusable"],
    shapes: ["Almond", "Coffin", "Square"],
    waCollection: null,
  },
  {
    slug: "cherry-hearts",
    name: "Cherry Hearts",
    designNumber: 7,
    price: 600,
    category: "Press-Ons",
    collectionId: "cherry-crush",
    description: "Cherry tips with sweet heart accents.",
    image: "/products/cherry-hearts-2.jpg",
    images: ["/products/cherry-hearts-2.jpg", "/products/cherry-hearts.jpg"],
    badges: ["Reusable", "Charms"],
    shapes: ["Almond", "Coffin"],
    waCollection: null,
  },
  {
    slug: "cherry-kiss",
    name: "Cherry Kiss",
    designNumber: 8,
    price: 700,
    category: "Press-Ons",
    collectionId: "cherry-crush",
    description: "Romantic cherry set made for date nights.",
    image: "/products/cherry-kiss-2.jpg",
    images: ["/products/cherry-kiss-2.jpg", "/products/cherry-kiss.jpg"],
    badges: ["Reusable"],
    shapes: ["Almond", "Coffin"],
    waCollection: null,
  },
  {
    slug: "coquette-bow",
    name: "Coquette Bow",
    designNumber: 9,
    price: 750,
    category: "Press-Ons",
    collectionId: "coquette",
    description: "Soft coquette vibes with bow details.",
    image: "/products/coquette-bow-2.jpg",
    images: ["/products/coquette-bow-2.jpg", "/products/coquette-bow.jpg"],
    badges: ["Reusable", "Bows"],
    shapes: ["Almond", "Coffin"],
    waCollection: null,
  },
  {
    slug: "pearl-bow",
    name: "Pearl Bow",
    designNumber: 10,
    price: 600,
    category: "Press-Ons",
    collectionId: "coquette",
    description: "Pearl sheen with a dainty bow moment.",
    image: "/products/pearl-bow-2.jpg",
    images: ["/products/pearl-bow-2.jpg", "/products/pearl-bow.jpg"],
    badges: ["Reusable", "Bows"],
    shapes: ["Almond", "Square"],
    waCollection: null,
  },
  {
    slug: "ribbon-rose",
    name: "Ribbon Rose",
    designNumber: 11,
    price: 650,
    category: "Press-Ons",
    collectionId: "coquette",
    description: "Ribbon & rose soft-girl details.",
    image: "/products/ribbon-rose-2.jpg",
    images: ["/products/ribbon-rose-2.jpg", "/products/ribbon-rose.jpg"],
    badges: ["Reusable"],
    shapes: ["Almond", "Coffin"],
    waCollection: null,
  },
  {
    slug: "love-letter",
    name: "Love Letter",
    designNumber: 12,
    price: 700,
    category: "Press-Ons",
    collectionId: "coquette",
    description: "Romantic soft set with love-letter charm.",
    image: "/products/love-letter-2.jpg",
    images: ["/products/love-letter-2.jpg", "/products/love-letter.jpg"],
    badges: ["Reusable"],
    shapes: ["Almond", "Coffin"],
    waCollection: null,
  },
  {
    slug: "sugar-pearl",
    name: "Sugar Pearl",
    designNumber: 19,
    price: 850,
    category: "Press-Ons",
    collectionId: "coquette",
    description: "Nude french with gold filigree, pearls & tiny stones.",
    image: "/products/sugar-pearl.jpg",
    badges: ["Reusable", "Pearl details"],
    shapes: ["Almond", "Coffin"],
    waCollection: null,
  },
  {
    slug: "caramel-glaze",
    name: "Caramel Glaze",
    designNumber: 13,
    price: 650,
    category: "Press-Ons",
    collectionId: "glaze-luxe",
    description: "Warm caramel glazed shine.",
    image: "/products/caramel-glaze-2.jpg",
    images: ["/products/caramel-glaze-2.jpg", "/products/caramel-glaze.jpg"],
    badges: ["Reusable", "Glaze"],
    shapes: ["Almond", "Coffin", "Square"],
    waCollection: null,
  },
  {
    slug: "champagne-luxe",
    name: "Champagne Luxe",
    designNumber: 15,
    price: 800,
    category: "Press-Ons",
    collectionId: "glaze-luxe",
    description: "Champagne shimmer for events & nights out.",
    image: "/products/champagne-luxe-2.jpg",
    images: ["/products/champagne-luxe-2.jpg", "/products/champagne-luxe.jpg"],
    badges: ["Reusable", "Luxe"],
    shapes: ["Almond", "Coffin", "Stiletto"],
    waCollection: null,
  },
  {
    slug: "pink-champagne",
    name: "Pink Champagne",
    designNumber: 16,
    price: 800,
    category: "Press-Ons",
    collectionId: "glaze-luxe",
    description: "Pink champagne glow with soft sparkle.",
    image: "/products/pink-champagne-2.jpg",
    images: ["/products/pink-champagne-2.jpg", "/products/pink-champagne.jpg"],
    badges: ["Reusable", "Luxe"],
    shapes: ["Almond", "Coffin"],
    waCollection: null,
  },
  {
    slug: "gold-tips",
    name: "Gold Tips",
    designNumber: 20,
    price: 700,
    category: "Press-Ons",
    collectionId: "glaze-luxe",
    description: "Nude base with clean metallic gold french tips.",
    image: "/products/gold-tips.jpg",
    badges: ["Reusable", "Luxe"],
    shapes: ["Almond", "Coffin", "Square"],
    waCollection: null,
  },
  {
    slug: "golden-glaze",
    name: "Golden Glaze",
    designNumber: 21,
    price: 800,
    category: "Press-Ons",
    collectionId: "glaze-luxe",
    description: "Soft nude with wavy gold chrome and abstract swirls.",
    image: "/products/golden-haze.jpg",
    badges: ["Reusable", "Glaze"],
    shapes: ["Almond", "Coffin"],
    waCollection: null,
  },
  {
    slug: "purple-pop",
    name: "Purple Pop",
    designNumber: 22,
    price: 800,
    category: "Press-Ons",
    collectionId: "glaze-luxe",
    description: "Lavender cat-eye with gold tips and butterfly wings.",
    image: "/products/purple-pop.jpg",
    badges: ["Reusable", "Luxe"],
    shapes: ["Almond", "Coffin"],
    waCollection: null,
  },
  {
    slug: "flutter",
    name: "Flutter",
    designNumber: 23,
    price: 800,
    category: "Press-Ons",
    collectionId: "glaze-luxe",
    description: "Butterfly wings, copper glitter and 3D mauve swirls.",
    image: "/products/flutter.jpg",
    badges: ["Reusable", "Luxe"],
    shapes: ["Almond", "Coffin"],
    waCollection: null,
  },
  {
    slug: "pretty-french",
    name: "Pretty French",
    designNumber: 18,
    price: 600,
    category: "Press-Ons",
    collectionId: "french",
    description: "Clean pretty french — classic and soft.",
    image: "/products/pretty-french-2.jpg",
    images: ["/products/pretty-french-2.jpg", "/products/pretty-french.jpg"],
    badges: ["Reusable"],
    shapes: ["Almond", "Square", "Coffin"],
    waCollection: null,
  },
  {
    slug: "peachy-french-glaze",
    name: "Peachy French Glaze",
    designNumber: 17,
    price: 700,
    category: "Press-Ons",
    collectionId: "french",
    description: "Peachy french tips with a glazed shine.",
    image: "/products/peachy-french-glaze-2.jpg",
    images: [
      "/products/peachy-french-glaze-2.jpg",
      "/products/peachy-french-glaze.jpg",
    ],
    badges: ["Reusable", "Glaze"],
    shapes: ["Almond", "Square"],
    waCollection: null,
  },
  {
    slug: "blossom",
    name: "Blossom",
    designNumber: 24,
    price: 750,
    category: "Press-Ons",
    collectionId: "french",
    description: "Scalloped white french with tiny pink rosebuds.",
    image: "/products/blossom.jpg",
    badges: ["Reusable"],
    shapes: ["Almond", "Coffin"],
    waCollection: null,
  },
  {
    slug: "french-shine",
    name: "French Shine",
    designNumber: 25,
    price: 750,
    category: "Press-Ons",
    collectionId: "french",
    description: "Shimmer nude cat-eye with a crisp white french tip.",
    image: "/products/french-shine.jpg",
    badges: ["Reusable", "Glaze"],
    shapes: ["Almond", "Square"],
    waCollection: null,
  },
  {
    slug: "hyper-realistic-frenchies",
    name: "Hyper Realistic Frenchies",
    designNumber: 26,
    price: 650,
    category: "Press-Ons",
    collectionId: "french",
    description: "Soft nude-to-white ombré french tips with a natural, realistic finish.",
    image: "/products/hyper-realistic-frenchies.jpg",
    images: [
      "/products/hyper-realistic-frenchies.jpg",
      "/products/hyper-realistic-frenchies-2.jpg",
    ],
    badges: ["Reusable"],
    shapes: ["Almond", "Square"],
    waCollection: null,
  },
  {
    slug: "berry-kiss",
    name: "Berry Kiss",
    designNumber: 27,
    price: 900,
    category: "Press-Ons",
    collectionId: "cherry-crush",
    description: "Nude french with strawberries, pearls, hearts and pink stripes.",
    image: "/products/berry-kiss-2.jpg",
    images: ["/products/berry-kiss-2.jpg", "/products/berry-kiss.jpg"],
    badges: ["Reusable", "Charms"],
    shapes: ["Almond", "Coffin"],
    waCollection: null,
    latest: true,
  },
  {
    slug: "french-creme",
    name: "French Creme",
    designNumber: 28,
    price: 750,
    category: "Press-Ons",
    collectionId: "french",
    description: "Soft nude square french with a creamy white tip.",
    image: "/products/french-creme-2.jpg",
    images: ["/products/french-creme-2.jpg", "/products/french-creme.jpg"],
    badges: ["Reusable"],
    shapes: ["Square", "Almond"],
    waCollection: null,
    latest: true,
  },
  {
    slug: "honey-glaze",
    name: "Honey Glaze",
    designNumber: 29,
    price: 750,
    category: "Press-Ons",
    collectionId: "glaze-luxe",
    description: "Milky honey ombré glaze with a pearly shine.",
    image: "/products/honey-glaze.jpg",
    images: ["/products/honey-glaze.jpg", "/products/honey-glaze-2.jpg"],
    badges: ["Reusable", "Glaze"],
    shapes: ["Almond", "Coffin"],
    waCollection: null,
    latest: true,
  },
  {
    slug: "pastel-haze",
    name: "Pastel Haze",
    designNumber: 30,
    price: 800,
    category: "Press-Ons",
    collectionId: "french",
    description: "Nude chrome french with lilac and butter-yellow tips.",
    image: "/products/pastel-haze-2.jpg",
    images: ["/products/pastel-haze-2.jpg", "/products/pastel-haze.jpg"],
    badges: ["Reusable", "Glaze"],
    shapes: ["Almond", "Coffin"],
    waCollection: null,
    latest: true,
  },
  {
    slug: "acrylic-nail-case",
    name: "Acrylic Nail Case",
    designNumber: 0,
    price: 1200,
    category: "Accessories",
    collectionId: "accessories",
    description:
      "Clear acrylic case to keep your sets safe. PKR 1,200 without nails, or PKR 2,800 with any 2 nail sets inside.",
    image: "/products/acrylic-nail-case.jpg",
    images: [
      "/products/acrylic-nail-case.jpg",
      "/products/acrylic-nail-case-2.jpg",
      "/products/acrylic-nail-case-3.jpg",
      "/products/acrylic-nail-case-4.jpg",
      "/products/acrylic-nail-case-5.jpg",
      "/products/acrylic-nail-case-6.jpg",
      "/products/acrylic-nail-case-7.jpg",
      "/products/acrylic-nail-case-8.jpg",
      "/products/acrylic-nail-case-9.jpg",
    ],
    badges: ["Accessory"],
    waCollection: null,
    options: [
      {
        id: "case",
        label: "Case only",
        price: 1200,
        hint: "Without nails",
      },
      {
        id: "bundle",
        label: "Case + 2 sets",
        price: 2800,
        hint: "Pick any two designs",
      },
    ],
  },
];

export function formatPKR(amount: number) {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(product: Product, limit = 4) {
  const same = products.filter(
    (p) => p.slug !== product.slug && p.collectionId === product.collectionId
  );
  if (same.length >= limit) return same.slice(0, limit);
  const extras = products.filter(
    (p) => p.slug !== product.slug && p.collectionId !== product.collectionId
  );
  return [...same, ...extras].slice(0, limit);
}

export function getCollection(id: string) {
  return collections.find((c) => c.id === id);
}

export function productsByCollection(collectionId: string) {
  if (collectionId === "latest") {
    return products.filter((p) => p.latest);
  }
  return products.filter((p) => p.collectionId === collectionId);
}

export function latestProducts() {
  return products.filter((p) => p.latest);
}

export function isAccessory(product: Product) {
  return product.category === "Accessories";
}

export function pressOnProducts() {
  return products.filter((p) => p.category === "Press-Ons");
}

export function productDisplayPrice(product: Product) {
  if (product.options?.length) {
    return Math.min(...product.options.map((o) => o.price));
  }
  return product.price;
}

export function designBadgeLabel(product: Product) {
  if (product.category === "Accessories") return "Accessory";
  return product.waCollection
    ? `${product.waCollection} #${product.designNumber}`
    : `Design #${product.designNumber}`;
}
