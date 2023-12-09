import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mqsimekkyfkyfnfqusat.supabase.com";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xc2ltZWtreWZreWZuZnF1c2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4NTUzNjQsImV4cCI6MjAxNzQzMTM2NH0.CRev61GpoEwhLInd76EmwM60TWlxwk0dMzxGVXixZyk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
