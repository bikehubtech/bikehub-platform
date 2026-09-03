import { readEnvironmentValue } from "../utils/environment";

export type FirebaseEnvironment = {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
};

export const firebaseEnvironment: FirebaseEnvironment = {
  apiKey: readEnvironmentValue("VITE_FIREBASE_API_KEY"),
  authDomain: readEnvironmentValue("VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: readEnvironmentValue("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: readEnvironmentValue("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: readEnvironmentValue("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: readEnvironmentValue("VITE_FIREBASE_APP_ID"),
};

// Quando true, o app conecta no Firebase Auth Emulator local (127.0.0.1:9099)
// em vez do projeto Firebase real — útil para testar a integração sem criar
// um projeto na nuvem. Ative com VITE_FIREBASE_USE_EMULATOR=true.
export const useFirebaseEmulator = readEnvironmentValue("VITE_FIREBASE_USE_EMULATOR") === "true";
