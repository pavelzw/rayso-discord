import { Client, Events, GatewayIntentBits } from 'discord.js'
import { Logger } from 'tslog'
import config from '../config'
import RaySoCommand from './events/RaySoCommand'
import RaySoSubmission from './events/RaySoSubmission'

export class Core extends Client {
  public logger = new Logger()

  constructor() {
    super({ intents: [GatewayIntentBits.Guilds] })
  }

  private initCommands() {
    this.on(Events.InteractionCreate, (interaction) => {
      if (!interaction.isChatInputCommand()) return

      return Promise.resolve()
        .then(() => RaySoCommand.execute(interaction))
        .catch((error) => {
          this.logger.error(error)
          return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
        })
        .then(() => undefined)
    })
  }

  private initModalSubmissions() {
    this.on(Events.InteractionCreate, (interaction) => {
      if (!interaction.isModalSubmit()) return

      return Promise.resolve()
        .then(() => RaySoSubmission.execute(interaction))
        .catch((error) => {
          this.logger.error(error)
          return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
        })
        .then(() => undefined)
    })
  }

  public async init() {
    this.once(Events.ClientReady, (c) => {
      this.logger.info(`Ready! Logged in as ${c.user.tag}.`)
    })

    this.initCommands()
    this.initModalSubmissions()

    this.login(config.DISCORD_TOKEN)
  }
}
