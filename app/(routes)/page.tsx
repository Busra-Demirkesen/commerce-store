import React from "react";
import Container from "@/components/ui/container";
import { Billboard } from "@/components/billboard";
import getBillboards from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import SearchBar from "@/components/search-bar"; // Import SearchBar

export const revalidate = 0;

interface HomePageProps {
  searchParams: { // Add searchParams to props
    searchTerm?: string;
  }
}

const HomePage = async ({ searchParams }: HomePageProps) => {

  const billboard = await getBillboards("efc8cdf5-ca62-42b9-857c-6f8baeb40740");

  const products = await getProducts({ isFeatured: true, searchTerm: searchParams.searchTerm }); // Pass searchTerm
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <SearchBar /> {/* Add SearchBar here */}
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>

  )
}
export default HomePage;