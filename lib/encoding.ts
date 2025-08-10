import { Buffer } from 'buffer';

interface EncodedData {
  modelName: string;
  headingText: string;
  descriptionText: string;
}

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
  descriptionText: string,
): string {
  const data: EncodedData = {
    modelName,
    headingText,
    descriptionText,
  };
  const jsonString = JSON.stringify(data);
  return Buffer.from(jsonString)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Decodes a URL-safe Base64 string back into the model name, heading, and description.
 * @param encodedString - The URL-safe Base64 encoded string.
 * @returns An object containing the decoded data.
 */
export function decodeData(encodedString: string): EncodedData {
  let encoded = encodedString.replace(/-/g, '+').replace(/_/g, '/');
  while (encoded.length % 4) {
    encoded += '=';
  }
  const jsonString = Buffer.from(encoded, 'base64').toString('utf8');
  return JSON.parse(jsonString) as EncodedData;
}
