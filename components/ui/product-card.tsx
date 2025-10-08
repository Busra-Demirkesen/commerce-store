"use client";

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import { FC, MouseEventHandler, useEffect, useState, useCallback } from "react";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
  data: Product;
}

const ProductCard: FC<ProductCardProps> = ({ data }) => {

  const cart = useCart();
  const previewModal = usePreviewModal();
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    event.stopPropagation();
    cart.addItem(data);
  }, [cart, data]);

  const onPreview: MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  }, [previewModal, data]);

  return (
    <div
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
      onClick={handleClick}
    >
      <div className="relative aspect-square rounded-xl bg-gray-100">
        <Image
          alt="Product"
          src={data.images?.[0]?.url}
          fill
          className="object-cover rounded-md"
        />
        {data.stock === 0 && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center rounded-md">
            <span className="text-white text-xl font-bold">OUT OF STOCK</span>
          </div>
        )}

        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5 z-10">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
              ariaLabel="preview"
            />

            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
              ariaLabel="add-to-cart-card"
              disabled={data.stock === 0} // Sepete ekle butonunu stok 0 ise pasif yap
            />
          </div>
        </div>
      </div>

      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category.name}</p>
      </div>
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
