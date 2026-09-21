"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { useCart } from "@/context/CartContext";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { TEMPLATE_ROOT, isTemplateHome, isTemplatePath } from "@/lib/template";

function CuteMenuIcon({ open }: { open?: boolean }) {
  if (open) return null;
  return (
    <svg viewBox="0 0 40 40" className="h-7 w-7" aria-hidden>
      <path
        d="M20 9c-1.2 0-3.5-2.8-6-3.5C10.5 4.7 8 6.8 8.8 9c.6 1.8 3.2 2.4 5.5 1.8 1.5-.4 3.5-1.2 5.7-1.8Z"
        className="fill-mauve"
        opacity="0.9"
      />
      <path
        d="M20 9c1.2 0 3.5-2.8 6-3.5C29.5 4.7 32 6.8 31.2 9c-.6 1.8-3.2 2.4-5.5 1.8-1.5-.4-3.5-1.2-5.7-1.8Z"
        className="fill-mauve-dark"
        opacity="0.85"
      />
      <circle cx="20" cy="9" r="2" className="fill-blush" />
      <circle cx="20" cy="9" r="1" className="fill-mauve" />
      <rect x="10" y="17" width="20" height="2.6" rx="1.3" className="fill-mauve-dark" />
      <rect x="12" y="23" width="16" height="2.6" rx="1.3" className="fill-mauve" />
      <rect x="14" y="29" width="12" height="2.6" rx="1.3" className="fill-mauve-dark" />
    </svg>
  );
}

function BagButton({
  count,
  bump,
  onClick,
  label = true,
}: {
  count: number;
  bump: number;
  onClick: () => void;
  label?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
      className={`relative inline-flex items-center justify-center rounded-full bg-mauve text-cream shadow-sm transition hover:bg-mauve-dark active:scale-95 ${
        label ? "gap-1.5 px-3 py-2 sm:px-4" : "h-10 w-10"
      }`}
    >
      <motion.span
        key={bump}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.35 }}
        className="inline-flex"
      >
        <ShoppingBag className="h-4 w-4" />
      </motion.span>
      {label && (
        <span className="text-[11px] font-medium tracking-wide sm:text-sm">Bag</span>
      )}
      {count > 0 && (
        <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-cream px-1 text-[9px] font-semibold text-mauve-dark ring-1 ring-mauve/30">
          {count}
        </span>
      )}
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, bump, setOpen: setBagOpen } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isTemplateHome(pathname) && pathname !== "/") {
      setActive("");
      return;
    }
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function go(href: string) {
    setOpen(false);
    const onHome = pathname === "/" || isTemplateHome(pathname);
    if (!onHome) {
      router.push(
        isTemplatePath(pathname) ? `${TEMPLATE_ROOT}${href}` : `/${href}`
      );
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-mauve/20 transition-all duration-300 ${
          scrolled ? "bg-blush/95 backdrop-blur-md shadow-soft" : "bg-blush"
        }`}
      >
        <div className="mx-auto grid h-14 max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-2 px-3 sm:px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cream/80 shadow-sm ring-1 ring-mauve/25 transition active:scale-95"
            aria-label="Open menu"
          >
            <CuteMenuIcon />
          </button>

          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("#home");
            }}
            className="flex justify-center"
          >
            <BrandLogo
              size={200}
              priority
              href={null}
              className="h-8 w-auto max-w-[150px] object-contain"
            />
          </a>

          <BagButton count={count} bump={bump} onClick={() => setBagOpen(true)} label={false} />
        </div>

        <div className="mx-auto hidden h-14 max-w-6xl items-center gap-3 px-6 lg:flex">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("#home");
            }}
            className="shrink-0"
          >
            <BrandLogo
              size={220}
              priority
              href={null}
              className="h-10 w-auto max-w-[180px] object-contain object-left"
            />
          </a>

          <nav className="ml-2 flex flex-1 items-center justify-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                className={`rounded-full px-2.5 py-1.5 text-sm tracking-wide transition ${
                  active === link.href
                    ? "bg-cream/80 font-medium text-mauve-dark"
                    : "text-charcoal/75 hover:bg-cream/50 hover:text-mauve-dark"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <BagButton count={count} bump={bump} onClick={() => setBagOpen(true)} />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-[60] bg-charcoal/30 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 z-[70] flex h-full w-[min(86vw,340px)] flex-col bg-cream shadow-soft lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              <div className="flex items-center justify-between border-b border-blush px-4 py-3.5">
                <BrandLogo
                  size={120}
                  href={null}
                  className="h-8 w-auto max-w-[130px]"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blush/70 text-mauve-dark"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(link.href);
                      }}
                      className={`block rounded-2xl px-4 py-3 font-display text-xl tracking-[0.1em] transition ${
                        active === link.href
                          ? "bg-blush text-mauve-dark"
                          : "text-charcoal hover:bg-blush/70"
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </nav>

              <div className="border-t border-blush px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <p className="font-display text-base tracking-widest text-mauve-dark">
                  {BRAND.name}
                </p>
                <p className="mt-0.5 text-xs text-charcoal/70">{BRAND.tagline}</p>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setBagOpen(true);
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-mauve py-2.5 text-sm font-medium text-cream hover:bg-mauve-dark"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Open bag{count > 0 ? ` · ${count}` : ""}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
