"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/container";
import  useCart  from "@/hooks/use-cart";
import CartItem from './components/cart-item';
import Summary from './components/summary';

const CartPage = () => {


  const cart = useCart();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-[#FDF8F6]">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
              <div className="lg:col-span-7">
                   {cart?.items?.length === 0 && (
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">No products in the cart</h2>
                  <p className="mt-2 text-sm text-gray-600">Your cart is empty. Add some products to proceed to checkout.</p>
                  <div className="mt-4">
                    <button
                      onClick={() => router.push('/')}
                      className="inline-flex items-center rounded-full bg-black px-4 py-2 text-white font-semibold hover:opacity-75 transition"
                    >
                      Continue shopping
                    </button>
                  </div>
                </div>
                   )}
                <ul>
                    {cart.items.map((line) =>(
                        <CartItem 
                          key={line.product.id}
                          item={line}
                        />
                    ))}
                </ul>
              </div>
              <Summary/>
            </div>
         
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
