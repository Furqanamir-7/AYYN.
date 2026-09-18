"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Copy, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPKR } from "@/data/products";
import { BRAND } from "@/lib/constants";
import {
  LAST_ORDER_KEY,
  PK_CITIES,
  buildOrder,
  hydrateOrderLines,
  isValidEmail,
  isValidPkPhone,
  orderWhatsAppHref,
  type OrderDetails,
  type PlacedOrder,
} from "@/lib/order";

const emptyDetails: OrderDetails = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  city: "",
  notes: "",
  paymentMethod: "NayaPay",
};

type Step = "details" | "pay";

function loadLastOrder(): PlacedOrder | null {
  try {
    const raw = sessionStorage.getItem(LAST_ORDER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PlacedOrder;
  } catch {
    return null;
  }
}

export default function CheckoutClient() {
  const router = useRouter();
  const { items, subtotal, count, clear, hydrated } = useCart();
  const [details, setDetails] = useState<OrderDetails>(emptyDetails);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<Step>("details");
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    const last = loadLastOrder();
    if (items.length === 0 && last) {
      setOrder(last);
      setDetails(last.details);
      setStep("pay");
    }
    setReady(true);
    // Restore a pending payment only when the bag is empty after hydrate.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const lines = useMemo(() => hydrateOrderLines(items), [items]);
  const showing = order && step === "pay" ? order.items : lines;
  const total = order && step === "pay" ? order.total : subtotal;

  useEffect(() => {
    if (!hydrated || !ready) return;
    if (step === "details" && items.length === 0 && !order) {
      router.replace("/#collections");
    }
  }, [hydrated, items.length, order, ready, router, step]);

  function setField<K extends keyof OrderDetails>(key: K, value: OrderDetails[K]) {
    setDetails((d) => ({ ...d, [key]: value }));
    setErrors((e) => {
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!details.firstName.trim()) next.firstName = "First name, please";
    if (!details.lastName.trim()) next.lastName = "Last name, please";
    if (!isValidEmail(details.email)) next.email = "A real email, pretty please";
    if (!isValidPkPhone(details.phone)) next.phone = "Use a Pakistani mobile number";
    if (details.address.trim().length < 8) next.address = "Add a complete delivery address";
    if (!details.city.trim()) next.city = "Which city, love?";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;
    const placed = buildOrder(items, details);
    sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(placed));
    setOrder(placed);
    setStep("pay");
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(placed),
      });
    } catch {
      /* WhatsApp screenshot is still the payment confirmation */
    }
  }

  async function copyAccount() {
    try {
      await navigator.clipboard.writeText(BRAND.payment.account);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function markSent() {
    setSent(true);
    clear();
    sessionStorage.removeItem(LAST_ORDER_KEY);
  }

  const inputClass =
    "mt-1 w-full rounded-2xl border border-mauve/25 bg-cream px-4 py-3 text-sm text-charcoal outline-none transition placeholder:text-charcoal/35 focus:border-mauve focus:ring-2 focus:ring-mauve/20";

  if (!hydrated || !ready) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center text-sm text-charcoal/60">
        Opening your bag…
      </div>
    );
  }

  return (
    <section className="px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-[10px] uppercase tracking-[0.25em] text-mauve-dark">
          Checkout
        </p>
        <h1 className="mt-1 text-center font-display text-3xl tracking-wide sm:text-4xl">
          {step === "details" ? "A few cute details" : "Pay, then ping us"}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-charcoal/70">
          {step === "details"
            ? "We’ll pack your sets once payment is confirmed."
            : "Transfer the total, then send the screenshot on WhatsApp to complete your order."}
        </p>

        <ol className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-2 text-[11px] sm:text-xs">
          {["Your details", "Pay & screenshot"].map((label, i) => {
            const active = step === "details" ? i === 0 : true;
            const current = step === "details" ? i === 0 : i === 1;
            return (
              <li key={label} className="flex items-center gap-2">
                {i > 0 && <span className="text-mauve/50">✦</span>}
                <span
                  className={`rounded-full px-3 py-1 ${
                    current
                      ? "bg-mauve text-cream"
                      : active
                        ? "bg-blush text-mauve-dark"
                        : "bg-blush/50 text-charcoal/45"
                  }`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          {step === "details" ? (
            <form
              onSubmit={placeOrder}
              className="rounded-[1.6rem] bg-blush/45 p-4 sm:p-6"
            >
              <h2 className="font-display text-xl tracking-wide text-mauve-dark">
                Delivery details
              </h2>
              <p className="mt-1 text-xs text-charcoal/65">
                So we know where your pretty parcel should land.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-medium text-mauve-dark">
                  First name
                  <input
                    required
                    autoComplete="given-name"
                    value={details.firstName}
                    onChange={(e) => setField("firstName", e.target.value)}
                    className={inputClass}
                  />
                  {errors.firstName && (
                    <span className="mt-1 block text-[11px] font-normal text-mauve-dark">
                      {errors.firstName}
                    </span>
                  )}
                </label>
                <label className="block text-xs font-medium text-mauve-dark">
                  Last name
                  <input
                    required
                    autoComplete="family-name"
                    value={details.lastName}
                    onChange={(e) => setField("lastName", e.target.value)}
                    className={inputClass}
                  />
                  {errors.lastName && (
                    <span className="mt-1 block text-[11px] font-normal text-mauve-dark">
                      {errors.lastName}
                    </span>
                  )}
                </label>
              </div>

              <label className="mt-3 block text-xs font-medium text-mauve-dark">
                Email
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={details.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={inputClass}
                  placeholder="you@email.com"
                />
                {errors.email && (
                  <span className="mt-1 block text-[11px] font-normal text-mauve-dark">
                    {errors.email}
                  </span>
                )}
              </label>

              <label className="mt-3 block text-xs font-medium text-mauve-dark">
                Phone number
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  value={details.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className={inputClass}
                  placeholder="03xx xxxxxxx"
                />
                {errors.phone && (
                  <span className="mt-1 block text-[11px] font-normal text-mauve-dark">
                    {errors.phone}
                  </span>
                )}
              </label>

              <label className="mt-3 block text-xs font-medium text-mauve-dark">
                Complete address
                <textarea
                  required
                  rows={3}
                  autoComplete="street-address"
                  value={details.address}
                  onChange={(e) => setField("address", e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="House / street, area, nearby landmark"
                />
                {errors.address && (
                  <span className="mt-1 block text-[11px] font-normal text-mauve-dark">
                    {errors.address}
                  </span>
                )}
              </label>

              <label className="mt-3 block text-xs font-medium text-mauve-dark">
                City
                <input
                  required
                  list="pk-cities"
                  autoComplete="address-level2"
                  value={details.city}
                  onChange={(e) => setField("city", e.target.value)}
                  className={inputClass}
                  placeholder="Lahore"
                />
                <datalist id="pk-cities">
                  {PK_CITIES.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
                {errors.city && (
                  <span className="mt-1 block text-[11px] font-normal text-mauve-dark">
                    {errors.city}
                  </span>
                )}
              </label>

              <label className="mt-3 block text-xs font-medium text-mauve-dark">
                Shape, sizes / notes{" "}
                <span className="font-normal text-charcoal/50">(optional, so helpful)</span>
                <textarea
                  rows={3}
                  value={details.notes}
                  onChange={(e) => setField("notes", e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="Preferred shape, plus thumb-to-pinky sizes for both hands"
                />
              </label>

              <button
                type="submit"
                className="mt-5 w-full rounded-full bg-mauve py-3.5 text-sm font-medium text-cream transition hover:bg-mauve-dark"
              >
                Place my order ✦
              </button>
              <p className="mt-2 text-center text-[11px] text-charcoal/55">
                Next you’ll pay on NayaPay or JazzCash, then send the screenshot.
              </p>
            </form>
          ) : (
            <div className="rounded-[1.6rem] bg-blush/45 p-4 sm:p-6">
              {sent ? (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mauve text-xl text-cream">
                    ♡
                  </div>
                  <h2 className="mt-4 font-display text-2xl tracking-wide text-mauve-dark">
                    Screenshot sent?
                  </h2>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-charcoal/70">
                    You’re all set, cutie. We’ll confirm on WhatsApp and pack your order
                    for 3–5 day delivery.
                  </p>
                  {order && (
                    <p className="mt-3 font-display text-lg text-mauve-dark">
                      {order.id}
                    </p>
                  )}
                  <Link
                    href="/#collections"
                    className="mt-6 inline-flex rounded-full bg-mauve px-6 py-3 text-sm font-medium text-cream hover:bg-mauve-dark"
                  >
                    Back to shop
                  </Link>
                </div>
              ) : (
                <>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-mauve-dark">
                    Order {order?.id}
                  </p>
                  <h2 className="mt-1 font-display text-xl tracking-wide text-mauve-dark">
                    Send {formatPKR(total)}
                  </h2>
                  <p className="mt-1 text-xs text-charcoal/70">
                    Same account for both — pick whichever wallet you use.
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {(["NayaPay", "JazzCash"] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => {
                          setField("paymentMethod", method);
                          if (order) {
                            const next = {
                              ...order,
                              details: { ...details, paymentMethod: method },
                            };
                            setOrder(next);
                            sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(next));
                          }
                        }}
                        className={`rounded-2xl px-4 py-3 text-left text-sm ring-1 transition ${
                          details.paymentMethod === method
                            ? "bg-mauve text-cream ring-mauve"
                            : "bg-cream text-mauve-dark ring-mauve/20 hover:bg-blush"
                        }`}
                      >
                        <span className="block font-medium">{method}</span>
                        <span
                          className={`mt-0.5 block text-[11px] leading-snug ${
                            details.paymentMethod === method
                              ? "text-cream/80"
                              : "text-charcoal/55"
                          }`}
                        >
                          {BRAND.payment.accountHolder}
                        </span>
                        <span
                          className={`block text-[11px] ${
                            details.paymentMethod === method
                              ? "text-cream/80"
                              : "text-charcoal/55"
                          }`}
                        >
                          {BRAND.payment.accountDisplay}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl bg-cream px-4 py-4 text-center ring-1 ring-mauve/15">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-mauve-dark">
                      Send to
                    </p>
                    <p className="mt-1 font-display text-3xl tracking-wide text-charcoal">
                      {BRAND.payment.accountDisplay}
                    </p>
                    <p className="mt-1 text-sm text-mauve-dark">
                      Account title: {BRAND.payment.accountHolder}
                    </p>
                    <button
                      type="button"
                      onClick={copyAccount}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-mauve px-4 py-2 text-xs font-medium text-cream hover:bg-mauve-dark"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5" /> Copied, cutie
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copy number
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-4 rounded-2xl bg-mauve/10 px-4 py-3 text-xs leading-relaxed text-charcoal/75">
                    <p className="font-medium text-mauve-dark">Almost done, love.</p>
                    <p className="mt-1">
                      Pay the full {formatPKR(total)} on {details.paymentMethod}, then send
                      the screenshot on WhatsApp. AYYN. already gets this order by email —
                      the screenshot is how we confirm payment and start your set.
                    </p>
                  </div>

                  {order && (
                    <a
                      href={orderWhatsAppHref({ ...order, details })}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={markSent}
                      className="mt-5 flex w-full items-center justify-center rounded-full bg-mauve py-3.5 text-sm font-medium text-cream transition hover:bg-mauve-dark"
                    >
                      I’ve paid — send screenshot
                    </a>
                  )}
                  <p className="mt-2 text-center text-[11px] text-charcoal/55">
                    WhatsApp opens with your order details ready. Attach the screenshot
                    and send.
                  </p>
                </>
              )}
            </div>
          )}

          <aside className="rounded-[1.6rem] bg-cream p-4 ring-1 ring-mauve/15 sm:p-5">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-mauve-dark" />
              <h2 className="font-display text-xl tracking-wide">Your bag</h2>
            </div>
            {showing.length === 0 ? (
              <p className="mt-4 text-sm text-charcoal/65">Nothing in here yet.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {showing.map((item) => (
                  <li key={`${item.slug}-${item.optionId || "set"}-${(item.bundleSlugs || []).join("-")}`} className="flex gap-3">
                    <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-xl bg-blush">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.name}</p>
                      <p className="text-[11px] text-charcoal/60">
                        {item.designNumber ? `#${item.designNumber} · ` : "Accessory · "}
                        ×{item.quantity}
                      </p>
                    </div>
                    <p className="text-xs text-mauve-dark">
                      {formatPKR(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex items-center justify-between border-t border-blush pt-3">
              <span className="text-sm text-charcoal/70">
                {order && step === "pay" ? order.items.reduce((n, i) => n + i.quantity, 0) : count}{" "}
                {(order && step === "pay"
                  ? order.items.reduce((n, i) => n + i.quantity, 0)
                  : count) === 1
                  ? "item"
                  : "items"}
              </span>
              <span className="font-display text-2xl tracking-wide text-mauve-dark">
                {formatPKR(total)}
              </span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-charcoal/55">
              Advance payment only · NayaPay or JazzCash · {BRAND.payment.accountHolder} ·{" "}
              {BRAND.payment.accountDisplay}
            </p>
            {step === "pay" && (
              <button
                type="button"
                onClick={() => setStep("details")}
                className="mt-3 text-xs text-mauve-dark underline-offset-2 hover:underline"
              >
                Edit details
              </button>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
