/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom', // Use happy-dom instead of jsdom to avoid ES module issues
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/test/**/*.{test,spec}.{js,ts}'],
    exclude: [
      'node_modules/',
      'dist/',
      'coverage/'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'dist/',
        'coverage/'
      ]
    }
  }
});
