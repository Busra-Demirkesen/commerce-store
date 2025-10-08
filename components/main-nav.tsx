'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "@headlessui/react";

interface Category {
  id: string;
  name: string;
}

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {/* Categories dropdown */}
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary px-2 py-1 rounded-md",
            pathname?.startsWith("/category/") ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          Categories
        </Menu.Button>
        <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-20">
          <div className="py-1">
            {data.map((cat) => (
              <Menu.Item key={cat.id}>
                {({ active }) => (
                  <Link
                    href={`/category/${cat.id}`}
                    className={cn(
                      "block px-4 py-2 text-sm",
                      active ? "bg-gray-100 text-black" : "text-gray-700"
                    )}
                  >
                    {cat.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Menu>

      {/* Static pages */}
      <Link
        href="/about"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/about" ? "text-black dark:text-white" : "text-muted-foreground"
        )}
      >
        About
      </Link>
      <Link
        href="/contact"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/contact" ? "text-black dark:text-white" : "text-muted-foreground"
        )}
      >
        Contact
      </Link>
    </nav>
  );
};

export default MainNav;
