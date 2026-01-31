"use client";

import { useState } from "react";
import { Title, Text } from "@/components/atoms";
import { MarketplaceCard, CategoryFilter } from "@/components/molecules";
import { ModuleDetailModal } from "@/components/organisms/ModuleDetailModal";
import type { MarketplaceModule } from "@/test/marketplace.data";
import { categories } from "@/test/marketplace.data";

interface MarketplaceGridProps {
  modules: MarketplaceModule[];
  onPurchase: (module: MarketplaceModule) => void;
}

export function MarketplaceGrid({ modules, onPurchase }: MarketplaceGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedModule, setSelectedModule] = useState<MarketplaceModule | null>(null);

  const filteredModules = selectedCategory === "all"
    ? modules
    : modules.filter((m) => m.category === selectedCategory);

  const handlePurchase = (module: MarketplaceModule) => {
    onPurchase(module);
    setSelectedModule(null);
  };

  return (
    <div className="animate-in">
      <div className="mb-6">
        <Title level={2} className="text-slate-900 dark:text-slate-100 mb-1">
          Marketplace de Módulos
        </Title>
        <Text variant="muted">
          Amplíe las capacidades de su sistema con módulos adicionales
        </Text>
      </div>

      <div className="mb-6">
        <CategoryFilter
          categories={categories}
          activeCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredModules.map((module) => (
          <MarketplaceCard
            key={module.id}
            module={module}
            onSelect={setSelectedModule}
          />
        ))}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <Text variant="muted">No hay módulos disponibles en esta categoría</Text>
        </div>
      )}

      {selectedModule && (
        <ModuleDetailModal
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
          onPurchase={handlePurchase}
        />
      )}
    </div>
  );
}
