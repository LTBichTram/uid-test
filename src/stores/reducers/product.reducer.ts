import { createSlice } from "@reduxjs/toolkit";
import { TProductStore } from "../../types/product.type";

const initialState: TProductStore = {
  products: [],
  productTypes: [],
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
  },
});

export const { setProducts, setProductTypes } = productSlice.actions;

export default productSlice.reducer;
