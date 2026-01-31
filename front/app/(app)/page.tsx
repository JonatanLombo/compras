import { Dashboard } from "@/components/templates";
import { modulesData } from "@/test/modules.data";
import { marketplaceModules } from "@/test/marketplace.data";

export default function Home() {
  return (
    <Dashboard
      modules={modulesData}
      marketplaceModules={marketplaceModules}
    />
  );
}
