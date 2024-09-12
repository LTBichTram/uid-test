import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.log(SUPABASE_ANON_KEY);
  throw new Error("Missing Supabase URL or API key in environment variables.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// const client = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

// export const supabase = () => client;
