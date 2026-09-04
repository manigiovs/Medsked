import type { DoseEvent, Medication } from "./types"

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString([], { month: "short", day: "numeric" })
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.round(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  return `${days}d ago`
}

export function isSameDay(iso: string, ref: Date): boolean {
  const d = new Date(iso)
  return (
    d.getFullYear() === ref.getFullYear() &&
    d.getMonth() === ref.getMonth() &&
    d.getDate() === ref.getDate()
  )
}

/** Adherence percentage over completed (non-upcoming) doses. */
export function adherenceRate(doses: DoseEvent[]): number {
  const completed = doses.filter((d) => d.status !== "upcoming" && d.status !== "due")
  if (completed.length === 0) return 0
  const taken = completed.filter((d) => d.status === "taken").length
  return Math.round((taken / completed.length) * 100)
}

export function refillStatus(med: Medication): "critical" | "low" | "ok" {
  if (med.quantityRemaining <= med.refillThreshold) return "critical"
  if (med.quantityRemaining <= med.refillThreshold * 2) return "low"
  return "ok"
}

export function daysOfSupply(med: Medication): number {
  const perDay = med.schedule.length || 1
  return Math.floor(med.quantityRemaining / perDay)
}

export const statusMeta: Record<
  string,
  { label: string; badge: "default" | "secondary" | "destructive" | "outline"; dot: string }
> = {
  taken: { label: "Taken", badge: "default", dot: "bg-[var(--chart-2)]" },
  missed: { label: "Missed", badge: "destructive", dot: "bg-destructive" },
  skipped: { label: "Skipped", badge: "secondary", dot: "bg-[var(--chart-3)]" },
  due: { label: "Due now", badge: "outline", dot: "bg-primary" },
  upcoming: { label: "Upcoming", badge: "outline", dot: "bg-muted-foreground" },
}
