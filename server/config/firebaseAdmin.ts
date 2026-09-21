/**
 * server/config/firebaseAdmin.ts
 * 
 * Inicialização centralizada do Firebase Admin SDK.
 * 
 * Estratégia de autenticação (em ordem de prioridade):
 * 1. Variáveis de ambiente FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY → ServiceAccount explícita
 * 2. Application Default Credentials (ADC) → gcloud auth / Firebase Emulator / Cloud Run
 *
 * NUNCA expor este módulo no frontend.
 * NUNCA commitar arquivos de Service Account no Git.
 */

import {
  App,
  initializeApp,
  applicationDefault,
  cert,
  getApps,
} from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getStorage, Storage } from 'firebase-admin/storage';
import { Credential } from 'firebase-admin/app';

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface FirebaseAdminServices {
  firestore: Firestore;
  auth: Auth;
  storage: Storage;
  app: App;
}

// ─── Estado singleton ─────────────────────────────────────────────────────────

let _services: FirebaseAdminServices | null = null;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Normaliza a private key aceitando tanto \n literal quanto quebras de linha reais.
 * Isso resolve o problema comum de .env em Windows/Linux com escapes diferentes.
 */
function normalizePrivateKey(rawKey: string): string {
  return rawKey.replace(/\\n/g, '\n');
}

/**
 * Retorna true se o Firebase Emulator está configurado.
 * Permite desenvolvimento local sem credenciais reais.
 */
function isEmulatorActive(): boolean {
  return !!(
    process.env.FIRESTORE_EMULATOR_HOST ||
    process.env.FIREBASE_EMULATOR_HUB
  );
}

/**
 * Determina a configuração de credential mais adequada para o ambiente.
 */
function resolveCredential(): Credential | undefined {
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;
  const projectId = process.env.FIREBASE_PROJECT_ID;

  // Modo Emulator — sem credenciais reais necessárias
  if (isEmulatorActive()) {
    console.log('[Firebase] 🔧 Modo Emulator detectado — usando credenciais mockadas');
    return applicationDefault();
  }

  // ServiceAccount explícita via variáveis de ambiente
  if (clientEmail && privateKeyRaw && projectId) {
    const privateKey = normalizePrivateKey(privateKeyRaw);
    
    // Validação básica do formato da chave
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      throw new Error(
        '[Firebase] FIREBASE_PRIVATE_KEY inválida. ' +
        'Certifique-se de que a chave começa com "-----BEGIN PRIVATE KEY-----" ' +
        'e que as quebras de linha estão escapadas como \\n no .env'
      );
    }

    console.log(`[Firebase] 🔑 Usando Service Account: ${clientEmail}`);
    return cert({
      projectId,
      clientEmail,
      privateKey,
    });
  }

  // Application Default Credentials (funciona em Cloud Run, GKE, etc.)
  console.log('[Firebase] ☁️  Usando Application Default Credentials (ADC)');
  console.log('[Firebase]    Para desenvolvimento local, execute:');
  console.log('[Firebase]    gcloud auth application-default login');
  return applicationDefault();
}

// ─── Inicialização ────────────────────────────────────────────────────────────

/**
 * Inicializa o Firebase Admin SDK (singleton — idempotente).
 * Lança erro com mensagem clara se a configuração estiver incompleta.
 */
export function initializeFirebaseAdmin(): FirebaseAdminServices {
  // Retorna o singleton se já inicializado
  if (_services) {
    return _services;
  }

  // Evita inicializações duplicadas (ex: hot reload em desenvolvimento)
  let app: App;

  const existingApps = getApps();
  const existingApp = existingApps.find((a: App | null) => a?.name === '[DEFAULT]');
  
  if (existingApp) {
    app = existingApp;
    console.log('[Firebase] ♻️  Reutilizando app existente');
  } else {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    
    if (!projectId && !isEmulatorActive()) {
      // Aviso em vez de erro — ADC pode ter o projectId configurado
      console.warn(
        '[Firebase] ⚠️  FIREBASE_PROJECT_ID não definida. ' +
        'Certifique-se de configurar as variáveis no .env'
      );
    }

    try {
      const credentialOptions = resolveCredential();
      
      app = initializeApp({
        credential: credentialOptions,
        projectId: projectId || undefined,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || undefined,
      });

      console.log(`[Firebase] ✅ Admin SDK inicializado — projeto: ${projectId || 'auto-detectado'}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('[Firebase] ❌ Falha na inicialização:', message);
      console.error('[Firebase] Verifique as variáveis de ambiente:');
      console.error('[Firebase]   FIREBASE_PROJECT_ID   =', process.env.FIREBASE_PROJECT_ID ? '✓' : '✗ ausente');
      console.error('[Firebase]   FIREBASE_CLIENT_EMAIL =', process.env.FIREBASE_CLIENT_EMAIL ? '✓' : '✗ ausente');
      console.error('[Firebase]   FIREBASE_PRIVATE_KEY  =', process.env.FIREBASE_PRIVATE_KEY ? '✓' : '✗ ausente');
      throw new Error(`[Firebase] Inicialização falhou: ${message}`);
    }
  }

  const firestore = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

  // Configurações do Firestore
  firestore.settings({ ignoreUndefinedProperties: true });

  _services = { firestore, auth, storage, app };
  return _services;
}

/**
 * Retorna os serviços Firebase já inicializados.
 * Lança erro se initializeFirebaseAdmin() ainda não foi chamado.
 */
export function getFirebaseServices(): FirebaseAdminServices {
  if (!_services) {
    throw new Error(
      '[Firebase] getFirebaseServices() chamado antes de initializeFirebaseAdmin(). ' +
      'Chame initializeFirebaseAdmin() no startup da aplicação.'
    );
  }
  return _services;
}

// ─── Exports convenientes ─────────────────────────────────────────────────────

export const getDb = () => getFirebaseServices().firestore;
export const getAdminAuth = () => getFirebaseServices().auth;
export const getAdminStorage = () => getFirebaseServices().storage;
