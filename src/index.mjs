import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import config from './config.json' assert { type: 'json' };
import raysoCommand from './commands/rayso.mjs';
import raysoSubmission from './modalSubmissions/raysoSubmission.mjs';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.commands.set(raysoCommand.data.name, raysoCommand);
client.modalSubmissions = new Collection();
client.modalSubmissions.set(raysoSubmission.name, raysoSubmission.execute);

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  } else if (interaction.isModalSubmit()) {
    // todo make prettier
    const modalSubmission = interaction.client.modalSubmissions.get(interaction.customId);

    if (!modalSubmission) {
      console.error(`No modalSubmission matching ${interaction.customId} was found.`);
      return;
    }

    try {
      await modalSubmission(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this modalSubmission!', ephemeral: true });
    }
  } else {
    console.log(`Interaction type ${interaction.type} is not supported.`);
  }
});

client.login(config.token);
