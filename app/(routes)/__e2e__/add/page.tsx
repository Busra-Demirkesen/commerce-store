"use client";

import React, { useMemo } from "react";
import useCart from "@/hooks/use-cart";
import Button from "@/components/ui/button";

const E2EAddPage: React.FC = () => {
  const items = useCart((s) => s.items);
  const addItem = useCart((s) => s.addItem);
  const removeAll = useCart((s) => s.removeAll);

  const fixture = useMemo(() => ({
    id: 'e2e-p',
    name: 'E2E Product',
    price: 123,
    isFeatured: false,
    stock: 1,
    category: { id: 'e2e-cat', name: 'E2E', billboard: null },
    size: { id: 'e2e-size', name: 'One', value: 'ONE' },
    color: { id: 'e2e-color', name: 'Gray', value: '#888888' },
    images: [{ id: 'e2e-img', url: '/next.svg' }],
  }), []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">E2E Add To Cart</h1>
      <div>Cart Items: <span data-testid="e2e-cart-count">{items.length}</span></div>
      <div className="flex gap-2">
        <Button onClick={() => addItem(fixture)} data-testid="e2e-seed">Seed Cart</Button>
        <Button onClick={() => removeAll()} data-testid="e2e-clear">Clear Cart</Button>
      </div>
    </div>
  );
};

export default E2EAddPage;

