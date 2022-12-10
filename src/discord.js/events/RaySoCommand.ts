import type { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js'
import { defaultsForChannel } from '../../defaults'
import type { Command } from '../Command'

const raySoModal = (channelId: CommandInteraction['channelId']) => {
  const modal = new ModalBuilder().setCustomId('rayso').setTitle('Create a ray.so snippet')

  const defaults = defaultsForChannel(channelId)

  const titleInput = new TextInputBuilder()
    .setCustomId('titleInput')
    .setLabel('Title')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder(defaults.title)
    .setRequired(false)

  const codeInput = new TextInputBuilder()
    .setCustomId('codeInput')
    .setLabel('Code')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true)

  // unfortunately, ModalBuilder only accepts TextInputBuilder at the moment
  // https://discordjs.guide/interactions/modals.html#building-and-responding-with-modals
  const themeInput = new TextInputBuilder()
    .setCustomId('themeInput')
    .setLabel('Colors')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder(defaults.theme)
    .setRequired(false)

  const darkModeInput = new TextInputBuilder()
    .setCustomId('darkModeInput')
    .setLabel('Dark mode')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder(defaults.darkMode.toString())
    .setRequired(false)

  const spoilerInput = new TextInputBuilder()
    .setCustomId('spoilerInput')
    .setLabel('Spoiler')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder(defaults.spoiler.toString())
    .setRequired(false)

  // unfortunately, at most five action rows are allowed
  // https://discordjs.guide/interactions/modals.html#building-and-responding-with-modals
  const actionRows = [titleInput, codeInput, themeInput, darkModeInput, spoilerInput].map((input) =>
    new ActionRowBuilder<TextInputBuilder>().addComponents(input)
  )

  modal.addComponents(actionRows)

  return modal
}

const raySoCommand = new SlashCommandBuilder()
  .setName('rayso')
  .setDescription('Create images of your code using ray.so!')

const RaySoCommand: Command = {
  data: raySoCommand,
  execute: (interaction) => interaction.showModal(raySoModal(interaction.channelId))
}

export default RaySoCommand
