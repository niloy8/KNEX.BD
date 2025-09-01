"use client";

import Link from "next/link";
import React from "react";

export default function Sidebar() {
  const nav = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/customers", label: "Customers" },
    { href: "/admin/roles", label: "Roles" },
    { href: "/admin/settings", label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 h-full p-4">
      <div className="mb-6 px-2">
        <h3 className="text-lg font-bold text-gray-900">KNEX Admin</h3>
        <p className="text-xs text-gray-500">Control panel</p>
      </div>
      <nav className="flex flex-col gap-1">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
