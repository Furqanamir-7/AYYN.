"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { reviewShots } from "@/data/reviews";
import { WA } from "@/lib/constants";

const TILTS = [
  -1.15, 0.85, 0.35, -0.7, 1.05, -0.4, 0.75, -1, 0.2, 0.9, -0.85, 0.55, -0.3,
];

export default function ReviewsGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") {
        setOpen((i) => (i === null ? i : (i + 1) % reviewShots.length));
      }
      if (e.key === "ArrowLeft") {
        setOpen((i) =>
          i === null ? i : (i - 1 + reviewShots.length) % reviewShots.length
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = open !== null ? reviewShots[open] : null;

  return (
    <>
      <header className="text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-mauve-dark sm:text-xs">
          Reviews
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-wide text-mauve-dark sm:mt-3 sm:text-5xl md:text-[3.35rem]">
          Loved by Our Clients
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-charcoal/65 sm:mt-3 sm:text-base">
          Real reviews from clients who trusted us with their nails.
        </p>
      </header>

      <div className="mt-8 columns-1 gap-3 sm:mt-10 sm:columns-2 sm:gap-4 lg:columns-3 lg:gap-5">
        {reviewShots.map((shot, i) => (
          <figure
            key={shot.src}
            className="mb-3 break-inside-avoid max-sm:!rotate-0 sm:mb-4 lg:mb-5"
            style={{
              transform: `rotate(${TILTS[i] ?? 0}deg)`,
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="block w-full overflow-hidden rounded-2xl bg-blush/40 shadow-[0_10px_28px_rgba(80,50,70,0.12)] ring-1 ring-mauve/15 transition duration-300 hover:scale-[1.015] hover:shadow-[0_16px_40px_rgba(80,50,70,0.18)] sm:rounded-[1.35rem]"
              aria-label={`Open review: ${shot.alt}`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                className="h-auto w-full"
              />
            </button>
          </figure>
        ))}
      </div>

      <div className="mt-8 text-center sm:mt-10">
        <a
          href={WA.review}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full bg-mauve px-6 py-2.5 text-sm font-medium text-cream hover:bg-mauve-dark sm:px-7 sm:py-3"
        >
          Leave a review on WhatsApp
        </a>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {active && open !== null && (
              <motion.div
                className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  aria-label="Close review"
                  className="absolute inset-0 bg-charcoal/55 backdrop-blur-[4px]"
                  onClick={() => setOpen(null)}
                />
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={active.alt}
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 10 }}
                  transition={{ type: "spring", damping: 26, stiffness: 300 }}
                  className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl bg-cream shadow-2xl ring-1 ring-mauve/20 sm:max-w-xl sm:rounded-3xl"
                >
                  <Image
                    src={active.src}
                    alt={active.alt}
                    width={active.width}
                    height={active.height}
                    className="h-auto max-h-[90vh] w-full object-contain"
                    sizes="(min-width: 640px) 36rem, 92vw"
                    priority
                  />
                  <button
                    type="button"
                    onClick={() => setOpen(null)}
                    className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-mauve-dark shadow-sm ring-1 ring-mauve/20 backdrop-blur hover:bg-mauve hover:text-cream"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setOpen(
                        (open - 1 + reviewShots.length) % reviewShots.length
                      )
                    }
                    className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-mauve-dark shadow-sm ring-1 ring-mauve/20 sm:inline-flex"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen((open + 1) % reviewShots.length)}
                    className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-mauve-dark shadow-sm ring-1 ring-mauve/20 sm:inline-flex"
                    aria-label="Next review"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
