import react from '@vitejs/plugin-react'
import path from "path"
import { defineConfig } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "./src/styles/_shared.scss";`
  //     }
  //   }
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/*": path.resolve(__dirname, "src/*"),

    }
  }
})
