"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useState } from "react";
import {
  Activity,
  BriefcaseBusiness,
  Images,
  LayoutDashboard,
  LogOut,
  Settings,
  Shapes,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useAdminAuth } from "./AdminAuthProvider";

const links = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard },
  { label: "Projects", path: "/admin/projects", icon: BriefcaseBusiness },
  { label: "Skills", path: "/admin/skills", icon: Sparkles },
  { label: "Toolkit", path: "/admin/toolkit", icon: Shapes },
  { label: "Experience", path: "/admin/experience", icon: Activity },
  { label: "Media library", path: "/admin/media", icon: Images },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { status, configReady, logout } = useAdminAuth();
  const [logoutError, setLogoutError] = useState("");

  async function handleLogout() {
    setLogoutError("");
    try {
      await logout();
    } catch (reason) {
      console.error("Could not sign out of the admin dashboard.", reason);
      setLogoutError(
        reason instanceof Error ? reason.message : "Could not log out. Try again.",
      );
    }
  }

  useEffect(() => {
    if (!configReady) return;
    if (status === "signedOut" || status === "unauthorized") {
      router.replace("/admin/login");
    }
  }, [configReady, router, status]);

  if (!configReady) {
    return (
      <AdminMessage
        title="Firebase setup required"
        detail="Add the Firebase web app values to .env.local, create Firestore, enable Email/Password sign-in, and add your UID to admins before using the CMS."
        action={
          <Link
            href="/admin/login"
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/75"
          >
            View setup
          </Link>
        }
      />
    );
  }

  if (status !== "authorized") {
    return (
      <AdminMessage
        title="Checking administrator access"
        detail="Only an enabled administrator account can access portfolio content."
      />
    );
  }

  return (
    <div className="admin-theme min-h-screen bg-[#07090e] text-white lg:flex">
      <aside className="border-b border-white/10 bg-[#0a0c12] px-4 py-4 lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-64 lg:flex-col lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
        <Link href="/admin" className="flex items-center gap-3 px-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-blue-200/20 bg-blue-200/10 font-mono text-sm text-blue-100">
            J.
          </span>
          <span>
            <span className="block text-sm font-medium">Joey / Studio</span>
            <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
              Portfolio CMS
            </span>
          </span>
        </Link>

        <nav
          aria-label="Admin navigation"
          className="mt-6 flex gap-1 overflow-x-auto pb-1 lg:mt-10 lg:flex-col lg:overflow-visible"
        >
          {links.map(({ label, path, icon: Icon }) => {
            const active =
              path === "/admin"
                ? pathname === path
                : pathname === path || pathname.startsWith(`${path}/`);
            return (
              <Link
                key={path}
                href={path}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-10 shrink-0 items-center gap-3 rounded-lg px-3 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300 ${
                  active
                    ? "bg-blue-200/10 text-blue-100"
                    : "text-white/55 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4 lg:mt-auto">
          <Link
            href="/"
            target="_blank"
            className="flex min-h-10 flex-1 items-center gap-2 rounded-lg px-3 text-sm text-white/55 hover:bg-white/[0.04] hover:text-white"
          >
            View portfolio <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={() => void handleLogout()}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white/55 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300"
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-4 sm:p-7 lg:ml-64 lg:p-10">
        {logoutError && (
          <p role="alert" className="mb-5 text-sm text-red-300">
            {logoutError}
          </p>
        )}
        {children}
      </main>
    </div>
  );
}

export function AdminMessage({
  title,
  detail,
  action,
}: {
  title: string;
  detail: string;
  action?: ReactNode;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#07090e] px-5 text-white">
      <section className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d1018] p-6 sm:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-200/70">
          Joey / Portfolio CMS
        </p>
        <h1 className="mt-5 text-2xl font-medium">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-white/55">{detail}</p>
        {action && <div className="mt-6">{action}</div>}
      </section>
    </main>
  );
}
