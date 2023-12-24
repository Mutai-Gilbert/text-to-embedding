import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const supabaseClient = await createClient(
  Deno.env.get("https://mkxypgtnygxenagtejko.supabase.co") ?? "",
  Deno.env.get("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1reHlwZ3RueWd4ZW5hZ3RlamtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0MDIwNjMsImV4cCI6MjAxODk3ODA2M30.knML223u4JdXA3Lql5B7mrR4esYrvgi01Sl2Yap8Zug") ?? ""
);
