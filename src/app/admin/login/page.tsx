"use client";

import React, { useState } from "react";
import { adminApi } from "@/lib/adminApi";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@knex.test");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await adminApi.loginAdmin(email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <p className="text-sm text-gray-500 mb-4">Use the demo admin credentials to sign in.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 border p-2 rounded" />
          </div>
          <div>
            <label className="text-sm text-gray-700">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 border p-2 rounded" />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex items-center justify-between">
            <button className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Signing...' : 'Sign in'}</button>
            <a className="text-sm text-gray-500">Forgot?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
