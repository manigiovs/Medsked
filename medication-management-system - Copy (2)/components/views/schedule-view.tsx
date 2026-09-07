"use client"

import { useState } from "react"
import { CalendarClock, Sun, Sunset, Moon, CircleCheck } from "lucide-react"
import { useApp } from "@/lib/store"
import { formatTime, isSameDay } from "@/lib/helpers"
import { DoseItem } from "@/components/dose-item"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import type { DoseEvent } from "@/lib/types"

function slotIcon(time: string) {
  const hour = Number(time.split(":")[0])
  if (hour < 12) return Sun
  if (hour < 18) return Sunset
  return Moon
}

export function ScheduleView() {
  const app = useApp()
  const now = new Date()
  const pid = app.activePatientId
  const canAction = app.currentUser.role !== "clinician"
  const [filter, setFilter] = useState("all")

  const todayDoses = app.doses
    .filter((d) => d.patientId === pid && isSameDay(d.scheduledFor, now))
    .sort((a, b) => +new Date(a.scheduledFor) - +new Date(b.scheduledFor))

  const filtered = todayDoses.filter((d) => {
    if (filter === "all") return true
    if (filter === "upcoming") return d.status === "due" || d.status === "upcoming"
    if (filter === "taken") return d.status === "taken"
    if (filter === "missed") return d.status === "missed" || d.status === "skipped"
    return true
  })

  // group by scheduled time
  const groups = new Map<string, DoseEvent[]>()
  for (const d of filtered) {
    const key = formatTime(d.scheduledFor)
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(d)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Today&apos;s Doses</h1>
        <p className="text-sm text-muted-foreground">
          {now.toLocaleDateString([], {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}{" "}
          · {app.activePatient.name}
        </p>
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as string)}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="taken">Taken</TabsTrigger>
          <TabsTrigger value="missed">Missed</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-4">
          {groups.size === 0 ? (
            <Empty className="border border-dashed py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CircleCheck />
                </EmptyMedia>
                <EmptyTitle>Nothing here</EmptyTitle>
                <EmptyDescription>No doses match this filter for today.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="flex flex-col gap-5">
              {[...groups.entries()].map(([time, doses]) => {
                const Icon = slotIcon(doses[0].scheduledFor.slice(11, 16))
                return (
                  <Card key={time}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Icon className="size-4 text-muted-foreground" />
                        {time}
                        <span className="text-sm font-normal text-muted-foreground">
                          · {doses.length} medication{doses.length > 1 ? "s" : ""}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2.5">
                      {doses.map((d) => (
                        <DoseItem key={d.id} dose={d} canAction={canAction} />
                      ))}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
