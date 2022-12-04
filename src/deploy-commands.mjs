import { REST, Routes } from 'discord.js';
import config from './config.json' assert { type: 'json' };
import raysoCommand from './commands/rayso.mjs';

const commands = [raysoCommand];
const commandsJSON = commands.map(command => command.data.toJSON());

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
  try {
    console.log(`Started refreshing ${commandsJSON.length} application (/) commands.`);

    const data = await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commandsJSON },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
