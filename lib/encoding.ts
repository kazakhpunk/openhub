import { Buffer } from "buffer";
import crypto from "crypto";

interface EncodedData {
  modelName: string;
  headingText: string;
  descriptionText: string;
}

// Secret key for hashing - in production, this should be from environment variables
const HASH_SECRET = process.env.MODEL_HASH_SECRET || "morphic-model-secret-key";

/**
 * Encodes model name, heading, and description into a single URL-safe Base64 string.
 * @param modelName - The name of the model.
 * @param headingText - The heading text.
 * @param descriptionText - The description text.
 * @returns A URL-safe Base64 encoded string.
 */
export function encodeData(
  modelName: string,
  headingText: string,
  descriptionText: string
): string {
  const data: EncodedData = {
    modelName,
    headingText,
    descriptionText,
  };
  const jsonString = JSON.stringify(data);
  return Buffer.from(jsonString)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Decodes a URL-safe Base64 string back into the model name, heading, and description.
 * @param encodedString - The URL-safe Base64 encoded string.
 * @returns An object containing the decoded data.
 */
export function decodeData(encodedString: string): EncodedData {
  let encoded = encodedString.replace(/-/g, "+").replace(/_/g, "/");
  while (encoded.length % 4) {
    encoded += "=";
  }
  const jsonString = Buffer.from(encoded, "base64").toString("utf8");
  return JSON.parse(jsonString) as EncodedData;
}

/**
 * Generates a hash for a model ID that can be used in URLs
 */
export function generateModelHash(modelId: string): string {
  const hash = crypto
    .createHmac("sha256", HASH_SECRET)
    .update(modelId)
    .digest("hex");

  // Return first 16 characters for shorter URLs
  return hash.substring(0, 16);
}

/**
 * Validates a hash against a model ID
 */
export function validateModelHash(hash: string, modelId: string): boolean {
  const expectedHash = generateModelHash(modelId);
  return hash === expectedHash;
}

/**
 * Finds a model by its hash from a list of available models
 */
export function findModelByHash<T extends { id: string }>(
  hash: string,
  models: T[]
): T | null {
  for (const model of models) {
    if (validateModelHash(hash, model.id)) {
      return model;
    }
  }
  return null;
}

/**
 * Creates a mapping of hashes to models for easier lookup
 */
export function createModelHashMap<T extends { id: string }>(
  models: T[]
): Record<string, T> {
  const hashMap: Record<string, T> = {};

  for (const model of models) {
    const hash = generateModelHash(model.id);
    hashMap[hash] = model;
  }

  return hashMap;
}

/**
 * Gets all available model hashes with their corresponding model info
 */
export function getModelHashes<T extends { id: string }>(
  models: T[]
): Array<{ hash: string; model: T }> {
  return models.map((model) => ({
    hash: generateModelHash(model.id),
    model,
  }));
}
