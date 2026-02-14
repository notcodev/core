import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    clean: true,
    entry: ['src/index.ts'],
    format: 'es',
    outDir: 'dist',
    target: 'esnext',
  },
])
