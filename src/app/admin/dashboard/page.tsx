"use client";

import React, { useEffect, useState } from "react";
import ProtectedAdmin from "@/components/admin/ProtectedAdmin";
import { adminApi } from "@/lib/adminApi";

export default function AdminDashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);

  useEffect(() => {
    (async () => {
      const p: any = await adminApi.listProducts();
      const o: any = await adminApi.listOrders();
      const c: any = await adminApi.listCustomers();
      setProductsCount(p.length || 0);
      setOrdersCount(o.length || 0);
      setCustomersCount(c.length || 0);
    })();
  }, []);

  return (
    <ProtectedAdmin>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded border"> <div className="text-sm text-gray-500">Products</div><div className="text-2xl font-bold">{productsCount}</div></div>
          <div className="bg-white p-4 rounded border"> <div className="text-sm text-gray-500">Orders</div><div className="text-2xl font-bold">{ordersCount}</div></div>
          <div className="bg-white p-4 rounded border"> <div className="text-sm text-gray-500">Customers</div><div className="text-2xl font-bold">{customersCount}</div></div>
        </div>
        <div className="bg-white p-4 rounded border">
          <h2 className="font-medium mb-2">Quick Actions</h2>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-blue-600 text-white rounded">Create product</button>
            <button className="px-3 py-2 bg-green-600 text-white rounded">Create order</button>
          </div>
        </div>
      </div>
    </ProtectedAdmin>
  );
}
