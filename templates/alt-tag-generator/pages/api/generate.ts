import type { NextApiRequest, NextApiResponse } from 'next'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { generateText } from 'ai'

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let imagePart: string | undefined
    if (req.method === 'POST') {
      const { imageUrl, imageBase64 } = (req.body ?? {}) as { imageUrl?: string; imageBase64?: string }
      if (imageBase64 && imageBase64.startsWith('data:image')) {
        imagePart = imageBase64
      } else if (imageUrl) {
        imagePart = imageUrl
      }
    } else {
      const imageUrl = (req.query.imageUrl as string) || 'https://dub.sh/confpic'
      imagePart = imageUrl
    }

    if (!imagePart) {
      return res.status(400).json({ error: 'Missing image input' })
    }

    const requestedModel = (req.method === 'POST' ? (req.body?.modelId as string) : undefined) || 'openai/gpt-4o-mini'
    const { text } = await generateText({
      model: openrouter(requestedModel),
      system:
        'You are an assistant that writes concise, accessible alt text for images. Keep it under 140 characters, no filler.',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Write alt text for this image:' },
            { type: 'image', image: imagePart },
          ],
        },
      ],
    })

    return res.status(200).json({ alt: text })
  } catch (error: any) {
    console.error('Alt text generation failed:', error)
    return res.status(500).json({ error: 'Failed to generate alt text' })
  }
}
