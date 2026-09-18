import type { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your AYYN. order on the website. Pay via NayaPay or JazzCash to Ayesha Ahsan, then send your screenshot on WhatsApp to confirm.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
