import RaySo, {
  CardTheme,
  CardPadding,
  CardProgrammingLanguage,
} from 'rayso-api';
import { AttachmentBuilder } from 'discord.js';

console.log(CardPadding.md);

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

const url = (title, color, code, padding, language, darkMode) => {
  return 'https://ray.so';
}

async function sendEmbed(interaction, buffer, url) {
  const attachment = new AttachmentBuilder(buffer);

  interaction.editReply({
    content: interaction.user.toString() + ' here is your snippet:',
    files: [attachment]
  });
}

async function createSnippet(interaction) {
  interaction.reply('Creating snippet...');
  const title = interaction.fields.getTextInputValue("titleInput");
  const code = interaction.fields.getTextInputValue("codeInput");
  const color = stringToCardTheme(interaction.fields.getTextInputValue("colorInput"));
  const darkMode = stringToBoolean(interaction.fields.getTextInputValue("darkModeInput"));

  const raySo = new RaySo({
    title: title,
    theme: color,
    padding: CardPadding.md,
    language: CardProgrammingLanguage.AUTO,
    localPreview: false,
    darkMode: darkMode,
  });

  raySo
    .cook(code)
    .then(response => {
      sendEmbed(interaction, response);
    })
    .catch(console.error);
}

export default {
  name: 'rayso',
  async execute(interaction) {
    await createSnippet(interaction);
  },
}
