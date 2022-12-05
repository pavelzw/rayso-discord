import { CommandInteraction, SlashCommandBuilder } from "discord.js";

// export interface CommandArgs {
//   client: Core;
//   message: Message;
// }

export interface Command {
  data: SlashCommandBuilder,
  // aliases: string[];
  // description: string;
  // permissions: PermissionResolvable;
  // category?: string;
  // usage: string;
  // examples: string[];
  execute: (interaction: CommandInteraction) => Promise<unknown | void> | unknown | void;
}
