import { REST, Routes } from 'discord.js'
import raysoCommand from './events/RaySoCommand'

const commands = [raysoCommand]
const commandsJSON = commands.map((command) => command.data.toJSON())

const rest = new REST({ version: '10' }).setToken(String(process.env.DISCORD_TOKEN))

console.log(`Started refreshing ${commandsJSON.length} application (/) commands.`)

rest
  .put(Routes.applicationGuildCommands(String(process.env.DISCORD_CLIENT_ID), String(process.env.DISCORD_GUILD_ID)), {
    body: commandsJSON
  })
  .then((data: any) => {
    console.log(typeof data)
    console.log(`Successfully reloaded ${data.length} application (/) commands.`)
  })
  .catch((error) => console.error(error))
