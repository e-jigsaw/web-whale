import TurndownService from 'turndown';
import fetch from 'node-fetch';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
});

export async function convertUrlToMarkdown(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    const markdown = turndownService.turndown(html);
    
    return markdown;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error converting URL to markdown: ${error.message}`);
    }
    throw error;
  }
}