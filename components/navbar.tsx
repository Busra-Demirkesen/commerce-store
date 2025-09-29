import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
// import { Search } from "lucide-react"; // Search icon'u import ediyoruz
// import { useSearch } from "@/providers/search-modal-provider"; // useSearch hook'unu import ediyoruz
// import SearchBar from "./search-bar";
import SearchIconClient from "./search-icon-client"; // Yeni oluşturacağımız SearchIconClient bileşenini import ediyoruz

export const revalidate = 0; // Disable revalidation for this component

const Navbar = async () =>{

    const categories = await getCategories();
    // const { onOpen, isOpen } = useSearch(); // useSearch hook'unu kullanıyoruz

    return(
        <>
        <div className="border-b ">
            <Container>
                <div className="realative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                <Link href="/" className="ml-4 lg:ml-0 gap-x-2">
                    <p className="font-bold text-xl text-end ">TECHNO TREND</p>
                </Link>
                <MainNav data={categories} />
                <div className="relative flex items-center gap-x-2 ml-6">
                    {/* <button onClick={onOpen} className="flex items-center rounded-full p-2 bg-gray-100 hover:bg-gray-200">
                        <Search size={20} color="black" />
                    </button> */}
                    <SearchIconClient /> {/* SearchIconClient bileşenini buraya ekledik */}
                    {/* <SearchBar isOpen={isOpen} onClose={() => {}} /> */}
                </div>
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