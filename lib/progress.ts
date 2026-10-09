"use client"

import { useSyncExternalStore } from "react"
import type { Brand, Scenario } from "@/lib/content/uplift"
import type { LeverId } from "@/lib/content/types"

/*
 * v1 keeps progress and assessments in the browser (PRD section 5, F15).
 * This module is the seam a real data layer replaces later: components only
 * call useProgress() and the update helpers below.
 */

export type Answer = "yes" | "partly" | "no"

export type ActionStatus = "not-started" | "in-progress" | "done"

/** How far the action aims to move the metric: part of the way, or all the way to the bar. */
export type ActionTarget = "partial" | "bar"

/** Two-point ratings, so every action lands in exactly one quadrant of the matrix. */
export type Rating = "low" | "high"

export type PlanEdit = {
  /** Hand-rated impact, used only while the action's lever is not sized. */
  impact?: Rating
  /** A market's override of the impact the sizing suggests. */
  impactOverride?: Rating
  effort?: Rating
  owner: string
  notes: string
  /** Legacy flag from before statuses existed; read through statusOf(). */
  done: boolean
  what?: string
  /** YYYY-MM-DD */
  targetDate?: string
  target?: ActionTarget
  status?: ActionStatus
  /** Present only once the action is saved, which is what puts it on the tracker. */
  savedAt?: string
  doneAt?: string
  /** Snapshot at save time so the tracker still reads if the gap is later rescored away. */
  lever?: string
  metric?: string
}

export type SavedAction = PlanEdit & { what: string; targetDate: string; target: ActionTarget; savedAt: string }

export const isSaved = (e: PlanEdit | undefined): e is SavedAction => Boolean(e?.savedAt)

export const statusOf = (e: PlanEdit): ActionStatus => e.status ?? (e.done ? "done" : "not-started")

/** Local calendar date as YYYY-MM-DD, so "today" matches the date picker. */
export const todayIso = () => new Date().toLocaleDateString("en-CA")

export type ProgressState = {
  version: 1
  completedLessons: string[]
  prerequisites: Record<string, Answer>
  assessment: Record<string, Answer>
  scenarios: Record<string, number>
  plan: Record<string, PlanEdit>
  brands?: Brand[]
  currency?: string
  /** "all" or a brand id: which brands the sizing, impact bands and matrix read. */
  sizingView?: string
}

const KEY = "bayer-ecom-toolkit:progress:v1"

const EMPTY: ProgressState = {
  version: 1,
  completedLessons: [],
  prerequisites: {},
  assessment: {},
  scenarios: {},
  plan: {},
}

let cached: ProgressState | null = null
const listeners = new Set<() => void>()

function read(): ProgressState {
  if (cached) return cached
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed = raw ? (JSON.parse(raw) as Partial<ProgressState>) : null
    cached = parsed && parsed.version === 1 ? { ...EMPTY, ...parsed } : EMPTY
  } catch {
    cached = EMPTY
  }
  return cached
}

function write(next: ProgressState) {
  cached = next
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // storage full or blocked: progress still works for this session
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cached = null
      listener()
    }
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", onStorage)
  }
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, read, () => EMPTY)
}

/** True once the client has read storage, so "0 done" is never shown before we know. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

function update(fn: (s: ProgressState) => ProgressState) {
  write(fn(read()))
}

export const lessonKey = (moduleSlug: string, lessonSlug: string) =>
  `${moduleSlug}/${lessonSlug}`

export function completeLesson(moduleSlug: string, lessonSlug: string) {
  const k = lessonKey(moduleSlug, lessonSlug)
  update((s) =>
    s.completedLessons.includes(k)
      ? s
      : { ...s, completedLessons: [...s.completedLessons, k] },
  )
}

export function setPrerequisite(id: string, a: Answer) {
  update((s) => ({ ...s, prerequisites: { ...s.prerequisites, [id]: a } }))
}

export function setAssessment(id: string, a: Answer) {
  update((s) => ({ ...s, assessment: { ...s.assessment, [id]: a } }))
}

export function answerScenario(id: string, optionIndex: number) {
  update((s) => ({ ...s, scenarios: { ...s.scenarios, [id]: optionIndex } }))
}

export function editPlan(id: string, patch: Partial<PlanEdit>) {
  update((s) => {
    const current = s.plan[id] ?? { owner: "", notes: "", done: false }
    return { ...s, plan: { ...s.plan, [id]: { ...current, ...patch } } }
  })
}

export function saveAction(
  id: string,
  data: {
    what: string
    owner: string
    targetDate: string
    target: ActionTarget
    impact: Rating
    impactOverride?: Rating
    effort: Rating
    lever: string
    metric?: string
  },
) {
  update((s) => {
    const current = s.plan[id] ?? { owner: "", notes: "", done: false }
    return {
      ...s,
      plan: {
        ...s.plan,
        [id]: { ...current, ...data, status: statusOf(current), savedAt: current.savedAt ?? todayIso() },
      },
    }
  })
}

export function setActionStatus(id: string, status: ActionStatus) {
  update((s) => {
    const current = s.plan[id]
    if (!current) return s
    return {
      ...s,
      plan: {
        ...s.plan,
        [id]: { ...current, status, done: status === "done", doneAt: status === "done" ? todayIso() : undefined },
      },
    }
  })
}

export function setActionRating(id: string, field: "impact" | "effort", value: Rating) {
  update((s) => {
    const current = s.plan[id]
    if (!current) return s
    return { ...s, plan: { ...s.plan, [id]: { ...current, [field]: value } } }
  })
}

export type Quadrant = "do-first" | "project" | "fit-in" | "park"

/*
 * Categories and waves follow the deck's "Key actions matrix: impact vs effort" slide.
 * Wave 1 is the whole low-effort side, Wave 2 the high-impact, high-effort corner.
 * Ids are unchanged because quadrants are derived from ratings, never stored.
 */
export const QUADRANTS: { id: Quadrant; label: string; hint: string; wave: 1 | 2 | null }[] = [
  { id: "do-first", label: "No regret actions", hint: "High impact, low effort to set up · Wave 1", wave: 1 },
  { id: "fit-in", label: "In-platform sprints", hint: "Lower impact, low effort to set up · Wave 1", wave: 1 },
  { id: "project", label: "Long term opportunities", hint: "High impact, high effort to set up · Wave 2", wave: 2 },
  { id: "park", label: "Deprioritise", hint: "Low impact, high effort to set up · not in a wave", wave: null },
]

/**
 * Null until both ratings exist: an unrated action is not placed in a quadrant it was never judged against.
 * Pass the impact from impactOf() so a sized lever's benchmark band is what places the action.
 */
export function quadrantOf(e: PlanEdit, impact: Rating | undefined = e.impact): Quadrant | null {
  if (!impact || !e.effort) return null
  if (impact === "high") return e.effort === "low" ? "do-first" : "project"
  return e.effort === "low" ? "fit-in" : "park"
}

/** Undefined clears the override, so the action goes back to the benchmark's impact. */
export function setImpactOverride(id: string, value: Rating | undefined) {
  update((s) => {
    const current = s.plan[id]
    if (!current) return s
    return { ...s, plan: { ...s.plan, [id]: { ...current, impactOverride: value } } }
  })
}

const newId = () => Math.random().toString(36).slice(2, 10)

export function addBrand() {
  const brand: Brand = { id: newId(), name: "", netSales: null, scenarios: {} }
  update((s) => ({ ...s, brands: [...(s.brands ?? []), brand] }))
  return brand.id
}

export function updateBrand(id: string, patch: Partial<Omit<Brand, "id">>) {
  update((s) => ({ ...s, brands: (s.brands ?? []).map((b) => (b.id === id ? { ...b, ...patch } : b)) }))
}

export function setBrandScenario(id: string, lever: LeverId, scenario: Scenario) {
  update((s) => ({
    ...s,
    brands: (s.brands ?? []).map((b) => (b.id === id ? { ...b, scenarios: { ...b.scenarios, [lever]: scenario } } : b)),
  }))
}

export function removeBrand(id: string) {
  update((s) => ({
    ...s,
    brands: (s.brands ?? []).filter((b) => b.id !== id),
    sizingView: s.sizingView === id ? "all" : s.sizingView,
  }))
}

export function setSizingView(view: string) {
  update((s) => ({ ...s, sizingView: view }))
}

export function setCurrency(currency: string) {
  update((s) => ({ ...s, currency }))
}

export function removeAction(id: string) {
  update((s) => {
    const { [id]: _removed, ...rest } = s.plan
    return { ...s, plan: rest }
  })
}

export function resetProgress() {
  write(EMPTY)
}
