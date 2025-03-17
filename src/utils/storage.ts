import { Storage } from '@google-cloud/storage';

const storage = new Storage();

export async function uploadToGCS(filename: string, content: string): Promise<string> {
  const bucketName = process.env.GCS_BUCKET_NAME;
  if (!bucketName) {
    throw new Error('GCS_BUCKET_NAME is required');
  }

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