export interface Template {
  id: string;
  name: string;
  description: string;
  category:
    | "text-to-image"
    | "text-to-text"
    | "image-to-text"
    | "text-to-audio"
    | "text-to-video";
  tags: string[];
  uses: number;
  featured?: boolean;
}

export const templates: Template[] = [
  // Reasoning Starter (Text to Text)
  {
    id: "ai-sdk-reasoning-starter",
    name: "AI SDK Reasoning Starter",
    description:
      "Experiment with reasoning-capable models and share configured sessions",
    category: "text-to-text",
    tags: ["reasoning", "openrouter", "nextjs", "ai-sdk"],
    uses: 0,
    featured: true,
  },
  {
    id: "morphic",
    name: "Morphic",
    description:
      "AI-powered search engine with customizable models and beautiful interface",
    category: "text-to-text",
    tags: ["search", "ai", "research", "morphic"],
    uses: 12500,
    featured: true,
  },
  {
    id: "alt-tag-generator",
    name: "Alt Tag Generator",
    description: "Upload or paste an image and generate concise, accessible alt text.",
    category: "image-to-text",
    tags: ["accessibility", "caption", "openrouter", "nextjs"],
    uses: 0,
    featured: true,
  }
];
