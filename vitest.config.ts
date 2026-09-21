import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['server/**/*.ts'],
    },
    // Timeout maior para testes que podem fazer chamadas reais ao Firestore
    testTimeout: 30000,
  },
  resolve: {
    alias: {
      '@server': './server',
      '@shared': './src',
    },
  },
});
