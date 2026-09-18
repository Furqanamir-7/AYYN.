/** Soft decorative bows, hearts & sparkles for the hero */
export default function HeroDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* soft blush washes */}
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-mauve/10 blur-3xl" />
      <div className="absolute -right-16 top-24 h-72 w-72 rounded-full bg-blush/80 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-mauve/10 blur-3xl" />

      {/* floating bows */}
      <Bow className="absolute left-[6%] top-[18%] h-10 w-10 rotate-[-18deg] opacity-50 sm:h-14 sm:w-14 sm:opacity-70" />
      <Bow className="absolute right-[8%] top-[22%] h-12 w-12 rotate-[14deg] opacity-55 sm:h-16 sm:w-16 sm:opacity-75" />
      <Bow className="absolute left-[12%] bottom-[22%] h-9 w-9 rotate-[22deg] opacity-40 sm:h-12 sm:w-12" />
      <Bow className="absolute right-[14%] bottom-[18%] h-11 w-11 rotate-[-12deg] opacity-45 sm:h-14 sm:w-14" />

      {/* hearts */}
      <Heart className="absolute left-[22%] top-[12%] h-5 w-5 opacity-40 sm:h-6 sm:w-6" />
      <Heart className="absolute right-[24%] top-[14%] h-4 w-4 opacity-35 sm:h-5 sm:w-5" />
      <Heart className="absolute left-[18%] top-[55%] h-4 w-4 opacity-30" />
      <Heart className="absolute right-[20%] top-[58%] h-5 w-5 opacity-35" />

      {/* sparkles */}
      <Sparkle className="absolute left-[30%] top-[28%] h-3 w-3 opacity-50" />
      <Sparkle className="absolute right-[28%] top-[32%] h-3.5 w-3.5 opacity-45" />
      <Sparkle className="absolute left-[8%] top-[40%] h-2.5 w-2.5 opacity-40" />
      <Sparkle className="absolute right-[10%] top-[48%] h-3 w-3 opacity-40" />
      <Sparkle className="absolute left-[40%] bottom-[12%] h-3 w-3 opacity-35" />
      <Sparkle className="absolute right-[38%] bottom-[14%] h-2.5 w-2.5 opacity-40" />

      {/* tiny pearl dots */}
      <span className="absolute left-[15%] top-[70%] h-2 w-2 rounded-full bg-mauve/30" />
      <span className="absolute right-[16%] top-[68%] h-2.5 w-2.5 rounded-full bg-mauve/25" />
      <span className="absolute left-[45%] top-[16%] h-1.5 w-1.5 rounded-full bg-mauve/35" />
      <span className="absolute right-[42%] top-[20%] h-2 w-2 rounded-full bg-mauve/30" />
    </div>
  );
}

function Bow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path
        d="M32 30c-2.5 0-8-6.5-14-8.5C10 19 4 24 6 30c1.5 4.5 8 6 14 4.5C24 33 29 31 32 30Z"
        fill="#B99AB3"
        fillOpacity="0.85"
      />
      <path
        d="M32 30c2.5 0 8-6.5 14-8.5C54 19 60 24 58 30c-1.5 4.5-8 6-14 4.5C40 33 35 31 32 30Z"
        fill="#9C7A96"
        fillOpacity="0.8"
      />
      <path
        d="M32 30c-2.2 0-7 7-10 12-2.5 4-1 9 3.5 8.5 4-.5 7.5-6 8.5-10.5.4-1.8.3-5.5-2-10Z"
        fill="#B99AB3"
        fillOpacity="0.7"
      />
      <path
        d="M32 30c2.2 0 7 7 10 12 2.5 4 1 9-3.5 8.5-4-.5-7.5-6-8.5-10.5-.4-1.8-.3-5.5 2-10Z"
        fill="#9C7A96"
        fillOpacity="0.65"
      />
      <circle cx="32" cy="30" r="4.5" fill="#EAD9CF" />
      <circle cx="32" cy="30" r="2.2" fill="#B99AB3" />
    </svg>
  );
}

function Heart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#B99AB3">
      <path d="M12 21s-6.7-4.35-9.33-8.1C.7 9.9 1.7 6.2 4.8 5.2c1.9-.6 3.9.1 5.1 1.6 1.2-1.5 3.2-2.2 5.1-1.6 3.1 1 4.1 4.7 2.13 7.7C18.7 16.65 12 21 12 21z" />
    </svg>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#9C7A96">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  );
}
