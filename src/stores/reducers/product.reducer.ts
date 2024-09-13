import { createSlice } from "@reduxjs/toolkit";
import { TProductStore } from "../../types/product.type";

const initialState: TProductStore = {
  products: [],
  productTypes: [],
  tags: [],
  fetchUpdate: false,
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
    setFetchUpdate: (state) => {
      return {
        ...state,
        fetchUpdate: !state?.fetchUpdate,
      };
    },
  },
});

export const { setProducts, setProductTypes, setTags, setFetchUpdate } =
  productSlice.actions;

export default productSlice.reducer;
