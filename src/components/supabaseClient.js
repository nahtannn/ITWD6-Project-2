import {createClient} from '@supabase/supabase-js';
//const supabaseUrl = 'https://your-supabase-url.supabase.co';
//const supabaseAnonKey = 'your-supabase-anon-key';
const supabaseUrl = 'https://ibvbpjrxxfhoxlpjcpcr.supabase.co';
const supabaseAnonKey = 'sb_publishable_B3HlSi5vvBKU1Ov9ldcukg_zp7EuoFM';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);