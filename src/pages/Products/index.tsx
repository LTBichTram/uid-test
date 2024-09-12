import { useEffect } from "react";
import SkeletonLoader from "../../components/Loading/SkeletonLoader";
import useProductApi from "../../hooks/useProductApi";
import { useRootSelector } from "../../stores/reducers/root";
import { TColumn } from "../../types/common.type";

export default function Products() {
  const { loading, fetchProducts, products } = useProductApi();
  const productTypes = useRootSelector((state) => state.product.productTypes);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const columns: TColumn[] = [
    { title: "Title" },
    { title: "Price" },
    { title: "Product type" },
  ];

  console.log(productTypes);

  return (
    <div>
      <span className="text-xl font-medium mb-4 flex flex-col">Products</span>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="flex-1 relative">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
