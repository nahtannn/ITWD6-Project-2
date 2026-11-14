//Imports
import {createClient} from '@supabase/supabase-js'; // Supabase
const supabaseUrl = 'https://ibvbpjrxxfhoxlpjcpcr.supabase.co'; // Supabase URL
const supabaseAnonKey = 'sb_publishable_B3HlSi5vvBKU1Ov9ldcukg_zp7EuoFM'; // Supabase Anon Key
export const supabase = createClient(supabaseUrl, supabaseAnonKey); // Create Supabase client