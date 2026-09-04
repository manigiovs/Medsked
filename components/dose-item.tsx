"use client"

import { Check, SkipForward, Pill, Clock } from "lucide-react"
import { toast } from "sonner"
import { useApp } from "@/lib/store"
import { formatTime, statusMeta } from "@/lib/helpers"
import { cn } from "@/lib/utils"
import type { DoseEvent } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function DoseItem({ dose, canAction }: { dose: DoseEvent; canAction: boolean }) {
  const app = useApp()
  const med = app.medications.find((m) => m.id === dose.medicationId)
  if (!med) return null

  const meta = statusMeta[dose.status]
  const actionable = dose.status === "due" || dose.status === "upcoming" || dose.status === "missed"

  function confirm() {
    app.confirmDose(dose.id)
    toast.success("Dose confirmed", { description: `${med!.name} ${med!.strength}` })
  }
  function skip() {
    app.skipDose(dose.id)
    toast("Dose skipped", { description: `${med!.name} ${med!.strength}` })
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-3">
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg",
          dose.status === "taken" && "bg-[var(--chart-2)]/15 text-[var(--chart-2)]",
          dose.status === "missed" && "bg-destructive/10 text-destructive",
          dose.status === "skipped" && "bg-[var(--chart-3)]/15 text-[var(--chart-3)]",
          (dose.status === "due" || dose.status === "upcoming") && "bg-primary/10 text-primary",
        )}
      >
        <Pill className="size-5" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium">
            {med.name} <span className="text-muted-foreground">{med.strength}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="size-3.5" />
          {formatTime(dose.scheduledFor)}
          <span className="text-muted-foreground/50">·</span>
          <span className="truncate">{med.form}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Badge variant={meta.badge}>{meta.label}</Badge>
        {canAction && actionable && (
          <div className="flex items-center gap-1.5">
            <Button size="sm" onClick={confirm}>
              <Check data-icon="inline-start" />
              Take
            </Button>
            <Button size="sm" variant="outline" onClick={skip}>
              <SkipForward data-icon="inline-start" />
              Skip
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
