import { 
  ChatInputCommandInteraction, 
  SlashCommandBuilder,
  Client,
  REST,
  Routes
} from 'discord.js';
import { Converter } from './converter';
import { config } from '../config';

const commands = [
  new SlashCommandBuilder()
    .setName('convert')
    .setDescription('Convert a webpage to markdown and upload to GCS')
    .addStringOption(option =>
      option
        .setName('url')
        .setDescription('The URL to convert')
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show help information about the bot')
];

export class CommandHandler {
  private converter: Converter;
  private rest: REST;

  constructor() {
    this.converter = new Converter();
    this.rest = new REST({ version: '10' }).setToken(config.discordToken);
  }

  async registerCommands(client: Client): Promise<void> {
    try {
      await this.rest.put(
        Routes.applicationCommands(client.user?.id || ''),
        { body: commands }
      );
      console.log('Successfully registered application commands.');
    } catch (error) {
      console.error('Error registering commands:', error);
    }
  }

  async handleCommand(interaction: ChatInputCommandInteraction): Promise<void> {
    if (!interaction.isCommand()) return;

    try {
      switch (interaction.commandName) {
        case 'convert': {
          const url = interaction.options.getString('url', true);
          await interaction.deferReply();
          
          const result = await this.converter.processUrl(url);
          await interaction.editReply({
            content: `Successfully converted and uploaded!\nMarkdown file: ${result.publicUrl}`
          });
          break;
        }
        
        case 'help': {
          await interaction.reply({
            content: 'Available commands:\n' +
              '`/convert <url>` - Convert a webpage to markdown and upload to GCS\n' +
              '`/help` - Show this help message',
            ephemeral: true
          });
          break;
        }
      }
    } catch (error) {
      console.error('Error handling command:', error);
      const errorMessage = 'An error occurred while processing your request.';
      if (interaction.deferred) {
        await interaction.editReply({ content: errorMessage });
      } else {
        await interaction.reply({ content: errorMessage, ephemeral: true });
      }
    }
  }
}