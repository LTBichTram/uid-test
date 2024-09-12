import { createSlice } from "@reduxjs/toolkit";
import { TProductStore } from "../../types/product.type";

const initialState: TProductStore = {
  products: [],
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
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
