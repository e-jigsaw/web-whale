import { Storage } from '@google-cloud/storage';
import { spawn } from 'child_process';
import { join } from 'path';

export class UrlConverterService {
  private storage: Storage;
  private bucketName: string;

  constructor(bucketName: string) {
    this.storage = new Storage();
    this.bucketName = bucketName;
  }

  async convertToMarkdown(url: string): Promise<string> {
    try {
      const scriptPath = join(__dirname, '..', 'python', 'url_to_markdown.py');
      
      return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', [scriptPath, url]);
        let output = '';
        let errorOutput = '';

        pythonProcess.stdout.on('data', (data) => {
          output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
          errorOutput += data.toString();
        });

        pythonProcess.on('close', (code) => {
          if (code !== 0) {
            reject(new Error(`Python script failed: ${errorOutput}`));
            return;
          }

          try {
            const result = JSON.parse(output);
            if (result.error) {
              reject(new Error(result.error));
              return;
            }
            resolve(output);
          } catch (e) {
            // If output is not JSON, it's the markdown content
            resolve(output);
          }
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error converting URL to markdown: ${error.message}`);
      }
      throw error;
    }
  }

  async uploadMarkdown(filename: string, content: string): Promise<string> {
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

  async convertAndUpload(url: string, filename: string): Promise<string> {
    const markdown = await this.convertToMarkdown(url);
    return this.uploadMarkdown(filename, markdown);
  }
}