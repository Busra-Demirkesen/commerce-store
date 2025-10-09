import Container from "@/components/ui/container";
import ContactDetailsCard from "@/components/account/contact-details-card";
import OrdersList from "@/components/account/orders-list";

export const revalidate = 0;

export default function AccountPage() {
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">My Account</h1>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ContactDetailsCard />
            <OrdersList />
          </div>
        </div>
      </Container>
    </div>
  );
}
