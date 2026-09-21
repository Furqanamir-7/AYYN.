"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { TEMPLATE_LOGIN, isTemplatePath } from "@/lib/template";

export default function TemplateTheme() {
  const pathname = usePathname();
  const active = isTemplatePath(pathname);

  useEffect(() => {
    document.documentElement.classList.toggle("theme-maroon", active);
    return () => document.documentElement.classList.remove("theme-maroon");
  }, [active]);

  if (!active || pathname === TEMPLATE_LOGIN) return null;

  return (
    <div className="bg-mauve px-3 py-1.5 text-center text-[10px] font-medium tracking-wide text-cream sm:text-[11px]">
      Private maroon template · the live site is unchanged
    </div>
  );
}
