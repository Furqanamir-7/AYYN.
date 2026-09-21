"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useSiteHref } from "@/hooks/useSiteHref";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentProps<"a">, "href">;

export default function SiteLink({
  href,
  className,
  children,
  ...rest
}: Props) {
  const to = useSiteHref()(href);
  const external =
    to.startsWith("http://") ||
    to.startsWith("https://") ||
    to.startsWith("mailto:") ||
    to.startsWith("tel:");

  if (external || to.startsWith("#")) {
    return (
      <a href={to} className={className} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={to} className={className} {...rest}>
      {children}
    </Link>
  );
}
