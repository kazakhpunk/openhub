#!/usr/bin/env node

/**
 * Utility script to generate model hashes for testing
 * Usage: node scripts/generate-model-hashes.js
 */

const crypto = require('crypto')
const path = require('path')
const fs = require('fs')

// Load models configuration
const modelsPath = path.join(__dirname, '../public/config/models.json')
const defaultModelsPath = path.join(
  __dirname,
  '../lib/config/default-models.json'
)

let modelsConfig
try {
  modelsConfig = JSON.parse(fs.readFileSync(modelsPath, 'utf8'))
} catch (error) {
  console.log('Could not read public models.json, trying default models...')
  try {
    modelsConfig = JSON.parse(fs.readFileSync(defaultModelsPath, 'utf8'))
  } catch (error) {
    console.error('Could not read models configuration:', error.message)
    process.exit(1)
  }
}

// Use the same secret as in the model-hash utility
const HASH_SECRET = process.env.MODEL_HASH_SECRET || 'morphic-model-secret-key'

function generateModelHash(modelId) {
  const hash = crypto
    .createHmac('sha256', HASH_SECRET)
    .update(modelId)
    .digest('hex')

  return hash.substring(0, 16)
}

console.log('🤖 Model Hashes for Morphic API\n')
console.log('Available models and their hashes:\n')

const models = modelsConfig.models || []
const enabledModels = models.filter(model => model.enabled)

enabledModels.forEach(model => {
  const hash = generateModelHash(model.id)
  console.log(`• ${model.name} (${model.provider})`)
  console.log(`  Model ID: ${model.id}`)
  console.log(`  Hash: ${hash}`)
  console.log(`  URL: /?model=${hash}`)
  console.log(`  API: /api/models/${hash}`)
  console.log('')
})

console.log(`\n📊 Total enabled models: ${enabledModels.length}`)
console.log('\n🔗 Example usage:')
console.log('• Home page with specific model: /?model=abc123def456')
console.log('• Search with specific model: /search?q=hello&model=abc123def456')
console.log('• Get model info: GET /api/models/abc123def456')
console.log('• Set model via API: POST /api/models/abc123def456')
console.log('• List all models: GET /api/models')
