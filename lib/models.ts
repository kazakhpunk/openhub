export interface Model {
  id: string;
  name: string;
  description: string;
  provider: string;
  category: string[];
  pricing: string;
  speed: string;
  latency: string;
  popular?: boolean;
}

const models: Model[] = [
  // Text to Image Models
  {
    id: "stable-diffusion-xl",
    name: "Stable Diffusion XL",
    description:
      "High-quality image generation with excellent prompt following",
    provider: "Stability AI",
    category: ["text-to-image"],
    pricing: "$0.02/image",
    speed: "Fast",
    latency: "3-5s",
    popular: true,
  },
  {
    id: "midjourney-v6",
    name: "Midjourney v6",
    description: "Artistic and creative image generation with unique style",
    provider: "Midjourney",
    category: ["text-to-image"],
    pricing: "$0.05/image",
    speed: "Medium",
    latency: "10-15s",
    popular: true,
  },
  {
    id: "dall-e-3",
    name: "DALL-E 3",
    description: "OpenAI's latest image generation model with precise control",
    provider: "OpenAI",
    category: ["text-to-image"],
    pricing: "$0.04/image",
    speed: "Medium",
    latency: "8-12s",
    popular: true,
  },
  {
    id: "flux-pro",
    name: "Flux Pro",
    description: "Professional-grade image generation for commercial use",
    provider: "Black Forest Labs",
    category: ["text-to-image"],
    pricing: "$0.03/image",
    speed: "Fast",
    latency: "4-6s",
  },

  // Text to Text Models

  {
    id: "anthropic/claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    description: "Anthropic's most intelligent model for complex tasks",
    provider: "Anthropic",
    category: ["text-to-text"],
    pricing: "$0.003/1K tokens",
    speed: "Fast",
    latency: "1-3s",
    popular: true,
  },
  {
    id: "meta-llama/llama-3.1-70b-instruct",
    name: "Llama 3.1 70B Instruct",
    description: "Meta's open-source model with excellent performance",
    provider: "Meta",
    category: ["text-to-text"],
    pricing: "$0.001/1K tokens",
    speed: "Very Fast",
    latency: "0.5-1s",
    popular: true,
  },
  {
    id: "google/gemini-pro",
    name: "Gemini Pro",
    description: "Google's advanced AI model for various text tasks",
    provider: "Google",
    category: ["text-to-text"],
    pricing: "$0.002/1K tokens",
    speed: "Fast",
    latency: "1-2s",
  },
  {
    id: "anthropic/claude-opus-4.1",
    name: "Claude Opus 4.1",
    description:
      "Anthropic's flagship model with superior reasoning capabilities",
    provider: "Anthropic",
    category: ["text-to-text"],
    pricing: "$0.015/1K tokens",
    speed: "Fast",
    latency: "2-4s",
    popular: true,
  },
  {
    id: "x-ai/grok-4",
    name: "Grok 4",
    description: "xAI's advanced reasoning model with real-time knowledge",
    provider: "xAI",
    category: ["text-to-text"],
    pricing: "$0.01/1K tokens",
    speed: "Fast",
    latency: "1-3s",
    popular: true,
  },
  {
    id: "google/gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    description: "Google's fast and efficient multimodal model",
    provider: "Google",
    category: ["text-to-text"],
    pricing: "$0.001/1K tokens",
    speed: "Very Fast",
    latency: "0.5-1s",
    popular: true,
  },
  {
    id: "google/gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    description:
      "Google's most advanced reasoning model with enhanced capabilities",
    provider: "Google",
    category: ["text-to-text"],
    pricing: "$0.007/1K tokens",
    speed: "Fast",
    latency: "1-3s",
    popular: true,
  },
  {
    id: "mistralai/mistral-small-3.2-24b-instruct",
    name: "Mistral Small 3.2 24B",
    description:
      "Mistral's updated instruction-following model with improved performance",
    provider: "Mistral AI",
    category: ["text-to-text"],
    pricing: "$0.002/1K tokens",
    speed: "Fast",
    latency: "1-2s",
  },
  {
    id: "minimax/minimax-m1",
    name: "MiniMax M1",
    description: "1M context reasoning model for complex long-form tasks",
    provider: "MiniMax",
    category: ["text-to-text"],
    pricing: "$0.005/1K tokens",
    speed: "Medium",
    latency: "2-5s",
  },
  {
    id: "inception/mercury",
    name: "Mercury (Diffusion LLM)",
    description:
      "5-10x faster diffusion-based language model for rapid generation",
    provider: "Inception",
    category: ["text-to-text"],
    pricing: "$0.001/1K tokens",
    speed: "Ultra Fast",
    latency: "0.2-0.5s",
  },
  {
    id: "tngtech/deepseek-r1t2-chimera",
    name: "DeepSeek R1T2 Chimera",
    description: "Fast reasoning model with efficient performance",
    provider: "TNG Tech",
    category: ["text-to-text"],
    pricing: "Free",
    speed: "Very Fast",
    latency: "0.5-1s",
    popular: true,
  },
  {
    id: "moonshotai/kimi-dev-72b",
    name: "Kimi Dev 72B",
    description: "Software engineering focused model for development tasks",
    provider: "Moonshot AI",
    category: ["text-to-text"],
    pricing: "Free",
    speed: "Fast",
    latency: "1-2s",
    popular: true,
  },
  {
    id: "morph/morph-v3-fast",
    name: "Morph V3 Fast",
    description: "Ultra-fast code editing model with 4500+ tokens/sec output",
    provider: "Morph",
    category: ["text-to-text"],
    pricing: "$0.003/1K tokens",
    speed: "Ultra Fast",
    latency: "0.1-0.3s",
  },
  {
    id: "morph/morph-v3-large",
    name: "Morph V3 Large",
    description:
      "Advanced code editing and generation model with enhanced capabilities",
    provider: "Morph",
    category: ["text-to-text"],
    pricing: "$0.005/1K tokens",
    speed: "Fast",
    latency: "1-2s",
  },
  {
    id: "thedrummer/anubis-70b-v1.1",
    name: "Anubis 70B V1.1",
    description:
      "Creative roleplay and storytelling model with rich character development",
    provider: "TheDrummer",
    category: ["text-to-text"],
    pricing: "$0.004/1K tokens",
    speed: "Medium",
    latency: "2-4s",
  },
  {
    id: "baidu/ernie-4.5-300b-a47b",
    name: "ERNIE 4.5 300B",
    description: "Baidu's massive MoE model with comprehensive knowledge base",
    provider: "Baidu",
    category: ["text-to-text"],
    pricing: "$0.008/1K tokens",
    speed: "Medium",
    latency: "3-5s",
  },
  {
    id: "tencent/hunyuan-a13b-instruct",
    name: "Hunyuan A13B Instruct",
    description: "Tencent MoE model for general instruction following",
    provider: "Tencent",
    category: ["text-to-text"],
    pricing: "Free",
    speed: "Fast",
    latency: "1-3s",
    popular: true,
  },

  // Image to Text Models
  {
    id: "gpt-4-vision",
    name: "GPT-4 Vision",
    description: "Advanced image understanding and description capabilities",
    provider: "OpenAI",
    category: ["image-to-text"],
    pricing: "$0.01/image",
    speed: "Fast",
    latency: "2-4s",
    popular: true,
  },
  {
    id: "claude-3-vision",
    name: "Claude 3 Vision",
    description: "Detailed image analysis with contextual understanding",
    provider: "Anthropic",
    category: ["image-to-text"],
    pricing: "$0.008/image",
    speed: "Fast",
    latency: "2-3s",
    popular: true,
  },
  {
    id: "llava-13b",
    name: "LLaVA 13B",
    description: "Open-source vision-language model for image understanding",
    provider: "Microsoft",
    category: ["image-to-text"],
    pricing: "$0.002/image",
    speed: "Medium",
    latency: "3-5s",
  },
  {
    id: "thudm/glm-4.1v-9b-thinking",
    name: "GLM 4.1V 9B Thinking",
    description:
      "Vision reasoning model with thinking capabilities for complex analysis",
    provider: "THUDM",
    category: ["image-to-text"],
    pricing: "$0.003/image",
    speed: "Medium",
    latency: "3-6s",
  },
  {
    id: "bytedance/ui-tars-7b",
    name: "UI-TARS 7B",
    description: "Specialized GUI automation model for interface understanding",
    provider: "ByteDance",
    category: ["image-to-text"],
    pricing: "$0.002/image",
    speed: "Fast",
    latency: "2-4s",
  },

  // Text to Audio Models
  {
    id: "elevenlabs-v2",
    name: "ElevenLabs v2",
    description: "High-quality voice synthesis with emotion and style control",
    provider: "ElevenLabs",
    category: ["text-to-audio"],
    pricing: "$0.18/1K chars",
    speed: "Fast",
    latency: "2-4s",
    popular: true,
  },
  {
    id: "openai-tts",
    name: "OpenAI TTS",
    description: "Natural-sounding text-to-speech with multiple voices",
    provider: "OpenAI",
    category: ["text-to-audio"],
    pricing: "$0.015/1K chars",
    speed: "Fast",
    latency: "1-3s",
    popular: true,
  },

  // Text to Video Models
  {
    id: "runway-gen3",
    name: "Runway Gen-3",
    description: "Advanced video generation from text prompts",
    provider: "Runway",
    category: ["text-to-video"],
    pricing: "$0.50/second",
    speed: "Slow",
    latency: "60-120s",
    popular: true,
  },
  {
    id: "pika-labs",
    name: "Pika Labs",
    description: "Creative video generation with artistic styles",
    provider: "Pika Labs",
    category: ["text-to-video"],
    pricing: "$0.30/second",
    speed: "Medium",
    latency: "30-60s",
  },
];

export async function getModelsForCategory(category: string): Promise<Model[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return models.filter((model) => model.category.includes(category));
}

export { models };

// Reasoning models fetcher (from the reasoning starter app API)
export async function getReasoningModels(): Promise<
  Array<{ id: string; name: string }>
> {
  try {
    const res = await fetch("/api/reasoning-models", { cache: "force-cache" });
    if (!res.ok) return [];
    const body = (await res.json()) as {
      data: Array<{ id: string; name: string }>;
    };
    return body.data;
  } catch {
    return [];
  }
}
