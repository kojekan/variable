import { supabase } from './supabaseClient'; // Adjust path if needed

// export async function getBeans() {
//   const { data, error } = await supabase.from('beans_catalogue').select('*').where('Online', 'eq', 'TRUE');

//   if (error) {
//     console.error(
//       '❌ Failed to connect or fetch from Supabase:',
//       error.message,
//     );
//     return { success: false, data: [], error: error.message };
//   }

//   console.log('✅ Successfully connected to Supabase and fetched data.');
//   return { success: true, data: data ?? [], error: null };
// }

export async function getRoastProfile(beanId) {
  const { data, error } = await supabase
    .from('roast_profile')
    .select('*')
    .eq('idbeans', beanId)
    .order('time', { ascending: true });

  if (error) {
    console.error(
      '❌ Failed to fetch roast profile from Supabase:',
      error.message,
    );
    return { success: false, data: [], error: error.message };
  }

  console.log('✅ Successfully fetched roast profile data.');
  return { success: true, data: data ?? [], error: null };
}

export async function getBrewChart(filters = {}) {
  const query = supabase.from('brew_chart').select('*');

  if (filters.id) query.eq('id', filters.id);
  if (filters.beanId) query.eq('beans_id', filters.beanId);
  if (filters.limit) query.limit(filters.limit);
  if (filters.orderBy) {
    query.order(filters.orderBy, { ascending: !!filters.ascending });
  }

  const { data, error } = await query;

  if (error) {
    console.error('❌ Failed to fetch brew chart from Supabase:', error.message);
    return { success: false, data: [], error: error.message };
  }

  return { success: true, data: data ?? [], error: null };
}
