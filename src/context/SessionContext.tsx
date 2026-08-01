"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { SessionUser } from "@/lib/api";

type Session = { token: string; user: SessionUser };

type SessionContextValue = {
  session: Session | null;
  hydrated: boolean;
  setSession: (session: Session) => void;
  logout: () => void;
};

const STORAGE_KEY = "digifox-session";

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<Session | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        // Hydrating session from localStorage (an external system) on mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSessionState(JSON.parse(raw));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setHydrated(true);
  }, []);

  const setSession = useCallback((next: Session) => {
    setSessionState(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const logout = useCallback(() => {
    setSessionState(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ session, hydrated, setSession, logout }),
    [session, hydrated, setSession, logout]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
