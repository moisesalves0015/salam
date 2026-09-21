import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
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
