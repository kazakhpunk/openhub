import { NextResponse } from "next/server";

type OpenRouterModel = {
  id: string;
  name: string;
  created: number;
  description: string;
  architecture: {
    input_modalities?: string[];
    output_modalities?: string[];
    tokenizer?: string;
    instruct_type?: string | null;
  };
  top_provider?: {
    is_moderated?: boolean;
    context_length?: number;
    max_completion_tokens?: number;
  };
  pricing?: Record<string, string>;
  canonical_slug?: string;
  context_length?: number;
  hugging_face_id?: string | null;
  per_request_limits?: Record<string, unknown> | null;
  supported_parameters?: string[];
};

type OpenRouterModelsResponse = {
  data: OpenRouterModel[];
};

export const dynamic = "force-static";
export const revalidate = 31536000; // 1 year in seconds

export async function GET() {
  const apiUrl = "https://openrouter.ai/api/v1/models";

  // Include API key if available, but don't require it
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  // Optional but recommended by OpenRouter
  if (process.env.NEXT_PUBLIC_APP_URL) {
    headers["HTTP-Referer"] = process.env.NEXT_PUBLIC_APP_URL;
  }
  headers["X-Title"] = process.env.NEXT_PUBLIC_APP_NAME ?? "OpenHub";

  try {
    const res = await fetch(apiUrl, {
      headers,
      // Cache on the server for revalidate seconds
      next: { revalidate },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch models from OpenRouter" },
        { status: res.status }
      );
    }

    const body = (await res.json()) as OpenRouterModelsResponse;
    const filtered = body.data.filter((m) =>
      Array.isArray(m.supported_parameters) &&
      m.supported_parameters.includes("include_reasoning")
    );

    const response: OpenRouterModelsResponse = { data: filtered };
    return NextResponse.json(response, {
      status: 200,
      headers: {
        // Cache aggressively on both browser and CDN
        "Cache-Control":
          "public, max-age=31536000, s-maxage=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while fetching models" },
      { status: 500 }
    );
  }
}


