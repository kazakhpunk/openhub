import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export type modelID = keyof typeof models;

export const models = {
  // Populated from OpenRouter models that support `include_reasoning`
  // Source: https://openrouter.ai/api/v1/models
  "openai/gpt-5": "GPT-5",
  "openai/gpt-5-mini": "GPT-5 Mini",
  "openai/gpt-5-nano": "GPT-5 Nano",
  "openai/gpt-5-chat": "GPT-5 Chat",
};

// Allow dynamic model ids returned by the API route
export type DynamicModelID = keyof typeof models | string;

type ModelsApiResponse = {
  data: Array<{
    id: string;
    name: string;
  }>;
};

/**
 * Fetch the reasoning-capable models from our API route and return a map of id -> name.
 * Falls back to the static `models` map on failure.
 */
export async function fetchModelsMap(): Promise<Record<string, string>> {
  try {
    const res = await fetch("/api/models", {
      // Let the browser/CDN cache handle longevity; route sets immutable headers
      cache: "force-cache",
    });

    if (!res.ok) {
      return models as Record<string, string>;
    }

    const body = (await res.json()) as ModelsApiResponse;
    const map = Object.fromEntries(body.data.map((m) => [m.id, m.name]));
    // Ensure we always have at least one model
    return Object.keys(map).length > 0 ? map : (models as Record<string, string>);
  } catch {
    return models as Record<string, string>;
  }
}
