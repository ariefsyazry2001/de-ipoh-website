import { LandingPage } from "@/components/LandingPage";
import { getCopy } from "@/content";

export default function EnHomePage() {
  return <LandingPage locale="en" copy={getCopy("en")} />;
}
