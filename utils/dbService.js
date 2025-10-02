import { supabase } from "./supabaseClient"; // Adjust path if needed

export async function getBeans() {
  const { data, error } = await supabase.from("beans_catalog").select("*");

  if (error) {
    console.error(
      "❌ Failed to connect or fetch from Supabase:",
      error.message,
    );
    return { success: false, data: [], error: error.message };
  }

  console.log("✅ Successfully connected to Supabase and fetched data.");
  return { success: true, data: data ?? [], error: null };
}
