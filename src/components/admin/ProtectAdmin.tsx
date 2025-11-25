"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminAuth } from "@/lib/adminAuth";

interface ProtectedAdminProps {
    children: React.ReactNode;
}

export default function ProtectedAdmin({ children }: ProtectedAdminProps) {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            if (!adminAuth.isAuthenticated()) {
                router.replace("/admin/login");
            } else {
                setIsAuth(true);
            }
        };
        checkAuth();
    }, [router]);

    if (!isAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return <>{children}</>;
}
