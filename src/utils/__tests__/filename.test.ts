import { urlToFilename } from '../filename';

describe('urlToFilename', () => {
  it('should remove protocol and www', () => {
    expect(urlToFilename('https://example.com')).toBe('example_com.md');
    expect(urlToFilename('http://www.example.com')).toBe('example_com.md');
  });

  it('should handle paths and query parameters', () => {
    expect(urlToFilename('https://example.com/blog/post-1')).toBe('example_com_blog_post_1.md');
    expect(urlToFilename('https://example.com/search?q=test')).toBe('example_com_search_q_test.md');
  });

  it('should handle special characters', () => {
    expect(urlToFilename('https://example.com/post?id=123&type=blog')).toBe('example_com_post_id_123_type_blog.md');
    expect(urlToFilename('https://example.com/[category]/post#section')).toBe('example_com_category_post_section.md');
  });

  it('should convert to lowercase', () => {
    expect(urlToFilename('https://Example.Com/Blog/Post-1')).toBe('example_com_blog_post_1.md');
  });

  it('should handle multiple consecutive special characters', () => {
    expect(urlToFilename('https://example.com///path//to//file')).toBe('example_com_path_to_file.md');
  });

  it('should truncate long filenames', () => {
    const longUrl = 'https://example.com/' + 'a'.repeat(300);
    const result = urlToFilename(longUrl);
    expect(result.length).toBeLessThanOrEqual(255);
    expect(result.endsWith('.md')).toBe(true);
  });

  it('should handle URLs with ports and authentication', () => {
    expect(urlToFilename('https://user:pass@example.com:8080/path')).toBe('user_pass_example_com_8080_path.md');
  });

  it('should handle international domain names', () => {
    expect(urlToFilename('https://例子.com/测试')).toBe('例子_com_测试.md');
  });

  it('should handle empty or invalid URLs', () => {
    expect(urlToFilename('')).toBe('.md');
    expect(urlToFilename('not-a-url')).toBe('not_a_url.md');
  });
});