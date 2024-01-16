import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { env, pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.5.0'
import corsHeader from "../_shared/cors.ts"

// Configuration for Deno runtime
env.useBrowserCache = false;
env.allowLocalModels = false;

const pipe = await pipeline(
  'feature-extraction',
  'Supabase/gte-small',
);

serve(async (req) => {
    
    if (req.method == "OPTIONS"){
        return new Response("ok", { headers: corsHeader})
    };

    // Extract input string from JSON body
  const { input } = await req.json();

  // Generate the embedding from the user input
  const output = await pipe(input, {
    pooling: 'mean',
    normalize: true,
  });

  // Extract the embedding output
  const embedding = Array.from(output.data);

  // Return the embedding
  return new Response(
    JSON.stringify({ embedding }),
    { headers: { ...corsHeader, 'Content-Type': 'application/json' } }
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/textembed' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
