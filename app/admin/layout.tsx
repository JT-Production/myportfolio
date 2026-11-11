"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AdminAuthProvider } from "../../components/admin/AdminAuthProvider";
import { AdminShell } from "../../components/admin/AdminShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <AdminAuthProvider>
      {isLoginPage ? children : <AdminShell>{children}</AdminShell>}
    </AdminAuthProvider>
  );
}
