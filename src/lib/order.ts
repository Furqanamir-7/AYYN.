import { products, formatPKR, type Product } from "@/data/products";
import { BRAND, whatsappLink } from "@/lib/constants";

export type CartItem = {
  slug: string;
  quantity: number;
  optionId?: string;
  bundleSlugs?: string[];
};

export type OrderDetails = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
  paymentMethod: "NayaPay" | "JazzCash";
};

export type PlacedLine = CartItem & {
  name: string;
  designNumber: number;
  price: number;
  image: string;
};

export type PlacedOrder = {
  id: string;
  createdAt: string;
  items: PlacedLine[];
  details: OrderDetails;
  total: number;
};

export const CART_STORAGE_KEY = "ayyn-bag";
export const LAST_ORDER_KEY = "ayyn-last-order";

export const PK_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Hyderabad",
  "Gujranwala",
  "Bahawalpur",
  "Sargodha",
  "Abbottabad",
  "Gujrat",
  "Sukkur",
] as const;

export function cartLineId(item: Pick<CartItem, "slug" | "optionId" | "bundleSlugs">) {
  const option = item.optionId || "";
  const bundle = item.bundleSlugs?.length
    ? [...item.bundleSlugs].sort().join("+")
    : "";
  return [item.slug, option, bundle].filter(Boolean).join(":");
}

export function normalizeCartItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const merged = new Map<string, CartItem>();
  for (const item of raw) {
    if (!item?.slug) continue;
    const next: CartItem = {
      slug: String(item.slug),
      quantity: Math.min(6, Number(item.quantity) || 1),
      optionId: item.optionId || undefined,
      bundleSlugs: Array.isArray(item.bundleSlugs)
        ? item.bundleSlugs.filter((s: unknown): s is string => typeof s === "string")
        : undefined,
    };
    const id = cartLineId(next);
    const prev = merged.get(id);
    if (prev) {
      merged.set(id, {
        ...prev,
        quantity: Math.min(6, prev.quantity + next.quantity),
      });
    } else {
      merged.set(id, next);
    }
  }
  return Array.from(merged.values());
}

export function productFor(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function lineUnitPrice(item: CartItem) {
  const product = productFor(item.slug);
  if (!product) return 0;
  const opt = product.options?.find((o) => o.id === item.optionId);
  return opt?.price ?? product.price;
}

export function lineDisplayName(item: CartItem) {
  const product = productFor(item.slug);
  if (!product) return item.slug;
  if (item.optionId === "bundle" && item.bundleSlugs?.length) {
    const names = item.bundleSlugs
      .map((slug) => productFor(slug)?.name || slug)
      .join(" & ");
    return `${product.name} + ${names}`;
  }
  if (item.optionId === "case") return `${product.name} (without nails)`;
  return product.name;
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + lineUnitPrice(item) * item.quantity, 0);
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function createOrderId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `AYYN-${mm}${dd}-${n}`;
}

export function hydrateOrderLines(items: CartItem[]): PlacedLine[] {
  return items
    .map((item) => {
      const product = productFor(item.slug);
      if (!product) return null;
      return {
        ...item,
        name: lineDisplayName(item),
        designNumber: product.designNumber,
        price: lineUnitPrice(item),
        image: product.image,
      };
    })
    .filter((line): line is PlacedLine => Boolean(line));
}

export function buildOrder(items: CartItem[], details: OrderDetails): PlacedOrder {
  const lines = hydrateOrderLines(items);
  return {
    id: createOrderId(),
    createdAt: new Date().toISOString(),
    items: lines,
    details,
    total: lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
  };
}

export function orderItemsText(order: PlacedOrder) {
  return order.items
    .map((item) => {
      const tag = item.designNumber ? `Design #${item.designNumber} ` : "Accessory · ";
      return `• ${tag}${item.name} × ${item.quantity} — ${formatPKR(item.price * item.quantity)}`;
    })
    .join("\n");
}

export function orderWhatsAppMessage(order: PlacedOrder) {
  const { details } = order;
  const notes = details.notes.trim()
    ? `\nNail sizes / notes:\n${details.notes.trim()}\n`
    : "";

  return `Hi AYYN.! 💕

I just placed order ${order.id}

Name: ${details.firstName} ${details.lastName}
Phone: ${details.phone}
Email: ${details.email}
City: ${details.city}
Address: ${details.address}
${notes}
Items:
${orderItemsText(order)}

Total: ${formatPKR(order.total)}
Paid via: ${details.paymentMethod} to ${BRAND.payment.accountDisplay} (${BRAND.payment.accountHolder})

Sending my payment screenshot now ✦`;
}

export function orderWhatsAppHref(order: PlacedOrder) {
  return whatsappLink(orderWhatsAppMessage(order));
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPkPhone(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  if (digits.startsWith("92") && digits.length === 12) return digits[2] === "3";
  if (digits.startsWith("0") && digits.length === 11) return digits[1] === "3";
  return digits.length === 10 && digits.startsWith("3");
}
