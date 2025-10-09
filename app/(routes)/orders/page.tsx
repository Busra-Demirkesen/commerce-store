import Container from "@/components/ui/container";
import OrdersList from "@/components/account/orders-list";

export const revalidate = 0;

export default function OrdersPage() {
  return (
    <div className="bg-[#FDF8F6]">
      <Container>
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">My Orders</h1>
          <div className="mt-8">
            <OrdersList />
          </div>
        </div>
      </Container>
    </div>
  );
}

