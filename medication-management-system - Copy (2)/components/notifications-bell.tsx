"use client"

import { Bell, CircleCheck, CircleAlert, SkipForward, Package } from "lucide-react"
import { useApp } from "@/lib/store"
import { timeAgo } from "@/lib/helpers"
import type { NotificationType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ICONS: Record<NotificationType, typeof CircleCheck> = {
  taken: CircleCheck,
  missed: CircleAlert,
  skipped: SkipForward,
  refill: Package,
}

const TONE: Record<NotificationType, string> = {
  taken: "text-[var(--chart-2)]",
  missed: "text-destructive",
  skipped: "text-[var(--chart-3)]",
  refill: "text-primary",
}

export function NotificationsBell({ onOpenAlerts }: { onOpenAlerts: () => void }) {
  const app = useApp()

  // Only show notifications for patients this user can access.
  const visible = app.notifications.filter((n) =>
    app.currentUser.patientAccess.includes(n.patientId),
  )
  const unread = visible.filter((n) => !n.read).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="relative" />}>
        <Bell />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-white">
            {unread}
          </span>
        )}
        <span className="sr-only">Notifications</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="text-sm font-semibold">Notifications</span>
          {unread > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => app.markAllNotificationsRead()}
            >
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="max-h-80">
          <div className="flex flex-col">
            {visible.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                No notifications yet.
              </p>
            )}
            {visible.slice(0, 8).map((n) => {
              const Icon = ICONS[n.type]
              const patient = app.patients.find((p) => p.id === n.patientId)
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => app.markNotificationRead(n.id)}
                  className="flex items-start gap-3 border-t px-3 py-2.5 text-left transition-colors hover:bg-accent/50"
                >
                  <Icon className={`mt-0.5 size-4 shrink-0 ${TONE[n.type]}`} />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium">{n.title}</span>
                      {!n.read && <span className="size-1.5 shrink-0 rounded-full bg-primary" />}
                    </div>
                    <span className="text-xs text-muted-foreground">{n.message}</span>
                    <span className="text-[11px] text-muted-foreground/70">
                      {patient?.name} · {timeAgo(n.timestamp)}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </ScrollArea>
        <div className="border-t p-2">
          <Button variant="secondary" size="sm" className="w-full" onClick={onOpenAlerts}>
            View all alerts
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
