import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build:{
    lib: {
      entry: path.resolve(__dirname, 'lib/main.js'),
      name: 'FloatingForm',
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `vue-floating-form.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'quill'],
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
    },
  },
})
