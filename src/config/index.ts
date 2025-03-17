import dotenv from 'dotenv';
import { Config } from '../types';

dotenv.config();

export const config: Config = {
  discordToken: process.env.DISCORD_TOKEN || '',
  gcsBucketName: process.env.GCS_BUCKET_NAME || '',
};