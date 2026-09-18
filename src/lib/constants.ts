export const BRAND = {
  name: "AYYN.",
  tagline: "Pretty nails, delivered.",
  priceFrom: "Sets starting PKR 600",
  delivery: "Delivered in 3–5 days nationwide",
  instagram: "https://www.instagram.com/ayyn.pk/",
  instagramHandle: "@ayyn.pk",
  whatsapp: "923237754992",
  whatsappDisplay: "+92 323 7754992",
  email: "hello@ayyn.pk",
  payment: {
    account: "03237754992",
    accountDisplay: "0323 7754992",
    accountHolder: "Ayesha Ahsan",
    methods: ["NayaPay", "JazzCash"] as const,
  },
} as const;

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#collections", label: "Collections" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const WA = {
  generic: whatsappLink(
    "Hi AYYN.! I'd like to know more about your nails 💅"
  ),
  review: whatsappLink(
    "Hi AYYN.! I'd love to leave a review for my order 💅"
  ),
} as const;
