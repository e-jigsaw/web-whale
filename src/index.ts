import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from './config/index';
import { UrlConverter } from './services/urlConverter';
import { Storage } from './services/storage';
import { urlToFilename } from './utils/filename';

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

  const uniqueUrls = [...new Set(urls)];
  
  for (const url of uniqueUrls) {
    try {
      console.log(`Processing URL: ${url}`);
      
      // Convert URL to markdown
      const markdown = await converter.convertToMarkdown(url);
      console.log(`Successfully converted ${url} to markdown`);

      // Generate filename from URL
      const filename = urlToFilename(url);
      console.log(`Generated filename: ${filename}`);

      // Upload to GCS
      const fileUrl = await storage.uploadFile(filename, markdown);
      console.log(`Uploaded to GCS: ${fileUrl}`);

      await message.reply({
        content: `Successfully converted ${url}\nMarkdown version: ${fileUrl}`,
        allowedMentions: { repliedUser: false }
      });
    } catch (error) {
      console.error(`Error processing URL ${url}:`, error);
      
      let errorMessage = 'Sorry, there was an error processing the URL.';
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Unable to access the URL. Please make sure it\'s accessible and try again.';
        } else if (error.message.includes('Error converting')) {
          errorMessage = 'Failed to convert the webpage to markdown. The page might be too complex or not accessible.';
        }
      }

      await message.reply({
        content: errorMessage,
        allowedMentions: { repliedUser: false }
      });
    }
  }
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

client.login(config.discordToken).catch((error) => {
  console.error('Failed to login to Discord:', error);
  process.exit(1);
});