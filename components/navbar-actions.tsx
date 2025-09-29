"use client";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { ShoppingBag, User } from "lucide-react"; // Import Search icon kaldırıldı
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
// import { useSearch } from "@/providers/search-modal-provider"; // useSearch hook kaldırıldı

// interface NavbarActionsProps {
//   // onSearchOpen: () => void; // No longer needed as we use useSearch hook
// }

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  // const { onOpen } = useSearch(); // Use onOpen from useSearch hook

  useEffect(() => {
    setIsMounted(true);
  }, []);

const router = useRouter();
const cart = useCart();


  if (!isMounted) {
    return null;
  }
  return (
    <div className="ml-auto flex items-center gap-x-4">
      {/* Search Icon Button kaldırıldı */}
      {/* <Button onClick={onOpen} className="flex items-center rounded-full p-2 bg-transparent hover:bg-transparent">
        <Search size={20} color="black" />
      </Button> */}
      {/* Cart Button */}
      <Button onClick={()=> router.push("/cart")} className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>

      <div className="relative">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center rounded-full bg-black px-4 py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-expanded={isDropdownOpen ? "true" : "false"}
          >
            <User size={20} color="white" /> {/* User icon */}
          </Button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <SignInButton mode="modal">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Up</button>
              </SignUpButton>
            </div>
          )}
        </SignedOut>
      </div>
    </div>
  );
};

export default NavbarActions;
