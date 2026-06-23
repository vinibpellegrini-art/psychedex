import { createClient } from "@supabase/supabase-js";

// Supabase credentials come from environment variables (see .env.example).
// Vite only exposes vars prefixed with VITE_ to the browser bundle.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars. Copy .env.example to .env and fill in " +
      "VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

// Shared Supabase client used across the app.
// The anon key is public by design; the data is protected by Row-Level
// Security (read-only) configured in db/schema.sql.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Shape of a row from the `substances_view` database view.
export type Substance = {
  id: number;
  name: string;
  category: string;
  legal_status: string | null;
  duration: string;
  description: string;
  pubchem_cid: number | null;
};
