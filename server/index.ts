/**
 * server/index.ts
 * 
 * Entry point do servidor Express.
 * 
 * Inicializa:
 * 1. Variáveis de ambiente (.env)
 * 2. Firebase Admin SDK
 * 3. Middleware global (CORS, JSON, logging)
 * 4. Rotas da API
 * 5. Tratamento de erros
 * 6. Servidor HTTP
 */

import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { initializeFirebaseAdmin } from './config/firebaseAdmin';
import { apiRouter } from './routes/index';

// ─── Inicializa Firebase (deve ser o primeiro passo) ──────────────────────────

let firebaseInitialized = false;
try {
  initializeFirebaseAdmin();
  firebaseInitialized = true;
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  console.warn(`\n[Server] ⚠️  Firebase não inicializado: ${message}`);
  console.warn('[Server] O servidor vai iniciar em modo OFFLINE (dados mockados no frontend).\n');
}

// ─── App Express ──────────────────────────────────────────────────────────────

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);
const isDev = process.env.NODE_ENV !== 'production';

// ─── CORS ─────────────────────────────────────────────────────────────────────

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  process.env.APP_URL,
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Permite requests sem origin (ex: Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origem não permitida: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Mock-Role', 'X-Request-ID'],
}));

// ─── Parsing ──────────────────────────────────────────────────────────────────

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Request Logger ───────────────────────────────────────────────────────────

app.use((req: Request, _res: Response, next: NextFunction) => {
  if (isDev) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
  }
  next();
});

// ─── Health Check ─────────────────────────────────────────────────────────────

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    firebase: firebaseInitialized ? 'connected' : 'offline',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development',
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────

if (firebaseInitialized) {
  app.use('/api', apiRouter);
} else {
  // Firebase não disponível: retorna erro explicativo em todas as rotas /api
  app.use('/api', (_req: Request, res: Response) => {
    res.status(503).json({
      success: false,
      error: 'Backend em modo offline. Configure as credenciais Firebase.',
      hint: 'Defina FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY no .env',
    });
  });
}

// ─── 404 Handler ──────────────────────────────────────────────────────────────

app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'Rota não encontrada' });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Server] Erro não tratado:', err.message);

  if (isDev) {
    console.error(err.stack);
  }

  res.status(500).json({
    success: false,
    error: isDev ? err.message : 'Erro interno do servidor.',
  });
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n🚀 Sala de Missões — Backend`);
  console.log(`   URL:      http://localhost:${PORT}`);
  console.log(`   Health:   http://localhost:${PORT}/api/health`);
  console.log(`   Firebase: ${firebaseInitialized ? '✅ conectado' : '⚠️  offline'}`);
  console.log(`   Modo:     ${isDev ? 'desenvolvimento' : 'produção'}\n`);
});

export default app;
