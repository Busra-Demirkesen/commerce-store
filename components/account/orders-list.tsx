"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import useOrders from "@/hooks/use-orders";
import Currency from "@/components/ui/currency";
import useProfile from "@/hooks/use-profile";

export default function OrdersList() {
  const { user } = useUser();
  const ordersByUser = useOrders((s) => s.ordersByUser);
  const uid = user?.id || "";
  const localOrders = useMemo(() => ordersByUser[uid] || [], [ordersByUser, uid]);
  const [remoteOrders, setRemoteOrders] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const profiles = useProfile((s) => s.profiles);
  // Prefer profile backendUserId, then Clerk public/private metadata fallbacks
  const pm: any = (user as any)?.publicMetadata || {};
  const pr: any = (user as any)?.privateMetadata || {};
  const backendId = useMemo(() => {
    if (!uid) return "";
    return (
      profiles[uid]?.backendUserId ||
      pm.backendUserId || pm.userId || pm.backend_user_id ||
      pr.backendUserId || pr.userId || pr.backend_user_id ||
      ""
    ) as string;
  }, [uid, profiles, pm, pr]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!uid) { setRemoteOrders(null); return; }
      if (!backendId) { setRemoteOrders([]); return; }
      setLoading(true);
      try {
        const res = await fetch(`/api/orders?userId=${encodeURIComponent(backendId)}`, { cache: 'no-store' });
        if (!cancelled) {
          if (res.ok) {
            const json = await res.json();
            // Normalize possible shapes: array | {orders} | {data}
            const arr = Array.isArray(json) ? json : (Array.isArray(json?.orders) ? json.orders : (Array.isArray(json?.data) ? json.data : []));
            setRemoteOrders(arr);
          }
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
  }, [uid, backendId]);

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
          {orders.map((o: any) => {
            // Normalize item lines and totals for rendering
            const items = Array.isArray(o.items) ? o.items : (Array.isArray(o.orderItems) ? o.orderItems : []);
            const total = typeof o.total === 'number' ? o.total : (typeof o.amount === 'number' ? o.amount : (typeof o.priceTotal === 'number' ? o.priceTotal : undefined));
            const created = o.createdAt || o.created_at || o.date || null;
            const id = o.id || o._id || o.orderId || Math.random().toString(36).slice(2);
            const count = items.reduce((s: number, l: any) => s + (l.quantity || l.qty || 0), 0) || (o.itemsCount || 0);
            return (
            <li key={o.id} className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">#{id}</p>
                  <p className="text-sm text-gray-500">{created ? new Date(created).toLocaleString() : ""}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{count} items</p>
                  {typeof total === 'number' ? <Currency value={total} /> : null}
                </div>
              </div>
              {Array.isArray(items) && items.length > 0 && (
                <div className="mt-3 flex gap-3 overflow-x-auto">
                  {items.map((l: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 rounded-md border border-gray-200 p-2 min-w-[200px]">
                      {l?.product?.images?.[0]?.url ? (
                        <Image src={l.product.images[0].url} alt={l.product.name} width={40} height={40} className="h-10 w-10 object-cover rounded" />
                      ) : (
                        <div className="h-10 w-10 rounded bg-gray-100" />
                      )}
                      <div>
                        <p className="text-sm text-gray-900">{l?.product?.name || l?.name || "Item"}</p>
                        <p className="text-xs text-gray-500">Qty: {l.quantity || l.qty || 0}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </li>
          );})}
        </ul>
      )}
    </section>
  );
}
