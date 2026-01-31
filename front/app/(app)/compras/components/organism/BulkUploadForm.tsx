"use client";

import { Title, Text, Button, Icon } from "@/components/atoms";

interface BulkUploadFormProps {
  bulkFile: File | null;
  setBulkFile: (file: File | null) => void;
  onBulkUpload: () => void;
  onBulkFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

export function BulkUploadForm({
  bulkFile,
  setBulkFile,
  onBulkUpload,
  onBulkFileChange,
  onClose,
}: BulkUploadFormProps) {
  return (
    <div className="mb-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
      <Title level={3} className="text-slate-900 dark:text-white mb-2">
        Carga masiva de proveedores
      </Title>
      <Text variant="muted" className="mb-4">
        Sube un archivo CSV o Excel con la lista de proveedores
      </Text>

      <div className="mb-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            bulkFile
              ? "border-green-400 bg-green-50 dark:bg-green-900/20"
              : "border-slate-300 dark:border-slate-600 hover:border-blue-400"
          }`}
        >
          {bulkFile ? (
            <div className="flex items-center justify-center gap-3">
              <Icon name="document" size="lg" className="text-green-500" />
              <div className="text-left">
                <p className="font-medium text-slate-900 dark:text-white">
                  {bulkFile.name}
                </p>
                <p className="text-xs text-slate-500">
                  {(bulkFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                onClick={() => setBulkFile(null)}
                className="p-1 text-slate-400 hover:text-red-500"
              >
                <Icon name="x-mark" size="sm" />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full">
                  <Icon name="upload" size="lg" className="text-slate-400" />
                </div>
                <div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Arrastra tu archivo aquí o{" "}
                  </span>
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    selecciona un archivo
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  CSV, XLS, XLSX (máx. 5MB)
                </p>
              </div>
              <input
                type="file"
                accept=".csv,.xls,.xlsx"
                onChange={onBulkFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 mb-4">
        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
          Formato del archivo:
        </p>
        <code className="text-xs text-slate-500 dark:text-slate-400">
          nombre, ciudad, estado, contacto, email, telefono, categoria
        </code>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onBulkUpload} disabled={!bulkFile}>
          Importar proveedores
        </Button>
      </div>
    </div>
  );
}
