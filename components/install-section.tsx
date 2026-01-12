"use client";

import { CodeBlock } from "@/components/code-block";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const depsCode = `npm install clsx tailwind-merge lucide-react`;

const shadcnCode = `# required
npx shadcn@latest add card tooltip

# optional (only if you use the demo tabs/sections)
npx shadcn@latest add tabs separator`;

const copyFilesCode = `# Copy these files into your project

components/heatmap-calendar.tsx

# Optional: theme presets + copy CSS variables
components/heatmap-theme-presets.tsx`;

const dataFormatCode = `type HeatmapDatum = {
  // Recommended: "YYYY-MM-DD"
  date: string | Date
  // Daily intensity (steps, minutes, orders, tickets, events...)
  value: number
  // Optional metadata for tooltip/click
  meta?: unknown
}

const data: HeatmapDatum[] = [
  { date: "2025-01-01", value: 3 },
  { date: "2025-01-02", value: 0 },
  { date: "2025-01-03", value: 8 },
]

// Duplicate dates are allowed (values are summed).`;

const usageCode = `import { HeatmapCalendar } from "@/components/heatmap-calendar"

export default function Example() {
  const data = [
    { date: "2025-01-01", value: 3 },
    { date: "2025-01-02", value: 0 },
    { date: "2025-01-03", value: 8 },
  ]

  return (
    <HeatmapCalendar
      title="Daily Activity"
      data={data}
      axisLabels
    />
  )
}`;

const axisLabelsCode = `<HeatmapCalendar
  data={data}
  axisLabels={{
    showMonths: true,
    showWeekdays: true,
    // show labels only on these weekday rows (0..6)
    weekdayIndices: [1, 3, 5], // Mon/Wed/Fri (when weekStartsOn=1)
    monthFormat: "short",      // "short" | "long" | "numeric"
    minWeekSpacing: 3,
  }}
/>`;

export function InstallSection() {
  return (
    <section id="docs" className="scroll-mt-20 space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Install & Use</h2>
        <p className="text-sm text-muted-foreground">
          Copy the component and install a few lightweight dependencies.
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Instructions</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Tabs defaultValue="deps">
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="deps">Dependencies</TabsTrigger>
              <TabsTrigger value="shadcn">shadcn/ui</TabsTrigger>
              <TabsTrigger value="copy">Copy files</TabsTrigger>
              <TabsTrigger value="data">Data format</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="axis">Axis labels</TabsTrigger>
            </TabsList>

            <TabsContent value="deps" className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                Required helper packages (commonly already present in shadcn projects).
              </p>
              <CodeBlock code={depsCode} language="bash" fileName="Install dependencies" />
            </TabsContent>

            <TabsContent value="shadcn" className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                Add the required shadcn components used by HeatmapCalendar.
              </p>
              <CodeBlock code={shadcnCode} language="bash" fileName="Add shadcn components" />
            </TabsContent>

            <TabsContent value="copy" className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                Copy the component file(s) from this page into your project.
              </p>
              <CodeBlock code={copyFilesCode} language="bash" fileName="Files to copy" />
            </TabsContent>

            <TabsContent value="data" className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                HeatmapCalendar expects{" "}
                <span className="font-medium text-foreground">daily intensity</span> data — not
                limited to code/commits (fitness, business, IoT, learning, etc).
              </p>
              <CodeBlock code={dataFormatCode} language="ts" fileName="HeatmapDatum" />
            </TabsContent>

            <TabsContent value="usage" className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                Basic example (paste into any page/component).
              </p>
              <CodeBlock code={usageCode} language="tsx" fileName="Example.tsx" />
            </TabsContent>

            <TabsContent value="axis" className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                Axis labels show <span className="font-medium text-foreground">months</span> (top)
                and <span className="font-medium text-foreground">weekdays</span> (left).
              </p>
              <CodeBlock code={axisLabelsCode} language="tsx" fileName="Axis labels" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
