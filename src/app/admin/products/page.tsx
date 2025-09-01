"use client";

import React, { useEffect, useState } from "react";
import ProtectedAdmin from "@/components/admin/ProtectedAdmin";
import { adminApi } from "@/lib/adminApi";
import Link from "next/link";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const p: any = await adminApi.listProducts();
      setProducts(p || []);
    })();
  }, []);

  return (
    <ProtectedAdmin>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Products</h1>
          <div>
            <button className="px-3 py-2 bg-blue-600 text-white rounded">New Product</button>
          </div>
        </div>

        <div className="bg-white rounded border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-sm text-gray-600">ID</th>
                <th className="p-3 text-sm text-gray-600">Title</th>
                <th className="p-3 text-sm text-gray-600">Price</th>
                <th className="p-3 text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3 text-sm">{p.id}</td>
                  <td className="p-3 text-sm">{p.title}</td>
                  <td className="p-3 text-sm">Tk {p.price.toLocaleString()}</td>
                  <td className="p-3 text-sm">
                    <Link href={`/admin/products/${p.id}`} className="text-blue-600 hover:underline mr-3">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedAdmin>
  );
}
