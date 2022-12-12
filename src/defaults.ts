import { readYamlEnvSync } from 'yaml-env-defaults'
import type { Theme, Padding, Language } from './ray.so/type'

type Config = {
  title: string
  theme: Theme
  language: Language
  padding: Padding
  background: boolean
  darkMode: boolean
  spoiler: boolean
  generateUrl: boolean
}

type ConfigWithSlugCase = {
  title: string
  theme: Theme
  language: Language
  padding: Padding
  background: boolean
  'dark-mode': boolean
  spoiler: boolean
  'generate-url': boolean
}

type ChannelConfig<ConfigKind = Config> = Partial<ConfigKind> & { id: string }
type GuildConfig<ConfigKind = Config> = Partial<ConfigKind> & {
  id: string
  channels: ChannelConfig<ConfigKind>[] | undefined
}

const untransformedConfig: {
  default: ConfigWithSlugCase
  guilds: GuildConfig<ConfigWithSlugCase>[] | undefined
} = readYamlEnvSync('./config.yml')

type RemoveOptional<T, K extends keyof T, P> = T[K] extends Required<T[K]> ? P : never

type RenameKeys<T, K extends keyof T, V extends string> = T & {
  [P in V as RemoveOptional<T, K, P>]: T[K]
}

const transform = <T extends Partial<ConfigWithSlugCase>>(
  config: T
): RenameKeys<RenameKeys<T, 'generate-url', 'generateUrl'>, 'dark-mode', 'darkMode'> => ({
  ...config,
  ...(config['generate-url'] ? { generateUrl: config['generate-url'] } : {}),
  ...(config['dark-mode'] ? { darkMode: config['dark-mode'] } : {})
})

const config = {
  default: transform(untransformedConfig.default),
  guilds: untransformedConfig.guilds?.map((guild) => ({
    ...transform(guild),
    channels: guild.channels?.map((channel) => transform(channel))
  }))
}

const defaultsForChannel = (guildId: string | null, channelId: string): Config => {
  const maybeGuild = config.guilds?.find((guild) => guild.id === guildId)
  const maybeChannel = maybeGuild?.channels?.find((channel) => channel.id === channelId)
  return { ...config.default, ...maybeGuild, ...maybeChannel }
}

export { config as globalDefaults, defaultsForChannel }
