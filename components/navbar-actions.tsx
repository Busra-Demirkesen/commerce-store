"use client";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { ShoppingBag, User, Heart } from "lucide-react"; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useSearch } from "@/providers/search-modal-provider"; 





const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const { onOpen } = useSearch(); 

  useEffect(() => {
    setIsMounted(true);
  }, []);

const router = useRouter();
const cart = useCart();


  if (!isMounted) {
    return null;
  }
  return (
    <div className="ml-auto flex items-center gap-x-3">
      {/* Favorites button */}
      <SignedIn>
        <Button onClick={()=> router.push("/favorites")} className="flex items-center rounded-full bg-black px-4 py-2">
          <Heart size={20} color="white" />
        </Button>
      </SignedIn>
      <SignedOut>
        <SignUpButton mode="modal">
          <Button className="flex items-center rounded-full bg-black px-4 py-2">
            <Heart size={20} color="white" />
          </Button>
        </SignUpButton>
      </SignedOut>
      {}
      <Button onClick={()=> router.push("/cart")} className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.reduce((s, l) => s + ('quantity' in l ? (l as any).quantity : 1), 0)}
        </span>
      </Button>

      <div className="relative hidden lg:block">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center rounded-full bg-black px-4 py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-expanded={isDropdownOpen ? "true" : "false"}
          >
            <User size={20} color="white" /> {}
          </Button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
              <div className="px-4 py-1 flex items-center gap-3">
                <SignInButton mode="modal">
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">Sign in</span>
                </SignInButton>
                <span className="text-gray-300">•</span>
                <SignUpButton mode="modal">
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">Sign up</span>
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
