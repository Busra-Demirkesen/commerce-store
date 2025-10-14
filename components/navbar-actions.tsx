"use client";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { ShoppingBag, User, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center gap-x-3">
      {/* Favorites */}
      <SignedIn>
        <Button onClick={() => router.push("/favorites")} className="flex items-center rounded-full bg-black px-2 py-1 md:px-3 md:py-1.5">
          <Heart size={16} className="lg:size-20" color="white" />
        </Button>
      </SignedIn>
      <SignedOut>
        <SignUpButton mode="modal">
          <Button className="flex items-center rounded-full bg-black px-2 py-1 md:px-3 md:py-1.5">
            <Heart size={16} className="lg:size-20" color="white" />
          </Button>
        </SignUpButton>
      </SignedOut>

      {/* Cart */}
      <Button onClick={() => router.push("/cart")} className="flex items-center rounded-full bg-black px-2 py-1 md:px-3 md:py-1.5">
        <ShoppingBag size={16} className="lg:size-20" color="white" />
        <span className="ml-2 text-sm font-medium text-white hidden md:block">{cart.count()}</span>
        <span className="ml-1 text-sm font-medium text-white md:hidden">{cart.count()}</span>
      </Button>

      {/* Profile dropdown */}
      <div className="relative">
        <SignedIn>
          <Button
            onClick={() => setIsDropdownOpen((v) => !v)}
            className="flex items-center rounded-full bg-black px-2 py-1 md:px-3 md:py-1.5 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-expanded={isDropdownOpen ? "true" : "false"}
          >
            <User size={16} className="lg:size-20" color="white" />
          </Button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg z-10">
              <div className="flex flex-col">
                <button
                  onClick={() => { setIsDropdownOpen(false); router.push('/account'); }}
                  className="text-left px-4 py-2 text-sm text-black hover:bg-gray-50"
                >
                  My Account
                </button>
                <SignOutButton signOutOptions={{ redirectUrl: '/' }}>
                  <span className="px-4 py-2 text-sm text-black hover:bg-gray-50 cursor-pointer">Sign out</span>
                </SignOutButton>
              </div>
            </div>
          )}
        </SignedIn>
        <SignedOut>
          <Button
            onClick={() => setIsDropdownOpen((v) => !v)}
            className="flex items-center rounded-full bg-black px-2 py-1 md:px-3 md:py-1.5 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-expanded={isDropdownOpen ? "true" : "false"}
          >
            <User size={16} className="lg:size-20" color="white" />
          </Button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg z-10">
              <div className="flex flex-col">
                <SignInButton mode="modal">
                  <span className="px-4 py-2 text-sm text-black cursor-pointer hover:bg-gray-50">Sign in</span>
                </SignInButton>
                <SignUpButton mode="modal">
                  <span className="px-4 py-2 text-sm text-black cursor-pointer hover:bg-gray-50">Sign up</span>
                </SignUpButton>
              </div>
            </div>
          )}
        </SignedOut>
      </div>
    </div>
  );
};

export default NavbarActions;

