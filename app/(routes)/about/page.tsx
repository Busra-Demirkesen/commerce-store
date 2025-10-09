import Container from "@/components/ui/container";

export const revalidate = 0;

export default function AboutPage() {
  return (
    <div className="bg-[#FDF8F6]">
      <Container>
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">About Techno Trend</h1>
            <p className="mt-4 text-gray-600 text-base md:text-lg">
              We make life easier with technology — bringing the future into today.
            </p>
          </div>

          {/* Cards grid: clean, two columns on desktop, one on mobile */}
          <div className="mx-auto mt-10 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">Our Vision</h2>
              <p className="mt-3 leading-relaxed text-gray-700">
                To bring the technology of tomorrow into today — making innovation, quality, and smart living accessible to everyone.
              </p>
            </article>

            <article className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">Our Mission</h2>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-gray-700">
                <li>To provide cutting-edge tech products from trusted brands</li>
                <li>To make innovation affordable and accessible</li>
                <li>To deliver transparent service and strong after-sales support</li>
              </ul>
            </article>

            <article className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">Our Story</h2>
              <p className="mt-3 leading-relaxed text-gray-700">
                Our journey began with a simple idea — to make advanced technology part of everyday life. Founded in [year], we started as a small
                workshop and have grown into a nationwide tech retailer. We continue to expand our collection with the same passion and commitment to
                quality, innovation, and customer satisfaction.
              </p>
            </article>

            <article className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">Technology & Products</h2>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-gray-700">
                <li><span className="font-medium">Trusted Partnerships:</span> We collaborate with global tech leaders and verified suppliers.</li>
                <li><span className="font-medium">Quality Testing:</span> Every product goes through performance and safety checks before it reaches our customers.</li>
                <li><span className="font-medium">Innovative Categories:</span> Smart home devices, wearables, gaming gear, PC components, and more.</li>
                <li><span className="font-medium">Always Up-to-Date:</span> We constantly track emerging technologies and refresh our catalog to keep you ahead of the curve.</li>
              </ul>
            </article>

            <article className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">Our Values</h2>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-gray-700">
                <li><span className="font-medium">Customer-Centric</span> — Every decision starts with our customers in mind.</li>
                <li><span className="font-medium">Transparency</span> — Clear pricing, honest information, and open communication.</li>
                <li><span className="font-medium">Sustainability</span> — We care about minimizing our environmental footprint in packaging and logistics.</li>
                <li><span className="font-medium">Quality & Trust</span> — Every product we offer is backed by warranty and reliability.</li>
                <li><span className="font-medium">Innovation Spirit</span> — We never stop learning, improving, and innovating.</li>
              </ul>
            </article>

            <article className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">Our Team</h2>
              <p className="mt-3 text-gray-700">We’re a small but passionate team of tech enthusiasts:</p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-gray-700">
                <li>Founder & CEO – Leads product vision and company strategy</li>
                <li>Product Manager – Oversees portfolio selection and supply chain</li>
                <li>Customer Experience Lead – Ensures top-tier support and satisfaction</li>
                <li>Technical Specialists – Build our systems, maintain platform performance, and innovate daily</li>
              </ul>
            </article>
          </div>
        </div>
      </Container>
    </div>
  );
}
