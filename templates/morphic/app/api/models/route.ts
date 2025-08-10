import { NextResponse } from 'next/server'

import { getModels } from '@/lib/config/models'
import { getModelHashes } from '@/lib/utils/model-hash'

export async function GET() {
  try {
    // Get all available models
    const models = await getModels()

    // Create hash mappings for all models
    const modelHashes = getModelHashes(models)

    // Filter out disabled models
    const enabledModelHashes = modelHashes.filter(({ model }) => model.enabled)

    return NextResponse.json({
      models: enabledModelHashes.map(({ hash, model }) => ({
        hash,
        id: model.id,
        name: model.name,
        provider: model.provider,
        providerId: model.providerId,
        enabled: model.enabled,
        toolCallType: model.toolCallType
      })),
      count: enabledModelHashes.length,
      success: true
    })
  } catch (error) {
    console.error('Error fetching models with hashes:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
