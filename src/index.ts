import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from './config';
import { CommandHandler } from './services/commands';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

const commandHandler = new CommandHandler();

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  await commandHandler.registerCommands(readyClient);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  await commandHandler.handleCommand(interaction);
});

client.login(config.discordToken);