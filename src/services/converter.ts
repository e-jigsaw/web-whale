import TurndownService from 'turndown';
import fetch from 'node-fetch';
import { Storage } from '@google-cloud/storage';

export class UrlConverterService {
  private turndown: TurndownService;
  private storage: Storage;
  private bucketName: string;

  constructor(bucketName: string) {
    this.turndown = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      emDelimiter: '_'
    });

    // Customize Turndown rules
    this.turndown.addRule('removeEmptyParagraphs', {
      filter: (node) => {
        return node.nodeName === 'P' && node.textContent.trim() === '';
      },
      replacement: () => ''
    });

    this.storage = new Storage();
    this.bucketName = bucketName;
  }

  async convertToMarkdown(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.statusText}`);
      }

      const html = await response.text();
      return this.turndown.turndown(html);
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