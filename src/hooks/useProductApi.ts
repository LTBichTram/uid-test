import { useState, useCallback } from "react";
import { supabase } from "../services/supabaseClient";
import { TProduct } from "../types/product.type";
import { setProducts } from "../stores/reducers/product.reducer";

const useProductApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data: products, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      setError(error.message);
    } else {
      console.log(products);
      setProducts(products);
    }
    setLoading(false);
  }, []);

  const fetchProductById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      setError(error.message);
    } else {
      console.log(data);
    }
    setLoading(false);
  }, []);

  // Create product
  const createProduct = useCallback(
    async (newProduct: Omit<TProduct, "id">) => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("products")
        .insert([newProduct]);

      if (error) {
        setError(error.message);
      } else {
        console.log(data);
      }
      setLoading(false);
    },
    []
  );

  // Cập nhật sản phẩm
  //   const updateProduct = useCallback(async (id: number, updatedProduct: Partial<Product>) => {
  //     setLoading(true);
  //     setError(null);
  //     const { data, error } = await supabase.from('products').update(updatedProduct).eq('id', id);

  //     if (error) {
  //       setError(error.message);
  //     } else {
  //       setProducts(prev => prev?.map(p => (p.id === id ? { ...p, ...updatedProduct } : p)) || null);
  //     }
  //     setLoading(false);
  //   }, []);

  // Xóa sản phẩm
  //   const deleteProduct = useCallback(async (id: number) => {
  //     setLoading(true);
  //     setError(null);
  //     const { error } = await supabase.from('products').delete().eq('id', id);

  //     if (error) {
  //       setError(error.message);
  //     } else {
  //       setProducts(prev => prev?.filter(p => p.id !== id) || null);
  //     }
  //     setLoading(false);
  //   }, []);

  // Bulk update sản phẩm
  //   const bulkUpdateProducts = useCallback(async (ids: number[], updatedData: Partial<Product>) => {
  //     setLoading(true);
  //     setError(null);
  //     const { data, error } = await supabase.from('products').update(updatedData).in('id', ids);

  //     if (error) {
  //       setError(error.message);
  //     } else {
  //       setProducts(prev => prev?.map(p => (ids.includes(p.id) ? { ...p, ...updatedData } : p)) || null);
  //     }
  //     setLoading(false);
  //   }, []);

  // Bulk delete sản phẩm
  //   const bulkDeleteProducts = useCallback(async (ids: number[]) => {
  //     setLoading(true);
  //     setError(null);
  //     const { error } = await supabase.from('products').delete().in('id', ids);

  //     if (error) {
  //       setError(error.message);
  //     } else {
  //       setProducts(prev => prev?.filter(p => !ids.includes(p.id)) || null);
  //     }
  //     setLoading(false);
  //   }, []);

  return {
    loading, // Trạng thái đang tải
    error,
    fetchProductById, // Lấy một sản phẩm cụ thể
    createProduct,
    fetchProducts,
  };
};

export default useProductApi;
