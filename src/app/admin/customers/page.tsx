"use client";

import React, { useEffect, useState } from "react";
import ProtectedAdmin from "@/components/admin/ProtectedAdmin";
import { adminApi } from "@/lib/adminApi";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const c: any = await adminApi.listCustomers();
      setCustomers(c || []);
    })();
  }, []);

  return (
    <ProtectedAdmin>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="bg-white rounded border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-sm text-gray-600">ID</th>
                <th className="p-3 text-sm text-gray-600">Name</th>
                <th className="p-3 text-sm text-gray-600">Email</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-3 text-sm">{c.id}</td>
                  <td className="p-3 text-sm">{c.name}</td>
                  <td className="p-3 text-sm">{c.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedAdmin>
  );
}
