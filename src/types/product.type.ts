import { TOption } from "./form.type";

export type TProduct = {
  id: string;
  title: string;
  description: string;
  price: string;
  productType?: string;
  tags?: string[];
};

export type TProductStore = {
  products: TProduct[];
  productTypes: TOption[];
  tags: TOption[];
};
