import RaySo from 'rayso-api'
import type { ModalSubmitInteraction } from 'discord.js'
import { AttachmentBuilder } from 'discord.js'
import { lookup, cardThemeMap, booleanMap, cardPaddingMap, cardProgrammingLanguageMap } from '../utils'
import { generateUrl } from '../urlGeneration'
import defaults from '../defaults'

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
  interaction.reply('Creating snippet...')

  const title = interaction.fields.getTextInputValue('titleInput') || defaults.get('title', channelId)
  const code = interaction.fields.getTextInputValue('codeInput') || defaults.get('code', channelId)
  const theme = lookup(
    interaction.fields.getTextInputValue('themeInput') || defaults.get('theme', channelId),
    cardThemeMap
  )
  const darkMode = lookup(
    interaction.fields.getTextInputValue('darkModeInput') || defaults.get('dark-mode', channelId),
    booleanMap
  )
  const spoiler = lookup(
    interaction.fields.getTextInputValue('spoilerInput') || defaults.get('spoiler', channelId),
    booleanMap
  )
  const padding = lookup(defaults.get('padding', channelId), cardPaddingMap)
  const language = lookup(defaults.get('language', channelId), cardProgrammingLanguageMap)
  const background = lookup(defaults.get('background', channelId), booleanMap)
  console.debug(
    `configuration: [title, theme, code, padding, language, darkMode, background] = ${[
      title,
      theme,
      code,
      padding,
      language,
      darkMode,
      background
    ]}`
  )

  const useGeneratedUrl = process.env.CUTTLY_KEY && lookup(defaults.get('generate-url', channelId), booleanMap)
  const url = useGeneratedUrl ? await generateUrl(title, theme, code, padding, language, darkMode, background) : ''

  const raySo = new RaySo({
    title,
    theme,
    padding,
    language,
    localPreview: false,
    darkMode
  })

  return raySo
    .cook(code)
    .then((response) => sendSnippet(interaction, response, url, spoiler))
    .catch(console.error)
}

export default {
  name: 'rayso',
  execute: createSnippet
}
