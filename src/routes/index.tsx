import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import NotFound from "../pages/NotFound";
import { path } from "./path";
import Home from "../pages/Home";
import CreateProduct from "../pages/CreateProduct";
import Products from "../pages/Products";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <HomeLayout />,
    children: [
      {
        path: path.home,
        element: <Home />,
      },
      {
        path: path.createProduct,
        element: <CreateProduct />,
      },
      {
        path: path.products,
        element: <Products />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
