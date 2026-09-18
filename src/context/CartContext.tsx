"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";
import {
  CART_STORAGE_KEY,
  cartCount,
  cartLineId,
  cartSubtotal,
  lineDisplayName,
  normalizeCartItems,
  type CartItem,
} from "@/lib/order";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (
    product: Product,
    extras?: { quantity?: number; optionId?: string; bundleSlugs?: string[] }
  ) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  remove: (lineId: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  toast: string | null;
  dismissToast: () => void;
  bump: number;
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [bump, setBump] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) setItems(normalizeCartItems(JSON.parse(raw)));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const add = useCallback(
    (
      product: Product,
      extras?: { quantity?: number; optionId?: string; bundleSlugs?: string[] }
    ) => {
      const incoming: CartItem = {
        slug: product.slug,
        quantity: extras?.quantity ?? 1,
        optionId: extras?.optionId,
        bundleSlugs: extras?.bundleSlugs,
      };
      const id = cartLineId(incoming);
      setItems((prev) => {
        const idx = prev.findIndex((item) => cartLineId(item) === id);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = {
            ...next[idx],
            quantity: Math.min(6, next[idx].quantity + incoming.quantity),
          };
          return next;
        }
        return [...prev, incoming];
      });
      setToast(`${lineDisplayName(incoming)} slipped into your bag ✦`);
      setBump((n) => n + 1);
    },
    []
  );

  const setQuantity = useCallback((lineId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity < 1) return prev.filter((item) => cartLineId(item) !== lineId);
      return prev.map((item) =>
        cartLineId(item) === lineId
          ? { ...item, quantity: Math.min(6, quantity) }
          : item
      );
    });
  }, []);

  const remove = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((item) => cartLineId(item) !== lineId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: cartCount(items),
      subtotal: cartSubtotal(items),
      add,
      setQuantity,
      remove,
      clear,
      open,
      setOpen,
      toast,
      dismissToast: () => setToast(null),
      bump,
      hydrated,
    }),
    [add, bump, clear, hydrated, items, open, remove, setQuantity, toast]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
