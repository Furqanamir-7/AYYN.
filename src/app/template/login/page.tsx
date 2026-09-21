"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { TEMPLATE_ROOT } from "@/lib/template";

export default function TemplateLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/template-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("That password doesn’t open this template.");
        return;
      }
      router.replace(TEMPLATE_ROOT);
      router.refresh();
    } catch {
      setError("Couldn’t sign in. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-cream px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-[1.6rem] bg-blush/50 p-6 shadow-soft ring-1 ring-mauve/15 sm:p-8"
      >
        <p className="text-[10px] uppercase tracking-[0.22em] text-mauve-dark">
          Private
        </p>
        <h1 className="mt-1 font-display text-3xl tracking-wide text-charcoal">
          AYYN. template
        </h1>
        <p className="mt-2 text-sm text-charcoal/70">
          Maroon &amp; cream preview — not the live shop.
        </p>
        <label className="mt-5 block text-xs font-medium text-mauve-dark">
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-mauve/25 bg-cream px-4 py-3 text-sm text-charcoal outline-none transition placeholder:text-charcoal/35 focus:border-mauve focus:ring-2 focus:ring-mauve/20"
          />
        </label>
        {error && (
          <p className="mt-2 text-xs text-mauve-dark">{error}</p>
        )}
        <button
          type="submit"
          disabled={busy || !password}
          className="mt-5 w-full rounded-full bg-mauve py-3 text-sm font-medium text-cream transition hover:bg-mauve-dark disabled:opacity-45"
        >
          {busy ? "Opening…" : "Open template"}
        </button>
      </form>
    </div>
  );
}
