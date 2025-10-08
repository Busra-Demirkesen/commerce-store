"use client";

import Container from "@/components/ui/container";
import ProductList from "@/components/product-list";
import useFavorites from "@/hooks/use-favorites";
import { useAuth, SignedOut, SignUpButton } from "@clerk/nextjs";
import { useMemo } from "react";

export default function FavoritesPage() {
  const { userId } = useAuth();
  // Use a stable selector to avoid Next devtools "getServerSnapshot" warning.
  const itemsByUser = useFavorites((s) => s.itemsByUser);
  const favorites = useMemo(() => itemsByUser[userId || ""] || [], [itemsByUser, userId]);

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Favorites</h1>

          <SignedOut>
            <div className="mt-6">
              <SignUpButton mode="modal">
                <span className="text-blue-600 underline cursor-pointer">Sign up to view your favorites</span>
              </SignUpButton>
            </div>
          </SignedOut>

          {userId && (
            <div className="mt-8">
              <ProductList title="Your Favorites" items={favorites} />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
