// const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
import { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

async function openModal(interaction) {
  const modal = new ModalBuilder()
      .setCustomId('rayso')
      .setTitle('Create a ray.so snippet');

  const titleInput = new TextInputBuilder()
    .setCustomId('titleInput')
    .setLabel('Title')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('Untitled-1')
    .setRequired(false);

  const codeInput = new TextInputBuilder()
    .setCustomId('codeInput')
    .setLabel('Paste your code here...')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true);
  
  const colorInput = new TextInputBuilder()
    .setCustomId('colorInput')
    .setLabel('Select the color')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('Breeze')
    .setRequired(false);
  
  const darkModeInput = new TextInputBuilder()
    .setCustomId('darkModeInput')
    .setLabel('Dark mode')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('yes')
    .setRequired(false);
  
  const spoilerInput = new TextInputBuilder()
    .setCustomId('spoilerInput')
    .setLabel('Spoiler')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('no')
    .setValue('yes')
    .setRequired(false);

  // An action row only holds one text input,
  // so you need one action row per text input.
  const firstActionRow = new ActionRowBuilder().addComponents(titleInput);
  const secondActionRow = new ActionRowBuilder().addComponents(codeInput);
  const thirdActionRow = new ActionRowBuilder().addComponents(colorInput);
  const fourthActionRow = new ActionRowBuilder().addComponents(darkModeInput);
  const fifthActionRow = new ActionRowBuilder().addComponents(spoilerInput);

  // Add inputs to the modal
  modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

  await interaction.showModal(modal);
}

export default {
  data: new SlashCommandBuilder()
    .setName('rayso')
    .setDescription('Create images of your code using ray.so!'),
  async execute(interaction) {
    await openModal(interaction);
  },
}
