import React from "react";
import Container from "@/components/ui/container";
import { Billboard } from "@/components/billboard";
import getBillboards from "@/actions/get-billboard"; 
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";


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

  const products = await getProducts({
    isFeatured: true, 
    searchTerm: typeof searchParams.searchTerm === 'string' ? searchParams.searchTerm : undefined,
  });

  return (
    <Container>
      <div className="space-y-10 pb-10">
        {billboard && <Billboard data={billboard} />} {}
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          {} {}
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  )
}
export default HomePage;