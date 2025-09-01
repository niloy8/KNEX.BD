"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/adminApi";

export default function ProtectedAdmin({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!adminApi.isAuthenticated()) {
      router.replace("/admin/login");
    }
  }, [router]);

  if (!adminApi.isAuthenticated()) return null;

  return <>{children}</>;
}
