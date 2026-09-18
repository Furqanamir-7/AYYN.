import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LoadingScreen from "@/components/LoadingScreen";
import PageTransition from "@/components/PageTransition";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

const siteUrl = "https://ayyn.store";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AYYN. — Pretty nails, delivered.",
    template: "%s · AYYN.",
  },
  description:
    "AYYN. is a Pakistan-based press-on nail brand. Reusable sets delivered nationwide. Shop on the website, pay via NayaPay or JazzCash, then send your screenshot on WhatsApp.",
  applicationName: "AYYN.",
  keywords: [
    "AYYN",
    "press on nails",
    "Pakistan nails",
    "ayyn.store",
    "nail charms",
  ],
  authors: [{ name: "AYYN." }],
  creator: "AYYN.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AYYN. — Pretty nails, delivered.",
    description:
      "Press-on nails & charms. Soft, feminine, premium — delivered across Pakistan.",
    url: siteUrl,
    siteName: "AYYN.",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: "/logo-original.png",
        width: 432,
        height: 432,
        alt: "AYYN.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AYYN. — Pretty nails, delivered.",
    description:
      "Press-on nails & charms. Soft, feminine, premium — delivered across Pakistan.",
    images: ["/logo-original.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  other: {
    "msapplication-TileColor": "#B99AB3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${sans.variable} font-sans antialiased bg-cream text-charcoal`}
      >
        <CartProvider>
          <LoadingScreen />
          <Navbar />
          <CartDrawer />
          <main className="min-h-[70vh]">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
