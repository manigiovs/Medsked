"use client"

import { useState } from "react"
import {
  CircleCheck,
  CircleAlert,
  SkipForward,
  Package,
  Mail,
  Bell,
  Smartphone,
} from "lucide-react"
import { useApp } from "@/lib/store"
import { timeAgo } from "@/lib/helpers"
import type { NotificationType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const ICONS: Record<NotificationType, typeof CircleCheck> = {
  taken: CircleCheck,
  missed: CircleAlert,
  skipped: SkipForward,
  refill: Package,
}
const TONE: Record<NotificationType, string> = {
  taken: "bg-[var(--chart-2)]/15 text-[var(--chart-2)]",
  missed: "bg-destructive/10 text-destructive",
  skipped: "bg-[var(--chart-3)]/15 text-[var(--chart-3)]",
  refill: "bg-primary/10 text-primary",
}

export function AlertsView() {
  const app = useApp()
  const [channels, setChannels] = useState({ inApp: true, email: true, push: false })

  const visible = app.notifications
    .filter((n) => app.currentUser.patientAccess.includes(n.patientId))
    .sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp))
  const unread = visible.filter((n) => !n.read).length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Caregiver Alerts</h1>
          <p className="text-sm text-muted-foreground">
            {unread > 0 ? `${unread} unread` : "All caught up"} · activity across your patients
          </p>
        </div>
        {unread > 0 && (
          <Button variant="outline" size="sm" onClick={() => app.markAllNotificationsRead()}>
            Mark all read
          </Button>
        )}
      </div>

      <Alert>
        <Mail />
        <AlertTitle>Email delivery is simulated in this preview</AlertTitle>
        <AlertDescription>
          Connect the Resend integration to send real dose reminders and caregiver alerts by email.
          In-app alerts below update live as doses are taken, skipped, or missed.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity feed</CardTitle>
            <CardDescription>Notifications for all dose activity and refills</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {visible.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">No alerts yet.</p>
            )}
            {visible.map((n) => {
              const Icon = ICONS[n.type]
              const patient = app.patients.find((p) => p.id === n.patientId)
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => app.markNotificationRead(n.id)}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border p-3 text-left transition-colors hover:bg-accent/40",
                    !n.read && "border-primary/30 bg-primary/[0.03]",
                  )}
                >
                  <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", TONE[n.type])}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{n.title}</span>
                      {!n.read && <span className="size-1.5 rounded-full bg-primary" />}
                      <span className="ml-auto text-xs text-muted-foreground">
                        {timeAgo(n.timestamp)}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{n.message}</span>
                    <Badge variant="outline" className="mt-1 w-fit">
                      {patient?.name}
                    </Badge>
                  </div>
                </button>
              )
            })}
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Delivery preferences</CardTitle>
            <CardDescription>How caregivers receive alerts</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <ChannelRow
              icon={Bell}
              label="In-app notifications"
              desc="Show alerts inside Medsked"
              checked={channels.inApp}
              onCheckedChange={(v) => setChannels((c) => ({ ...c, inApp: v }))}
            />
            <ChannelRow
              icon={Mail}
              label="Email alerts"
              desc="Send to caregiver email addresses"
              checked={channels.email}
              onCheckedChange={(v) => setChannels((c) => ({ ...c, email: v }))}
            />
            <ChannelRow
              icon={Smartphone}
              label="Push notifications"
              desc="Mobile push (coming soon)"
              checked={channels.push}
              onCheckedChange={(v) => setChannels((c) => ({ ...c, push: v }))}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ChannelRow({
  icon: Icon,
  label,
  desc,
  checked,
  onCheckedChange,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  desc: string
  checked: boolean
  onCheckedChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-1 py-2.5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="text-xs text-muted-foreground">{desc}</span>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}
