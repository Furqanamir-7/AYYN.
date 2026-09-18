export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  city?: string;
};

export const reviews: Review[] = [
  {
    id: "1",
    name: "Ayesha K.",
    rating: 5,
    text: "Obsessed with Blush Ballet — they look salon-done and lasted through a whole wedding week. Packaging was so pretty too!",
    city: "Lahore",
  },
  {
    id: "2",
    name: "Hira R.",
    rating: 5,
    text: "AYYN. nails are soft, feminine, and actually reusable. Ordered Mauve Dreams twice already.",
    city: "Karachi",
  },
  {
    id: "3",
    name: "Fatima S.",
    rating: 5,
    text: "Advance payment was easy via JazzCash and delivery to Islamabad was quicker than expected. Love the quality.",
    city: "Islamabad",
  },
  {
    id: "4",
    name: "Mehwish A.",
    rating: 5,
    text: "Ordering was so smooth. They matched my dress colour perfectly 💅",
    city: "Multan",
  },
  {
    id: "5",
    name: "Noor B.",
    rating: 4,
    text: "Pearl Petal is dreamy. Sizing tip: measure carefully — once fitted, they stay put!",
    city: "Faisalabad",
  },
  {
    id: "6",
    name: "Sara M.",
    rating: 5,
    text: "Finally a PK brand that feels premium. Soft chrome under sunlight is everything.",
    city: "Rawalpindi",
  },
];

export const reviewSummary = {
  average: 4.9,
  countLabel: "200+",
};
