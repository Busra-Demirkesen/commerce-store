import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`; // Bu satır değişmedi

// Artık ID parametresi almıyor ve Promise<Billboard[]> döndürüyor
const getBillboards = async (): Promise<Billboard[]> => {
    const response = await fetch(URL); // ID olmadan tüm billboard'ları çekiyor

    return response.json();
}

export default getBillboards;