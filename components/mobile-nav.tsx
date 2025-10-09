"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";

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
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 lg:hidden"
      >
        <Menu size={24} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {}
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
                  {/* Categories accordion */}
                  <li>
                    <button
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-gray-50"
                      type="button"
                      onClick={() => setCategoriesOpen((v) => !v)}
                      aria-haspopup="true"
                      aria-expanded={categoriesOpen ? "true" : "false"}
                      aria-controls="mobile-categories-menu"
                    >
                      <span className="font-medium">Categories</span>
                      <ChevronRight
                        size={18}
                        className={categoriesOpen ? "transform rotate-90 transition-transform" : "transition-transform"}
                      />
                    </button>
                    {categoriesOpen && (
                      <div id="mobile-categories-menu" className="px-2 pb-2">
                        <ul className="mt-1">
                          {data.map((cat) => (
                            <li key={cat.id}>
                              <Link
                                href={`/category/${cat.id}`}
                                onClick={() => setOpen(false)}
                                className="block rounded-md px-4 py-2 text-sm hover:bg-gray-50"
                              >
                                {cat.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>

                  {/* Standalone links */}
                  <li>
                    <Link
                      href="/about"
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-4 py-3 text-sm hover:bg-gray-50"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-4 py-3 text-sm hover:bg-gray-50"
                    >
                      Contact
                    </Link>
                  </li>

                  <li className="mt-1 border-t" />
                  <li>
                    <button
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-gray-50"
                      type="button"
                      onClick={() => setProfileOpen((v) => !v)}
                      aria-haspopup="true"
                      aria-expanded={profileOpen ? "true" : "false"}
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
                        <div className="mt-2 flex flex-col">
                          <SignedOut>
                            <SignInButton mode="modal">
                              <span className="block py-2 text-sm text-black cursor-pointer">Sign in</span>
                            </SignInButton>
                            <SignUpButton mode="modal">
                              <span className="block py-2 text-sm text-black cursor-pointer">Sign up</span>
                            </SignUpButton>
                          </SignedOut>
                          <SignedIn>
                            <Link href="/account" onClick={() => setOpen(false)} className="block py-2 text-sm text-black">
                              My Account
                            </Link>
                            <SignOutButton signOutOptions={{ redirectUrl: '/' }}>
                              <span className="block py-2 text-sm text-black cursor-pointer">Sign out</span>
                            </SignOutButton>
                          </SignedIn>
                        </div>
                      </div>
                    )}
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
