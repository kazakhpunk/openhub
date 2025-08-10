import { NextResponse } from "next/server";

type OpenRouterModel = {
  id: string;
  name: string;
  architecture?: {
    input_modalities?: string[];
  };
};

type ModelsResponse = {
  data: Array<Pick<OpenRouterModel, "id" | "name">>;
};

export const dynamic = "force-static";
export const revalidate = 60 * 60 * 24 * 365; // ~1 year

export async function GET() {
  const apiUrl = "https://openrouter.ai/api/v1/models";

  const headers: Record<string, string> = { Accept: "application/json" };
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  try {
    const res = await fetch(apiUrl, { headers, next: { revalidate } });
    if (!res.ok) return NextResponse.json({ data: [] }, { status: res.status });
    const json = (await res.json()) as { data: OpenRouterModel[] };
    const filtered = json.data.filter((m) =>
      Array.isArray(m.architecture?.input_modalities) &&
      m.architecture!.input_modalities!.includes("image")
    );
    const payload: ModelsResponse = {
      data: filtered.map((m) => ({ id: m.id, name: m.name })),
    };
    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ data: [] }, { status: 200 });
  }
}


