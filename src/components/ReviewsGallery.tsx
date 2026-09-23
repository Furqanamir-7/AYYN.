"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { reviewShots, type ReviewShot } from "@/data/reviews";
import { WA } from "@/lib/constants";

const COLUMNS: ReviewShot[][] = [
  [reviewShots[0], reviewShots[6], reviewShots[10], reviewShots[4]],
  [reviewShots[1], reviewShots[5], reviewShots[12], reviewShots[8]],
  [reviewShots[2], reviewShots[9], reviewShots[7]],
  [reviewShots[3], reviewShots[11], reviewShots[8], reviewShots[1]],
];

const DURATIONS = ["38s", "46s", "34s", "42s"];
const TILTS = [-1.1, 0.8, -0.5, 1, 0.35, -0.9, 0.6, -0.3];

function ReviewTile({
  shot,
  tilt,
  onOpen,
}: {
  shot: ReviewShot;
  tilt: number;
  onOpen: () => void;
}) {
  return (
    <figure style={{ transform: `rotate(${tilt}deg)` }}>
      <button
        type="button"
        onClick={onOpen}
        className="block w-full overflow-hidden rounded-xl bg-blush/40 shadow-[0_8px_22px_rgba(80,50,70,0.12)] ring-1 ring-mauve/15 transition duration-300 hover:scale-[1.03] hover:shadow-[0_12px_28px_rgba(80,50,70,0.18)] sm:rounded-2xl"
        aria-label={`Open review: ${shot.alt}`}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes="(min-width: 1024px) 16vw, 42vw"
          className="h-auto w-full"
        />
      </button>
    </figure>
  );
}

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

      <div
        className="relative mt-8 h-[28rem] overflow-hidden sm:mt-10 sm:h-[32rem] lg:h-[36rem] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_7%,black_93%,transparent)] [mask-image:linear-gradient(to_bottom,transparent,black_7%,black_93%,transparent)]"
      >
        <div className="mx-auto grid h-full max-w-[58rem] grid-cols-2 gap-2.5 px-1 sm:gap-3 lg:grid-cols-4 lg:gap-4">
          {COLUMNS.map((col, ci) => (
            <div key={ci} className="relative overflow-hidden">
              <div
                className={`flex flex-col ${
                  ci % 2 === 0 ? "ayyn-marquee-up" : "ayyn-marquee-down"
                }`}
                style={
                  {
                    "--marquee-duration": DURATIONS[ci],
                  } as CSSProperties
                }
              >
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    className="flex flex-col gap-2.5 pb-2.5 sm:gap-3 sm:pb-3"
                    aria-hidden={copy === 1}
                  >
                    {col.map((shot, i) => (
                      <ReviewTile
                        key={`${copy}-${shot.src}-${i}`}
                        shot={shot}
                        tilt={TILTS[(ci + i) % TILTS.length]}
                        onOpen={() =>
                          setOpen(
                            reviewShots.findIndex((s) => s.src === shot.src)
                          )
                        }
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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
