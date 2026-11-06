import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // Relative asset paths let the build run from any folder, such as a GitHub Pages repository path.
  base: './',
  plugins: [react()],
});
