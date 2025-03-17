import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from './config';
import { UrlConverter } from './services/converter';
import { Storage } from './services/storage';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

const storage = new Storage(config.gcsBucketName);
const converter = new UrlConverter();

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  const urls = message.content.match(/https?:\/\/[^\s]+/g);
  if (!urls) return;

  try {
    for (const url of urls) {
      const markdown = await converter.convertToMarkdown(url);
      const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.md`;
      const fileUrl = await storage.uploadFile(filename, markdown);
      await message.reply(`Converted ${url} to markdown: ${fileUrl}`);
    }
  } catch (error) {
    console.error('Error processing URL:', error);
    await message.reply('Sorry, there was an error processing the URL.');
  }
});

client.login(config.discordToken);