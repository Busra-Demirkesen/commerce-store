import Link from "next/link";
import Container from "@/components/ui/container";
import getCategories from "@/actions/get-categories";
import { Instagram, Twitter, Facebook } from "lucide-react";

const Footer = async () => {
  const categories = await getCategories();

  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/youraccount";
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/youraccount";
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/youraccount";

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Brand / Tagline */}
            <div>
              <p className="text-sm md:text-base leading-relaxed">
                © 2025 Techno Trend
                <br />
                <span className="text-gray-300">The perfect balance of design and technology.</span>
              </p>
              <div className="mt-4 flex items-center gap-4">
                <Link href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram size={20} className="text-white/80 hover:text-white transition" />
                </Link>
                <Link href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter size={20} className="text-white/80 hover:text-white transition" />
                </Link>
                <Link href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook size={20} className="text-white/80 hover:text-white transition" />
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-300">Categories</h3>
              <ul className="mt-3 space-y-2">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link href={`/category/${c.id}`} className="text-sm text-white/90 hover:text-white underline-offset-4 hover:underline">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-300">Support</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/contact" className="text-sm text-white/90 hover:text-white underline-offset-4 hover:underline">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="text-sm text-white/90 hover:text-white underline-offset-4 hover:underline">
                    Order tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/60">
            <p>All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
