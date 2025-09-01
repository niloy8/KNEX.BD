"use client";

import React, { useEffect, useState } from "react";
import ProtectedAdmin from "@/components/admin/ProtectedAdmin";
import { adminApi } from "@/lib/adminApi";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const o: any = await adminApi.listOrders();
      setOrders(o || []);
    })();
  }, []);

  return (
    <ProtectedAdmin>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="bg-white rounded border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-sm text-gray-600">ID</th>
                <th className="p-3 text-sm text-gray-600">Customer</th>
                <th className="p-3 text-sm text-gray-600">Total</th>
                <th className="p-3 text-sm text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="p-3 text-sm">{o.id}</td>
                  <td className="p-3 text-sm">{o.customer}</td>
                  <td className="p-3 text-sm">Tk {o.total}</td>
                  <td className="p-3 text-sm">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedAdmin>
  );
}
