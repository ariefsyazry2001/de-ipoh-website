import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "D'Ipoh Admin",
  description: "Stakeholder dashboard for D'Ipoh operations, package performance, quests, partners, and rewards.",
};

export default function AdminPage() {
  return <AdminDashboard page="overview" />;
}
