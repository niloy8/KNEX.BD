"use client";

import React, { useEffect, useState } from "react";
import ProtectedAdmin from "@/components/admin/ProtectedAdmin";
import { adminApi } from "@/lib/adminApi";

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const s: any = await adminApi.getSettings();
      setSettings(s || {});
    })();
  }, []);

  async function handleSave() {
    setSaving(true);
    await adminApi.updateSettings(settings);
    setSaving(false);
    alert('Settings saved (demo)');
  }

  return (
    <ProtectedAdmin>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="bg-white p-4 rounded border">
          <label className="text-sm text-gray-700">Site name</label>
          <input value={settings.siteName || ''} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} className="w-full mt-1 border p-2 rounded" />
          <label className="text-sm text-gray-700 mt-3">Currency</label>
          <input value={settings.currency || ''} onChange={(e) => setSettings({ ...settings, currency: e.target.value })} className="w-full mt-1 border p-2 rounded" />
          <div className="mt-4">
            <button onClick={handleSave} className="px-3 py-2 bg-blue-600 text-white rounded" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </div>
      </div>
    </ProtectedAdmin>
  );
}
