import { readYamlEnvSync } from 'yaml-env-defaults'

type Config = {
  title: string
  theme: string // TODO
  padding: number // TODO
  background: boolean
  'dark-mode': boolean
  language: string // TODO
  spoiler: boolean
  'generate-url': boolean
}

// we'll just assume this is a valid config, could use zod to type check this
const config: Config & { channels: (Partial<Config> & { id: string })[] } = readYamlEnvSync('./config.yml')

function get(key: keyof Config, channelId: string): string {
  const maybeChannel = config.channels.find((channel) => channel.id === channelId)

  return maybeChannel && key in maybeChannel ? String(maybeChannel[key]) : String(config[key])
}

export { get }
