import type { Metadata } from "next";
import { StoreProvider } from "@/store/StoreProvider";
import { I18nProvider } from "@/i18n";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "NexusPro - ERP",
  description: "Sistema ERP de gestión empresarial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <StoreProvider>
          <I18nProvider>{children}</I18nProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
