import react from '@vitejs/plugin-react'
import path from "path"
import { defineConfig } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/*": path.resolve(__dirname, "src/*"),
      // "@components": path.resolve(__dirname, "./src/components"),
      // "@components/*": path.resolve(__dirname, "./src/components/*"),
      // "@store": path.resolve(__dirname, "./src/store"),
      // "@store/*": path.resolve(__dirname, "./src/store/*"),
      // "@scss/*": path.resolve(__dirname, "./src/styles/*"),
      // "@scss": path.resolve(__dirname, "./src/styles"),
    }
  }
})
