import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.',
        }
      ]
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@huggingface/transformers': path.resolve(
        __dirname,
        'node_modules/@huggingface/transformers/dist/transformers.min.js'
      ),
    },
  },
  optimizeDeps: {
    include: ['@huggingface/transformers'],
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})