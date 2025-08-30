import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import path from 'node:path';

import { defineConfig } from 'vite';

async function copyDir(src, dest) {
  try {
    const stat = await fs.stat(src);
    if (!stat.isDirectory()) return;
  } catch (e) {
    // source doesn't exist
    return;
  }

  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

export default defineConfig({
  // Adjust base so the site works when published to GitHub Pages
  // Replace 'hackathon-stream-it' with your repo name if different
  base: '/hackathon-stream-it/',
  // We handle copying assets manually from the project's `assets/` folder
  publicDir: false,
  plugins: [
    {
      name: 'copy-assets-to-dist',
      apply: 'build',
      async closeBundle() {
        const projectRoot = path.dirname(fileURLToPath(import.meta.url));
        const src = path.join(projectRoot, 'assets');
        const dest = path.join(projectRoot, 'dist', 'assets');
        try {
          await copyDir(src, dest);
          // eslint-disable-next-line no-console
          console.log(`copied assets from ${src} -> ${dest}`);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('failed to copy assets:', err);
        }
      }
    }
  ]
});
