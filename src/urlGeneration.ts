import { encodeURI } from "js-base64";

async function shortenUrl(longUrl: string): Promise<string>
{
  const toFetch = `https://cutt.ly/api/api.php?key=${process.env.CUTTLY_KEY}&short=${encodeURIComponent(longUrl)}`;
  return fetch(toFetch)
    .then(response => response.json())
    .then(data => data.url.shortLink);
}

async function generateUrl(title: string, theme: string, code: string, padding: string, language: string, darkMode: boolean, background: boolean): Promise<string> {
  const base64Text = encodeURI(code);
  const longUrl = `https://ray.so/?title=${title}&?theme=${theme}&spacing=${padding}&background=${background}&darkMode=${darkMode}&code=${base64Text}&language=${language}`;
  console.debug(longUrl);
  const shortUrl = await shortenUrl(longUrl);
  return `<${shortUrl}>`;
}

export {
  generateUrl
}