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
  // Text to Image Templates
  {
    id: "ai-art-generator",
    name: "AI Art Generator",
    description:
      "Create stunning artwork from text descriptions using advanced diffusion models",
    category: "text-to-image",
    tags: ["art", "creative", "diffusion", "stable-diffusion"],
    uses: 15420,
    featured: true,
  },

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
    id: "logo-maker",
    name: "Logo Maker",
    description:
      "Generate professional logos for your brand with AI assistance",
    category: "text-to-image",
    tags: ["logo", "branding", "business", "design"],
    uses: 8930,
  },
  {
    id: "product-mockup",
    name: "Product Mockup Generator",
    description:
      "Create realistic product mockups for e-commerce and marketing",
    category: "text-to-image",
    tags: ["mockup", "product", "ecommerce", "marketing"],
    uses: 6750,
  },
  {
    id: "character-creator",
    name: "Character Creator",
    description: "Design unique characters for games, stories, and animations",
    category: "text-to-image",
    tags: ["character", "game", "animation", "creative"],
    uses: 12340,
  },

  // Text to Text Templates
  {
    id: "content-writer",
    name: "Content Writer",
    description:
      "Generate high-quality blog posts, articles, and marketing copy",
    category: "text-to-text",
    tags: ["writing", "content", "blog", "marketing"],
    uses: 23450,
    featured: true,
  },
  {
    id: "code-assistant",
    name: "Code Assistant",
    description: "Get help with coding, debugging, and code explanations",
    category: "text-to-text",
    tags: ["coding", "programming", "debug", "development"],
    uses: 18920,
  },
  {
    id: "email-composer",
    name: "Email Composer",
    description: "Craft professional emails for business and personal use",
    category: "text-to-text",
    tags: ["email", "business", "communication", "professional"],
    uses: 9870,
  },
  {
    id: "story-generator",
    name: "Story Generator",
    description: "Create engaging stories, novels, and creative writing pieces",
    category: "text-to-text",
    tags: ["story", "creative", "writing", "fiction"],
    uses: 14560,
  },
  {
    id: "social-media-manager",
    name: "Social Media Manager",
    description: "Generate engaging posts for all your social media platforms",
    category: "text-to-text",
    tags: ["social-media", "posts", "engagement", "marketing"],
    uses: 11230,
  },

  // Image to Text Templates
  {
    id: "image-analyzer",
    name: "Image Analyzer",
    description: "Extract detailed descriptions and insights from any image",
    category: "image-to-text",
    tags: ["analysis", "description", "vision", "ai"],
    uses: 7890,
  },
  {
    id: "alt-tag-generator",
    name: "Alt Tag Generator",
    description: "Upload or paste an image and generate concise, accessible alt text.",
    category: "image-to-text",
    tags: ["accessibility", "caption", "openrouter", "nextjs"],
    uses: 0,
    featured: true,
  },
  {
    id: "ocr-extractor",
    name: "OCR Text Extractor",
    description: "Extract text from images, documents, and screenshots",
    category: "image-to-text",
    tags: ["ocr", "text-extraction", "documents", "productivity"],
    uses: 13450,
    featured: true,
  },
  {
    id: "meme-explainer",
    name: "Meme Explainer",
    description: "Understand and explain memes, jokes, and visual humor",
    category: "image-to-text",
    tags: ["meme", "humor", "explanation", "culture"],
    uses: 5670,
  },

  // Text to Audio Templates
  {
    id: "voice-generator",
    name: "Voice Generator",
    description: "Convert text to natural-sounding speech with various voices",
    category: "text-to-audio",
    tags: ["voice", "speech", "tts", "audio"],
    uses: 9340,
  },
  {
    id: "podcast-creator",
    name: "Podcast Creator",
    description: "Generate podcast episodes with AI voices and scripts",
    category: "text-to-audio",
    tags: ["podcast", "audio", "content", "broadcasting"],
    uses: 4560,
  },

  // Text to Video Templates
  {
    id: "explainer-video",
    name: "Explainer Video Maker",
    description: "Create educational and explainer videos from text scripts",
    category: "text-to-video",
    tags: ["video", "education", "explainer", "animation"],
    uses: 6780,
  },
  {
    id: "social-video",
    name: "Social Media Video",
    description:
      "Generate short-form videos perfect for social media platforms",
    category: "text-to-video",
    tags: ["video", "social-media", "short-form", "viral"],
    uses: 8920,
  },
];
