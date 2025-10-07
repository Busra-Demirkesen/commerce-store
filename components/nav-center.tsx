"use client";

import Link from "next/link";
import Image from "next/image";
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
        <Link href="/" className="gap-x-2 flex items-center" aria-label="Home">
          <Image src="/logo (2).png" alt="Techno Trend" width={140} height={36} priority className="h-9 w-auto" />
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
