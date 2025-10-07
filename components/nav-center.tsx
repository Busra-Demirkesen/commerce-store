"use client";

import Link from "next/link";
import MainNav from "./main-nav";
import InlineSearch from "./inline-search";
import { useSearch } from "@/providers/search-modal-provider";

interface Category {
  id: string;
  name: string;
}

interface NavCenterProps {
  data: Category[];
  title: string;
}

const NavCenter: React.FC<NavCenterProps> = ({ data, title }) => {
  const { isOpen, onClose } = useSearch();

  if (isOpen) {
    return (
      <div className="w-full">
        <InlineSearch onClose={onClose} />
      </div>
    );
  }

  return (
    <>
      {/* Mobile/Tablet: show title centered */}
      <div className="flex lg:hidden items-center justify-center">
        <Link href="/" className="gap-x-2">
          <p className="font-bold text-xl text-center">techno trend</p>
        </Link>
      </div>
      {/* Desktop: show category links */}
      <div className="hidden lg:flex items-center justify-center">
        <MainNav data={data} />
      </div>
    </>
  );
};

export default NavCenter;
