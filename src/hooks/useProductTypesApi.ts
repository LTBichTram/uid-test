import { useCallback, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { TOption } from "../types/form.type";

const useProductTypesApi = () => {
  const [productTypes, setProductTypes] = useState<TOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductTypes = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data: productTypes, error } = await supabase
      .from("product-types")
      .select("*");

    if (error) {
      setError(error.message);
    } else {
      setProductTypes(productTypes);
    }
    setLoading(false);
  }, []);

  return {
    productTypes,
    loading,
    error,
    fetchProductTypes,
  };
};

export default useProductTypesApi;
