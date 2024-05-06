import { defineConfig } from "electron-vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
    publicDir: false,
    main: {
      entry: 'src/main/main.js',
      // Development-specific configurations
      dev: {
        // Enable debugging features
        devTools: true
      },
      // Production-specific configurations
      prod: {
        // Specify production-specific settings
        // For example: enable context isolation
        contextIsolation: true
      },
    },
    preload: {},
    renderer: {
        plugins: [react()]
    }
    
});