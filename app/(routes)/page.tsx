import React from "react";
import Container from "@/components/ui/container";
import { Billboard } from "@/components/billboard";
import getBillboards from "@/actions/get-billboard"; // <<< Burayı düzeltiyoruz, get-billboard olmalı
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import SearchBar from "@/components/search-bar";

export const revalidate = 0;

interface HomePageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  // getBillboards artık ID almadan tüm billboard'ları çekecek şekilde güncellendi
  const billboards = await getBillboards(); // <<< ID'yi kaldırdık

  // Eğer birden fazla billboard varsa ilkini al, yoksa null olsun
  const billboard = billboards.length > 0 ? billboards[0] : null; // <<< Liste kontrolü ekledik

  const products = await getProducts({ isFeatured: true, searchTerm: searchParams.searchTerm });

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