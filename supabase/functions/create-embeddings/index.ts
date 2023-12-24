import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import {
  env,
  pipeline,
} from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.5.0";
import { supabaseClient } from "../_shared/apiClient.ts";
import { corsHeaders } from "../_shared/cors.ts";

// Configuration for Deno runtime
env.useBrowserCache = false;
env.allowLocalModels = false;
const pipe = await pipeline("feature-extraction", "Supabase/gte-small");
serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {

    // Extract input string from JSON body
    const { input } = await req.json();

    // Generate the embedding from the user input
    const output = await pipe(input, {
      pooling: "mean",
      normalize: true,
    });

    // Extract the embedding output
    const embedding = Array.from(output.data);

    const { data, error } = await supabaseClient
      .from("documents")
      .insert({ text: input, embedding: embedding });
    if (error) {
      throw error;
    }

    return new Response(JSON.stringify("Vector stored Successfully!"), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
