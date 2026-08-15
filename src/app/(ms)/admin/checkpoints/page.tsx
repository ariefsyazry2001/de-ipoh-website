import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = { title: "D'Ipoh Admin - Checkpoints" };

export default function AdminCheckpointsPage() {
  return <AdminDashboard page="checkpoints" />;
}
