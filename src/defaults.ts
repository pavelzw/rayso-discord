import { readYamlEnvSync } from 'yaml-env-defaults'

const config: Record<string, any> = readYamlEnvSync('./config.yml')

function get(value: string, channelId: string): string {
  for (const channel of config.channels) {
    if (channel.id === channelId) {
      if (value in channel) {
        return String(channel[value])
      }
    }
  }
  if (value in config) {
    return String(config[value])
  }
  throw new Error(`Value ${value} not found in config`)
}

export default {
  get
}
