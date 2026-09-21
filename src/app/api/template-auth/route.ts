import { NextResponse } from "next/server";
import {
  TEMPLATE_COOKIE,
  templatePassword,
  templateSessionToken,
} from "@/lib/template";

export async function POST(request: Request) {
  const password = templatePassword();
  if (!password) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  let body: { password?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (body.password !== password) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = await templateSessionToken(password);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(TEMPLATE_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
