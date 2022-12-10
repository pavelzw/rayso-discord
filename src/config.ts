import * as dotenv from 'dotenv'
dotenv.config()

const config = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  CUTTLY_TOKEN: process.env.CUTTLY_TOKEN
}

export default config
