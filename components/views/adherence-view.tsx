"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell, Pie, PieChart } from "recharts"
import { useApp } from "@/lib/store"
import { adherenceRate } from "@/lib/helpers"
import type { DoseEvent } from "@/lib/types"
import { AdherenceRing } from "@/components/adherence-ring"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"

const dayChartConfig: ChartConfig = {
  rate: { label: "Adherence", color: "var(--chart-1)" },
}

const statusChartConfig: ChartConfig = {
  taken: { label: "Taken", color: "var(--chart-2)" },
  missed: { label: "Missed", color: "var(--chart-4)" },
  skipped: { label: "Skipped", color: "var(--chart-3)" },
}

export function AdherenceView() {
  const app = useApp()
  const pid = app.activePatientId
  const doses = useMemo(() => app.doses.filter((d) => d.patientId === pid), [app.doses, pid])

  const overall = adherenceRate(doses)

  const byDay = useMemo(() => {
    const map = new Map<string, { taken: number; total: number; date: Date }>()
    for (const d of doses) {
      if (d.status === "upcoming" || d.status === "due") continue
      const date = new Date(d.scheduledFor)
      const key = date.toISOString().slice(0, 10)
      if (!map.has(key)) map.set(key, { taken: 0, total: 0, date })
      const e = map.get(key)!
      e.total++
      if (d.status === "taken") e.taken++
    }
    return [...map.entries()]
      .sort((a, b) => +new Date(a[0]) - +new Date(b[0]))
      .map(([, v]) => ({
        day: v.date.toLocaleDateString([], { weekday: "short", day: "numeric" }),
        rate: v.total ? Math.round((v.taken / v.total) * 100) : 0,
      }))
  }, [doses])

  const statusBreakdown = useMemo(() => {
    const counts = { taken: 0, missed: 0, skipped: 0 }
    for (const d of doses) {
      if (d.status === "taken") counts.taken++
      else if (d.status === "missed") counts.missed++
      else if (d.status === "skipped") counts.skipped++
    }
    return [
      { status: "taken", label: "Taken", value: counts.taken, fill: "var(--chart-2)" },
      { status: "skipped", label: "Skipped", value: counts.skipped, fill: "var(--chart-3)" },
      { status: "missed", label: "Missed", value: counts.missed, fill: "var(--chart-4)" },
    ]
  }, [doses])

  const perMed = useMemo(() => {
    const meds = app.medications.filter((m) => m.patientId === pid)
    return meds
      .map((m) => {
        const md = doses.filter((d) => d.medicationId === m.id)
        return { med: m, rate: adherenceRate(md), count: md.length }
      })
      .sort((a, b) => a.rate - b.rate)
  }, [app.medications, doses, pid])

  const totalActioned = statusBreakdown.reduce((s, x) => s + x.value, 0)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Adherence Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Last 14 days · {app.activePatient.name}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center justify-center">
          <CardHeader className="items-center text-center">
            <CardTitle>Overall adherence</CardTitle>
            <CardDescription>Doses taken as scheduled</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 pb-6">
            <AdherenceRing value={overall} size={150} stroke={12} />
            <div className="flex gap-4 text-center text-sm">
              {statusBreakdown.map((s) => (
                <div key={s.status} className="flex flex-col">
                  <span className="text-lg font-semibold" style={{ color: s.fill }}>
                    {s.value}
                  </span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Daily adherence</CardTitle>
            <CardDescription>Percentage of scheduled doses taken each day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={dayChartConfig} className="h-[240px] w-full">
              <BarChart data={byDay} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
                <YAxis
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={11}
                  ticks={[0, 50, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="rate" fill="var(--color-rate)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Dose outcomes</CardTitle>
            <CardDescription>{totalActioned} completed doses</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={statusChartConfig} className="mx-auto aspect-square h-[220px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="label" />} />
                <Pie data={statusBreakdown} dataKey="value" nameKey="label" innerRadius={50} strokeWidth={2}>
                  {statusBreakdown.map((s) => (
                    <Cell key={s.status} fill={s.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Adherence by medication</CardTitle>
            <CardDescription>Lowest adherence first</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {perMed.map(({ med, rate, count }) => (
              <div key={med.id} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {med.name} <span className="text-muted-foreground">{med.strength}</span>
                  </span>
                  <span
                    className={
                      rate >= 90
                        ? "text-[var(--chart-2)]"
                        : rate >= 75
                          ? "text-[var(--chart-3)]"
                          : "text-destructive"
                    }
                  >
                    {rate}%
                  </span>
                </div>
                <Progress value={rate} />
                <span className="text-xs text-muted-foreground">{count} doses tracked</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
