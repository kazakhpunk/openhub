export interface EncodedData {
  modelName: string;
  headingText?: string;
  descriptionText?: string;
}

export function decodeData(encodedString: string): EncodedData | null {
  try {
    let encoded = encodedString.replace(/-/g, '+').replace(/_/g, '/');
    while (encoded.length % 4) {
      encoded += '=';
    }
    const jsonString = Buffer.from(encoded, 'base64').toString('utf8');
    return JSON.parse(jsonString) as EncodedData;
  } catch {
    return null;
  }
}


