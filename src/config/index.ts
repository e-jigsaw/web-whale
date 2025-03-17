import dotenv from 'dotenv';
import { Config } from '../types/index';

dotenv.config();

if (!process.env.DISCORD_TOKEN) {
  throw new Error('DISCORD_TOKEN is required in environment variables');
}

if (!process.env.GCS_BUCKET_NAME) {
  throw new Error('GCS_BUCKET_NAME is required in environment variables');
}

if (!process.env.ALLOWED_CHANNEL_IDS) {
  throw new Error('ALLOWED_CHANNEL_IDS is required in environment variables');
}

const allowedChannelIds = process.env.ALLOWED_CHANNEL_IDS.split(',').map(id => id.trim());
if (allowedChannelIds.length === 0) {
  throw new Error('ALLOWED_CHANNEL_IDS must contain at least one channel ID');
}

export const config: Config = {
  discordToken: process.env.DISCORD_TOKEN,
  gcsBucketName: process.env.GCS_BUCKET_NAME,
  allowedChannelIds,
} as const;