export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;

}

export interface Category {
    id: string;
    name: string;
    billboard: Billboard | null;
}

export interface Product {
  id: string;
  category: Category;
  name:string;
  price:number; // <<< string yerine number olarak düzeltildi
  isFeatured:boolean;
  size:Size;
  color:Color;
  images:Image[];
  stock: number; // <<< Yeni eklendi
}

export interface Image{
  id:string;
  url:string;
}

export interface Size{
  id:string;
  name:string;
  value:string;
}

export interface Color{
  id:string;
  name:string;
  value:string;
}