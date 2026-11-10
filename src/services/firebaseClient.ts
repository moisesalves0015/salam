import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithCustomToken as firebaseSignInWithCustomToken,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signInAnonymously as firebaseSignInAnonymously,
  signOut,
  type Auth,
  type UserCredential,
} from 'firebase/auth';
import {
  getFirestore,
  type Firestore,
} from 'firebase/firestore';

const rawEnv: Record<string, string | undefined> =
  typeof import.meta !== 'undefined' && (import.meta as any).env
    ? (import.meta as any).env
    : typeof process !== 'undefined' && process.env
      ? process.env
      : {};

export const firebaseConfig = {
  apiKey: rawEnv.VITE_FIREBASE_API_KEY || 'AIzaSyB0wBLe5vBCLy01dQGHlWldLMGoJhvcxMw',
  authDomain: rawEnv.VITE_FIREBASE_AUTH_DOMAIN || 'salam-33122.firebaseapp.com',
  projectId: rawEnv.VITE_FIREBASE_PROJECT_ID || rawEnv.FIREBASE_PROJECT_ID || 'salam-33122',
  storageBucket: rawEnv.VITE_FIREBASE_STORAGE_BUCKET || rawEnv.FIREBASE_STORAGE_BUCKET || 'salam-33122.firebasestorage.app',
  messagingSenderId: rawEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || '224816895471',
  appId: rawEnv.VITE_FIREBASE_APP_ID || '1:224816895471:web:61b61fe98f828c06e1121a',
  measurementId: rawEnv.VITE_FIREBASE_MEASUREMENT_ID || 'G-EK0V5W8T71',
};

export const firebaseClientConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (firebaseClientConfigured) {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

/** Firebase App instance */
export const firebaseApp: FirebaseApp | null = app;

/** Auth instance when client config exists */
export const firebaseAuth: Auth | null = auth;

/** Cloud Firestore instance when client config exists */
export const firestoreDb: Firestore | null = db;

function requireAuth(): Auth {
  if (!auth) {
    throw new Error(
      'Firebase Auth não está configurado. Verifique as variáveis VITE_FIREBASE_* no arquivo .env.',
    );
  }
  return auth;
}

export function requireFirestore(): Firestore {
  if (!db) {
    throw new Error(
      'Cloud Firestore não está configurado. Verifique as variáveis VITE_FIREBASE_* no arquivo .env.',
    );
  }
  return db;
}

export async function getCurrentIdToken(): Promise<string | null> {
  if (!auth) return null;
  const user = auth.currentUser;
  if (!user) return null;
  try {
    return await user.getIdToken();
  } catch {
    return null;
  }
}

export function signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
  return firebaseSignInWithEmailAndPassword(requireAuth(), email, password);
}

export function signInWithCustomToken(token: string): Promise<UserCredential> {
  return firebaseSignInWithCustomToken(requireAuth(), token);
}

export function signInAnonymously(): Promise<UserCredential> {
  return firebaseSignInAnonymously(requireAuth());
}

export function signOutUser(): Promise<void> {
  if (!auth) return Promise.resolve();
  return signOut(auth);
}

export function requestPasswordReset(email: string): Promise<void> {
  return sendPasswordResetEmail(requireAuth(), email);
}

