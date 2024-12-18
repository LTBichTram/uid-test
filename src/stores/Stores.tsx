import React from "react";
import { Provider } from "react-redux";
import store from "./reducers/root";

const Stores = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Stores;
