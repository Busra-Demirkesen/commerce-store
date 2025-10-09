"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import useOrders from "@/hooks/use-orders";
import Currency from "@/components/ui/currency";

export default function OrdersList() {
  const { user } = useUser();
  const ordersByUser = useOrders((s) => s.ordersByUser);
  const uid = user?.id || "";
  const localOrders = useMemo(() => ordersByUser[uid] || [], [ordersByUser, uid]);
  const [remoteOrders, setRemoteOrders] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!uid) { setRemoteOrders(null); return; }
      setLoading(true);
      try {
        const res = await fetch(`/api/orders`);
        if (!cancelled) {
          if (res.ok) setRemoteOrders(await res.json());
          else setRemoteOrders([]);
        }
      } catch {
        if (!cancelled) setRemoteOrders([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [uid]);

  const orders = (remoteOrders && remoteOrders.length > 0) ? remoteOrders : localOrders;

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
          <p className="text-sm text-gray-600">No orders yet.</p>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {orders.map((o: any) => (
            <li key={o.id} className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">#{o.id}</p>
                  <p className="text-sm text-gray-500">{o.createdAt ? new Date(o.createdAt).toLocaleString() : ""}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{
                    (Array.isArray(o.items) ? o.items.reduce((s: number, l: any) => s + (l.quantity || 0), 0) : (o.itemsCount || 0))
                  } items</p>
                  {typeof o.total === 'number' ? <Currency value={o.total} /> : null}
                </div>
              </div>
              {Array.isArray(o.items) && o.items.length > 0 && (
                <div className="mt-3 flex gap-3 overflow-x-auto">
                  {o.items.map((l: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 rounded-md border border-gray-200 p-2 min-w-[200px]">
                      {l?.product?.images?.[0]?.url ? (
                        <Image src={l.product.images[0].url} alt={l.product.name} width={40} height={40} className="h-10 w-10 object-cover rounded" />
                      ) : (
                        <div className="h-10 w-10 rounded bg-gray-100" />
                      )}
                      <div>
                        <p className="text-sm text-gray-900">{l?.product?.name || "Item"}</p>
                        <p className="text-xs text-gray-500">Qty: {l.quantity || 0}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
