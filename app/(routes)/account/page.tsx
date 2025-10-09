import Container from "@/components/ui/container";

export const revalidate = 0;

export default function AccountPage() {
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">My Account</h1>
          <p className="mt-4 text-gray-600">This is your account area. We will enhance this page soon.</p>
        </div>
      </Container>
    </div>
  );
}

