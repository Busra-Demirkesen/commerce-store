import React from "react";
import Container from "@/components/ui/container";
import { Billboard } from "@/components/billboard";
import getBillboards from "@/actions/get-billboard"; // <<< Burayı düzeltiyoruz, get-billboard olmalı
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import SearchBar from "@/components/search-bar";

export const revalidate = 0;

interface HomePageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>; // Explicitly define searchParams as a Promise
}

const HomePage = async ({ searchParams: searchParamsPromise }: HomePageProps) => {

  const searchParams = await searchParamsPromise; // Await the promise

  const billboards = await getBillboards(); // Call without ID, get all billboards
  const billboard = billboards.length > 0 ? billboards[0] : null; // Get the first billboard, or null if none

  const products = await getProducts({
    isFeatured: true,
    searchTerm: typeof searchParams.searchTerm === 'string' ? searchParams.searchTerm : undefined,
  });
  return (
    <Container>
      <div className="space-y-10 pb-10">
        {billboard && <Billboard data={billboard} />} {/* <<< Null kontrolü ekledik */}
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <SearchBar />
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  )
}
export default HomePage;