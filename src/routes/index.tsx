import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CreateProduct from "../pages/CreateProduct";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products";
import { path } from "./path";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
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
