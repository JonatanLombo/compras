"use client";

import { useState, useRef, useCallback } from "react";
import { Icon } from "../Icon";
import { useI18n } from "@/i18n";

interface FileUploadProps {
  accept?: string;
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  preview?: string;
  error?: string;
  maxSize?: number;
}

export function FileUpload({
  accept = ".svg",
  onFileSelect,
  onFileRemove,
  preview,
  error,
  maxSize = 1024 * 1024, // 1MB default
}: FileUploadProps) {
  const { t } = useI18n();
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setLocalError(null);

    if (accept === ".svg" && !file.type.includes("svg")) {
      setLocalError("Solo archivos SVG permitidos");
      return false;
    }

    if (file.size > maxSize) {
      setLocalError(`El archivo excede ${Math.round(maxSize / 1024 / 1024)}MB`);
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      onFileSelect(file);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setLocalError(null);
    onFileRemove?.();
  };

  const displayError = error || localError;

  if (preview) {
    return (
      <div className="relative">
        <div className="w-full h-32 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center p-4">
          <img
            src={preview}
            alt="Preview"
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <button
          type="button"
          onClick={handleRemove}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
        >
          <Icon name="x-mark" size="sm" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`
          w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors
          ${isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : displayError
              ? "border-red-300 dark:border-red-500/50 bg-red-50 dark:bg-red-900/10"
              : "border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-900"
          }
        `}
      >
        <div className={`p-2 rounded-full ${isDragging ? "bg-blue-100 dark:bg-blue-900/30" : "bg-slate-100 dark:bg-slate-800"}`}>
          <Icon
            name="upload"
            size="lg"
            className={isDragging ? "text-blue-500" : "text-slate-400 dark:text-slate-500"}
          />
        </div>
        <div className="text-center">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {t("fileUpload.dragDrop")}{" "}
          </span>
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            {t("fileUpload.browse")}
          </span>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          {t("fileUpload.svgOnly")} • {t("fileUpload.maxSize")}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />

      {displayError && (
        <p className="mt-1.5 text-xs text-red-500">{displayError}</p>
      )}
    </div>
  );
}
