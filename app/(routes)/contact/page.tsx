import Container from "@/components/ui/container";
import { Headset, Handshake, MapPin, Phone } from "lucide-react";
import ContactForm from "./sections/contact-form";

export const revalidate = 0;

export default function ContactPage() {
  return (
    <div className="bg-[#FDF8F6]">
      <Container>
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Get in Touch With Us</h1>
            <p className="mt-4 text-gray-600 text-base md:text-lg">
              Have a question about our products, your order, or a partnership opportunity? Fill out the form below and our team will get back to you within 24 hours.
            </p>
            <p className="mt-2 text-gray-500 text-sm">We believe great service starts with great communication.</p>
          </div>

          {/* Info Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <InfoCard
              icon={<Headset className="h-5 w-5" />}
              title="Customer Support"
              lines={["For product help, order tracking, or warranty requests.", "support@yourstore.com"]}
            />
            <InfoCard
              icon={<Handshake className="h-5 w-5" />}
              title="Business & Partnerships"
              lines={["For brand collaborations and wholesale inquiries.", "biz@yourstore.com"]}
            />
            <InfoCard
              icon={<MapPin className="h-5 w-5" />}
              title="Showroom & Pickup"
              lines={["Your Street 123, Your City"]}
            />
            <InfoCard
              icon={<Phone className="h-5 w-5" />}
              title="Quick Contact"
              lines={["+90 (555) 000 00 00", "Mon–Fri, 09:00–18:00"]}
            />
          </div>

          {/* Contact Form */}
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

function InfoCard({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 text-gray-900">
        {icon}
        <h3 className="text-sm font-semibold uppercase tracking-wide">{title}</h3>
      </div>
      <div className="mt-3 space-y-1 text-sm text-gray-700">
        {lines.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
      </div>
    </div>
  );
}
