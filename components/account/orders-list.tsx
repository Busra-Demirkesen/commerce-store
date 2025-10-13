"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Currency from "@/components/ui/currency";

export default function OrdersList() {
  const { user } = useUser();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user?.id) { 
        console.log("User ID not available.", { userId: user?.id });
        setOrders([]); 
        return; 
      }
      setLoading(true);
      console.log("Fetching orders for user:", user.id);
      try {
        const r = await fetch('/api/db/orders', { cache: 'no-store' });
        console.log("API response status:", r.status, "ok:", r.ok);
        if (r.ok) {
          const j = await r.json();
          console.log("API response data:", j);
          if (!cancelled) setOrders(Array.isArray(j) ? j : []);
        } else {
          console.error("Failed to fetch orders:", r.statusText);
          if (!cancelled) setOrders([]);
        }
      } catch (e: any) {
        console.error("Error fetching orders:", e);
        if (!cancelled) setOrders([]);
      }
      finally { if (!cancelled) setLoading(false); }
    }
    load();
    return () => { cancelled = true; };
  }, [user?.id]);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">My Orders</h2>
      {!user?.id ? (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-600">Please sign in to view your orders.</p>
        </div>
      ) : loading ? (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-600">Loading orders…</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-600">You don’t have any orders yet.</p>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {orders.map((o: any) => {
            const items = Array.isArray(o.items) ? o.items : [];
            const total = typeof o.total === 'number' ? o.total : 0;
            const created = o.createdAt ? new Date(o.createdAt).toLocaleString() : '';
            const id = o.id || Math.random().toString(36).slice(2);
            const count = items.reduce((s: number, l: any) => s + (l.quantity || 0), 0);
            return (
              <li key={id} className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">#{id}</p>
                    <p className="text-sm text-gray-500">{created}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{count} items</p>
                    <Currency value={total} />
                  </div>
                </div>
                {items.length > 0 && (
                  <div className="mt-3 flex gap-3 overflow-x-auto">
                    {items.map((l: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 rounded-md border border-gray-200 p-2 min-w-[200px]">
                        {l?.imageUrl ? (
                          <Image src={l.imageUrl} alt={l.productName || 'Item'} width={40} height={40} className="h-10 w-10 object-cover rounded" />
                        ) : (
                          <div className="h-10 w-10 rounded bg-gray-100" />
                        )}
                        <div>
                          <p className="text-sm text-gray-900">{l?.productName || 'Item'}</p>
                          <p className="text-xs text-gray-500">Qty: {l.quantity || 0}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

