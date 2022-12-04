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
  return String(config[value]);
}

export default {
  get
}
