"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  CalendarClock,
  Pill,
  ChartColumn,
  ClipboardList,
  BellRing,
  FileText,
  HeartPulse,
  ChevronDown,
  Check,
  Users,
  User,
  Stethoscope,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/store"
import type { Role } from "@/lib/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { DashboardView } from "@/components/views/dashboard-view"
import { ScheduleView } from "@/components/views/schedule-view"
import { MedicationsView } from "@/components/views/medications-view"
import { AdherenceView } from "@/components/views/adherence-view"
import { HistoryView } from "@/components/views/history-view"
import { AlertsView } from "@/components/views/alerts-view"
import { ReportsView } from "@/components/views/reports-view"
import { NotificationsBell } from "@/components/notifications-bell"

type ViewId =
  | "dashboard"
  | "schedule"
  | "medications"
  | "adherence"
  | "history"
  | "alerts"
  | "reports"

const NAV: {
  id: ViewId
  label: string
  icon: typeof LayoutDashboard
  roles: Role[]
}[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["patient", "caregiver", "clinician"] },
  { id: "schedule", label: "Today's Doses", icon: CalendarClock, roles: ["patient", "caregiver", "clinician"] },
  { id: "medications", label: "Medications", icon: Pill, roles: ["patient", "caregiver", "clinician"] },
  { id: "adherence", label: "Adherence", icon: ChartColumn, roles: ["patient", "caregiver", "clinician"] },
  { id: "history", label: "History", icon: ClipboardList, roles: ["patient", "caregiver", "clinician"] },
  { id: "alerts", label: "Alerts", icon: BellRing, roles: ["caregiver", "clinician"] },
  { id: "reports", label: "Reports", icon: FileText, roles: ["clinician"] },
]

const ROLE_META: Record<Role, { label: string; icon: typeof User }> = {
  patient: { label: "Patient", icon: User },
  caregiver: { label: "Caregiver", icon: Users },
  clinician: { label: "Clinician", icon: Stethoscope },
}

export function AppShell({ onLogout }: { onLogout?: () => void }) {
  const app = useApp()
  const [view, setView] = useState<ViewId>("dashboard")

  if (!app.ready) {
    return <LoadingShell />
  }

  const navItems = NAV.filter((n) => n.roles.includes(app.currentUser.role))
  const RoleIcon = ROLE_META[app.currentUser.role].icon

  function go(id: ViewId) {
    setView(id)
  }

  const activeView = navItems.some((n) => n.id === view) ? view : "dashboard"

  return (
    <div className="flex min-h-svh bg-background">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col border-r bg-sidebar lg:flex">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HeartPulse className="size-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Medsked</span>
            <span className="text-xs text-muted-foreground">Medication Care</span>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = activeView === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="size-4.5 shrink-0" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="border-t p-3">
          <RoleSwitcher />
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex flex-col gap-3 border-b bg-background/80 px-4 py-3 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 lg:hidden">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <HeartPulse className="size-4" />
              </div>
              <span className="text-sm font-semibold">Medsked</span>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <PatientSwitcher />
              <NotificationsBell onOpenAlerts={() => go("alerts")} />
              <UserMenu />
            </div>
          </div>

          {/* Mobile nav */}
          <nav className="-mx-1 flex gap-1 overflow-x-auto pb-1 lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = activeView === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-6 md:py-8">
          {activeView === "dashboard" && <DashboardView onNavigate={go} />}
          {activeView === "schedule" && <ScheduleView />}
          {activeView === "medications" && <MedicationsView />}
          {activeView === "adherence" && <AdherenceView />}
          {activeView === "history" && <HistoryView />}
          {activeView === "alerts" && <AlertsView />}
          {activeView === "reports" && <ReportsView />}
        </main>
      </div>
    </div>
  )

  function RoleSwitcher() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-sidebar-accent"
            />
          }
        >
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary/10 text-primary">
              {app.currentUser.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col leading-tight">
            <span className="truncate text-sm font-medium">{app.currentUser.name}</span>
            <span className="text-xs text-muted-foreground">
              {ROLE_META[app.currentUser.role].label}
            </span>
          </div>
          <ChevronDown className="size-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Switch demo account</DropdownMenuLabel>
            {app.users.map((u) => {
              const Icon = ROLE_META[u.role].icon
              return (
                <DropdownMenuItem key={u.id} onClick={() => app.setCurrentUserId(u.id)}>
                  <Icon className="text-muted-foreground" />
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm">{u.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {ROLE_META[u.role].label}
                    </span>
                  </div>
                  {u.id === app.currentUser.id && <Check className="size-4 text-primary" />}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuGroup>
          {onLogout && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
                <LogOut />
                Log out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  function UserMenu() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" size="icon" className="lg:hidden" />}
        >
          <RoleIcon />
          <span className="sr-only">Account</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{app.currentUser.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {app.users.map((u) => (
              <DropdownMenuItem key={u.id} onClick={() => app.setCurrentUserId(u.id)}>
                {ROLE_META[u.role].label}
                {u.id === app.currentUser.id && <Check className="ml-auto size-4 text-primary" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          {onLogout && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
                <LogOut />
                Log out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  function PatientSwitcher() {
    if (app.accessiblePatients.length <= 1) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="hidden items-center gap-2 rounded-lg border px-3 py-1.5 sm:flex"
              />
            }
          >
            <Avatar className="size-6">
              <AvatarFallback className="bg-accent text-xs text-accent-foreground">
                {app.activePatient.initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{app.activePatient.name}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>{app.currentUser.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {onLogout && (
              <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
                <LogOut />
                Log out
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
    return (
      <Select value={app.activePatientId} onValueChange={(v) => app.setActivePatientId(v as string)}>
        <SelectTrigger className="h-9 gap-2">
          <Users className="size-4 text-muted-foreground" />
          <SelectValue placeholder="Select patient" />
        </SelectTrigger>
        <SelectContent>
          {app.accessiblePatients.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }
}

function LoadingShell() {
  return (
    <div className="flex min-h-svh">
      <div className="hidden w-64 shrink-0 border-r bg-sidebar p-5 lg:block">
        <Skeleton className="h-9 w-40" />
        <div className="mt-8 flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full" />
          ))}
        </div>
      </div>
      <div className="flex-1 p-8">
        <Skeleton className="h-10 w-64" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
        <Skeleton className="mt-6 h-80 w-full" />
      </div>
    </div>
  )
}
