import { encodeURI } from 'js-base64'
import config from '../config'

// TODO: zod validation for api response?
const shortenUrl = (url: string) =>
  fetch(`https://cutt.ly/api/api.php?key=${config.CUTTLY_TOKEN}&short=${encodeURIComponent(url)}`)
    .then((response) => response.json())
    .then((data) => data.url.shortLink as string)

const generateUrl = (
  title: string,
  theme: string,
  code: string,
  padding: string,
  language: string,
  darkMode: boolean,
  background: boolean
) => {
  const base64Text = encodeURI(code)
  const url = `https://ray.so/?title=${title}&?theme=${theme}&spacing=${padding}&background=${background}&darkMode=${darkMode}&code=${base64Text}&language=${language}`

  return shortenUrl(url)
}

export { generateUrl }
