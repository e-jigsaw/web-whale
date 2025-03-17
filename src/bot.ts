import { Client, Events, GatewayIntentBits } from 'discord.js';
import { convertUrlToMarkdown } from './utils/converter';
import { uploadToGCS } from './utils/storage';
import { urlToFilename } from './utils/filename';
import { config } from './config/index';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  const urlPattern = /https?:\/\/[^\s]+/g;
  const urls = message.content.match(urlPattern);

  if (!urls) return;

  try {
    for (const url of urls) {
      const markdown = await convertUrlToMarkdown(url);
      const filename = urlToFilename(url);
      const gcsUrl = await uploadToGCS(filename, markdown);
      await message.reply(`Converted ${url} to markdown: ${gcsUrl}`);
    }
  } catch (error) {
    console.error('Error processing message:', error);
    await message.reply('Sorry, there was an error processing the URL.');
  }
});

export const startBot = () => {
  client.login(config.discordToken);
};