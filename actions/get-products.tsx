import { Product } from "@/types";
import qs from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;


interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  searchTerm?: string; // Add searchTerm here
}

const getProducts = async (query:Query) : Promise<Product[]> => {

  const url = qs.stringifyUrl({
     url:URL,
     query:{
      colorId: query.colorId,
      sizeId:query.sizeId,
      categoryId:query.categoryId,
      isFeatured:query.isFeatured, // Yorum satırı kaldırıldı
      searchTerm: query.searchTerm, // Pass searchTerm to the API
     }
  })

  // console.log("API'ye gönderilen URL:", url); // Yorum satırı yapıldı

    const response = await fetch(url);

  // console.log("API yanıt durumu:", response.ok, response.status); // Yorum satırı yapıldı
  // const responseText = await response.text(); // Yorum satırı yapıldı
  // console.log("API'den gelen ham yanıt:", responseText); // Yorum satırı yapıldı

    return response.json(); // Eski haline getirildi
}

export default getProducts;