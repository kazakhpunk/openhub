import crypto from 'crypto'
import { Model } from '@/lib/types/models'

// Secret key for hashing - in production, this should be from environment variables
const HASH_SECRET = process.env.MODEL_HASH_SECRET || 'morphic-model-secret-key'

/**
 * Generates a hash for a model ID that can be used in URLs
 */
export function generateModelHash(modelId: string): string {
  const hash = crypto
    .createHmac('sha256', HASH_SECRET)
    .update(modelId)
    .digest('hex')

  // Return first 16 characters for shorter URLs
  return hash.substring(0, 16)
}

/**
 * Validates a hash against a model ID
 */
export function validateModelHash(hash: string, modelId: string): boolean {
  const expectedHash = generateModelHash(modelId)
  return hash === expectedHash
}

/**
 * Finds a model by its hash from a list of available models
 */
export function findModelByHash(hash: string, models: Model[]): Model | null {
  for (const model of models) {
    if (validateModelHash(hash, model.id)) {
      return model
    }
  }
  return null
}

/**
 * Creates a mapping of hashes to models for easier lookup
 */
export function createModelHashMap(models: Model[]): Record<string, Model> {
  const hashMap: Record<string, Model> = {}

  for (const model of models) {
    const hash = generateModelHash(model.id)
    hashMap[hash] = model
  }

  return hashMap
}

/**
 * Gets all available model hashes with their corresponding model info
 */
export function getModelHashes(
  models: Model[]
): Array<{ hash: string; model: Model }> {
  return models.map(model => ({
    hash: generateModelHash(model.id),
    model
  }))
}
