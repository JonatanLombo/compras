"use client";

import { useState } from "react";
import { Title, Text, Tabs } from "@/components/atoms";
import { ModuleGrid, SubModulePanel, MarketplaceGrid } from "@/components/organisms";
import { useI18n } from "@/i18n";
import type { Module } from "@/test/modules.data";
import type { MarketplaceModule } from "@/test/marketplace.data";

interface DashboardProps {
  modules: Module[];
  marketplaceModules: MarketplaceModule[];
}

export function Dashboard({ modules, marketplaceModules }: DashboardProps) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("modules");
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [purchasedModules, setPurchasedModules] = useState<string[]>([]);

  const tabs = [
    { id: "modules", label: t("tabs.myModules"), count: modules.length },
    { id: "marketplace", label: t("tabs.marketplace"), count: marketplaceModules.length },
  ];

  const handlePurchase = (module: MarketplaceModule) => {
    setPurchasedModules((prev) => [...prev, module.id]);
    alert(`Módulo "${module.name}" contratado exitosamente.`);
  };

  const availableMarketplaceModules = marketplaceModules.filter(
    (m) => !purchasedModules.includes(m.id)
  );

  return (
    <>
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "modules" && (
          <>
            {selectedModule ? (
              <SubModulePanel
                module={selectedModule}
                onBack={() => setSelectedModule(null)}
              />
            ) : (
              <div className="animate-in">
                <div className="mb-6">
                  <Title level={2} className="text-slate-900 dark:text-slate-100 mb-1">
                    {t("dashboard.title")}
                  </Title>
                  <Text variant="muted">
                    {t("dashboard.subtitle")}
                  </Text>
                </div>
                <ModuleGrid
                  modules={modules}
                  onModuleClick={setSelectedModule}
                />
              </div>
            )}
          </>
        )}

        {activeTab === "marketplace" && (
          <MarketplaceGrid
            modules={availableMarketplaceModules}
            onPurchase={handlePurchase}
          />
        )}
      </div>
    </>
  );
}
