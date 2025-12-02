"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthChange, isAdmin } from "@/lib/authHelper";

interface ProtectedAdminProps {
    children: React.ReactNode;
}

export default function ProtectedAdmin({ children }: ProtectedAdminProps) {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (!user || !isAdmin(user)) {
                router.replace("/admin/login");
            } else {
                setIsAuth(true);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    if (loading || !isAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return <>{children}</>;
}
