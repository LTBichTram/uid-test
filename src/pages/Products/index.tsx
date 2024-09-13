import { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import SkeletonLoader from "../../components/Loading/SkeletonLoader";
import useProductApi from "../../hooks/useProductApi";
import useProductTypesApi from "../../hooks/useProductTypesApi";
import useTagsApi from "../../hooks/useTagsApi";
import { TColumn } from "../../types/common.type";
import { TProduct } from "../../types/product.type";
import Drawer from "../../components/Drawer";

export default function Products() {
  const { loading, fetchProducts, products, deleteProduct, error } =
    useProductApi();
  const [isOpenDrawer, setIsOpenDrawer] = useState<TProduct | undefined>(
    undefined
  );
  const { productTypes, fetchProductTypes } = useProductTypesApi();
  const { tags, fetchTags } = useTagsApi();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const columns: TColumn[] = [
    { title: "Title" },
    { title: "Price" },
    { title: "Product type" },
    { title: "Tags" },
    { title: "Action" },
  ];

  useEffect(() => {
    fetchProductTypes();
  }, [fetchProductTypes]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return (
    <div>
      <span className="text-xl font-medium mb-4 flex flex-col">Products</span>
      <div className="flex-1 relative">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <table className="table-auto text-nowrap w-full border-collapse border border-solid border-slate-200 text-sm">
            <thead className="z-20 sticky bg-primary/10 top-0 text-white">
              <tr className="">
                {columns?.map((column, index) => (
                  <th
                    className={`border-b font-medium p-3 text-slate-600 ${
                      column?.align === "center"
                        ? "text-center"
                        : column?.align === "right"
                        ? "text-right"
                        : "text-left"
                    }`}
                    key={index}
                  >
                    {column?.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {products?.map((product, index) => (
                <tr key={index}>
                  <td className="border-b border-slate-200 p-4 text-slate-800 ">
                    {product.title}
                  </td>
                  <td className="border-b border-slate-200 p-4 text-slate-800 ">
                    {product.price}
                  </td>
                  <td className="border-b border-slate-200 p-4 text-slate-800 ">
                    {
                      productTypes?.find(
                        (type) => type.value === product?.productType
                      )?.label
                    }
                  </td>
                  <td className="border-b border-slate-200 p-4 text-slate-800 ">
                    <div className="flex flex-wrap gap-2">
                      {product?.tags?.map((tag, index) => (
                        <div
                          key={index}
                          className="rounded-full p-1 px-2 text-primary font-medium bg-primary/10"
                        >
                          {tags?.find((item) => item.value === tag)?.label}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="border-b border-slate-200 p-4 text-slate-800 flex">
                    <div
                      className="flex items-center justify-center h-10 w-10 rounded-full bg-transparent hover:bg-red-100/50 text-secondary cursor-pointer"
                      onClick={() => {
                        deleteProduct(product.id);
                        if (!error) toast.success("Delete successfully!");
                      }}
                    >
                      <MdDelete size={24} />
                    </div>
                    <div
                      className="flex items-center justify-center h-10 w-10 rounded-full bg-transparent hover:bg-slate-50 text-[#2244b] cursor-pointer"
                      onClick={() => {
                        setIsOpenDrawer(product);
                      }}
                    >
                      <FiEdit3 size={20} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Drawer
        title="Edit product"
        open={!!isOpenDrawer}
        dfValue={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(undefined);
        }}
      />
    </div>
  );
}
