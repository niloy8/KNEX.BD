import { redirect } from "next/navigation";

export default function AdminRoot() {
  // redirect to dashboard
  redirect('/admin/dashboard');
}
