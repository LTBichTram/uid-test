import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TProductStore } from "../../types/product.type";
import productReducer from "./product.reducer";

export interface IRootState {
  product: TProductStore;
}

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export const useRootSelector = <T>(
  selector: (state: IRootState) => T,
  defaultValue?: T
): T | undefined => {
  try {
    const value = useSelector(selector);
    return value || defaultValue;
  } catch {
    return defaultValue;
  }
};

export default store;
