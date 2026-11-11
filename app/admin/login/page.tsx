"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { AdminMessage } from "../../../components/admin/AdminShell";
import { useAdminAuth } from "../../../components/admin/AdminAuthProvider";
import {
  auth,
  db,
  firebaseConfigured,
  requireAuth,
  requireDb,
} from "../../../lib/firebase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const { status } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authorized") router.replace("/admin");
  }, [router, status]);

  if (!firebaseConfigured || !auth || !db) {
    return (
      <AdminMessage
        title="Firebase setup required"
        detail="Copy the Firebase web app values from .env.example to .env.local, then configure Email/Password sign-in and provision an enabled admin account."
        action={
          <Link href="/" className="text-sm text-blue-200 hover:text-white">
            Return to portfolio
          </Link>
        }
      />
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");

    try {
      const authClient = requireAuth();
      const database = requireDb();
      const credential = await signInWithEmailAndPassword(authClient, email, password);
      const adminRecord = await getDoc(doc(database, "admins", credential.user.uid));
      if (!adminRecord.exists() || adminRecord.data().enabled !== true) {
        await signOut(authClient);
        throw new Error(
          "This account is not enabled as a portfolio administrator.",
        );
      }

      router.replace("/admin");
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Sign-in failed. Check your connection and try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function handlePasswordReset() {
    setError("");
    setNotice("");
    if (!email.trim()) {
      setError("Enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(requireAuth(), email.trim());
      setNotice("If the account exists, a password-reset email has been sent.");
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Could not send the password-reset email.",
      );
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#07090e] px-5 text-white">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d1018] p-6 sm:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-200/70">
          Joey / Portfolio CMS
        </p>
        <h1 className="mt-5 text-2xl font-medium">Administrator sign in</h1>
        <p className="mt-2 text-sm leading-6 text-white/50">
          Sign in with an enabled Firebase administrator account.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <label className="block text-sm text-white/70">
            Email address
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 min-h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-white outline-none focus:border-blue-200/60"
            />
          </label>
          <label className="block text-sm text-white/70">
            Password
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 min-h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-white outline-none focus:border-blue-200/60"
            />
          </label>
          {error && (
            <p role="alert" className="text-sm leading-5 text-red-300">
              {error}
            </p>
          )}
          {notice && (
            <p role="status" className="text-sm leading-5 text-emerald-300">
              {notice}
            </p>
          )}
          <button
            disabled={busy}
            className="min-h-11 w-full rounded-lg bg-blue-100 px-4 text-sm font-medium text-slate-950 transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
          >
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => void handlePasswordReset()}
          className="mt-4 text-sm text-white/50 underline decoration-white/20 underline-offset-4 hover:text-white"
        >
          Forgot password?
        </button>
      </section>
    </main>
  );
}
