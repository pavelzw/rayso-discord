import type { ModalSubmitInteraction } from 'discord.js'
import { AttachmentBuilder } from 'discord.js'
import generate from '../../ray.so/index'
import { defaultsForChannel } from '../../defaults'
import { options } from '../../ray.so/type'

const sendSnippet = (interaction: ModalSubmitInteraction, buffer: Buffer, url: string, spoiler: boolean) => {
  const filename = spoiler ? 'SPOILER_snippet.jpg' : 'snippet.jpg'
  const attachment = new AttachmentBuilder(buffer, { name: filename })
  return interaction.editReply({
    content: url,
    files: [attachment]
  })
}

const createSnippet = async (interaction: ModalSubmitInteraction) => {
  const channelId = String(interaction.channelId)
  await interaction.reply('Creating snippet...')

  const defaults = defaultsForChannel(channelId)

  const maybeOptions = {
    title: interaction.fields.getTextInputValue('titleInput') || defaults.title,
    code: interaction.fields.getTextInputValue('codeInput'),
    theme: interaction.fields.getTextInputValue('themeInput') || defaults.theme,
    darkMode: interaction.fields.getTextInputValue('darkModeInput') || defaults.darkMode,
    spoiler: interaction.fields.getTextInputValue('spoilerInput') || defaults.spoiler,
    padding: defaults.padding.toString(), // TODO: having to do this here is a bit annoying
    language: defaults.language,
    background: defaults.background,
    generateUrl: defaults.generateUrl
  }

  const parsedOptions = options.parse(maybeOptions)
  const code = interaction.fields.getTextInputValue('codeInput')

  console.debug(
    `configuration: [title, theme, code, padding, language, darkMode, background] = ${[
      parsedOptions.title,
      parsedOptions.theme,
      code,
      parsedOptions.padding,
      parsedOptions.language,
      parsedOptions.darkMode,
      parsedOptions.background
    ]}`
  )

  return generate(parsedOptions, code).then(({ url, image }) =>
    sendSnippet(interaction, image, url ? `<${url}>` : '', parsedOptions.spoiler)
  )
}

export default {
  name: 'rayso',
  execute: (interaction: ModalSubmitInteraction) =>
    createSnippet(interaction).catch((error) => {
      console.error(error)
      // TODO: maybe include actual error message in response? (should only do this for zod errors though)
      interaction.editReply('Something went wrong. Please try again.')
    })
}
