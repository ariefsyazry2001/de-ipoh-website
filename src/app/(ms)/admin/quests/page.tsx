import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = { title: "D'Ipoh Admin - Quests" };

export default function AdminQuestsPage() {
  return <AdminDashboard page="quests" />;
}
