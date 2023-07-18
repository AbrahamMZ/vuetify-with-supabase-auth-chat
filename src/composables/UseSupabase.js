// UseSupabase.js
import { createClient } from "@supabase/supabase-js";
import useAuthUser from "@/composables/UseAuthUser";

// these can come from an environment variable if desired
// not required however as they are 100% exposed on the client side anyway
// and that's ok, Supabase expects this (security is provided by Row Level Security)
const supabaseUrl = "https://yistemqlsgxmnefvjdzs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlpc3RlbXFsc2d4bW5lZnZqZHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2MDM3NzMsImV4cCI6MjAwNTE3OTc3M30.b5Kq9WWHOmIqkBvtEXy-RzIjxDpt9y0kCCDtROXrPQo";

// setup client
const supabase = createClient(supabaseUrl, supabaseKey);

// ⬇ setup auth state listener ⬇
supabase.auth.onAuthStateChange((event, session) => {
  // the "event" is a string indicating what trigger the state change (ie. SIGN_IN, SIGN_OUT, etc)
  // the session contains info about the current session most importanly the user dat
const { user } = useAuthUser();

  // if the user exists in the session we're logged in
  // and we can set our user reactive ref
user.value = session?.user || null;
});
// expose supabase client
export default function useSupabase() {
  return { supabase };
}

