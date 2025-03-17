import { Storage as GoogleStorage } from '@google-cloud/storage';

export class Storage {
  private storage: GoogleStorage;
  private bucketName: string;

  constructor(bucketName: string) {
    this.storage = new GoogleStorage();
    this.bucketName = bucketName;
  }

  async uploadFile(filename: string, content: string): Promise<string> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(filename);

      await file.save(content, {
        contentType: 'text/markdown',
        metadata: {
          cacheControl: 'public, max-age=31536000',
        },
      });

      await file.makePublic();

      return `https://storage.googleapis.com/${this.bucketName}/${filename}`;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error uploading to GCS: ${error.message}`);
      }
      throw error;
    }
  }
}
