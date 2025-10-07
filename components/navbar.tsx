import Link from "next/link";
import Container from "./ui/container";
import MobileNav from "./mobile-nav";
import NavCenter from "./nav-center";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
// import SearchBar from "./search-bar"; // SearchBar'ı import ediyoruz
// import { Search } from "lucide-react"; // Search icon'u import ediyoruz
// import { useSearch } from "@/providers/search-modal-provider"; // useSearch hook'unu import ediyoruz
// import SearchBar from "./search-bar";
// import SearchIconClient from "./search-icon-client"; // Yeni oluşturacağımız SearchIconClient bileşenini import ediyoruz

export const revalidate = 0; // Disable revalidation for this component

const Navbar = async () =>{

    const categories = await getCategories();
    // const { onOpen, isOpen } = useSearch(); // useSearch hook'unu kullanıyoruz

    return(
        <>
        <div className="border-b ">
            <Container>
                {/* Mobile / Tablet layout: hamburger left, title centered, actions right */}
                <div className="relative px-4 sm:px-6 lg:px-8 h-16 items-center grid grid-cols-3 md:grid-cols-3 lg:hidden">
                    <div className="flex items-center">
                        <MobileNav data={categories} />
                    </div>
                    <div className="flex items-center justify-center">
                        <NavCenter data={categories} title="techno trend" />
                    </div>
                    <div className="flex items-center justify-end">
                        <NavbarActions/>
                    </div>
                </div>

                {/* Desktop layout */}
                <div className="relative px-4 sm:px-6 lg:px-8 h-16 items-center hidden lg:flex">
                    <Link href="/" className="ml-4 lg:ml-0 gap-x-2">
                        <p className="font-bold text-xl">techno trend</p>
                    </Link>
                    <div className="flex-1 flex justify-center">
                        <NavCenter data={categories} title="techno trend" />
                    </div>
                    <NavbarActions/>
                </div>
            </Container>
        </div>
        </>
    )
}
export default Navbar;
