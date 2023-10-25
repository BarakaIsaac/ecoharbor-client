import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@mui/x-charts': '@mui/x-charts', 
    }
  }
})