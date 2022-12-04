import RaySo, {
  CardTheme,
  CardPadding,
  CardProgrammingLanguage,
} from 'rayso-api';
import { encodeURI } from "js-base64";
import { AttachmentBuilder } from 'discord.js';

const stringToBoolean = (string) => {
  switch(string.toLowerCase()) {
    case "false":
    case "no":
    case "0":
      return false;
    default:
      return true;
  }
}

const stringToCardTheme = (string) => {
  switch (string.toLowerCase()) {
    case "breeze":
      return CardTheme.BREEZE;
    case "candy":
      return CardTheme.CANDY;
    case "crimson":
      return CardTheme.CRIMSON;
    case "falcon":
      return CardTheme.FALCON;
    case "meadow":
      return CardTheme.MEADOW;
    case "midnight":
      return CardTheme.MIDNIGHT;
    case "raindrop":
      return CardTheme.RAINDROP;
    case "sunset":
      return CardTheme.SUNSET;
    default:
      // todo maybe raise an error
      return CardTheme.CANDY;
  }
}

async function shortenUrl(longUrl)
{
  const toFetch = `https://cutt.ly/api/api.php?key=${process.env.CUTTLY_KEY}&short=${encodeURIComponent(longUrl)}`;
  return fetch(toFetch)
    .then(response => response.json())
    .then(data => data.url.shortLink);
}

async function getUrl(title, color, code, padding, language, darkMode, background) {
  const base64Text = encodeURI(code);
  const longUrl = `https://ray.so/?title=${title}&?theme=${color}&spacing=${padding}&background=${background}&darkMode=${darkMode}&code=${base64Text}&language=${language}`;
  console.log(longUrl);
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
  interaction.reply('Creating snippet...');
  const title = interaction.fields.getTextInputValue("titleInput");
  const code = interaction.fields.getTextInputValue("codeInput");
  const color = stringToCardTheme(interaction.fields.getTextInputValue("colorInput"));
  const darkMode = stringToBoolean(interaction.fields.getTextInputValue("darkModeInput"));
  const spoiler = stringToBoolean(interaction.fields.getTextInputValue("spoilerInput"));
  const padding = CardPadding.md;
  const language = CardProgrammingLanguage.AUTO;
  const background = true;

  const url = await getUrl(title, color, code, padding, language, darkMode, background);

  const raySo = new RaySo({
    title: title,
    theme: color,
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
  async execute(interaction) {
    await createSnippet(interaction);
  }
}
