import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { getModels } from '@/lib/config/models'
import { findModelByHash } from '@/lib/utils/model-hash'
import { Model } from '@/lib/types/models'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ hash: string }> }
) {
  try {
    const { hash } = await params

    if (!hash) {
      return NextResponse.json(
        { error: 'Model hash is required' },
        { status: 400 }
      )
    }

    // Get all available models
    const models = await getModels()

    // Find the model by hash
    const model = findModelByHash(hash, models)

    if (!model) {
      return NextResponse.json(
        { error: 'Invalid model hash or model not found' },
        { status: 404 }
      )
    }

    if (!model.enabled) {
      return NextResponse.json(
        { error: 'Model is not enabled' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      hash,
      model,
      success: true
    })
  } catch (error) {
    console.error('Error fetching model by hash:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ hash: string }> }
) {
  try {
    const { hash } = await params

    if (!hash) {
      return NextResponse.json(
        { error: 'Model hash is required' },
        { status: 400 }
      )
    }

    // Get all available models
    const models = await getModels()

    // Find the model by hash
    const model = findModelByHash(hash, models)

    if (!model) {
      return NextResponse.json(
        { error: 'Invalid model hash or model not found' },
        { status: 404 }
      )
    }

    if (!model.enabled) {
      return NextResponse.json(
        { error: 'Model is not enabled' },
        { status: 403 }
      )
    }

    // Clear any existing model cookie first, then set the new one
    const cookieStore = await cookies()

    // Clear the existing cookie
    cookieStore.set('selectedModel', '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      expires: new Date(0) // Set to epoch time
    })

    // Set the new selected model in cookies
    cookieStore.set('selectedModel', JSON.stringify(model), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })

    return NextResponse.json({
      hash,
      model,
      success: true,
      message: 'Model selected successfully'
    })
  } catch (error) {
    console.error('Error setting model by hash:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
