import React from "react";
import Container from "@/components/ui/container";
import { Billboard } from "@/components/billboard";
import SearchHero from "@/components/search-hero";
import getBillboards from "@/actions/get-billboard"; 
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import getCategories from "@/actions/get-categories";
import { redirect } from "next/navigation";


export const revalidate = 0;

interface HomePageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>; 
}

const HomePage = async ({ searchParams: searchParamsPromise }: HomePageProps) => {

  const searchParams = await searchParamsPromise; 

  const billboards = await getBillboards(); 
  const billboard = billboards.length > 0 ? billboards[0] : null; 

  const rawSearch = typeof searchParams.searchTerm === 'string' ? searchParams.searchTerm : undefined;
  const searchTerm = rawSearch?.trim();

  if (searchTerm) {
    const matches = await getProducts({ searchTerm });
    if (matches && matches.length > 0) {
      const exact = matches.find(p => p.name.toLowerCase() === searchTerm.toLowerCase());
      const target = exact || matches[0];
      redirect(`/product/${target.id}`);
    }
  }

  const products = await getProducts({
    isFeatured: true,
  });
  const categories = await getCategories();

  return (
    <Container>
      <div className="space-y-10 pb-10">
        {/* Search section above billboard */}
        <SearchHero categories={categories} />
        {billboard && <Billboard data={billboard} />}
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  )
}
export default HomePage;
