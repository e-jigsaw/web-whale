import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

interface Config {
  discordToken: string;
  gcsBucketName: string;
}

function validateConfig(): Config {
  const discordToken = process.env.DISCORD_TOKEN;
  const gcsBucketName = process.env.GCS_BUCKET_NAME;

  if (!discordToken) {
    throw new Error('DISCORD_TOKEN is required');
  }

  if (!gcsBucketName) {
    throw new Error('GCS_BUCKET_NAME is required');
  }

  return {
    discordToken,
    gcsBucketName,
  };
}

export const config = validateConfig();