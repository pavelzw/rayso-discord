import { defineConfig } from 'tsup'

export default defineConfig({
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: {
    resolve: true,
    entry: './src/index.ts'
  },
  entry: {
    index: './src/index.ts',
    deploy: './src/discord.js/deploy-commands.ts'
  },
  format: ['esm'],
  minify: false
})
