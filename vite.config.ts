import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monkey, { cdn } from 'vite-plugin-monkey';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 31130,
  },
  plugins: [
    react(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        icon: 'https://www.javbus.com/favicon.ico',
        name: 'Old Driver Helper R',
        namespace: 'com.undsf.tmus.odhr',
        author: 'Arathi of Nebnizilla',
        homepageURL: 'https://github.com/Arathi/project-tenryuu-r',
        match: [
          'https://www.javbus.com/*'
        ],
      },
      build: {
        externalGlobals: {
          react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
          'react-dom': cdn.jsdelivr(
            'ReactDOM',
            'umd/react-dom.production.min.js',
          ),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'),
    },
  },
});
