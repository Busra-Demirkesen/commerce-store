"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { apiBase } from "@/lib/api";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import useOrders from "@/hooks/use-orders";
import toast from "react-hot-toast";
import useProfile from "@/hooks/use-profile";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const { isSignedIn, userId } = useAuth();
  const { openSignIn } = useClerk();
  const addOrder = useOrders((s) => s.add);
  const { user } = useUser();
  const profiles = useProfile((s) => s.profiles);

  // Derive a stable success flag and keep a guard to avoid loops
  const success = useMemo(() => searchParams?.get("success"), [searchParams]);
  const handledRef = useRef(false);
  const itemsRef = useRef(items);
  useEffect(() => { itemsRef.current = items; }, [items]);

  useEffect(() => {
    if (success && !handledRef.current) {
      handledRef.current = true;
      toast.success("Payment completed");
      // Record a simple local order for "My Orders"
      try {
        const snapshot = itemsRef.current;
        if (userId && snapshot.length > 0) {
          addOrder(userId, {
            items: snapshot.map((l) => ({ product: l.product, quantity: l.quantity })),
            total: snapshot.reduce(
              (sum, l) => sum + Number(l.product.price) * l.quantity,
              0
            ),
          });
        }
      } catch (e) {
        // no-op if localStorage unavailable
      }
      removeAll();

      // Remove success param to prevent re-processing on re-render
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete("success");
        window.history.replaceState({}, "", url.toString());
      } catch {}
    }

    if (searchParams?.get("canceled")) {
      toast.error("Something went wrong");
    }
  }, [success, removeAll, userId, addOrder, searchParams]);

  const totalPrice = items.reduce(
    (total, line) => total + Number(line.product.price) * line.quantity,
    0
  );

  const onCheckout = async () => {
    try {
      if (!isSignedIn) {
        // Open Clerk sign-in and return; after sign-in, user can click checkout again
        openSignIn({ afterSignInUrl: "/cart", redirectUrl: "/cart" });
        return;
      }

      // Call our server route to avoid CORS and keep secrets server-side
      const response = await fetch(`/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productIds: items.flatMap((line) => Array(line.quantity).fill(line.product.id)),
          email: (user?.primaryEmailAddress as any)?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || "",
          phone:
            (user as any)?.primaryPhoneNumber?.phoneNumber ||
            (user as any)?.phoneNumbers?.[0]?.phoneNumber ||
            (userId ? profiles[userId]?.phone : "") || "",
          address: userId
            ? {
                line1: profiles[userId]?.addressLine1 || "",
                line2: profiles[userId]?.addressLine2 || "",
                city: profiles[userId]?.city || "",
                state: profiles[userId]?.state || "",
                postalCode: profiles[userId]?.postalCode || "",
                country: profiles[userId]?.country || "",
                deliveryNotes: profiles[userId]?.deliveryNotes || "",
                fullName: profiles[userId]?.fullName || user?.fullName || "",
              }
            : undefined,
        }),
      });

      const data = await response.json().catch(() => ({} as any));

      if (response.ok) {
        window.location.href = data.url; 
      } else {
        toast.error(String(data.error || data.message || "Checkout failed!"));
      }
    } catch (error) {
      console.error("Checkout network error:", error);
      const devFallback = process.env.NEXT_PUBLIC_CHECKOUT_DEV_FALLBACK === "1";
      if (devFallback) {
        try {
          const url = new URL(window.location.href);
          url.searchParams.set("success", "1");
          window.location.href = url.toString();
          return;
        } catch {}
      }
      toast.error("Checkout failed. Please try again later.");
    }
  };

  return (
    <div
      className="
         mt-16
         rounded-lg
         bg-gray-50
         px-4
         py-6
         sm:p-6
         lg:col-span-5
         lg:mt-0
         lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        disabled={items.length === 0}
        onClick={onCheckout}
        className="w-full mt-4"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
