import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = { title: "D'Ipoh Admin - Guides" };

export default function AdminGuidesPage() {
  return <AdminDashboard page="guides" />;
}
