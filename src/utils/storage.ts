import { Storage } from '@google-cloud/storage';
import { config } from '../config/index';

const storage = new Storage();

export async function uploadToGCS(filename: string, content: string): Promise<string> {
  const bucketName = config.gcsBucketName;

  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filename);

    await file.save(content, {
      contentType: 'text/markdown',
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });

    await file.makePublic();

    return `https://storage.googleapis.com/${bucketName}/${filename}`;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error uploading to GCS: ${error.message}`);
    }
    throw error;
  }
}