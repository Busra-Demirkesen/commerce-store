"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/types";

export type OrderLine = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  createdAt: string; // ISO
  items: OrderLine[];
  total: number;
};

type OrdersStore = {
  ordersByUser: Record<string, Order[]>;
  list: (userId: string | null | undefined) => Order[];
  add: (userId: string, order: Omit<Order, "id" | "createdAt">) => Order | null;
  clear: (userId: string) => void;
};

const useOrders = create(
  persist<OrdersStore>(
    (set, get) => ({
      ordersByUser: {},
      list: (userId) => {
        if (!userId) return [];
        return get().ordersByUser[userId] ?? [];
      },
      add: (userId, orderLike) => {
        if (!userId) return null;
        const newOrder: Order = {
          id: `ord_${Math.random().toString(36).slice(2)}`,
          createdAt: new Date().toISOString(),
          items: orderLike.items,
          total: orderLike.total,
        };
        set((state) => {
          const list = state.ordersByUser[userId] ? [...state.ordersByUser[userId]] : [];
          list.unshift(newOrder);
          return { ordersByUser: { ...state.ordersByUser, [userId]: list } } as any;
        });
        return newOrder;
      },
      clear: (userId) => {
        if (!userId) return;
        set((state) => ({ ordersByUser: { ...state.ordersByUser, [userId]: [] } }));
      },
    }),
    {
      name: "orders-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

export default useOrders;

