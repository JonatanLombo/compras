import { AppLayout } from "@/components/templates";

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
