import { createContext, type ReactNode } from "react";

export type AuthUser = {
  id: string;
  displayName: string;
  email?: string;
};

export type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={{ user: null, isLoading: false }}>
      {children}
    </AuthContext.Provider>
  );
}
