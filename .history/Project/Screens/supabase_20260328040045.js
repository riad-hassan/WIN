import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://udmwahfgikrdxfqtxouq.supabase.co'; // তোমার URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkbXdhaGZnaWtyZHhmcXR4b3VxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDYzNTQxNSwiZXhwIjoyMDkwMjExNDE1fQ.GU_lM7lmPS5fhbg0JUZnokdnCoywvmBqzN7R8shTrks';         // তোমার anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);