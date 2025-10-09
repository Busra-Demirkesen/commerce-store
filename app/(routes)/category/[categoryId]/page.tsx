
import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";

import { Billboard } from "@/components/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import MobileFilters from "./components/mobile-filters";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

export const revalidate = 0;

type PageProps = {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ colorId?: string; sizeId?: string }>;
};

async function CategoryPage({ params, searchParams }: PageProps) {
  const { categoryId } = await params;
  const { colorId, sizeId } = await searchParams;

  const [products, sizes, colors, category] = await Promise.all([
    getProducts({ categoryId, colorId, sizeId }),
    getSizes(),
    getColors(),
    getCategory(categoryId),
  ]);

  return (
    <div className="bg-[#FDF8F6]">
      <Container>
        {category?.billboard && <Billboard data={category.billboard} />}

        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} colors={colors} />

            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>

            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CategoryPage;
