"use client";

import React, { useEffect, useState } from "react";
import ProtectedAdmin from "@/components/admin/ProtectedAdmin";
import { adminApi } from "@/lib/adminApi";
import { useParams } from "next/navigation";

export default function AdminEditProduct() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const p: any = await adminApi.getProduct(id);
      setProduct(p || { id });
    })();
  }, [id]);

  async function handleSave() {
    setSaving(true);
    await adminApi.updateProduct(id, product);
    setSaving(false);
    alert('Saved (demo)');
  }

  if (!product) return null;

  return (
    <ProtectedAdmin>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Edit Product {product.id}</h1>
        <div className="bg-white rounded border p-4">
          <label className="block text-sm text-gray-700">Title</label>
          <input value={product.title || ''} onChange={(e) => setProduct({ ...product, title: e.target.value })} className="w-full mt-1 border p-2 rounded" />
          <label className="block text-sm text-gray-700 mt-3">Price</label>
          <input value={product.price || 0} onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} type="number" className="w-full mt-1 border p-2 rounded" />
          <div className="mt-4">
            <button onClick={handleSave} className="px-3 py-2 bg-blue-600 text-white rounded" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </div>
      </div>
    </ProtectedAdmin>
  );
}
