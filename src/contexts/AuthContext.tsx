import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "firebase/auth";
import {
  describeAuthError,
  getFirebaseAuth,
  isFirebaseConfigured,
  signInAsDemoUser,
  signInWithEmail,
  signOutUser,
  signUpWithEmail,
  updateDisplayName as updateDisplayNameService,
  watchAuthState,
} from "../services/firebase";

export type AuthUser = {
  id: string;
  displayName: string;
  email?: string;
  isAnonymous: boolean;
};

export type AuthResult = { ok: true } | { ok: false; error: string };

export type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  isConfigured: boolean;
  enterDemo: () => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, displayName: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  updateDisplayName: (name: string) => Promise<AuthResult>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function toAuthUser(user: User): AuthUser {
  return {
    id: user.uid,
    displayName: user.displayName || (user.isAnonymous ? "Jhonatan Ilha" : user.email || "Ciclista"),
    email: user.email || undefined,
    isAnonymous: user.isAnonymous,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setIsLoading(false);
      return;
    }
    const unsubscribe = watchAuthState((firebaseUser) => {
      setUser(firebaseUser ? toAuthUser(firebaseUser) : null);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  // onAuthStateChanged only fires on sign-in/sign-out — it does not refire when
  // updateProfile() changes fields (like displayName) on the already-signed-in
  // user. After those calls we resync from auth.currentUser explicitly so the
  // UI reflects the change immediately instead of waiting for the next
  // sign-in/out event.
  const syncCurrentUser = useCallback(() => {
    const current = getFirebaseAuth().currentUser;
    if (current) {
      setUser(toAuthUser(current));
    }
  }, []);

  const enterDemo = useCallback(async (): Promise<AuthResult> => {
    if (!isFirebaseConfigured) {
      setUser({ id: "demo-local", displayName: "Jhonatan Ilha", isAnonymous: true });
      return { ok: true };
    }
    try {
      await signInAsDemoUser();
      syncCurrentUser();
      return { ok: true };
    } catch (error) {
      return { ok: false, error: describeAuthError(error) };
    }
  }, [syncCurrentUser]);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    if (!isFirebaseConfigured) {
      setUser({ id: "demo-local", displayName: email.split("@")[0] || "Ciclista", email, isAnonymous: false });
      return { ok: true };
    }
    try {
      await signInWithEmail(email, password);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: describeAuthError(error) };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, displayName: string): Promise<AuthResult> => {
    if (!isFirebaseConfigured) {
      setUser({ id: "demo-local", displayName: displayName || email.split("@")[0] || "Ciclista", email, isAnonymous: false });
      return { ok: true };
    }
    try {
      await signUpWithEmail(email, password, displayName);
      syncCurrentUser();
      return { ok: true };
    } catch (error) {
      return { ok: false, error: describeAuthError(error) };
    }
  }, [syncCurrentUser]);

  const signOut = useCallback(async () => {
    if (!isFirebaseConfigured) {
      setUser(null);
      return;
    }
    await signOutUser();
  }, []);

  const updateDisplayName = useCallback(async (name: string): Promise<AuthResult> => {
    if (!isFirebaseConfigured) {
      setUser((current) => (current ? { ...current, displayName: name.trim() || current.displayName } : current));
      return { ok: true };
    }
    try {
      await updateDisplayNameService(name);
      syncCurrentUser();
      return { ok: true };
    } catch (error) {
      return { ok: false, error: describeAuthError(error) };
    }
  }, [syncCurrentUser]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, isConfigured: isFirebaseConfigured, enterDemo, signIn, signUp, signOut, updateDisplayName }),
    [user, isLoading, enterDemo, signIn, signUp, signOut, updateDisplayName]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
