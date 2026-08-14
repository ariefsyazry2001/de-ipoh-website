import { LandingPage } from "@/components/LandingPage";
import { getCopy } from "@/content";

export default function MsHomePage() {
  return <LandingPage locale="ms" copy={getCopy("ms")} />;
}
