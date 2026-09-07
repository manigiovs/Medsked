"use client"

import { useState, type FormEvent } from "react"
import { HeartPulse, Eye, EyeOff, ArrowRight } from "lucide-react"
import { useApp } from "@/lib/store"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const DEMO_PASSWORD = "medsked"

export function LoginPage() {
  const { users, setCurrentUserId } = useApp()
  const [mode, setMode] = useState<"login" | "create">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState<"patient" | "caregiver">("patient")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (isLoggedIn) {
    return <AppShell onLogout={() => setIsLoggedIn(false)} />
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (mode === "create") {
      if (!name.trim() || !email.trim() || !password || !confirmPassword) {
        setError("Complete all fields to create your account.")
        return
      }
      if (password.length < 6) {
        setError("Your password must be at least 6 characters.")
        return
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.")
        return
      }

      const user = users.find((candidate) => candidate.role === role) ?? users[0]
      setCurrentUserId(user.id)
      setIsLoggedIn(true)
      return
    }

    const user = users.find((candidate) => candidate.email.toLowerCase() === email.trim().toLowerCase())

    if (!user || password !== DEMO_PASSWORD) {
      setError("Enter a valid demo email and password.")
      return
    }

    setCurrentUserId(user.id)
    setIsLoggedIn(true)
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4 py-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border bg-card shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-10 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-white/20">
                <HeartPulse className="size-6" />
              </div>
              <div>
                <p className="text-base font-semibold">Medsked</p>
                <p className="text-sm text-primary-foreground/75">Medication Care</p>
              </div>
            </div>
            <p className="max-w-md text-4xl font-semibold leading-tight tracking-tight">
              Keep every dose, refill, and care decision in view.
            </p>
          </div>
          <p className="max-w-sm text-sm leading-6 text-primary-foreground/75">
            A calm workspace for patients, caregivers, and clinicians managing medication routines together.
          </p>
        </section>

        <section className="p-6 sm:p-10">
          <div className="mx-auto max-w-md">
            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <HeartPulse className="size-5" />
                </div>
                <div>
                  <p className="text-base font-semibold">Medsked</p>
                  <p className="text-xs text-muted-foreground">Medication Care</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm font-medium text-primary">
                {mode === "login" ? "Welcome back" : "Get started with Medsked"}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">
                {mode === "login" ? "Sign in to your account" : "Create your account"}
              </h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {mode === "login"
                  ? "Access your medication schedule and care dashboard."
                  : "Set up your account to manage medication routines with your care team."}
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {mode === "create" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value)
                      setError("")
                    }}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setError("")
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {mode === "login" && (
                    <button type="button" className="text-xs font-medium text-primary hover:underline">
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="pr-10"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value)
                      setError("")
                    }}
                    required
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {mode === "create" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm password</Label>
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value)
                        setError("")
                      }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Account type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["patient", "caregiver"] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`rounded-lg border px-3 py-2 text-left text-sm capitalize transition-colors ${
                            role === option
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:bg-muted"
                          }`}
                          onClick={() => setRole(option)}
                        >
                          <span className="block font-medium">{option}</span>
                          <span className="text-xs text-muted-foreground">
                            {option === "patient" ? "Manage my schedule" : "Support a patient"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" size="lg" className="h-10 w-full gap-2">
                {mode === "login" ? "Sign in" : "Create account"}
                <ArrowRight className="size-4" />
              </Button>
            </form>

            {mode === "login" ? (
              <>
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Need an account?{" "}
                  <button type="button" className="font-medium text-primary hover:underline" onClick={() => {
                    setMode("create")
                    setError("")
                  }}>
                    Create one
                  </button>
                </p>
              </>
            ) : (
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button type="button" className="font-medium text-primary hover:underline" onClick={() => {
                  setMode("login")
                  setError("")
                }}>
                  Sign in
                </button>
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
