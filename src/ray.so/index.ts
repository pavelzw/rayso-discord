import RaySo from 'rayso-api'
import config from '../config'
import type { Options } from './type'
import { generateUrl } from './url'

const generate = (options: Options, code: string) => {
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

  return Promise.all([urlPromise, imagePromise]).then(([url, image]) => ({ url, image }))
}

export default generate
