import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithCustomToken as firebaseSignInWithCustomToken,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signOut,
  type Auth,
  type UserCredential,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseClientConfigured = Object.values(firebaseConfig).every(
  (value) => typeof value === 'string' && value.trim().length > 0,
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
if (firebaseClientConfigured) {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
}

/** Auth instance when client config exists; null in unconfigured environments. */
export const firebaseAuth: Auth | null = auth;

function requireAuth(): Auth {
  if (!auth) {
    throw new Error(
      'Firebase não está configurado. Defina VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID e VITE_FIREBASE_APP_ID.',
    );
  }
  return auth;
}

export async function getCurrentIdToken(): Promise<string | null> {
  const currentAuth = requireAuth();
  const user = currentAuth.currentUser;
  return user ? user.getIdToken(true) : null;
}

export function signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
  return firebaseSignInWithEmailAndPassword(requireAuth(), email, password);
}

export function signInWithCustomToken(token: string): Promise<UserCredential> {
  return firebaseSignInWithCustomToken(requireAuth(), token);
}

export function signOutUser(): Promise<void> {
  return signOut(requireAuth());
}

export function requestPasswordReset(email: string): Promise<void> {
  return sendPasswordResetEmail(requireAuth(), email);
}
