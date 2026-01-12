import { CodeBlock } from "@/components/code-block";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const installCode = `# shadcn components used
npx shadcn@latest add button card tabs tooltip scroll-area badge separator dropdown-menu

# then add the component file
# components/heatmap-calendar.tsx`;

const usageCode = `import { HeatmapCalendar } from "@/components/heatmap-calendar"

const data = [
  { date: "2025-06-01", value: 3 },
  { date: "2025-06-02", value: 0 },
  { date: "2025-06-03", value: 7 },
]

export function Example() {
  return (
    <HeatmapCalendar
      title="Activity"
      data={data}
      weekStartsOn={1}
      rangeDays={365}
      onCellClick={(cell) => console.log(cell)}
    />
  )
}`;

const dataFormatCode = `// Heatmap data format (daily intensity)
export type HeatmapDatum = {
  /**
   * Day key.
   * Recommended: "YYYY-MM-DD" string to avoid timezone issues.
   * You can also pass a Date.
   */
  date: string | Date

  /**
   * Intensity for that day.
   * Examples: steps, minutes, tickets, sales count, sensor events, etc.
   */
  value: number

  /**
   * Optional metadata for tooltips/click actions.
   * Example: { breakdown: {...}, note: "Holiday" }
   */
  meta?: unknown
}

// Example
const data: HeatmapDatum[] = [
  { date: "2025-06-01", value: 120 }, // e.g. minutes, steps, revenue, etc.
  { date: "2025-06-02", value: 0 },
  { date: "2025-06-03", value: 45 },
]`;

const mappingHelperCode = `/**
 * Convert raw events into daily heatmap data.
 *
 * Use cases:
 * - Fitness: workouts -> minutes per day
 * - Sales: orders -> orders per day or revenue per day
 * - Support: tickets -> tickets per day
 * - IoT: sensor pings -> pings per day
 * - Learning: sessions -> minutes per day
 *
 * merge:
 * - "sum": totals per day (most common)
 * - "max": peak value per day
 * - "min": lowest value per day
 * - "last": last event value of the day
 */
export function toHeatmapData<T>(
  events: T[],
  opts: {
    getDate: (event: T) => Date | string
    getValue?: (event: T) => number
    merge?: "sum" | "max" | "min" | "last"
  }
) {
  const getValue = opts.getValue ?? (() => 1)
  const merge = opts.merge ?? "sum"

  // "YYYY-MM-DD" key
  const dayKey = (d: Date) => d.toISOString().slice(0, 10)

  const map = new Map<string, number>()

  for (const e of events) {
    const raw = opts.getDate(e)
    const d = typeof raw === "string" ? new Date(raw) : raw
    const key = dayKey(d)
    const v = getValue(e)

    const prev = map.get(key)
    if (prev === undefined) {
      map.set(key, v)
    } else {
      if (merge === "sum") map.set(key, prev + v)
      if (merge === "max") map.set(key, Math.max(prev, v))
      if (merge === "min") map.set(key, Math.min(prev, v))
      if (merge === "last") map.set(key, v)
    }
  }

  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, value]) => ({ date, value }))
}

/* ---------------- examples across domains ---------------- */

// 1) Fitness: workout sessions -> minutes per day
type Workout = { startedAt: string; minutes: number }
const workouts: Workout[] = [
  { startedAt: "2025-06-01T10:00:00Z", minutes: 35 },
  { startedAt: "2025-06-01T18:00:00Z", minutes: 20 },
]
const minutesPerDay = toHeatmapData(workouts, {
  getDate: (w) => w.startedAt,
  getValue: (w) => w.minutes,
  merge: "sum",
})

// 2) Sales: orders -> revenue per day
type Order = { createdAt: string; total: number }
const orders: Order[] = [
  { createdAt: "2025-06-02T09:00:00Z", total: 39.9 },
  { createdAt: "2025-06-02T12:00:00Z", total: 12.5 },
]
const revenuePerDay = toHeatmapData(orders, {
  getDate: (o) => o.createdAt,
  getValue: (o) => o.total,
})

// 3) Support: tickets -> count per day
type Ticket = { openedAt: string }
const tickets: Ticket[] = [{ openedAt: "2025-06-03T08:00:00Z" }]
const ticketsPerDay = toHeatmapData(tickets, {
  getDate: (t) => t.openedAt,
  // no getValue => defaults to 1 per ticket
})
`;

export function DocsSection() {
  return (
    <section id="docs" className="scroll-mt-20">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Docs</h2>
        <p className="text-sm text-muted-foreground">Install, usage, and how to prepare data.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="install">
            <TabsList>
              <TabsTrigger value="install">Install</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
            </TabsList>

            <TabsContent value="install" className="mt-4">
              <CodeBlock code={installCode} language="bash" fileName="Install" />
            </TabsContent>

            <TabsContent value="usage" className="mt-4">
              <CodeBlock code={usageCode} language="tsx" fileName="Usage" />
            </TabsContent>

            <TabsContent value="data" className="mt-4 space-y-4">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-xs text-muted-foreground">
                <div className="rounded-lg border p-3">
                  <span className="text-foreground font-medium">Fitness</span>
                  <br />
                  minutes / workouts / steps
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-foreground font-medium">Business</span>
                  <br />
                  orders / revenue / signups
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-foreground font-medium">Support</span>
                  <br />
                  tickets / chats / incidents
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-foreground font-medium">IoT</span>
                  <br />
                  sensor pings / alerts
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-foreground font-medium">Learning</span>
                  <br />
                  study minutes / lessons
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-foreground font-medium">Content</span>
                  <br />
                  posts / uploads / views
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="text-foreground font-medium">
                    Heatmaps are not just for code.
                  </span>{" "}
                  This component displays{" "}
                  <span className="text-foreground font-medium">daily intensity</span> over time.
                </p>
                <p>
                  Your <span className="text-foreground font-medium">value</span> can represent
                  anything: steps, minutes trained, orders, revenue, tickets, sensor events, study
                  time, posts — you decide.
                </p>
                <ul className="list-disc pl-5">
                  <li>
                    Each data item is one day:{" "}
                    <span className="font-medium text-foreground">date + value</span>.
                  </li>
                  <li>
                    Recommended date format:{" "}
                    <span className="font-medium text-foreground">"YYYY-MM-DD"</span>.
                  </li>
                  <li>
                    If multiple events happen on the same day, aggregate them (usually{" "}
                    <span className="font-medium text-foreground">sum</span>).
                  </li>
                </ul>
              </div>

              <CodeBlock code={dataFormatCode} language="ts" fileName="HeatmapDatum" />

              <CodeBlock code={mappingHelperCode} language="ts" fileName="toHeatmapData() helper" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
