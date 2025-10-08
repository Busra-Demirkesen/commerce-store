"use client";

import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";

import Currency from "@/components/ui/currency";
import useCart, { CartLine } from "@/hooks/use-cart";

interface CartItemProps {
  item: CartLine;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product: data, quantity } = item;
  const cart = useCart();
  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image fill src={data.images[0].url} alt="Product image" className="object-cover" />
      </div>

      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <button
          onClick={onRemove}
          aria-label="remove-item"
          className="absolute z-10 right-0 top-0 rounded-full p-2 hover:bg-gray-100"
        >
          <X size={15} />
        </button>
        <div className="relative pr-9 sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.name}</p>
          </div>

          {/* Quantity moved up just below the title */}
          <div className="mt-2 flex items-center gap-3">
            <span className="text-sm font-semibold text-black">Quantity:</span>
            <div className="flex items-center rounded-full border border-gray-300 overflow-hidden">
              <button
                type="button"
                onClick={() => cart.decrement(data.id)}
                className="px-3 py-1.5 hover:bg-gray-100"
                aria-label="decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="min-w-8 px-2 text-center select-none">{quantity}</span>
              <button
                type="button"
                onClick={() => cart.increment(data.id)}
                className="px-3 py-1.5 hover:bg-gray-100"
                aria-label="increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Attributes row */}
          <div className="mt-2 flex text-sm items-center gap-4 flex-wrap">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">{data.size.name}</p>
          </div>

          {/* Line total */}
          <div className="mt-2">
            <Currency value={data.price * quantity} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
