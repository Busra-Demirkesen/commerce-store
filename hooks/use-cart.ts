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
        const items = get().items.slice();
        const idx = items.findIndex((l) => l.product.id === data.id);
        if (idx !== -1) {
          items[idx] = { ...items[idx], quantity: items[idx].quantity + 1 };
          set({ items });
          toast.success("Quantity updated");
          return;
        }
        items.push({ product: data, quantity: 1 });
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
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
