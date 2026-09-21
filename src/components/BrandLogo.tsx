"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isTemplatePath } from "@/lib/template";

type BrandLogoProps = {
  variant?: "wordmark" | "monogram";
  className?: string;
  priority?: boolean;
  href?: string | null;
  size?: number;
};

const TEMPLATE_SRC = {
  wordmark: "/logo-template-wordmark-light.png",
  monogram: "/logo-template-emblem.png",
} as const;

const LIVE_SRC = {
  wordmark: "/logo-nav.png",
  monogram: "/logo-monogram-tight.png",
} as const;

export default function BrandLogo({
  variant = "wordmark",
  className = "",
  priority = false,
  href = "/",
  size,
}: BrandLogoProps) {
  const template = isTemplatePath(usePathname());
  const src = (template ? TEMPLATE_SRC : LIVE_SRC)[variant];
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
