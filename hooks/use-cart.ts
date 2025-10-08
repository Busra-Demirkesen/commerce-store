import { create } from "zustand";
import { Product } from "@/types";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";

export interface CartLine {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartLine[];
  addItem: (data: Product) => void;
  addItems: (data: Product, qty: number) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  count: () => number; // total quantity
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],

      addItem: (data: Product) => {
        get().addItems(data, 1);
      },

      addItems: (data: Product, qty: number) => {
        const quantity = Math.max(1, Math.floor(Number(qty) || 1));
        const items = get().items.slice();
        const idx = items.findIndex((l) => l.product.id === data.id);
        if (idx !== -1) {
          items[idx] = { ...items[idx], quantity: items[idx].quantity + quantity };
          set({ items });
          toast.success("Quantity updated");
          return;
        }
        items.push({ product: data, quantity });
        set({ items });
        toast.success("Item added to cart");
      },

      removeItem: (id: string) => {
        const filtered = get().items.filter((l) => l.product.id !== id);
        set({ items: filtered });
        toast.success("Item removed from the cart");
      },

      removeAll: () => {
        set({ items: [] });
        toast.success("All items removed from the cart");
      },

      increment: (id: string) => {
        const items = get().items.map((l) =>
          l.product.id === id ? { ...l, quantity: l.quantity + 1 } : l
        );
        set({ items });
      },

      decrement: (id: string) => {
        const items = get().items
          .map((l) =>
            l.product.id === id ? { ...l, quantity: l.quantity - 1 } : l
          )
          .filter((l) => l.quantity > 0);
        set({ items });
      },

      count: () => get().items.reduce((sum, l) => sum + l.quantity, 0),
    }),
    {
      name: "cart-storage",
      version: 2,
      migrate: (persisted: any, version: number) => {
        if (!persisted || !Array.isArray(persisted.items)) return persisted;
        // If old shape: items are Products (no product field), wrap with quantity 1
        if (persisted.items.length > 0 && !persisted.items[0]?.product) {
          return {
            ...persisted,
            items: persisted.items.map((p: any) => ({ product: p, quantity: 1 })),
          };
        }
        // Ensure quantity exists
        return {
          ...persisted,
          items: persisted.items.map((l: any) => ({
            product: l.product ?? l,
            quantity: typeof l.quantity === 'number' && l.quantity > 0 ? l.quantity : 1,
          })),
        };
      },
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
