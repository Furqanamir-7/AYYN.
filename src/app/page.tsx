import Image from "next/image";
import CollectionsSection from "@/components/CollectionsSection";
import ReviewCard from "@/components/ReviewCard";
import AnimatedSection from "@/components/AnimatedSection";
import JsonLd from "@/components/JsonLd";
import HeroDecor from "@/components/HeroDecor";
import BrandLogo from "@/components/BrandLogo";
import { reviews, reviewSummary } from "@/data/reviews";
import { BRAND, WA } from "@/lib/constants";

const faqs = [
  {
    q: "How do I find my nail size?",
    a: "Measure the widest part of each nail, or order our Sizing Kit. Add thumb-to-pinky sizes for both hands in the notes box at checkout — or send them with your payment screenshot.",
  },
  {
    q: "Which shapes do you offer?",
    a: "Almond, coffin, square, and stiletto — tell us your preferred shape in the notes box at checkout, or with your payment screenshot.",
  },
  {
    q: "How long do the nails last?",
    a: "With proper application and care, sets typically last 1–2 weeks — and they're reusable.",
  },
  {
    q: "How do I apply & remove?",
    a: "Clean nails, use glue or sticky tabs from the Application Kit, press firmly. To remove, soak gently and lift — never force peel.",
  },
  {
    q: "How long is delivery?",
    a: "Most orders arrive in 3–5 working days nationwide after we receive your payment screenshot on WhatsApp.",
  },
  {
    q: "How does payment work?",
    a: `Add sets to your bag and checkout on the website. Transfer the total to ${BRAND.payment.accountDisplay} (${BRAND.payment.accountHolder}) on NayaPay or JazzCash, then send the screenshot on WhatsApp. We start your order once that screenshot arrives.`,
  },
];

const careSteps = [
  {
    title: "Apply",
    body: "Push cuticles, lightly buff, wipe clean, then glue or use sticky tabs.",
  },
  {
    title: "Wear",
    body: "Avoid soaking for the first hour. Sets last ~1–2 weeks with care.",
  },
  {
    title: "Remove",
    body: "Soak in warm soapy water, gently lift — never rip. Reuse again!",
  },
];

const howSteps = [
  {
    step: "01",
    title: "Add to bag",
    body: "Pick your sets, then drop them in your little bag.",
  },
  {
    step: "02",
    title: "Checkout here",
    body: "Tell us your name, phone, email and delivery address on the website.",
  },
  {
    step: "03",
    title: "Pay & screenshot",
    body: `Send the total to ${BRAND.payment.accountDisplay} (${BRAND.payment.accountHolder}) on NayaPay or JazzCash, then WhatsApp the screenshot to complete your order.`,
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd />

      {/* HERO */}
      <section
        id="home"
        className="relative scroll-mt-16 overflow-hidden px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-8"
      >
        <HeroDecor />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
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
          <p className="mt-3 max-w-md text-sm text-charcoal/75 sm:mt-4 sm:text-base md:text-lg">
            {BRAND.tagline}
          </p>
          <p className="mt-2 text-xs font-medium text-mauve-dark sm:mt-3 sm:text-sm">
            {BRAND.priceFrom}
          </p>
          <p className="mt-0.5 text-xs text-charcoal/65 sm:text-sm">
            {BRAND.delivery}
          </p>
          <div className="mt-5 flex w-full max-w-sm flex-col gap-2.5 sm:mt-7 sm:max-w-none sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
            <a
              href="#collections"
              className="rounded-full bg-mauve px-6 py-3 text-sm font-medium tracking-wide text-cream transition hover:bg-mauve-dark sm:px-8 sm:py-3.5"
            >
              Shop Collections
            </a>
            <a
              href="#how-it-works"
              className="rounded-full border border-mauve/50 px-6 py-3 text-sm font-medium tracking-wide text-mauve-dark transition hover:bg-blush/60 sm:px-8 sm:py-3.5"
            >
              How it works
            </a>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-1.5 sm:mt-7 sm:gap-2">
            <span className="rounded-full bg-blush/80 px-3 py-1 text-[10px] tracking-wide text-mauve-dark sm:px-4 sm:py-1.5 sm:text-xs">
              🇵🇰 Delivery all over Pakistan
            </span>
            <span className="rounded-full bg-blush/80 px-3 py-1 text-[10px] tracking-wide text-mauve-dark sm:px-4 sm:py-1.5 sm:text-xs">
              Advance payment only
            </span>
            <span className="rounded-full bg-blush/80 px-3 py-1 text-[10px] tracking-wide text-mauve-dark sm:px-4 sm:py-1.5 sm:text-xs">
              Reusable sets
            </span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — right under hero */}
      <AnimatedSection
        id="how-it-works"
        className="scroll-mt-16 mx-auto max-w-5xl px-4 pb-8 sm:px-6 sm:pb-10"
      >
        <div className="rounded-2xl bg-blush/45 px-4 py-6 sm:rounded-3xl sm:px-8 sm:py-8">
          <p className="text-center text-[10px] uppercase tracking-[0.25em] text-mauve-dark sm:text-xs">
            Simple & secure
          </p>
          <h2 className="mt-1 text-center font-display text-2xl tracking-wide sm:text-3xl">
            How it works
          </h2>
          <ol className="mt-5 grid gap-4 sm:mt-6 sm:gap-6 md:grid-cols-3">
            {howSteps.map((item) => (
              <li key={item.step} className="text-center">
                <span className="font-display text-2xl text-mauve/70 sm:text-3xl">
                  {item.step}
                </span>
                <h3 className="mt-1 font-display text-lg tracking-wide sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-charcoal/70 sm:text-sm">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-center text-xs text-mauve-dark sm:mt-6 sm:text-sm">
            Your order is complete when the payment screenshot lands in our WhatsApp.{" "}
            <a href="#reviews" className="underline">
              See our reviews
            </a>
            .
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:mt-4 sm:gap-2">
            {[...BRAND.payment.methods, BRAND.payment.accountHolder].map((p) => (
              <span
                key={p}
                className="rounded-full border border-mauve/40 bg-cream px-2.5 py-0.5 text-[10px] tracking-wide text-mauve-dark sm:px-3 sm:py-1 sm:text-xs"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <CollectionsSection />

      {/* CARE + SHAPES */}
      <AnimatedSection className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <h2 className="font-display text-2xl tracking-wide sm:text-3xl md:text-4xl">
          Care & shapes
        </h2>
        <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 md:grid-cols-3">
          {careSteps.map((s) => (
            <div key={s.title} className="rounded-2xl bg-blush/45 p-4 sm:rounded-3xl sm:p-6">
              <h3 className="font-display text-xl tracking-wide text-mauve-dark sm:text-2xl">
                {s.title}
              </h3>
              <p className="mt-1.5 text-xs text-charcoal/75 sm:mt-2 sm:text-sm">
                {s.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">
          {["Almond", "Coffin", "Square", "Stiletto"].map((shape) => (
            <span
              key={shape}
              className="rounded-full bg-mauve/15 px-3 py-1.5 text-xs text-mauve-dark sm:px-4 sm:py-2 sm:text-sm"
            >
              {shape}
            </span>
          ))}
        </div>
      </AnimatedSection>

      {/* INSTAGRAM */}
      <AnimatedSection className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-mauve-dark sm:text-xs">
            Instagram
          </p>
          <h2 className="mt-1 font-display text-2xl tracking-wide sm:mt-2 sm:text-3xl md:text-4xl">
            Follow {BRAND.instagramHandle}
          </h2>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-6 sm:grid-cols-4 sm:gap-3">
          {[
            {
              n: 1,
              alt: "Blush Ice press-on nails by AYYN.",
            },
            {
              n: 2,
              alt: "Coquette Bow press-on nails by AYYN.",
            },
            {
              n: 3,
              alt: "Cherry Kiss press-on nails by AYYN.",
            },
            {
              n: 4,
              alt: "Champagne Luxe press-on nails by AYYN.",
            },
          ].map((item) => (
            <a
              key={item.n}
              href="#collections"
              className="relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl"
            >
              <Image
                src={`/instagram/${item.n}.jpg`}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition hover:scale-105"
                loading="lazy"
              />
            </a>
          ))}
        </div>
        <div className="mt-5 text-center sm:mt-7">
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-mauve px-6 py-2.5 text-sm font-medium text-cream hover:bg-mauve-dark sm:px-7 sm:py-3"
          >
            Open Instagram
          </a>
        </div>
      </AnimatedSection>

      {/* REVIEWS */}
      <AnimatedSection
        id="reviews"
        className="scroll-mt-16 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12"
      >
        <div className="rounded-2xl bg-blush/50 px-4 py-7 text-center sm:rounded-[2rem] sm:px-10 sm:py-9">
          <p className="text-[10px] uppercase tracking-[0.25em] text-mauve-dark sm:text-xs">
            Reviews
          </p>
          <p className="mt-2 font-display text-4xl text-mauve-dark sm:mt-3 sm:text-5xl">
            {reviewSummary.average}★
          </p>
          <p className="mt-1 text-xs text-charcoal/70 sm:mt-2 sm:text-sm">
            from {reviewSummary.countLabel} orders
          </p>
          <a
            href={WA.review}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-full bg-mauve px-5 py-2.5 text-sm font-medium text-cream hover:bg-mauve-dark sm:mt-5 sm:px-7 sm:py-3"
          >
            Leave a review on WhatsApp
          </a>
        </div>
        <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection
        id="faq"
        className="scroll-mt-16 mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12"
      >
        <p className="text-[10px] uppercase tracking-[0.25em] text-mauve-dark sm:text-xs">
          Help
        </p>
        <h2 className="mt-1 font-display text-2xl tracking-wide sm:mt-2 sm:text-3xl md:text-4xl">
          FAQ
        </h2>
        <div className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="rounded-2xl bg-blush/45 p-4 open:bg-blush/70 sm:rounded-3xl sm:p-5"
            >
              <summary className="cursor-pointer list-none font-display text-lg tracking-wide text-mauve-dark sm:text-xl">
                {f.q}
              </summary>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/75 sm:mt-3 sm:text-sm">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </AnimatedSection>

      {/* CONTACT */}
      <AnimatedSection
        id="contact"
        className="scroll-mt-16 mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12"
      >
        <div className="rounded-2xl bg-mauve px-5 py-8 text-cream sm:rounded-[2rem] sm:px-8 sm:py-10">
          <h2 className="font-display text-2xl tracking-wide sm:text-3xl md:text-4xl">
            Contact
          </h2>
          <p className="mt-2 max-w-xl text-xs text-cream/90 sm:mt-3 sm:text-sm">
            Shop on the website, then send your NayaPay or JazzCash screenshot on
            WhatsApp to confirm. Questions? We&apos;re right here.
          </p>
          <div className="mt-4 space-y-1.5 text-xs sm:mt-5 sm:space-y-2 sm:text-sm">
            <p>
              WhatsApp:{" "}
              <a href={WA.generic} className="underline">
                {BRAND.whatsappDisplay}
              </a>
            </p>
            <p>
              Instagram:{" "}
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {BRAND.instagramHandle}
              </a>
            </p>
            <p>
              Email:{" "}
              <a href={`mailto:${BRAND.email}`} className="underline">
                {BRAND.email}
              </a>
            </p>
          </div>
          <a
            href={WA.generic}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full bg-cream px-5 py-2.5 text-sm font-medium text-mauve-dark sm:mt-7 sm:px-7 sm:py-3"
          >
            Questions on WhatsApp
          </a>
        </div>
      </AnimatedSection>
    </>
  );
}
