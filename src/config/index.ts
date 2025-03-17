import dotenv from 'dotenv';
import { Config } from '../types/index';

dotenv.config();

if (!process.env.DISCORD_TOKEN) {
  throw new Error('DISCORD_TOKEN is required in environment variables');
}

if (!process.env.GCS_BUCKET_NAME) {
  throw new Error('GCS_BUCKET_NAME is required in environment variables');
}

export const config: Config = {
  discordToken: process.env.DISCORD_TOKEN,
  gcsBucketName: process.env.GCS_BUCKET_NAME,
} as const;