"use client";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";


const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
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
      <Button onClick={()=> router.push("/cart")} className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button className="bg-gray-200 text-black px-4 py-2 rounded-full">Sign In</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-full ml-2">Sign Up</Button>
        </SignUpButton>
      </SignedOut>
    </div>
  );
};

export default NavbarActions;
