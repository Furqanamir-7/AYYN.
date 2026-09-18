"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  initialIndex?: number;
  onOpenZoom?: (index: number) => void;
  onIndexChange?: (index: number) => void;
  showArrows?: boolean;
  arrowsAlwaysVisible?: boolean;
};

export default function ProductGallery({
  images,
  alt,
  sizes,
  priority = false,
  className = "",
  imageClassName = "object-cover object-center",
  initialIndex = 0,
  onOpenZoom,
  onIndexChange,
  showArrows = true,
  arrowsAlwaysVisible = false,
}: Props) {
  const [index, setIndex] = useState(initialIndex);
  const startX = useRef<number | null>(null);
  const lastX = useRef(0);
  const dragging = useRef(false);
  const multi = images.length > 1;

  const go = useCallback(
    (next: number) => {
      const n = images.length;
      const i = ((next % n) + n) % n;
      setIndex(i);
      onIndexChange?.(i);
    },
    [images.length, onIndexChange]
  );

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    startX.current = e.clientX;
    lastX.current = e.clientX;
    dragging.current = false;
    if (multi) (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (startX.current == null) return;
    lastX.current = e.clientX;
    if (Math.abs(e.clientX - startX.current) > 8) dragging.current = true;
  }

  function onPointerUp() {
    const start = startX.current;
    startX.current = null;
    if (start == null) return;
    const dx = lastX.current - start;
    if (multi && Math.abs(dx) > 40) {
      go(index + (dx < 0 ? 1 : -1));
      return;
    }
    if (!dragging.current) onOpenZoom?.(index);
  }

  return (
    <div
      className={`relative h-full w-full touch-pan-y overflow-hidden ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        startX.current = null;
      }}
    >
      <div
        className="flex h-full w-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={src} className="relative h-full min-w-full shrink-0 basis-full">
            <Image
              src={src}
              alt={i === 0 ? alt : `${alt} — photo ${i + 1}`}
              fill
              sizes={sizes}
              priority={priority && i === 0}
              className={`pointer-events-none select-none object-cover object-center ${imageClassName}`}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {multi && (
        <>
          {showArrows && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                className={`absolute left-1.5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-mauve-dark shadow-sm transition hover:bg-cream sm:flex ${
                  arrowsAlwaysVisible
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  go(index - 1);
                }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                className={`absolute right-1.5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-mauve-dark shadow-sm transition hover:bg-cream sm:flex ${
                  arrowsAlwaysVisible
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  go(index + 1);
                }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-2 z-10 flex justify-center gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition ${
                  i === index ? "w-3.5 bg-cream" : "w-1.5 bg-cream/55"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
