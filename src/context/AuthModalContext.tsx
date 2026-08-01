"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type AuthRole = "creator" | "brand";
export type AuthMode = "login" | "register";

type AuthModalState = {
  isOpen: boolean;
  role: AuthRole;
  mode: AuthMode;
  nonce: number;
};

type AuthModalContextValue = AuthModalState & {
  open: (role?: AuthRole, mode?: AuthMode) => void;
  close: () => void;
  setRole: (role: AuthRole) => void;
  setMode: (mode: AuthMode) => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthModalState>({
    isOpen: false,
    role: "creator",
    mode: "register",
    nonce: 0,
  });

  const open = useCallback((role: AuthRole = "creator", mode: AuthMode = "register") => {
    setState((s) => ({ isOpen: true, role, mode, nonce: s.nonce + 1 }));
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
  }, []);

  const setRole = useCallback((role: AuthRole) => {
    setState((s) => ({ ...s, role }));
  }, []);

  const setMode = useCallback((mode: AuthMode) => {
    setState((s) => ({ ...s, mode }));
  }, []);

  const value = useMemo(
    () => ({ ...state, open, close, setRole, setMode }),
    [state, open, close, setRole, setMode]
  );

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return ctx;
}
