"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import BrandLogo from "./BrandLogo";
import { isTemplatePath } from "@/lib/template";

export default function HeroIdentity() {
  const template = isTemplatePath(usePathname());

  if (!template) {
    return (
      <>
        <BrandLogo
          variant="monogram"
          size={200}
          priority
          href={null}
          className="h-20 w-auto animate-float sm:h-28 md:h-36"
        />
        <h1 className="mt-1 font-display text-4xl tracking-[0.22em] text-mauve-dark sm:mt-2 sm:text-5xl sm:tracking-[0.28em] md:text-6xl lg:text-7xl">
          AYYN<span className="text-mauve">.</span>
        </h1>
      </>
    );
  }

  return (
    <>
      <Image
        src="/logo-template-emblem.png"
        alt=""
        width={710}
        height={590}
        priority
        className="h-[5.5rem] w-auto animate-float object-contain sm:h-28 md:h-36"
      />
      <h1 className="sr-only">AYYN.</h1>
      <Image
        src="/logo-template-wordmark.png"
        alt="AYYN."
        width={843}
        height={322}
        priority
        className="mt-4 h-10 w-auto object-contain sm:mt-5 sm:h-12 md:h-14"
      />
    </>
  );
}
