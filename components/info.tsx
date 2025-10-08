'use client';

import { Product } from '@/types';
import Currency from '@/components/ui/currency';
import  Button  from '@/components/ui/button';
import { ShoppingCart, Minus, Plus, Heart } from 'lucide-react';
import useCart from '@/hooks/use-cart';
import { useMemo, useState } from 'react';
import useFavorites from '@/hooks/use-favorites';
import { SignedIn, SignedOut, SignUpButton, useAuth } from '@clerk/nextjs';

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const favorites = useFavorites();
  const { userId } = useAuth();
  const [qty, setQty] = useState(1);
  const maxQty = useMemo(() => (typeof data.stock === 'number' && data.stock > 0 ? data.stock : undefined), [data.stock]);
  const isFav = !!(userId && (favorites.itemsByUser[userId] || []).some(p => p.id === data.id));
  const toggleFavorite = () => {
    if (!userId) return; // SignedOut wrapper opens modal
    if (isFav) favorites.remove(userId, data.id);
    else favorites.add(userId, data);
  };

  const onAddToCart = () => {
    cart.addItems(data, qty);
  };
  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900'>{data.name}</h1>
      <div className='mt-3 flex items-end justif-between'>
        <p className='text-2xl text-gray-900'>
          <Currency value={data?.price} />
        </p>
      </div>


      <hr className='my-4' />
      <div className='flex flex-col gap-y-6'>
        <div className='flex items-center gap-x-4'>
          <h3 className='font-semibold text-black'>Size:</h3>
          <div>
            {data.size?.name}
          </div>
        </div>

        <div className='flex items-center gap-x-4'>
          <h3 className='font-semibold text-black'>Color:</h3>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-label="Selected color" role="img">
            <circle cx="12" cy="12" r="10" fill={data?.color?.value || '#ffffff'} stroke="#4b5563" />
          </svg>
          <div className='ml-2'>
            <SignedIn>
              <button
                onClick={toggleFavorite}
                aria-label='toggle-favorite'
                className='rounded-full p-2 bg-white/90 hover:bg-white shadow border'
              >
                <Heart size={16} className='text-black' fill={isFav ? 'black' : 'none'} />
              </button>
            </SignedIn>
            <SignedOut>
              <SignUpButton mode='modal'>
                <button
                  onClick={(e) => e.preventDefault()}
                  aria-label='toggle-favorite'
                  className='rounded-full p-2 bg-white/90 hover:bg-white shadow border'
                >
                  <Heart size={16} className='text-black' />
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </div>

      <div className='mt-10 flex items-center gap-x-4 gap-y-3 flex-wrap'>
        <div className='flex items-center gap-3'>
          <span className='font-semibold text-black'>Quantity:</span>
          <div className='flex items-center border border-gray-300 rounded-full overflow-hidden'>
            <button
              type='button'
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className='px-3 py-2 hover:bg-gray-100 disabled:opacity-50'
              aria-label='decrease quantity'
              disabled={qty <= 1}
            >
              <Minus size={16} />
            </button>
            <span className='w-10 text-center select-none'>{qty}</span>
            <button
              type='button'
              onClick={() => setQty((q) => (maxQty ? Math.min(maxQty, q + 1) : q + 1))}
              className='px-3 py-2 hover:bg-gray-100 disabled:opacity-50'
              aria-label='increase quantity'
              disabled={!!maxQty && qty >= maxQty}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        <Button onClick={onAddToCart} className='flex items-center gap-x-2 mt-2 sm:mt-0 mb-2' disabled={data.stock === 0} data-testid="add-to-cart">
          Add to Cart
          <ShoppingCart/>
        </Button>
        {data.stock === 0 && (
          <p className="ml-4 text-red-500 font-semibold">OUT OF STOCK</p>
        )}
      </div>
    </div>
  )
}
export default Info;
