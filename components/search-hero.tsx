"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";

type Cat = { id: string; name: string };

interface Props {
  categories: Cat[];
}

export default function SearchHero({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const current = searchParams?.get("searchTerm") || "";
    setQuery(current);
  }, [searchParams]);

  const onSubmit = () => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (query) params.set("searchTerm", query);
    else params.delete("searchTerm");
    router.push(`${pathname}?${params.toString()}`);
  };

  const onQuick = (term: string) => {
    setQuery(term);
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("searchTerm", term);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="mt-6 rounded-2xl bg-white text-gray-900 border border-gray-200 shadow-sm p-6 md:p-8">
      <div className="max-w-3xl mx-auto text-center">
        
        <h2 className="hidden sm:block mt-4 text-2xl md:text-3xl font-bold">Search products</h2>
        <p className="hidden sm:block mt-2 text-sm text-gray-600">
          What are you looking for? Search by name, brand, or category.
        </p>

        <div className="mt-5">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              placeholder="Search products"
              className="w-full rounded-full border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 px-5 py-3 pr-16 text-sm outline-none focus:border-gray-400 shadow-sm"
              aria-label="Search products"
            />
            <button
              onClick={onSubmit}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 shadow-sm"
              aria-label="Search"
            >
              <SearchIcon size={18} />
            </button>
          </div>
        </div>

        <div className="hidden sm:block mt-4 text-sm text-gray-700">What are you looking for?</div>
        <div className="mt-2 flex flex-wrap gap-2 justify-center">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.id}`}
              className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:ring-1 hover:ring-gray-300 transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
