// when using normal imports instead of these dynamic imports
// typescript will silently ignore this file as it is now considered an
// augmentation of the module 'rayso-api' and not a global module declaration.
// this is a totally bs issue
// reference: https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts
/* eslint-disable @typescript-eslint/consistent-type-imports */

declare module 'rayso-api' {
  type Browser = import('puppeteer').Browser
  type Page = import('puppeteer').Page
  type ElementHandle = import('puppeteer').ElementHandle

  export type RaySoOptions = {
    title?: string
    theme?: string
    background?: boolean
    darkMode?: boolean
    padding?: string
    language?: string
    localPreview?: boolean
    localPreviewPath?: string
    debug?: boolean
  }

  export default class RaySo {
    constructor(options: RaySoOptions)
    public cook(code: string): Promise<Buffer>
    private openBrowser(): Promise<Browser | undefined>
    private openPage(browser: Browser, code: string): Promise<Page>
    private getFrameElement(page: Page): Promise<ElementHandle>
    private getImage(element: ElementHandle): Promise<Buffer>
    private buildPageUrl(string): string
    private stringToBase64(string): string
    private validateParameters(params: RaySoOptions): any
  }
}
