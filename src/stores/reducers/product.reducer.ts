import { createSlice } from "@reduxjs/toolkit";
import { TProductStore } from "../../types/product.type";

const initialState: TProductStore = {
  products: [],
  productTypes: [],
  tags: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setProducts: (state, action) => {
      return {
        ...state,
        products: action.payload,
      };
    },
    setProductTypes: (state, action) => {
      return {
        ...state,
        productTypes: action.payload,
      };
    },
    setTags: (state, action) => {
      return {
        ...state,
        tags: action.payload,
      };
    },
  },
});

export const { setProducts, setProductTypes, setTags } = productSlice.actions;

export default productSlice.reducer;
