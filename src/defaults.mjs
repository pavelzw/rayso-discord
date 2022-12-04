import { readYamlEnvSync, readYamlEnv } from 'yaml-env-defaults';

const config = readYamlEnvSync('./config.yml');

function get(value, channelId) {
  const channels = config['channels'];
  for (const channel of channels) {
    if (channel.id === channelId) {
      if (value in channel) {
        return String(channel[value]);
      }
    }
  }
  if (value in config) {
    return String(config[value]);
  }
  throw new Error(`Value ${value} not found in config`);
}

export default {
  get
}
