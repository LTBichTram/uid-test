import { TOption } from "./form.type";

export type TProduct = {
  id: string;
  title: string;
  description: string;
  price: string;
  productType?: string;
};

export type TProductStore = {
  products: TProduct[];
  productTypes: TOption[];
};
