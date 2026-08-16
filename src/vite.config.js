import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/portfolio/',
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        project: resolve(__dirname, 'project.html'),
      },
    },
  },
  envDir: "../",
});
