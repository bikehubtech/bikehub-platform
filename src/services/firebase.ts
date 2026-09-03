import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type Auth,
  type User,
} from "firebase/auth";
import { firebaseEnvironment, useFirebaseEmulator } from "../config/firebase";

export const isFirebaseConfigured = Object.values(firebaseEnvironment).every(Boolean);

export type FirebaseServiceStatus = "not-configured" | "ready";

export function getFirebaseServiceStatus(): FirebaseServiceStatus {
  return isFirebaseConfigured ? "ready" : "not-configured";
}

let cachedApp: FirebaseApp | undefined;
let cachedAuth: Auth | undefined;

function getFirebaseApp(): FirebaseApp {
  if (!cachedApp) {
    cachedApp = initializeApp({
      apiKey: firebaseEnvironment.apiKey,
      authDomain: firebaseEnvironment.authDomain,
      projectId: firebaseEnvironment.projectId,
      storageBucket: firebaseEnvironment.storageBucket,
      messagingSenderId: firebaseEnvironment.messagingSenderId,
      appId: firebaseEnvironment.appId,
    });
  }
  return cachedApp;
}

export function getFirebaseAuth(): Auth {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase não está configurado. Defina as variáveis VITE_FIREBASE_* para ativar a autenticação real.");
  }
  if (!cachedAuth) {
    cachedAuth = getAuth(getFirebaseApp());
    if (useFirebaseEmulator) {
      connectAuthEmulator(cachedAuth, "http://127.0.0.1:9099", { disableWarnings: true });
    }
  }
  return cachedAuth;
}

export type AuthErrorCode =
  | "auth/invalid-email"
  | "auth/user-disabled"
  | "auth/user-not-found"
  | "auth/wrong-password"
  | "auth/invalid-credential"
  | "auth/email-already-in-use"
  | "auth/weak-password"
  | "auth/too-many-requests"
  | "auth/network-request-failed"
  | string;

const AUTH_ERROR_MESSAGES: Partial<Record<AuthErrorCode, string>> = {
  "auth/invalid-email": "E-mail inválido.",
  "auth/user-disabled": "Esta conta foi desativada.",
  "auth/user-not-found": "Não encontramos uma conta com este e-mail.",
  "auth/wrong-password": "Senha incorreta.",
  "auth/invalid-credential": "E-mail ou senha incorretos.",
  "auth/email-already-in-use": "Já existe uma conta com este e-mail.",
  "auth/weak-password": "A senha precisa ter pelo menos 6 caracteres.",
  "auth/too-many-requests": "Muitas tentativas. Aguarde um momento e tente novamente.",
  "auth/network-request-failed": "Falha de conexão. Verifique sua internet e tente novamente.",
};

export function describeAuthError(error: unknown): string {
  const code = typeof error === "object" && error && "code" in error ? String((error as { code: unknown }).code) : undefined;
  if (code && AUTH_ERROR_MESSAGES[code]) {
    return AUTH_ERROR_MESSAGES[code]!;
  }
  return "Não foi possível concluir a operação. Tente novamente.";
}

export function watchAuthState(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}

export async function signInWithEmail(email: string, password: string) {
  await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
}

export async function signUpWithEmail(email: string, password: string, displayName: string) {
  const credential = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
  if (displayName.trim()) {
    await updateProfile(credential.user, { displayName: displayName.trim() });
  }
}

export async function signInAsDemoUser() {
  const credential = await signInAnonymously(getFirebaseAuth());
  if (!credential.user.displayName) {
    await updateProfile(credential.user, { displayName: "Jhonatan Ilha" });
  }
}

export async function signOutUser() {
  await firebaseSignOut(getFirebaseAuth());
}

export async function updateDisplayName(name: string) {
  const auth = getFirebaseAuth();
  if (!auth.currentUser) return;
  await updateProfile(auth.currentUser, { displayName: name.trim() });
}
