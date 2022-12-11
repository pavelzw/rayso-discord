# ray.so Discord Bot

<img src=".github/assets/icon.png" width="150" />

This is a Discord bot that allows you to generate [ray.so](https://ray.so) code snippets in Discord.
Just use `/ray` to generate a snippet. You can add it to your own Discord server [here](https://discord.com/api/oauth2/authorize?client_id=1048944006895243315&permissions=2147483648&scope=bot%20applications.commands).

https://user-images.githubusercontent.com/29506042/206880660-6f297ce1-1d80-4cc0-a523-43741883a98a.mp4

## Installation

### Docker

I would recommend using Docker to run the bot. You can pull the image from the GitHub Container Registry:

```console
docker run -e DISCORD_TOKEN=<discord api token> -e CUTTLY_TOKEN=<cuttly api token> ghcr.io/pavelzw/rayso-discord
```

A Docker Compose configuration could look like this:

```yaml
version: '3.9'

services:
  rayso-discord:
    image: ghcr.io/pavelzw/rayso-discord
    restart: always
    environment:
      DISCORD_TOKEN: '{{ discord_token }}'
      CUTTLY_TOKEN: '{{ cuttly_token }}'
    volumes:
      - ./config.yml:/app/config.yml
```

### Local

If you want to run the bot locally, you can clone the repository and install the dependencies with [pnpm](https://pnpm.io/) and run it:

```console
git clone https://github.com/pavelzw/rayso-discord.git
cd rayso-discord
pnpm install
echo "DISCORD_TOKEN=<discord api token>" > .env
echo "CUTTLY_TOKEN=<cuttly api token>" >> .env
pnpm start
```

## Activate the slash command on your server

To activate the slash command on your server, you need to execute the following command:

```console
DISCORD_CLIENT_ID=<bot client id> DISCORD_TOKEN=<discord api token> pnpm run deploy-commands
```

## Configuration

If you want to change the default configuration, you can create a `config.yml` file in the root directory of the project or in the case of docker, mount the file to `/app/config.yml`. You can find the default configuration [here](config.yml).

The `default` configuration is used for all servers or channels that don't have a custom configuration. Here, all options should be set as a fallback.

You can create different configurations for different servers or channels. 
To do this, you have to add the Discord Server ID (activate developer mode in Discord and right click on your server to copy it) under `guilds` for a server-wide configuration or the Discord Channel ID under `guilds.<server id>.channels` for a channel-specific configuration.

### Configuration options

- `title`: The title of the snippet.
- `theme`: The color theme of the snippet.
  - `breeze`
  - `candy`
  - `crimson`
  - `falcon`
  - `meadow`
  - `midnight`
  - `raindrop`
  - `sunset`
- `padding`: The padding of the snippet.
  - `16`
  - `32`
  - `64`
  - `128`
- `background`: Whether the background should be transparent or not.
  - `true`, `yes`, `y`, `1`
  - `false`, `no`, `n`, `0`
- `dark-mode`: Whether the dark mode should be enabled or not.
  - `true`, `yes`, `y`, `1`
  - `false`, `no`, `n`, `0`
- `language`: Which programming language is used for syntax highlighting. Defaults to `auto`. You can find a complete list [here](https://github.com/pavelzw/rayso-discord/blob/f37cbd32838fdd50842939a7cec1edd782b8b1f3/src/ray.so/type.ts#L6-L59).
- `spoiler`: Whether the snippet should be hidden behind a spoiler or not.
  - `true`, `yes`, `y`, `1`
  - `false`, `no`, `n`, `0`
- `generate-url`: Whether the bot should generate a short link using [cutt.ly](https://cutt.ly) to the corresponding ray.so page or not. Only works if `CUTTLY_TOKEN` is set.
  - `true`, `yes`, `y`, `1`
  - `false`, `no`, `n`, `0`

Since Discord Modals currently only support text inputs, the workaround of entering `true` or `false` as a string is used instead of a button.
Also, Discord Modals only support up to five components, so `padding`, `background`, `language` and `generate-url` are only available in the `config.yml` file. See [the official Discord documentation](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-modal) for further information. 

### cutt.ly integration

If you want to use the [cutt.ly](https://cutt.ly) integration in order to generate short links to the corresponding ray.so page, you have to create an account and get an API key. They currently support 1000 requests per month for free.
Then, you can set the environment variable `CUTTLY_TOKEN` or add it to the `.env` configuration file.
