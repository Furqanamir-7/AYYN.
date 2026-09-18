import { NextResponse } from "next/server";
import { BRAND } from "@/lib/constants";
import { formatPKR } from "@/data/products";
import { orderItemsText, type PlacedOrder } from "@/lib/order";

export async function POST(req: Request) {
  let order: PlacedOrder;
  try {
    order = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!order?.id || !order.details?.email || !order.items?.length) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { details } = order;
  const message = [
    `New website order ${order.id}`,
    `Total: ${formatPKR(order.total)}`,
    "",
    "Customer",
    `${details.firstName} ${details.lastName}`,
    details.phone,
    details.email,
    details.city,
    details.address,
    "",
    "Items",
    orderItemsText(order),
    details.notes?.trim() ? `\nNotes:\n${details.notes.trim()}` : "",
    "",
    "Payment screenshot still comes on WhatsApp.",
  ]
    .filter((line) => line !== "")
    .join("\n");

  const res = await fetch(`https://formsubmit.co/ajax/${BRAND.email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `New AYYN. order ${order.id} — ${formatPKR(order.total)}`,
      _template: "box",
      _captcha: false,
      name: `${details.firstName} ${details.lastName}`,
      email: details.email,
      phone: details.phone,
      city: details.city,
      address: details.address,
      notes: details.notes?.trim() || "—",
      items: orderItemsText(order),
      total: formatPKR(order.total),
      order_id: order.id,
      message,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
