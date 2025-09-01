import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
  title: "KNEX Admin",
};

export default function AdminAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
