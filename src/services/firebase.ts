import { firebaseEnvironment } from "../config/firebase";

export const isFirebaseConfigured = Object.values(firebaseEnvironment).every(Boolean);

export type FirebaseServiceStatus = "not-configured" | "ready";

export function getFirebaseServiceStatus(): FirebaseServiceStatus {
  return isFirebaseConfigured ? "ready" : "not-configured";
}
