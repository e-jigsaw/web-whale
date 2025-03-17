export interface Config {
  discordToken: string;
  gcsBucketName: string;
  allowedChannelIds: string[];
}

export interface ConversionResult {
  markdown: string;
  filename: string;
  publicUrl: string;
}