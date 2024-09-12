import { path } from "../../routes/path";
import { TListBarHeader } from "../../types/common.type";

export const listBar: TListBarHeader[] = [
  { title: "Home", path: path.home },
  { title: "Create Product", path: path.createProduct },
  { title: "Products", path: path.products },
];
