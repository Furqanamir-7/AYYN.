import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AYYN. template",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
