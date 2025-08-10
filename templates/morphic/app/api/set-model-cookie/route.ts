import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { getModels } from '@/lib/config/models'
import { findModelByHash } from '@/lib/utils/model-hash'

export async function POST(req: Request) {
  try {
    const { hash } = await req.json()

    const models = await getModels()
    const selectedModel = findModelByHash(hash, models)

    if (!selectedModel || !selectedModel.enabled) {
      return NextResponse.json(
        { error: 'Invalid model hash or model not found' },
        { status: 404 }
      )
    }

    // Set the cookie using response headers
    const response = NextResponse.json({ success: true })
    response.cookies.set('selectedModel', JSON.stringify(selectedModel), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })
    return response
  } catch (error) {
    console.error('Error setting model cookie:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
