import { REST, Routes } from 'discord.js'
import config from '../config'
import raysoCommand from './events/RaySoCommand'

const commands = [raysoCommand]
const commandsJSON = commands.map((command) => command.data.toJSON())

const rest = new REST({ version: '10' }).setToken(String(config.DISCORD_TOKEN))

console.log(`Started refreshing ${commandsJSON.length} application (/) commands.`)

rest
  .put(Routes.applicationGuildCommands(String(config.DISCORD_CLIENT_ID), String(config.DISCORD_GUILD_ID)), {
    body: commandsJSON
  })
  .then((data: any) => {
    console.log(typeof data)
    console.log(`Successfully reloaded ${data.length} application (/) commands.`)
  })
  .catch((error) => console.error(error))
