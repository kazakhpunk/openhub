export interface Model {
  id: string
  name: string
  description: string
  provider: string
  category: string[]
  pricing: string
  speed: string
  latency: string
  popular?: boolean
}

const models: Model[] = [
  // Text to Image Models
  {
    id: "stable-diffusion-xl",
    name: "Stable Diffusion XL",
    description: "High-quality image generation with excellent prompt following",
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
    id: "gpt-4o",
    name: "GPT-4o",
    description: "OpenAI's most capable multimodal model for complex reasoning",
    provider: "OpenAI",
    category: ["text-to-text"],
    pricing: "$0.005/1K tokens",
    speed: "Fast",
    latency: "1-2s",
    popular: true,
  },
  {
    id: "claude-3-5-sonnet",
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
    id: "llama-3-70b",
    name: "Llama 3 70B",
    description: "Meta's open-source model with excellent performance",
    provider: "Meta",
    category: ["text-to-text"],
    pricing: "$0.001/1K tokens",
    speed: "Very Fast",
    latency: "0.5-1s",
    popular: true,
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    description: "Google's advanced AI model for various text tasks",
    provider: "Google",
    category: ["text-to-text"],
    pricing: "$0.002/1K tokens",
    speed: "Fast",
    latency: "1-2s",
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
]

export async function getModelsForCategory(category: string): Promise<Model[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return models.filter((model) => model.category.includes(category))
}

export { models }
