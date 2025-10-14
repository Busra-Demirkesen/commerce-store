"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { apiBase } from "@/lib/api";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
// orders persisted via backend DB now
import toast from "react-hot-toast";
import useProfile from "@/hooks/use-profile";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const { isSignedIn, userId } = useAuth();
  const { openSignIn } = useClerk();
  // removed local orders add
  const { user, isLoaded } = useUser();
  console.log("Summary Component: useUser() user obj:", user, "isLoaded:", isLoaded);
  const profiles = useProfile((s) => s.profiles);

  // Derive a stable success flag and keep a guard to avoid loops
  const success = useMemo(() => {
    const s = searchParams?.get("success");
    const rs = searchParams?.get("redirect_status");
    const sid = searchParams?.get("session_id");
    if (s) return s;
    if (rs && rs.toLowerCase() === "succeeded") return "1";
    if (sid) return "1";
    return null;
  }, [searchParams]);
  const handledRef = useRef(false);
  const itemsRef = useRef(items);
  useEffect(() => { itemsRef.current = items; }, [items]);

  useEffect(() => {
    if (!isLoaded) return; // Kullanıcı verisi yüklenene kadar bekleyin
    if (success && !handledRef.current) {
      handledRef.current = true;
      toast.success("Payment completed");
      // Save order into DB for My Orders (with local fallback)
      try {
        let snapshot: any = itemsRef.current as any;
        if (!snapshot || snapshot.length === 0) {
          try {
            const raw = localStorage.getItem('last-order-snapshot');
            if (raw) snapshot = JSON.parse(raw);
          } catch {}
        }
        if (snapshot && snapshot.length > 0) {
          const email = user?.emailAddresses?.[0]?.emailAddress || "";
          console.log("Summary Component: Derived email for payload (useEffect)", email);
          const payload: any = {
            items: snapshot.map((l: any) => ({ product: l.product, quantity: l.quantity })),
            total: snapshot.reduce((sum: number, l: any) => sum + Number(l.product.price) * l.quantity, 0),
            email: email,
            // console.log("Summary Component: Derived email for payload (useEffect)", payload.email);
            phone:
              (user as any)?.primaryPhoneNumber?.phoneNumber ||
              (user as any)?.phoneNumbers?.[0]?.phoneNumber ||
              (userId ? profiles[userId]?.phone : "") || "",
            address: userId ? [
              profiles[userId]?.fullName,
              profiles[userId]?.addressLine1,
              profiles[userId]?.addressLine2,
              [profiles[userId]?.postalCode, profiles[userId]?.city].filter(Boolean).join(" "),
              profiles[userId]?.state,
              profiles[userId]?.country,
              profiles[userId]?.deliveryNotes ? `(Notes: ${profiles[userId]?.deliveryNotes})` : "",
            ].filter((p) => p && String(p).trim()).join(", ") : "",
          };
          fetch('/api/db/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        }
      } catch {}
      
      try { localStorage.removeItem('last-order-snapshot'); } catch {}
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
  }, [success, removeAll, userId , searchParams, isLoaded, user]); // isLoaded ve user eklendi

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

      const email = user?.emailAddresses?.[0]?.emailAddress || "";
      console.log("Summary Component: Derived email for checkout (onCheckout)", email);
      const phone =
        (user as any)?.primaryPhoneNumber?.phoneNumber ||
        (user as any)?.phoneNumbers?.[0]?.phoneNumber ||
        (userId ? profiles[userId]?.phone : "") || "";
      const addr = userId
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
        : undefined;

      const pm: any = (user as any)?.publicMetadata || {};
      const pr: any = (user as any)?.privateMetadata || {};
      const backendUserId = userId
        ? (profiles[userId]?.backendUserId || pm.backendUserId || pm.userId || pm.backend_user_id || pr.backendUserId || pr.userId || pr.backend_user_id || "")
        : "";

      if (!email) {
        toast.error("Please add an email to your profile");
        return;
      }
      // Phone and address are optional; only email is required.

      // Call our server route to avoid CORS and keep secrets server-side
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const payload: any = {
        productIds: items.flatMap((line) => Array(line.quantity).fill(line.product.id)),
        email,
        backendUserId,
      };
      if (origin) {
        payload.successUrl = `${origin}/cart?redirect_status=succeeded&session_id={CHECKOUT_SESSION_ID}`;
        payload.cancelUrl = `${origin}/cart?canceled=1`;
      }
      if (phone) payload.phone = phone;
      if (addr && (addr.line1 || addr.line2 || addr.city || addr.state || addr.postalCode || addr.country || addr.fullName || addr.deliveryNotes)) {
        payload.address = addr;
      }

      // Persist a last snapshot locally to recover after redirect
      try {
        localStorage.setItem('last-order-snapshot', JSON.stringify(items));
      } catch {}

      const response = await fetch(`/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
