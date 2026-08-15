import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = { title: "D'Ipoh Admin - Rewards" };

export default function AdminRewardsPage() {
  return <AdminDashboard page="rewards" />;
}
