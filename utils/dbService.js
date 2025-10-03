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

export async function getRoastProfile(beanId) {
  const { data, error } = await supabase
    .from("roast_profile")
    .select("*")
    .eq("idbeans", beanId)
    .order("time", { ascending: true });

  if (error) {
    console.error(
      "❌ Failed to fetch roast profile from Supabase:",
      error.message,
    );
    return { success: false, data: [], error: error.message };
  }

  console.log("✅ Successfully fetched roast profile data.");
  return { success: true, data: data ?? [], error: null };
}
