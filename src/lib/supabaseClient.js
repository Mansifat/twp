import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase env vars. Make sure .env has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then restart `npm run dev`.'
  )
}

// Single shared Supabase client for the whole app.
// Safe to import this anywhere — it does not create a new connection each time.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
