import Link from "next/link";
import Image from "next/image";
import Container from "./ui/container";
import MobileNav from "./mobile-nav";
import NavCenter from "./nav-center";
import MainNav from "./main-nav";
import SearchSlot from "./search-slot";
import MobileSearchBelow from "./mobile-search-below";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import DesktopActionsOrdered from "./desktop-actions-ordered";






export const revalidate = 0; 

const Navbar = async () =>{

    const categories = await getCategories();
    

    return(
        <>
        <div className="border-b ">
            <Container>
                {}
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
                {}
                <MobileSearchBelow />

                {}
                <div className="relative px-4 sm:px-6 lg:px-8 h-16 items-center hidden lg:flex w-full">
                    <Link href="/" className="ml-4 lg:ml-0 gap-x-2 shrink-0 flex items-center" aria-label="Home">
                        <Image src="/logo (2).png" alt="Techno Trend" width={200} height={75} priority className="h-11 w-auto" />
                    </Link>
                    <div className="ml-6 shrink-0">
                        <MainNav data={categories} />
                    </div>
                    {}
                    <SearchSlot />
                    <div className="ml-auto">
                        <DesktopActionsOrdered />
                    </div>
                </div>
            </Container>
        </div>
        </>
    )
}
export default Navbar;
