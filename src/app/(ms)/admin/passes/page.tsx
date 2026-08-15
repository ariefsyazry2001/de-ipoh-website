import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = { title: "D'Ipoh Admin - Passes" };

export default function AdminPassesPage() {
  return <AdminDashboard page="passes" />;
}
