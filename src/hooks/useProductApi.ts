import { useState, useCallback } from "react";
import { supabase } from "../services/supabaseClient";
import { TProduct } from "../types/product.type";

const useProductApi = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
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

  // Delete
  const deleteProduct = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      setProducts((prev) => prev?.filter((p) => p.id !== id) || null);
    }
    setLoading(false);
  }, []);

  // Update
  const updateProduct = useCallback(
    async (id: number, updatedProduct: Partial<TProduct>) => {
      setLoading(true);
      setError(null);
      const { error } = await supabase
        .from("products")
        .update(updatedProduct)
        .eq("id", id);

      if (error) {
        setError(error.message);
      } else {
        setProducts(
          (prev) =>
            prev?.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)) ||
            null
        );
      }
      setLoading(false);
    },
    []
  );

  return {
    products,
    loading,
    error,
    fetchProductById,
    createProduct,
    fetchProducts,
    deleteProduct,
    updateProduct,
  };
};

export default useProductApi;
