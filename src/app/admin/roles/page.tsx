"use client";

import React, { useEffect, useState } from "react";
import ProtectedAdmin from "@/components/admin/ProtectedAdmin";
import { adminApi } from "@/lib/adminApi";

export default function AdminRoles() {
  const [roles, setRoles] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const r: any = await adminApi.listRoles();
      setRoles(r || []);
    })();
  }, []);

  async function handleAdd() {
    if (!name) return;
    const newR: any = await adminApi.addRole({ name });
    setRoles((prev) => [...prev, newR]);
    setName("");
  }

  return (
    <ProtectedAdmin>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Roles</h1>
        <div className="bg-white p-4 rounded border">
          <div className="flex gap-2">
            <input value={name} placeholder="Role name" onChange={(e) => setName(e.target.value)} className="border p-2 rounded flex-1" />
            <button onClick={handleAdd} className="px-3 py-2 bg-blue-600 text-white rounded">Add Role</button>
          </div>
        </div>
        <div className="bg-white rounded border overflow-hidden">
          <ul className="p-4">
            {roles.map((r) => (
              <li key={r.id} className="py-2 border-b">{r.name} <span className="text-xs text-gray-500">({r.permissions?.join(",")})</span></li>
            ))}
          </ul>
        </div>
      </div>
    </ProtectedAdmin>
  );
}
