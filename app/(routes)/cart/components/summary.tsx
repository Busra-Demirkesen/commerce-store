"use client";
// import axios from "axios"; // Removed unused import
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";
// import { loadStripe } from '@stripe/stripe-js'; // No longer needed

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!); // No longer needed

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);


  useEffect(()=>{
    if(searchParams.get('success')){
        toast.success('Payment completed');
        removeAll();
    }

    if(searchParams.get('canceled')){
        toast.error('Something went wrong');
    }
  },[searchParams, removeAll]);

  const totalPrice = items.reduce(
    (total, item) => {
        return total + Number(item.price);
    },
    0
  );

  const onCheckout = async () => {
    try {
      console.log("Checkout API URL:", `${process.env.NEXT_PUBLIC_API_URL}/checkout`);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productIds: items.map((item) => item.id),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.url; // Backend must return a URL for Stripe Checkout
      } else {
        toast.error(data.error || "Checkout failed!");
      }
    } catch (error) {
      console.error("Checkout sırasında ağ hatası:", error);
      toast.error("Ağ hatası oluştu. Lütfen tekrar deneyin.");
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
      <Button disabled={items.length ===0} onClick={onCheckout} className="w-full mt-4">Checkout</Button>
    </div>
  );
};

export default Summary;
