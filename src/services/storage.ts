import { Storage as GoogleStorage } from '@google-cloud/storage';

export class Storage {
  private storage: GoogleStorage;
  private bucketName: string;

  constructor(bucketName: string) {
    this.storage = new GoogleStorage();
    this.bucketName = bucketName;
  }

  async uploadFile(filename: string, content: string): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const file = bucket.file(filename);

    await file.save(content);
    await file.makePublic();

    return `https://storage.googleapis.com/${this.bucketName}/${filename}`;
  }
}
