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

const camelize = (s: string) => s.replace(/-./g, (x) => x[1].toUpperCase())

const config: {
  default: Config
  channels: (Partial<Config> & { id: string })[]
} = rename(readYamlEnvSync('./config.yml'), camelize)

const defaultsForChannel = (channelId: string) => {
  const maybeChannel = config.channels.find((channel) => channel.id === channelId)

  return maybeChannel ? { ...config.default, ...maybeChannel } : config.default
}

export { config as globalDefaults, defaultsForChannel }
