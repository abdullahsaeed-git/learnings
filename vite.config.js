import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

//   server: {
//   proxy: {
//     "/quran": {
//       target: "https://alquran-api.pages.dev",
//       changeOrigin: true,
//       rewrite: path => path.replace(/^\/quran/, "")
//     }
//   }
// }
})
