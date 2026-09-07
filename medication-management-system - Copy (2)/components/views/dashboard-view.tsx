"use client"

import { useMemo } from "react"
import {
  CircleCheck,
  Clock,
  Package,
  Activity,
  ArrowRight,
  Pill,
  TriangleAlert,
} from "lucide-react"
import { useApp } from "@/lib/store"
import {
  adherenceRate,
  daysOfSupply,
  formatTime,
  isSameDay,
  refillStatus,
} from "@/lib/helpers"
import { StatCard } from "@/components/stat-card"
import { DoseItem } from "@/components/dose-item"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"

export function DashboardView({ onNavigate }: { onNavigate: (v: any) => void }) {
  const app = useApp()
  const now = new Date()
  const pid = app.activePatientId
  const canAction = app.currentUser.role !== "clinician"

  const patientDoses = app.doses.filter((d) => d.patientId === pid)
  const todayDoses = patientDoses
    .filter((d) => isSameDay(d.scheduledFor, now))
    .sort((a, b) => +new Date(a.scheduledFor) - +new Date(b.scheduledFor))

  const takenToday = todayDoses.filter((d) => d.status === "taken").length
  const remaining = todayDoses.filter((d) => d.status === "due" || d.status === "upcoming")
  const nextDose = remaining[0]

  const adherence = useMemo(() => adherenceRate(patientDoses), [patientDoses])

  const patientMeds = app.medications.filter((m) => m.patientId === pid && m.active)
  const refillsNeeded = patientMeds.filter((m) => refillStatus(m) !== "ok")

  const greeting =
    now.getHours() < 12 ? "Good morning" : now.getHours() < 18 ? "Good afternoon" : "Good evening"
  const subject =
    app.currentUser.role === "patient"
      ? app.currentUser.name.split(" ")[0]
      : app.activePatient.name

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {greeting}
          {app.currentUser.role === "patient" ? `, ${subject}` : ""}
        </h1>
        <p className="text-sm text-muted-foreground">
          {app.currentUser.role === "patient"
            ? "Here's your medication overview for today."
            : `Medication overview for ${subject}.`}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Adherence (14 days)"
          value={`${adherence}%`}
          icon={Activity}
          tone={adherence >= 90 ? "success" : adherence >= 75 ? "warning" : "danger"}
        />
        <StatCard
          label="Doses taken today"
          value={`${takenToday}/${todayDoses.length}`}
          icon={CircleCheck}
          tone="success"
        />
        <StatCard
          label="Next dose"
          value={nextDose ? formatTime(nextDose.scheduledFor) : "None"}
          hint={
            nextDose
              ? app.medications.find((m) => m.id === nextDose.medicationId)?.name
              : "All done for today"
          }
          icon={Clock}
        />
        <StatCard
          label="Refills needed"
          value={refillsNeeded.length}
          icon={Package}
          tone={refillsNeeded.length ? "warning" : "default"}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Today&apos;s remaining doses</CardTitle>
                <CardDescription>
                  {remaining.length
                    ? `${remaining.length} dose${remaining.length > 1 ? "s" : ""} left to take`
                    : "Every scheduled dose is accounted for"}
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onNavigate("schedule")}>
                View all
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2.5">
            {remaining.length === 0 ? (
              <Empty className="border border-dashed py-8">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <CircleCheck />
                  </EmptyMedia>
                  <EmptyTitle>All caught up</EmptyTitle>
                  <EmptyDescription>No more doses scheduled for today.</EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              remaining.map((d) => <DoseItem key={d.id} dose={d} canAction={canAction} />)
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Refill tracker</CardTitle>
            <CardDescription>Supply levels for active medications</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {patientMeds.map((m) => {
              const status = refillStatus(m)
              return (
                <div key={m.id} className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Pill className="size-4 text-muted-foreground" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium">{m.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {m.quantityRemaining} left · ~{daysOfSupply(m)} days
                    </span>
                  </div>
                  {status !== "ok" && (
                    <Badge variant={status === "critical" ? "destructive" : "secondary"}>
                      {status === "critical" ? "Refill" : "Low"}
                    </Badge>
                  )}
                </div>
              )
            })}
          </CardContent>
          <CardFooter>
            <Button variant="secondary" size="sm" className="w-full" onClick={() => onNavigate("medications")}>
              Manage medications
            </Button>
          </CardFooter>
        </Card>
      </div>

      {refillsNeeded.length > 0 && (app.currentUser.role !== "patient") && (
        <Card className="border-[var(--chart-3)]/40 bg-[var(--chart-3)]/5">
          <CardContent className="flex items-start gap-3">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-[var(--chart-3)]" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Attention needed</span>
              <span className="text-sm text-muted-foreground">
                {refillsNeeded.map((m) => m.name).join(", ")}{" "}
                {refillsNeeded.length > 1 ? "are" : "is"} running low for {app.activePatient.name}.
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
