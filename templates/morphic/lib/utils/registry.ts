import { createOpenAI } from '@ai-sdk/openai'

export const openrouter = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1'
})

export function getModel(model: string) {
  // All models go through OpenRouter
  // AI SDK v4 expects a LanguageModel instance here
  console.log('model', model)
  return openrouter.chat(model)
}

export function isProviderEnabled(providerId: string): boolean {
  // Only OpenRouter is supported now
  return providerId === 'openrouter' && !!process.env.OPENROUTER_API_KEY
}

export function getToolCallModel(model?: string) {
  // Default to a fast OpenRouter model for tool calls
  return getModel('openai/gpt-5-nano')
}

export function isToolCallSupported(model?: string) {
  // Most OpenRouter models support tool calls
  // Only exclude specific reasoning models that don't work well with tools
  return !model?.includes('deepseek-r1') && !model?.includes('thinking')
}

export function isReasoningModel(model: string): boolean {
  if (typeof model !== 'string') {
    return false
  }
  return (
    model.includes('deepseek-r1') ||
    model.includes('thinking') ||
    model.includes('grok-4') ||
    model.includes('gpt-5')
  )
}
