import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    // The 60-day simulation replays tens of thousands of reviews. Slow by design.
    testTimeout: 60_000,
    setupFiles: ['./tests/setup.ts'],
    // Domain tests run in plain node. Component tests opt into jsdom with a
    // `@vitest-environment jsdom` docblock, so the simulation — much the slowest suite —
    // does not pay for a DOM it never touches.
    environment: 'node',
  },
});
