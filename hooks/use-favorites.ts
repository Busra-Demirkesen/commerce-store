"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";

interface FavoritesState {
  itemsByUser: Record<string, Product[]>;
  add: (userId: string, product: Product) => void;
  remove: (userId: string, productId: string) => void;
  clear: (userId: string) => void;
}

const useFavorites = create(
  persist<FavoritesState>(
    (set, get) => ({
      itemsByUser: {},
      add: (userId, product) => {
        if (!userId) return;
        const map = { ...get().itemsByUser } as Record<string, Product[]>;
        const list = map[userId] ? [...map[userId]] : [];
        if (!list.find((p) => p.id === product.id)) {
          list.push(product);
          map[userId] = list;
          set({ itemsByUser: map });
        }
      },
      remove: (userId, productId) => {
        if (!userId) return;
        const map = { ...get().itemsByUser } as Record<string, Product[]>;
        const list = map[userId] ? map[userId].filter((p) => p.id !== productId) : [];
        map[userId] = list;
        set({ itemsByUser: map });
      },
      clear: (userId) => {
        if (!userId) return;
        const map = { ...get().itemsByUser } as Record<string, Product[]>;
        map[userId] = [];
        set({ itemsByUser: map });
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFavorites;

