"use client";

import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { usePathname } from "next/navigation";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) {
        return <>{children}</>;
    }

    return <AdminLayout>{children}</AdminLayout>;
}
