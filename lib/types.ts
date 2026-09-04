export type Role = "patient" | "caregiver" | "clinician"

export type DoseStatus = "taken" | "missed" | "skipped" | "due" | "upcoming"

export type MedicationForm = "tablet" | "capsule" | "liquid" | "injection" | "inhaler" | "topical"

export interface User {
  id: string
  name: string
  role: Role
  email: string
  initials: string
  /** patient ids this user can access */
  patientAccess: string[]
}

export interface Patient {
  id: string
  name: string
  initials: string
  dob: string
  conditions: string[]
  /** caregiver user ids linked to this patient */
  caregivers: string[]
}

export interface ScheduleSlot {
  /** 24h time, e.g. "08:00" */
  time: string
  label: string
}

export interface Medication {
  id: string
  patientId: string
  name: string
  strength: string
  form: MedicationForm
  instructions: string
  prescribedBy: string
  frequency: string
  schedule: ScheduleSlot[]
  quantityRemaining: number
  totalQuantity: number
  refillThreshold: number
  lastRefill: string
  active: boolean
}

export interface DoseEvent {
  id: string
  medicationId: string
  patientId: string
  /** ISO timestamp of the scheduled dose */
  scheduledFor: string
  status: DoseStatus
  /** ISO timestamp of when it was actioned */
  actionedAt?: string
}

export type NotificationType = "taken" | "missed" | "skipped" | "refill"

export interface AppNotification {
  id: string
  patientId: string
  medicationId?: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
}
