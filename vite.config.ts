import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env without exposing secrets to the client bundle.
  // NOTE: Vite only exposes variables prefixed with VITE_ to client code.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // Base path can be overridden for GitHub Pages or subpath deploys.
    // Example: VITE_BASE_PATH=/lexipro-forensic-website/
    base: env.VITE_BASE_PATH || '/',
    plugins: [react()],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false
    }
  };
});
