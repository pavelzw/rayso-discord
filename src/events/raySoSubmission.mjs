import RaySo from 'rayso-api';
import { encodeURI } from "js-base64";
import { AttachmentBuilder } from 'discord.js';
import utils from '../utils.mjs';
import defaults from '../defaults.mjs';

async function shortenUrl(longUrl)
{
  const toFetch = `https://cutt.ly/api/api.php?key=${process.env.CUTTLY_KEY}&short=${encodeURIComponent(longUrl)}`;
  return fetch(toFetch)
    .then(response => response.json())
    .then(data => data.url.shortLink);
}

async function getUrl(title, theme, code, padding, language, darkMode, background) {
  const base64Text = encodeURI(code);
  const longUrl = `https://ray.so/?title=${title}&?theme=${theme}&spacing=${padding}&background=${background}&darkMode=${darkMode}&code=${base64Text}&language=${language}`;
  console.debug(longUrl);
  const shortUrl = await shortenUrl(longUrl);
  return `<${shortUrl}>`;
}

async function sendSnippet(interaction, buffer, url, spoiler) {
  const filename = spoiler ? 'SPOILER_snippet.jpg' : 'snippet.jpg';
  const attachment = new AttachmentBuilder(buffer, { name: filename });
  interaction.editReply({
    content: url,
    files: [attachment]
  });
}

async function createSnippet(interaction) {
  const channelId = interaction.channelId;
  interaction.reply('Creating snippet...');

  const title = interaction.fields.getTextInputValue('titleInput') || defaults.get('title', channelId);
  const code = interaction.fields.getTextInputValue('codeInput') || defaults.get('code', channelId);
  const theme = utils.lookup(
    interaction.fields.getTextInputValue('themeInput') || defaults.get('theme', channelId), utils.cardThemeMap
  );
  const darkMode = utils.lookup(
    interaction.fields.getTextInputValue('darkModeInput') || defaults.get('dark-mode', channelId), utils.booleanMap
  );
  const spoiler = utils.lookup(
    interaction.fields.getTextInputValue('spoilerInput') || defaults.get('spoiler', channelId), utils.booleanMap
  );
  const padding = utils.lookup(defaults.get('padding', channelId), utils.cardPaddingMap);
  const language = utils.lookup(defaults.get('language', channelId), utils.cardProgrammingLanguageMap);
  const background = utils.lookup(defaults.get('background', channelId), utils.booleanMap);
  console.debug(`configuration: [title, theme, code, padding, language, darkMode, background] = ${[title, theme, code, padding, language, darkMode, background]}`);

  const url = await getUrl(title, theme, code, padding, language, darkMode, background);

  const raySo = new RaySo({
    title: title,
    theme: theme,
    padding: padding,
    language: language,
    localPreview: false,
    darkMode: darkMode,
  });

  raySo
    .cook(code)
    .then(response => {
      sendSnippet(interaction, response, url, spoiler);
    })
    .catch(console.error);
}

export default {
  name: 'rayso',
  execute: createSnippet
}
