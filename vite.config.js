import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import scrollbar from 'tailwind-scrollbar'

// https://vite.dev/config/
/** @type {import('tailwindcss').Config} */
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 4000 // change here
  },

  plugins: [
    tailwindcss(),
    scrollbar,
    react()
  ],
})
