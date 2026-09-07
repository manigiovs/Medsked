"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  users as seedUsers,
  patients as seedPatients,
  medications as seedMeds,
  buildDoses,
  buildNotifications,
} from "./mock-data"
import type {
  AppNotification,
  DoseEvent,
  Medication,
  NotificationType,
  Patient,
  Role,
  User,
} from "./types"

interface AppState {
  ready: boolean
  users: User[]
  patients: Patient[]
  medications: Medication[]
  doses: DoseEvent[]
  notifications: AppNotification[]
  currentUser: User
  activePatientId: string
  // derived
  activePatient: Patient
  accessiblePatients: Patient[]
  // actions
  setCurrentUserId: (id: string) => void
  setActivePatientId: (id: string) => void
  confirmDose: (doseId: string) => void
  skipDose: (doseId: string) => void
  addMedication: (med: Omit<Medication, "id">) => void
  updateMedication: (med: Medication) => void
  refillMedication: (medId: string, amount: number) => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
}

const AppContext = createContext<AppState | null>(null)

function relativeName(patientId: string) {
  return seedPatients.find((p) => p.id === patientId)?.name ?? "Patient"
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [users] = useState<User[]>(seedUsers)
  const [patients] = useState<Patient[]>(seedPatients)
  const [medications, setMedications] = useState<Medication[]>(seedMeds)
  const [doses, setDoses] = useState<DoseEvent[]>([])
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [currentUserId, setCurrentUserId] = useState<string>("u_patient")
  const [activePatientId, setActivePatientId] = useState<string>("p1")

  // Build time-based data only after mount to avoid hydration mismatches.
  useEffect(() => {
    const now = new Date()
    setDoses(buildDoses(now))
    setNotifications(buildNotifications(now))
    setReady(true)
  }, [])

  const currentUser = users.find((u) => u.id === currentUserId) ?? users[0]

  const accessiblePatients = useMemo(
    () => patients.filter((p) => currentUser.patientAccess.includes(p.id)),
    [patients, currentUser],
  )

  // Keep the active patient valid for the current user.
  useEffect(() => {
    if (!currentUser.patientAccess.includes(activePatientId)) {
      setActivePatientId(currentUser.patientAccess[0])
    }
  }, [currentUser, activePatientId])

  const activePatient =
    patients.find((p) => p.id === activePatientId) ?? accessiblePatients[0] ?? patients[0]

  function pushNotification(
    type: NotificationType,
    patientId: string,
    title: string,
    message: string,
    medicationId?: string,
  ) {
    const n: AppNotification = {
      id: `n_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      patientId,
      medicationId,
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
    }
    setNotifications((prev) => [n, ...prev])
  }

  function confirmDose(doseId: string) {
    setDoses((prev) =>
      prev.map((d) =>
        d.id === doseId ? { ...d, status: "taken", actionedAt: new Date().toISOString() } : d,
      ),
    )
    const dose = doses.find((d) => d.id === doseId)
    if (!dose) return
    const med = medications.find((m) => m.id === dose.medicationId)
    if (med) {
      setMedications((prev) =>
        prev.map((m) =>
          m.id === med.id
            ? { ...m, quantityRemaining: Math.max(0, m.quantityRemaining - 1) }
            : m,
        ),
      )
      pushNotification(
        "taken",
        med.patientId,
        "Dose confirmed",
        `${relativeName(med.patientId)} took ${med.name} ${med.strength}.`,
        med.id,
      )
    }
  }

  function skipDose(doseId: string) {
    setDoses((prev) =>
      prev.map((d) =>
        d.id === doseId ? { ...d, status: "skipped", actionedAt: new Date().toISOString() } : d,
      ),
    )
    const dose = doses.find((d) => d.id === doseId)
    const med = medications.find((m) => m.id === dose?.medicationId)
    if (med) {
      pushNotification(
        "skipped",
        med.patientId,
        "Dose skipped",
        `${relativeName(med.patientId)} skipped ${med.name} ${med.strength}.`,
        med.id,
      )
    }
  }

  function addMedication(med: Omit<Medication, "id">) {
    const id = `m_${Date.now()}`
    setMedications((prev) => [...prev, { ...med, id }])
  }

  function updateMedication(med: Medication) {
    setMedications((prev) => prev.map((m) => (m.id === med.id ? med : m)))
  }

  function refillMedication(medId: string, amount: number) {
    setMedications((prev) =>
      prev.map((m) =>
        m.id === medId
          ? {
              ...m,
              quantityRemaining: m.quantityRemaining + amount,
              lastRefill: new Date().toISOString().slice(0, 10),
            }
          : m,
      ),
    )
    const med = medications.find((m) => m.id === medId)
    if (med) {
      pushNotification(
        "refill",
        med.patientId,
        "Refill added",
        `${med.name} ${med.strength} refilled with ${amount} doses.`,
        med.id,
      )
    }
  }

  function markNotificationRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  function markAllNotificationsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const value: AppState = {
    ready,
    users,
    patients,
    medications,
    doses,
    notifications,
    currentUser,
    activePatientId,
    activePatient,
    accessiblePatients,
    setCurrentUserId,
    setActivePatientId,
    confirmDose,
    skipDose,
    addMedication,
    updateMedication,
    refillMedication,
    markNotificationRead,
    markAllNotificationsRead,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
