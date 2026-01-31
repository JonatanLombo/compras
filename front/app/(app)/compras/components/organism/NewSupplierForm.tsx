"use client";

import { Title, Button } from "@/components/atoms";
import { useI18n } from "@/i18n";

interface NewSupplierFormProps {
  name: string;
  setName: (name: string) => void;
  city: string;
  setCity: (city: string) => void;
  contact: string;
  setContact: (contact: string) => void;
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export function NewSupplierForm({
  name,
  setName,
  city,
  setCity,
  contact,
  setContact,
  email,
  setEmail,
  onSubmit,
  onClose,
}: NewSupplierFormProps) {
  const { t } = useI18n();

  return (
    <div className="mb-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
      <Title level={3} className="text-slate-900 dark:text-white mb-4">
        {t("newSupplierModal.title")}
      </Title>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t("newSupplierModal.name")}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t("newSupplierModal.city")}
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t("newSupplierModal.contact")}
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t("newSupplierModal.email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            {t("newSupplierModal.cancel")}
          </Button>
          <Button type="submit" variant="primary">
            {t("newSupplierModal.submit")}
          </Button>
        </div>
      </form>
    </div>
  );
}
