import TurndownService from 'turndown';
import fetch from 'node-fetch';
import { Storage } from '@google-cloud/storage';
import { config } from '../config';
import { ConversionResult } from '../types';

export class Converter {
  private turndown: TurndownService;
  private storage: Storage;

  constructor() {
    this.turndown = new TurndownService();
    this.storage = new Storage();
  }

  async convertUrlToMarkdown(url: string): Promise<string> {
    const response = await fetch(url);
    const html = await response.text();
    return this.turndown.turndown(html);
  }

  async uploadToGCS(markdown: string): Promise<ConversionResult> {
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.md`;
    const bucket = this.storage.bucket(config.gcsBucketName);
    const file = bucket.file(filename);

    await file.save(markdown);
    await file.makePublic();

    return {
      markdown,
      filename,
      publicUrl: `https://storage.googleapis.com/${config.gcsBucketName}/${filename}`
    };
  }

  async processUrl(url: string): Promise<ConversionResult> {
    const markdown = await this.convertUrlToMarkdown(url);
    return this.uploadToGCS(markdown);
  }
}