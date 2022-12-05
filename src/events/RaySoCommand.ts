import { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, CommandInteraction } from 'discord.js';
import defaults from '../defaults';
import { Command } from '../Command';

async function openModal(interaction: CommandInteraction): Promise<void> {
  const channelId: string = String(interaction.channelId);

  const modal = new ModalBuilder()
      .setCustomId('rayso')
      .setTitle('Create a ray.so snippet');

  const titleInput = new TextInputBuilder()
    .setCustomId('titleInput')
    .setLabel('Title')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder(defaults.get('title', channelId))
    .setRequired(false);

  const codeInput = new TextInputBuilder()
    .setCustomId('codeInput')
    .setLabel('Code')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true);

  // unfortunately, ModalBuilder only accepts TextInputBuilder at the moment
  // https://discordjs.guide/interactions/modals.html#building-and-responding-with-modals
  const themeInput = new TextInputBuilder()
    .setCustomId('themeInput')
    .setLabel('Colors')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder(defaults.get('theme', channelId))
    .setRequired(false);

  const darkModeInput = new TextInputBuilder()
    .setCustomId('darkModeInput')
    .setLabel('Dark mode')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder(defaults.get('dark-mode', channelId))
    .setRequired(false);

  const spoilerInput = new TextInputBuilder()
    .setCustomId('spoilerInput')
    .setLabel('Spoiler')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder(defaults.get('spoiler', channelId))
    .setRequired(false);

  // unfortunately, at most five action rows are allowed
  // https://discordjs.guide/interactions/modals.html#building-and-responding-with-modals
  const actionRows = [titleInput, codeInput, themeInput, darkModeInput, spoilerInput].map((input) => {
    return new ActionRowBuilder<TextInputBuilder>().addComponents(input);
  });

  modal.addComponents(actionRows);
  await interaction.showModal(modal);
}

const raySoCommand = new SlashCommandBuilder()
  .setName('rayso')
  .setDescription('Create images of your code using ray.so!');

const RaySoCommand: Command = {
  data: raySoCommand,
  execute: openModal,
}

export default RaySoCommand;
