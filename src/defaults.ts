import rename from 'deep-rename-keys'
import { readYamlEnvSync } from 'yaml-env-defaults'
import type { Theme, Padding, Language } from './ray.so/type'

type Config = {
  title: string
  theme: Theme
  padding: Padding
  background: boolean
  darkMode: boolean
  language: Language
  spoiler: boolean
  generateUrl: boolean
}

type GuildConfig = Partial<Config> & { id: string; channels: ChannelConfig[] | undefined }
type ChannelConfig = Partial<Config> & { id: string }

const camelize = (s: string) => s.replace(/-./g, (x) => x[1].toUpperCase())

const config: {
  default: Config
  guilds: GuildConfig[] | undefined
} = rename(readYamlEnvSync('./config.yml'), camelize)

const defaultsForChannel = (guildId: string | null, channelId: string): Config => {
  const maybeGuild = config.guilds?.find((guild) => guild.id === guildId)
  const maybeChannel = maybeGuild?.channels?.find((channel) => channel.id === channelId)
  return { ...config.default, ...maybeGuild, ...maybeChannel }
}

export { config as globalDefaults, defaultsForChannel }
