"use client"

import { useState } from "react"
import { Pill, Plus, Package, Clock, User, RefreshCw, Pencil } from "lucide-react"
import { toast } from "sonner"
import { useApp } from "@/lib/store"
import { daysOfSupply, refillStatus } from "@/lib/helpers"
import type { Medication, MedicationForm, ScheduleSlot } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FREQUENCIES: Record<string, { label: string; schedule: ScheduleSlot[] }> = {
  once: { label: "Once daily", schedule: [{ time: "08:00", label: "Morning" }] },
  twice: {
    label: "Twice daily",
    schedule: [
      { time: "08:00", label: "Morning" },
      { time: "20:00", label: "Evening" },
    ],
  },
  thrice: {
    label: "Three times daily",
    schedule: [
      { time: "08:00", label: "Morning" },
      { time: "14:00", label: "Afternoon" },
      { time: "20:00", label: "Evening" },
    ],
  },
  bedtime: { label: "At bedtime", schedule: [{ time: "21:00", label: "Bedtime" }] },
}

const FORMS: MedicationForm[] = ["tablet", "capsule", "liquid", "injection", "inhaler", "topical"]

export function MedicationsView() {
  const app = useApp()
  const pid = app.activePatientId
  const meds = app.medications.filter((m) => m.patientId === pid)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Medications</h1>
          <p className="text-sm text-muted-foreground">
            {meds.length} medication{meds.length !== 1 ? "s" : ""} for {app.activePatient.name}
          </p>
        </div>
        <MedicationDialog
          trigger={
            <Button>
              <Plus data-icon="inline-start" />
              Add medication
            </Button>
          }
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {meds.map((m) => (
          <MedicationCard key={m.id} med={m} />
        ))}
      </div>
    </div>
  )
}

function MedicationCard({ med }: { med: Medication }) {
  const status = refillStatus(med)
  const pct = Math.min(100, Math.round((med.quantityRemaining / med.totalQuantity) * 100))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-xl",
              status === "critical"
                ? "bg-destructive/10 text-destructive"
                : "bg-primary/10 text-primary",
            )}
          >
            <Pill className="size-5" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <CardTitle className="flex items-center gap-2">
              {med.name}
              <span className="text-sm font-normal text-muted-foreground">{med.strength}</span>
            </CardTitle>
            <CardDescription className="capitalize">
              {med.form} · {med.frequency}
            </CardDescription>
          </div>
          {!med.active && <Badge variant="outline">Inactive</Badge>}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">{med.instructions}</p>

        <div className="flex flex-wrap gap-2">
          {med.schedule.map((s) => (
            <Badge key={s.time} variant="secondary" className="gap-1">
              <Clock className="size-3" />
              {s.label} {s.time}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="size-3.5" />
          Prescribed by {med.prescribedBy}
        </div>

        <div className="flex flex-col gap-1.5 rounded-lg bg-muted/50 p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 font-medium">
              <Package className="size-4" />
              Supply
            </span>
            <span className={cn(status === "critical" && "font-medium text-destructive")}>
              {med.quantityRemaining} of {med.totalQuantity} · ~{daysOfSupply(med)} days
            </span>
          </div>
          <Progress value={pct} />
        </div>

        <div className="flex items-center gap-2">
          <RefillDialog med={med} />
          <MedicationDialog
            med={med}
            trigger={
              <Button variant="outline" size="sm">
                <Pencil data-icon="inline-start" />
                Edit
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}

function RefillDialog({ med }: { med: Medication }) {
  const app = useApp()
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(String(med.totalQuantity))

  function submit() {
    const n = Number(amount)
    if (!Number.isFinite(n) || n <= 0) {
      toast.error("Enter a valid quantity")
      return
    }
    app.refillMedication(med.id, Math.floor(n))
    toast.success("Refill added", { description: `${med.name} · +${Math.floor(n)} doses` })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" />}>
        <RefreshCw data-icon="inline-start" />
        Refill
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Refill {med.name}</DialogTitle>
          <DialogDescription>
            Add doses to the current supply of {med.quantityRemaining}.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="refill-amount">Doses to add</FieldLabel>
            <Input
              id="refill-amount"
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <FieldDescription>Typically one full pack.</FieldDescription>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button onClick={submit}>Add refill</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function MedicationDialog({
  med,
  trigger,
}: {
  med?: Medication
  trigger: React.ReactNode
}) {
  const app = useApp()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(med?.name ?? "")
  const [strength, setStrength] = useState(med?.strength ?? "")
  const [form, setForm] = useState<MedicationForm>(med?.form ?? "tablet")
  const [frequency, setFrequency] = useState<string>(() => {
    if (!med) return "once"
    const match = Object.entries(FREQUENCIES).find(([, v]) => v.label === med.frequency)
    return match?.[0] ?? "once"
  })
  const [instructions, setInstructions] = useState(med?.instructions ?? "")
  const [quantity, setQuantity] = useState(String(med?.totalQuantity ?? 30))

  const isEdit = Boolean(med)

  function submit() {
    if (!name.trim() || !strength.trim()) {
      toast.error("Name and strength are required")
      return
    }
    const freq = FREQUENCIES[frequency]
    const qty = Math.max(1, Math.floor(Number(quantity) || 30))

    if (isEdit && med) {
      app.updateMedication({
        ...med,
        name: name.trim(),
        strength: strength.trim(),
        form,
        frequency: freq.label,
        schedule: freq.schedule,
        instructions: instructions.trim() || "Take as directed.",
        totalQuantity: qty,
      })
      toast.success("Medication updated")
    } else {
      app.addMedication({
        patientId: app.activePatientId,
        name: name.trim(),
        strength: strength.trim(),
        form,
        frequency: freq.label,
        schedule: freq.schedule,
        instructions: instructions.trim() || "Take as directed.",
        prescribedBy: app.currentUser.role === "clinician" ? app.currentUser.name : "Dr. Priya Nair",
        quantityRemaining: qty,
        totalQuantity: qty,
        refillThreshold: Math.max(3, Math.round(qty * 0.2)),
        lastRefill: new Date().toISOString().slice(0, 10),
        active: true,
      })
      toast.success("Medication added")
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit medication" : "Add medication"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? `Update details for ${med?.name}.`
              : `Add a new medication for ${app.activePatient.name}.`}
          </DialogDescription>
        </DialogHeader>

        <FieldGroup className="gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="med-name">Name</FieldLabel>
              <Input id="med-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Lisinopril" />
            </Field>
            <Field>
              <FieldLabel htmlFor="med-strength">Strength</FieldLabel>
              <Input id="med-strength" value={strength} onChange={(e) => setStrength(e.target.value)} placeholder="10 mg" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel>Form</FieldLabel>
              <Select value={form} onValueChange={(v) => setForm(v as MedicationForm)}>
                <SelectTrigger className="w-full capitalize">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FORMS.map((f) => (
                    <SelectItem key={f} value={f} className="capitalize">
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Frequency</FieldLabel>
              <Select value={frequency} onValueChange={(v) => setFrequency(v as string)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(FREQUENCIES).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="med-qty">Quantity per pack</FieldLabel>
            <Input id="med-qty" type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </Field>

          <Field>
            <FieldLabel htmlFor="med-instructions">Instructions</FieldLabel>
            <Input
              id="med-instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Take with water"
            />
          </Field>
        </FieldGroup>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button onClick={submit}>{isEdit ? "Save changes" : "Add medication"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
