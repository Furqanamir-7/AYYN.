export type ReviewShot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const reviewShots: ReviewShot[] = [
  {
    src: "/reviews/01-loved-on-me.jpg",
    alt: "Client showing wine-red AYYN. nails: I really love how these look on me",
    width: 1100,
    height: 1340,
  },
  {
    src: "/reviews/02-absolutely-loved.jpg",
    alt: "WhatsApp review: absolutely loved them, looks so natural, ordering again soon",
    width: 1100,
    height: 737,
  },
  {
    src: "/reviews/03-best-nails-story.jpg",
    alt: "Instagram story: Best nails @ayyn.pk",
    width: 1100,
    height: 2136,
  },
  {
    src: "/reviews/04-best-nails-ever.jpg",
    alt: "Client photos of gold-line french tips: The best nails I've ever had",
    width: 1058,
    height: 1244,
  },
  {
    src: "/reviews/05-very-nice-yar.jpg",
    alt: "Packaged AYYN. sets with review: Verry nice yar i love it",
    width: 710,
    height: 936,
  },
  {
    src: "/reviews/06-so-pretty-packaging.jpg",
    alt: "Unboxing review: so pretty, packaging is cute, waqai bohatt achy hain",
    width: 1100,
    height: 1737,
  },
  {
    src: "/reviews/07-quality-worth-it.jpg",
    alt: "WhatsApp reviews: quality worth it, handmade comparison, perfect first purchase",
    width: 1100,
    height: 711,
  },
  {
    src: "/reviews/08-order-again.jpg",
    alt: "White french tips photos: Love the nails definitely gonna order again",
    width: 1007,
    height: 1945,
  },
  {
    src: "/reviews/09-quality-10-10.jpg",
    alt: "Henna and french tips: loved the nails, quality 10/10",
    width: 1100,
    height: 1165,
  },
  {
    src: "/reviews/10-clean-girl.jpg",
    alt: "WhatsApp review: so good quality, very clean girl type",
    width: 1100,
    height: 1336,
  },
  {
    src: "/reviews/11-french-tips-wear.jpg",
    alt: "Client wearing white french-tip AYYN. nails",
    width: 1100,
    height: 1962,
  },
  {
    src: "/reviews/12-totally-perfect.jpg",
    alt: "Unboxing video review: Totally perfect in love with these",
    width: 1100,
    height: 1249,
  },
  {
    src: "/reviews/13-second-purchase.jpg",
    alt: "Second purchase review: chrome french nails, so many compliments",
    width: 931,
    height: 887,
  },
];

/** Real lines from client screenshots — used only for structured data. */
export const reviewQuotes = [
  {
    text: "I really love how these look on me! They complement my hands so well, I'll definitely order them again.",
    rating: 5,
  },
  {
    text: "I absolutely loved them! They look so natural and the quality is genuinely top notch. Definitely ordering again soon!",
    rating: 5,
  },
  {
    text: "The best nails I've ever had. Loved it!",
    rating: 5,
  },
];

export const reviewSummary = {
  average: 4.9,
  countLabel: "200+",
  reviewCount: 200,
};
