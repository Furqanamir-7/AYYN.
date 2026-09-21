import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  TEMPLATE_COOKIE,
  TEMPLATE_LOGIN,
  templatePassword,
  templateSessionToken,
} from "./lib/template";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/template")) return NextResponse.next();

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  if (pathname === TEMPLATE_LOGIN) return res;

  const password = templatePassword();
  if (!password) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const expected = await templateSessionToken(password);
  if (request.cookies.get(TEMPLATE_COOKIE)?.value === expected) return res;

  const login = request.nextUrl.clone();
  login.pathname = TEMPLATE_LOGIN;
  login.search = "";
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/template", "/template/:path*"],
};
