"use client"

import { useMemo } from "react"
import { Download, FileText, Pill, TriangleAlert, Activity } from "lucide-react"
import { toast } from "sonner"
import { useApp } from "@/lib/store"
import { adherenceRate, refillStatus } from "@/lib/helpers"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ReportsView() {
  const app = useApp()

  const reports = useMemo(() => {
    return app.accessiblePatients.map((patient) => {
      const doses = app.doses.filter((d) => d.patientId === patient.id)
      const meds = app.medications.filter((m) => m.patientId === patient.id && m.active)
      const missed = doses.filter((d) => d.status === "missed").length
      const skipped = doses.filter((d) => d.status === "skipped").length
      const lowRefills = meds.filter((m) => refillStatus(m) !== "ok")
      return {
        patient,
        adherence: adherenceRate(doses),
        medCount: meds.length,
        missed,
        skipped,
        lowRefills,
      }
    })
  }, [app.accessiblePatients, app.doses, app.medications])

  function exportReport(name: string) {
    toast.success("Report generated", {
      description: `${name} · 14-day adherence report ready to download.`,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Clinical Reports</h1>
          <p className="text-sm text-muted-foreground">
            Adherence summaries across {app.accessiblePatients.length} patients · last 14 days
          </p>
        </div>
        <Button variant="outline" onClick={() => exportReport("All patients")}>
          <Download data-icon="inline-start" />
          Export all
        </Button>
      </div>

      <div className="flex flex-col gap-5">
        {reports.map((r) => (
          <Card key={r.patient.id}>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {r.patient.name}
                    <Badge
                      variant={
                        r.adherence >= 90
                          ? "default"
                          : r.adherence >= 75
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {r.adherence}% adherence
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    DOB {new Date(r.patient.dob).toLocaleDateString()} ·{" "}
                    {r.patient.conditions.join(", ")}
                  </CardDescription>
                </div>
                <Button variant="secondary" size="sm" onClick={() => exportReport(r.patient.name)}>
                  <FileText data-icon="inline-start" />
                  Generate report
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Metric icon={Activity} label="Adherence" value={`${r.adherence}%`} />
                <Metric icon={Pill} label="Active meds" value={r.medCount} />
                <Metric icon={TriangleAlert} label="Missed doses" value={r.missed} tone="danger" />
                <Metric icon={TriangleAlert} label="Skipped doses" value={r.skipped} tone="warning" />
              </div>

              {r.lowRefills.length > 0 && (
                <>
                  <Separator />
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium">Refills needed</span>
                    <div className="flex flex-wrap gap-2">
                      {r.lowRefills.map((m) => (
                        <Badge key={m.id} variant="outline" className="gap-1">
                          <Pill className="size-3" />
                          {m.name} · {m.quantityRemaining} left
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: React.ReactNode
  tone?: "default" | "danger" | "warning"
}) {
  const toneClass =
    tone === "danger"
      ? "text-destructive"
      : tone === "warning"
        ? "text-[var(--chart-3)]"
        : "text-foreground"
  return (
    <div className="flex flex-col gap-1 rounded-lg border bg-muted/30 p-3">
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </span>
      <span className={`text-xl font-semibold ${toneClass}`}>{value}</span>
    </div>
  )
}
