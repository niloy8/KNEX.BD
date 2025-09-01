"use client";

import React from "react";
import { adminApi } from "@/lib/adminApi";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();
  const user = adminApi.getCurrentUser();

  function handleLogout() {
    adminApi.logout();
    router.push("/admin/login");
  }

  return (
    <header className="w-full bg-white border-b border-gray-100 p-4 flex items-center justify-between">
      <div className="text-sm text-gray-600">Welcome, <span className="font-medium text-gray-900">{user?.name || 'Admin'}</span></div>
      <div className="flex items-center gap-3">
        <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">Logout</button>
      </div>
    </header>
  );
}
