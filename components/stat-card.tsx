import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
}: {
  label: string
  value: ReactNode
  hint?: string
  icon: React.ComponentType<{ className?: string }>
  tone?: "default" | "success" | "warning" | "danger"
}) {
  const toneClasses: Record<string, string> = {
    default: "bg-primary/10 text-primary",
    success: "bg-[var(--chart-2)]/15 text-[var(--chart-2)]",
    warning: "bg-[var(--chart-3)]/15 text-[var(--chart-3)]",
    danger: "bg-destructive/10 text-destructive",
  }
  return (
    <Card>
      <CardContent className="flex items-center gap-4">
        <div className={cn("flex size-11 items-center justify-center rounded-xl", toneClasses[tone])}>
          <Icon className="size-5" />
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="text-2xl font-semibold tracking-tight">{value}</span>
          <span className="truncate text-sm text-muted-foreground">{label}</span>
          {hint && <span className="mt-0.5 truncate text-xs text-muted-foreground/70">{hint}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
