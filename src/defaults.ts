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

// TODO: some kind of slight transform to make things like uppercase themes work
// we'll just assume this is a valid config, could use zod to type check this
const config: { default: Config; channels: (Partial<Config> & { id: string })[] } = readYamlEnvSync('./config.yml')

const defaultsForChannel = (channelId: string) => {
  const maybeChannel = config.channels.find((channel) => channel.id === channelId)

  return maybeChannel ? { ...config.default, ...maybeChannel } : config.default
}

export { config as globalDefaults, defaultsForChannel }
