import { useCallback, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { TOption } from "../types/form.type";

const useTagsApi = () => {
  const [tags, setTags] = useState<TOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTags = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data: tags, error } = await supabase.from("tags").select("*");

    if (error) {
      setError(error.message);
    } else {
      setTags(tags);
    }
    setLoading(false);
  }, []);

  return {
    tags,
    loading,
    error,
    fetchTags,
  };
};

export default useTagsApi;
