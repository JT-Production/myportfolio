"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, firebaseConfigured } from "../../lib/firebase/client";

type AdminStatus = "loading" | "signedOut" | "authorized" | "unauthorized";

type AdminAuthValue = {
  user: User | null;
  status: AdminStatus;
  configReady: boolean;
  logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AdminStatus>(
    firebaseConfigured ? "loading" : "signedOut",
  );

  useEffect(() => {
    const authClient = auth;
    const database = db;
    if (!authClient || !database) return;

    return onAuthStateChanged(authClient, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setStatus("signedOut");
        return;
      }

      try {
        const adminRecord = await getDoc(doc(database, "admins", currentUser.uid));
        if (adminRecord.exists() && adminRecord.data().enabled === true) {
          setStatus("authorized");
          return;
        }

        setStatus("unauthorized");
        await signOut(authClient);
        setUser(null);
      } catch (error) {
        console.error("Could not verify the administrator account.", error);
        setStatus("unauthorized");
        await signOut(authClient);
        setUser(null);
      }
    });
  }, []);

  const value = useMemo<AdminAuthValue>(
    () => ({
      user,
      status,
      configReady: firebaseConfigured,
      logout: async () => {
        if (!auth) return;
        await signOut(auth);
        setUser(null);
        setStatus("signedOut");
      },
    }),
    [status, user],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider.");
  }
  return context;
}
