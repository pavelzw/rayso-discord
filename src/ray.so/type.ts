import z from 'zod'

export const themes = ['breeze', 'candy', 'crimson', 'falcon', 'meadow', 'midnight', 'raindrop', 'sunset'] as const
export const padding = ['16', '32', '64', '128'] as const
export const languages = [
  'auto',
  'bash',
  'c++',
  'c#',
  'clojure',
  'coffeescript',
  'crystal',
  'css',
  'd',
  'dart',
  'diff',
  'docker',
  'elm',
  'erlang',
  'fortran',
  'f#',
  'gherkin',
  'go',
  'groovy',
  'haskell',
  'html',
  'java',
  'javascript',
  'json',
  'jsx',
  'julia',
  'kotlin',
  'latex',
  'lisp',
  'lua',
  'markdown',
  'mathematica',
  'nginx',
  'objective c',
  'ocaml',
  'perl',
  'php',
  'powershell',
  'python',
  'r',
  'ruby',
  'rust',
  'scala',
  'scss',
  'smalltalk',
  'sql',
  'swift',
  'typescript',
  'tsx',
  'twig',
  'verilog',
  'vhdl',
  'xquery',
  'yaml'
] as const

export const options = z.object({
  title: z.string(),
  theme: z.enum(themes),
  padding: z.enum(padding),
  language: z.enum(languages),
  spoiler: z.boolean(),
  background: z.boolean(),
  darkMode: z.boolean(),
  generateUrl: z.boolean()
})

export type Theme = typeof themes[number]
export type Padding = typeof padding[number]
export type Language = typeof languages[number]
export type Options = z.infer<typeof options>
