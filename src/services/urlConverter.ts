import TurndownService from 'turndown';
import fetch from 'node-fetch';

export class UrlConverter {
  private turndown: TurndownService;

  constructor() {
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
}