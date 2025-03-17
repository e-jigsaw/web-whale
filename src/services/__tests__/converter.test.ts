import { describe, it, expect, beforeEach } from 'vitest';
import { UrlConverterService } from '../converter';

describe('UrlConverterService', () => {
  let converter: UrlConverterService;

  beforeEach(() => {
    converter = new UrlConverterService('test-bucket');
  });

  it('should convert URL to markdown', async () => {
    const testUrl = 'https://example.com';
    const markdown = await converter.convertToMarkdown(testUrl);
    
    expect(markdown).toBeDefined();
    expect(typeof markdown).toBe('string');
    expect(markdown.length).toBeGreaterThan(0);
  });

  it('should handle invalid URLs', async () => {
    const invalidUrl = 'not-a-url';
    
    await expect(converter.convertToMarkdown(invalidUrl))
      .rejects
      .toThrow();
  });

  it('should handle network errors', async () => {
    const nonExistentUrl = 'https://this-domain-does-not-exist-123456789.com';
    
    await expect(converter.convertToMarkdown(nonExistentUrl))
      .rejects
      .toThrow();
  });
});