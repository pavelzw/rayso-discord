import RaySo from 'rayso-api'
import config from '../config'
import type { Options } from './type'
import { generateUrl } from './url'

const generate = async (options: Options, code: string) => {
  console.log(options)
  const urlPromise =
    config.CUTTLY_TOKEN && options.generateUrl
      ? generateUrl(
          options.title,
          options.theme,
          code,
          options.padding,
          options.language,
          options.darkMode,
          options.background
        )
      : Promise.resolve(undefined)

  const imagePromise = new RaySo({ ...options, localPreview: false }).cook(code)

  const [url, image] = await Promise.all([urlPromise, imagePromise])
  return { url, image }
}

export default generate
