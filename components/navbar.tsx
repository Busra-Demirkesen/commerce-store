import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import SearchBar from "./search-bar"; // SearchBar'ı import ediyoruz
export const revalidate = 0; // Disable revalidation for this component

const Navbar = async () =>{

    const categories = await getCategories();
    return(
        <>
        <div className="border-b ">
            <Container>
                <div className="realative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                <Link href="/" className="ml-4 lg:ml-0 gap-x-2">
                    <p className="font-bold text-xl text-end ">TECHNO TREND</p>
                </Link>
                <MainNav data={categories} />
                {/* <SearchBar /> */}
                <div className="ml-auto flex items-center gap-x-4">
                  <NavbarActions/>
                </div>
                </div>
            </Container>
        </div>
        </>
    )
}
export default Navbar;