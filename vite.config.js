import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.ts'), // Point d'entrée principal de votre application Angular
      },
      output: {
        dir: resolve(__dirname, 'dist/vite'), // Dossier de sortie pour le build Vite
        format: 'es', // Format de module ES
      },
    },
    outDir: './dist/vite',
  },
  server: {
    allowedHosts: [
      'localhost', // Autorise localhost
      'devserver-main--zippy-scone-17428d.netlify.app' // Autorise votre hôte Netlify
    ]
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Alias pour les imports
    },
  },
});
