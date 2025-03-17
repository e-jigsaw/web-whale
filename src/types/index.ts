export interface Config {
  discordToken: string;
  gcsBucketName: string;
}

export interface ConversionResult {
  markdown: string;
  filename: string;
  publicUrl: string;
}