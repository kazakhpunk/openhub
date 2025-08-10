#!/usr/bin/env node

/**
 * Utility script to generate model hashes for testing
 * Usage: node scripts/generate-model-hashes.js
 */

const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

// Load models configuration from root lib
const modelsPath = path.join(__dirname, "../lib/models.ts");

// Use the same secret as in the model-hash utility
const HASH_SECRET = process.env.MODEL_HASH_SECRET || "morphic-model-secret-key";

function generateModelHash(modelId) {
  const hash = crypto
    .createHmac("sha256", HASH_SECRET)
    .update(modelId)
    .digest("hex");

  return hash.substring(0, 16);
}

// Read the models.ts file and extract model IDs
let modelsContent;
try {
  modelsContent = fs.readFileSync(modelsPath, "utf8");
} catch (error) {
  console.error("Could not read models configuration:", error.message);
  process.exit(1);
}

// Extract model IDs from the TypeScript file
const modelIdMatches = modelsContent.match(/id:\s*["'](.*?)["']/g);
const modelIds = modelIdMatches
  ? modelIdMatches.map((match) => {
      const [, id] = match.match(/id:\s*["'](.*?)["']/);
      return id;
    })
  : [];

// Extract model names for better display
const modelNameMatches = modelsContent.match(/name:\s*["'](.*?)["']/g);
const modelNames = modelNameMatches
  ? modelNameMatches.map((match) => {
      const [, name] = match.match(/name:\s*["'](.*?)["']/);
      return name;
    })
  : [];

console.log("🤖 Model Hashes for OpenHub\n");
console.log("Available models and their hashes:\n");

modelIds.forEach((modelId, index) => {
  const hash = generateModelHash(modelId);
  const name = modelNames[index] || modelId;
  console.log(`• ${name}`);
  console.log(`  Model ID: ${modelId}`);
  console.log(`  Hash: ${hash}`);
  console.log(`  Morphic URL: http://localhost:3003?model=${hash}`);
  console.log("");
});

console.log(`\n📊 Total models: ${modelIds.length}`);
console.log("\n🔗 Example usage:");
console.log(
  "• Redirect to morphic with specific model: http://localhost:3003?model=abc123def456"
);
console.log("• Use in model picker for redirection");
