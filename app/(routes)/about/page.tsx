import Container from "@/components/ui/container";

export const revalidate = 0;

export default function AboutPage() {
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">About</h1>
          <p className="mt-4 text-gray-600">
            This is the About page. Add content about your store, mission and team here.
          </p>
        </div>
      </Container>
    </div>
  );
}

