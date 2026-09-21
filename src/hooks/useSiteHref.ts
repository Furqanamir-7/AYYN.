"use client";

import { usePathname } from "next/navigation";
import { withTemplatePrefix } from "@/lib/template";

export function useSiteHref() {
  const pathname = usePathname();
  return (href: string) => withTemplatePrefix(href, pathname);
}
