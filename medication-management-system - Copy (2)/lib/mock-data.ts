import type {
  User,
  Patient,
  Medication,
  DoseEvent,
  AppNotification,
  DoseStatus,
} from "./types"

export const users: User[] = [
  {
    id: "u_patient",
    name: "Eleanor Whitfield",
    role: "patient",
    email: "eleanor@example.com",
    initials: "EW",
    patientAccess: ["p1"],
  },
  {
    id: "u_caregiver",
    name: "James Whitfield",
    role: "caregiver",
    email: "james@example.com",
    initials: "JW",
    patientAccess: ["p1", "p2"],
  },
  {
    id: "u_clinician",
    name: "Dr. Priya Nair",
    role: "clinician",
    email: "p.nair@clinic.example.com",
    initials: "PN",
    patientAccess: ["p1", "p2"],
  },
]

export const patients: Patient[] = [
  {
    id: "p1",
    name: "Eleanor Whitfield",
    initials: "EW",
    dob: "1953-04-18",
    conditions: ["Hypertension", "Type 2 Diabetes", "Atrial Fibrillation"],
    caregivers: ["u_caregiver"],
  },
  {
    id: "p2",
    name: "Marcus Reed",
    initials: "MR",
    dob: "1967-11-02",
    conditions: ["High Cholesterol", "Hypothyroidism"],
    caregivers: ["u_caregiver"],
  },
]

export const medications: Medication[] = [
  {
    id: "m1",
    patientId: "p1",
    name: "Lisinopril",
    strength: "10 mg",
    form: "tablet",
    instructions: "Take one tablet by mouth with water.",
    prescribedBy: "Dr. Priya Nair",
    frequency: "Once daily",
    schedule: [{ time: "08:00", label: "Morning" }],
    quantityRemaining: 24,
    totalQuantity: 30,
    refillThreshold: 7,
    lastRefill: "2026-08-10",
    active: true,
  },
  {
    id: "m2",
    patientId: "p1",
    name: "Metformin",
    strength: "500 mg",
    form: "tablet",
    instructions: "Take with breakfast and dinner to reduce stomach upset.",
    prescribedBy: "Dr. Priya Nair",
    frequency: "Twice daily",
    schedule: [
      { time: "08:00", label: "Morning" },
      { time: "20:00", label: "Evening" },
    ],
    quantityRemaining: 9,
    totalQuantity: 60,
    refillThreshold: 12,
    lastRefill: "2026-08-05",
    active: true,
  },
  {
    id: "m3",
    patientId: "p1",
    name: "Apixaban",
    strength: "5 mg",
    form: "tablet",
    instructions: "Blood thinner. Do not skip doses. Take with or without food.",
    prescribedBy: "Dr. Priya Nair",
    frequency: "Twice daily",
    schedule: [
      { time: "08:00", label: "Morning" },
      { time: "20:00", label: "Evening" },
    ],
    quantityRemaining: 5,
    totalQuantity: 60,
    refillThreshold: 10,
    lastRefill: "2026-08-01",
    active: true,
  },
  {
    id: "m4",
    patientId: "p1",
    name: "Atorvastatin",
    strength: "20 mg",
    form: "tablet",
    instructions: "Take at bedtime.",
    prescribedBy: "Dr. Priya Nair",
    frequency: "Once daily",
    schedule: [{ time: "21:00", label: "Bedtime" }],
    quantityRemaining: 22,
    totalQuantity: 30,
    refillThreshold: 7,
    lastRefill: "2026-08-12",
    active: true,
  },
  {
    id: "m5",
    patientId: "p2",
    name: "Levothyroxine",
    strength: "75 mcg",
    form: "tablet",
    instructions: "Take on an empty stomach, 30 minutes before breakfast.",
    prescribedBy: "Dr. Priya Nair",
    frequency: "Once daily",
    schedule: [{ time: "07:00", label: "Morning" }],
    quantityRemaining: 18,
    totalQuantity: 30,
    refillThreshold: 7,
    lastRefill: "2026-08-15",
    active: true,
  },
  {
    id: "m6",
    patientId: "p2",
    name: "Rosuvastatin",
    strength: "10 mg",
    form: "tablet",
    instructions: "Take at bedtime with water.",
    prescribedBy: "Dr. Priya Nair",
    frequency: "Once daily",
    schedule: [{ time: "21:00", label: "Bedtime" }],
    quantityRemaining: 6,
    totalQuantity: 30,
    refillThreshold: 8,
    lastRefill: "2026-08-03",
    active: true,
  },
]

/** deterministic pseudo-status so history is stable across renders */
function hash(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

function isoAt(date: Date, time: string): string {
  const [hh, mm] = time.split(":").map(Number)
  const d = new Date(date)
  d.setHours(hh, mm, 0, 0)
  return d.toISOString()
}

/** Build 14 days of dose history plus today's schedule. */
export function buildDoses(now: Date): DoseEvent[] {
  const doses: DoseEvent[] = []
  for (let dayOffset = -13; dayOffset <= 0; dayOffset++) {
    const day = new Date(now)
    day.setDate(now.getDate() + dayOffset)

    for (const med of medications) {
      if (!med.active) continue
      med.schedule.forEach((slot, slotIndex) => {
        const scheduled = new Date(isoAt(day, slot.time))
        const id = `${med.id}-${dayOffset}-${slotIndex}`
        let status: DoseStatus
        let actionedAt: string | undefined

        if (scheduled.getTime() > now.getTime()) {
          // future dose today
          status = "upcoming"
        } else if (dayOffset === 0 && now.getTime() - scheduled.getTime() < 60 * 60 * 1000) {
          // scheduled within the last hour -> due now
          status = "due"
        } else {
          const seed = hash(id)
          if (seed % 13 === 0) {
            status = "missed"
          } else if (seed % 11 === 0) {
            status = "skipped"
          } else {
            status = "taken"
            actionedAt = new Date(scheduled.getTime() + (seed % 25) * 60 * 1000).toISOString()
          }
        }

        doses.push({
          id,
          medicationId: med.id,
          patientId: med.patientId,
          scheduledFor: scheduled.toISOString(),
          status,
          actionedAt,
        })
      })
    }
  }
  return doses
}

export function buildNotifications(now: Date): AppNotification[] {
  const mins = (m: number) => new Date(now.getTime() - m * 60 * 1000).toISOString()
  return [
    {
      id: "n1",
      patientId: "p1",
      medicationId: "m3",
      type: "refill",
      title: "Refill needed soon",
      message: "Apixaban 5 mg is running low — 5 doses remaining.",
      timestamp: mins(35),
      read: false,
    },
    {
      id: "n2",
      patientId: "p1",
      medicationId: "m2",
      type: "missed",
      title: "Dose missed",
      message: "Eleanor missed the evening dose of Metformin 500 mg.",
      timestamp: mins(180),
      read: false,
    },
    {
      id: "n3",
      patientId: "p1",
      medicationId: "m1",
      type: "taken",
      title: "Dose confirmed",
      message: "Eleanor took Lisinopril 10 mg on time this morning.",
      timestamp: mins(320),
      read: true,
    },
    {
      id: "n4",
      patientId: "p2",
      medicationId: "m6",
      type: "refill",
      title: "Refill needed soon",
      message: "Rosuvastatin 10 mg is running low — 6 doses remaining.",
      timestamp: mins(500),
      read: true,
    },
    {
      id: "n5",
      patientId: "p2",
      medicationId: "m5",
      type: "skipped",
      title: "Dose skipped",
      message: "Marcus skipped the morning dose of Levothyroxine 75 mcg.",
      timestamp: mins(720),
      read: true,
    },
  ]
}
