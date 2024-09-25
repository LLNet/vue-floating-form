import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build:{
    copyPublicDir: false,
    lib: {
      entry: {
        main: path.resolve(__dirname, 'lib/main.js'),
        text: path.resolve(__dirname, 'lib/text.js'),
        number: path.resolve(__dirname, 'lib/number.js'),
        textarea: path.resolve(__dirname, 'lib/textarea.js'),
        select: path.resolve(__dirname, 'lib/select.js'),
        select2: path.resolve(__dirname, 'lib/select2.js'),
        editor: path.resolve(__dirname, 'lib/editor.js'),
        toggle: path.resolve(__dirname, 'lib/toggle.js'),
        color: path.resolve(__dirname, 'lib/color.js'),
        date: path.resolve(__dirname, 'lib/date.js'),
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', 'quill', 'vueuse/core'],
      output: {
          globals: {
            vue: 'Vue',
            quill: 'Quill'
          }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '$': path.resolve(__dirname, 'dist'),
    },
  },
})
