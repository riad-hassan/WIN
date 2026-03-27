import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://udmwahfgikrdxfqtxouq.supabase.co'; // তোমার URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkbXdhaGZnaWtyZHhmcXR4b3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MzU0MTUsImV4cCI6MjA5MDIxMTQxNX0.I2sVyCjmvuNALkIWCG83HOW2mpfEDbgXMTYxzlELzxc';         // তোমার anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);