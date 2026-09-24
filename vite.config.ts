import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'assets/**/*'],
        manifest: {
          id: '/',
          name: 'Sala de Missões — Plataforma Pedagógica Gamificada',
          short_name: 'Sala de Missões',
          description: 'Plataforma pedagógica gamificada para trilhas, desafios e acompanhamento da aprendizagem.',
          lang: 'pt-BR',
          dir: 'ltr',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          orientation: 'any',
          theme_color: '#1D4ED8',
          background_color: '#F6FAFF',
          categories: ['education', 'kids', 'productivity'],
          prefer_related_applications: false,
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // 15 MiB to allow large assets and bundles
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              // Do NOT cache API requests to /api
              urlPattern: /\/api\/.*/i,
              handler: 'NetworkOnly'
            }
          ]
        },
        devOptions: {
          enabled: false // keep disabled for general dev to avoid caching headaches
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // Proxy: redireciona /api/* para o backend Express (porta 3001)
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL || 'http://localhost:3001',
          changeOrigin: true,
          // Se o backend não estiver disponível, o Vite retorna 502 (não trava o frontend)
          configure: (proxy) => {
            proxy.on('error', (err) => {
              // Silencia erros de conexão recusada (backend offline é esperado em dev)
              if ((err as NodeJS.ErrnoException).code !== 'ECONNREFUSED') {
                console.error('[Proxy] Erro:', err.message);
              }
            });
          },
        },
      },
    },
  };
});
