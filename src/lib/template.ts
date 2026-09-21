export const TEMPLATE_ROOT = "/template";
export const TEMPLATE_LOGIN = "/template/login";
export const TEMPLATE_COOKIE = "ayyn_template";

export function isTemplatePath(pathname: string | null | undefined) {
  if (!pathname) return false;
  return (
    pathname === TEMPLATE_ROOT || pathname.startsWith(`${TEMPLATE_ROOT}/`)
  );
}

export function isTemplateHome(pathname: string | null | undefined) {
  return pathname === TEMPLATE_ROOT;
}

export function withTemplatePrefix(
  href: string,
  pathname: string | null | undefined
) {
  if (!isTemplatePath(pathname)) return href;
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:")
  ) {
    return href;
  }
  if (href.startsWith(TEMPLATE_ROOT)) return href;
  if (href.startsWith("/#")) return `${TEMPLATE_ROOT}${href.slice(1)}`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("/")) return `${TEMPLATE_ROOT}${href}`;
  return href;
}

export async function templateSessionToken(password: string) {
  const data = new TextEncoder().encode(`ayyn-template:${password}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function templatePassword() {
  return process.env.TEMPLATE_PASSWORD || "ayyn-maroon";
}
