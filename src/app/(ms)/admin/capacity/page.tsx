import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = { title: "D'Ipoh Admin - Capacity" };

export default function AdminCapacityPage() {
  return <AdminDashboard page="capacity" />;
}
