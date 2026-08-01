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
