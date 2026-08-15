import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = { title: "D'Ipoh Admin - Partners" };

export default function AdminPartnersPage() {
  return <AdminDashboard page="partners" />;
}
