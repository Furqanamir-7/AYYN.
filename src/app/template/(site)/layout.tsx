import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  TEMPLATE_COOKIE,
  TEMPLATE_LOGIN,
  templatePassword,
  templateSessionToken,
} from "@/lib/template";

export default async function PrivateTemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const password = templatePassword();
  if (!password) redirect("/");

  const expected = await templateSessionToken(password);
  const token = cookies().get(TEMPLATE_COOKIE)?.value;
  if (token !== expected) redirect(TEMPLATE_LOGIN);

  return children;
}
