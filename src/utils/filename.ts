export function urlToFilename(url: string): string {
  if (!url) return '.md';

  // Remove protocol (http://, https://, etc.)
  let filename = url.replace(/^(https?:\/\/)?(www\.)?/, '');

  // Replace special characters with underscores
  filename = filename
    .replace(/@/g, '_')                         // Replace @ with underscore
    .replace(/[\/\?#:\*\$&\(\)=\[\]<>-]/g, '_') // Replace special chars with underscore
    .replace(/_{2,}/g, '_')                     // Replace multiple underscores with single
    .replace(/^_+|_+$/g, '')                    // Remove leading/trailing underscores
    .replace(/\./g, '_')                        // Replace dots with underscores
    .toLowerCase();                             // Convert to lowercase

  // Ensure the filename isn't too long (max 255 chars is common limit)
  if (filename.length > 251) { // 251 to account for .md extension
    filename = filename.substring(0, 251);
  }

  // Add .md extension
  return `${filename}.md`;
}