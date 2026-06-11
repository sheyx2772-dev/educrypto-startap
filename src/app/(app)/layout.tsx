import { AppShell } from "@/components/layout/AppShell";
import { ProgressProvider } from "@/context/ProgressContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider>
      <AppShell>{children}</AppShell>
    </ProgressProvider>
  );
}
