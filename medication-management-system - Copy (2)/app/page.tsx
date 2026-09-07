import { AppProvider } from "@/lib/store"
import { AppShell } from "@/components/app-shell"
import { Toaster } from "@/components/ui/sonner"

export default function Page() {
  return (
    <AppProvider>
      <AppShell />
      <Toaster position="top-center" richColors />
    </AppProvider>
  )
}
