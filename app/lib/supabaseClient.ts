import { createClient } from '@supabase/supabase-js';

const supabaseClient = createClient(process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!);
export default supabaseClient;