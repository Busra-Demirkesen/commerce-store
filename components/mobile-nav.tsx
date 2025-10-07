"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

interface Category {
  id: string;
  name: string;
}

interface MobileNavProps {
  data: Category[];
}

const MobileNav: React.FC<MobileNavProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 md:hidden"
      >
        <Menu size={24} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="relative h-full w-72 max-w-[80%] bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <span className="font-semibold">Categories</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="rounded-md p-2 hover:bg-gray-100"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex h-full flex-col">
              <nav className="p-2 grow overflow-y-auto">
                <ul>
                  {data.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/category/${cat.id}`}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-4 py-3 text-sm hover:bg-gray-50"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}

                  {/* Profile row directly under categories */}
                  <li className="mt-1 border-t" />
                  <li>
                    <SignedIn>
                      <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-sm font-medium">Profile</span>
                        <UserButton afterSignOutUrl="/" />
                      </div>
                    </SignedIn>
                    <SignedOut>
                      <button
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-gray-50"
                        onClick={() => setProfileOpen((v) => !v)}
                        aria-expanded={profileOpen}
                        aria-controls="mobile-profile-menu"
                      >
                        <span className="font-medium">Profile</span>
                        <ChevronRight
                          size={18}
                          className={profileOpen ? "transform rotate-90 transition-transform" : "transition-transform"}
                        />
                      </button>
                      {profileOpen && (
                        <div id="mobile-profile-menu" className="px-4 pb-3">
                          <div className="mt-2 flex items-center gap-3">
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
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
