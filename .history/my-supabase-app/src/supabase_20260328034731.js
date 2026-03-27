import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://udmwahfgikrdxfqtxouq.supabase.co'; // তোমার URL
const SUPABASE_ANON_KEY = 'your-anon-key';         // তোমার anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);