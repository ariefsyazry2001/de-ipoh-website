import type { Metadata } from "next";
import { IpohDiscoveryApp } from "@/components/IpohDiscoveryApp";

export const metadata: Metadata = {
  title: "Ipoh Discovery App",
  description: "Mobile-first Ipoh discovery, QR points, and rewards demo.",
};

export default function AppPage() {
  return <IpohDiscoveryApp />;
}
