import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "YOUR_URL",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkbXdhaGZnaWtyZHhmcXR4b3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MzU0MTUsImV4cCI6MjA5MDIxMTQxNX0.I2sVyCjmvuNALkIWCG83HOW2mpfEDbgXMTYxzlELzxc"
);