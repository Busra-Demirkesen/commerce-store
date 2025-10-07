"use client";

import Link from "next/link";
import MainNav from "./main-nav";

interface Category {
  id: string;
  name: string;
}

interface NavCenterProps {
  data: Category[];
  title: string;
}

const NavCenter: React.FC<NavCenterProps> = ({ data, title }) => {

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
