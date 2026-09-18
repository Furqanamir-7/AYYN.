"use client";

import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  variant?: "wordmark" | "monogram";
  className?: string;
  priority?: boolean;
  href?: string | null;
  size?: number;
};

export default function BrandLogo({
  variant = "wordmark",
  className = "",
  priority = false,
  href = "/",
  size,
}: BrandLogoProps) {
  const src =
    variant === "monogram" ? "/logo-monogram-tight.png" : "/logo-nav.png";
  const defaultSize = variant === "monogram" ? 120 : 140;
  const s = size ?? defaultSize;

  const img = (
    <Image
      src={src}
      alt="AYYN."
      width={s}
      height={s}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );

  if (href === null) return img;
  if (href.startsWith("#")) {
    return (
      <a href={href} className="inline-flex items-center" aria-label="AYYN. home">
        {img}
      </a>
    );
  }
  return (
    <Link href={href} className="inline-flex items-center" aria-label="AYYN. home">
      {img}
    </Link>
  );
}
