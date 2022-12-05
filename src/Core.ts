import { Client, Events, GatewayIntentBits } from "discord.js";
import { CONFIG } from "./config";
import { Logger } from "tslog";
import RaySoCommand from './events/RaySoCommand';
import RaySoSubmission from './events/RaySoSubmission';

export class Core extends Client {
  public config = CONFIG;
  public logger = new Logger();

  constructor() {
    super({ intents: [GatewayIntentBits.Guilds] });
  }

  private async initCommands() {
    this.on(Events.InteractionCreate, async interaction => {
      if (!interaction.isChatInputCommand()) return;

      try {
        await RaySoCommand.execute(interaction);
      } catch (error) {
        this.logger.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    });
  }

  private initModalSubmissions() {
    this.on(Events.InteractionCreate, async interaction => {
      if (!interaction.isModalSubmit()) return;

      try {
        await RaySoSubmission.execute(interaction);
      } catch (error) {
        this.logger.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    });
  }

  public async init() {
    this.once(Events.ClientReady, c => {
      this.logger.info(`Ready! Logged in as ${c.user.tag}.`);
    });

    this.initCommands();
    this.initModalSubmissions();

    this.login(this.config.TOKEN);
  }
}
