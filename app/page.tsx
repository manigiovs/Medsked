import { AppProvider } from "@/lib/store"
import { LoginPage } from "@/components/login-page"
import { Toaster } from "@/components/ui/sonner"

export default function Page() {
  return (
    <AppProvider>
      <LoginPage />
      <Toaster position="top-center" richColors />
    </AppProvider>
  )
}
