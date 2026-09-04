"use client"

import { useMemo, useState } from "react"
import { ClipboardList } from "lucide-react"
import { useApp } from "@/lib/store"
import { formatDate, formatTime, statusMeta } from "@/lib/helpers"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function HistoryView() {
  const app = useApp()
  const pid = app.activePatientId
  const [medFilter, setMedFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const meds = app.medications.filter((m) => m.patientId === pid)

  const rows = useMemo(() => {
    return app.doses
      .filter((d) => d.patientId === pid)
      .filter((d) => d.status !== "upcoming")
      .filter((d) => medFilter === "all" || d.medicationId === medFilter)
      .filter((d) => statusFilter === "all" || d.status === statusFilter)
      .sort((a, b) => +new Date(b.scheduledFor) - +new Date(a.scheduledFor))
  }, [app.doses, pid, medFilter, statusFilter])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Medication History</h1>
        <p className="text-sm text-muted-foreground">
          Shared dose record for {app.activePatient.name}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>Dose log</CardTitle>
              <CardDescription>{rows.length} records</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={medFilter} onValueChange={(v) => setMedFilter(v as string)}>
                <SelectTrigger className="h-9 w-40">
                  <SelectValue placeholder="Medication" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All medications</SelectItem>
                  {meds.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as string)}>
                <SelectTrigger className="h-9 w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="taken">Taken</SelectItem>
                  <SelectItem value="missed">Missed</SelectItem>
                  <SelectItem value="skipped">Skipped</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Scheduled</TableHead>
                  <TableHead>Medication</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actioned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((d) => {
                  const med = app.medications.find((m) => m.id === d.medicationId)
                  const meta = statusMeta[d.status]
                  return (
                    <TableRow key={d.id}>
                      <TableCell className="whitespace-nowrap font-medium">
                        {formatDate(d.scheduledFor)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {formatTime(d.scheduledFor)}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{med?.name}</span>{" "}
                        <span className="text-muted-foreground">{med?.strength}</span>
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-2">
                          <span className={cn("size-2 rounded-full", meta.dot)} />
                          <Badge variant={meta.badge}>{meta.label}</Badge>
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right text-muted-foreground">
                        {d.actionedAt ? formatTime(d.actionedAt) : "—"}
                      </TableCell>
                    </TableRow>
                  )
                })}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                      <ClipboardList className="mx-auto mb-2 size-6" />
                      No records match these filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
