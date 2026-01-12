"use client";

import { CodeBlock } from "@/components/code-block";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { HeatmapCalendar } from "./heatmap-calendar";
import { HeatmapThemePresets } from "./heatmap-theme-presets";

/* ---------------- shared demo data for previews ---------------- */

const previewData = Array.from({ length: 365 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - i);
  const key = d.toISOString().slice(0, 10);
  const value = i % 7 === 0 ? 0 : i % 13;
  return { date: key, value };
});

/* ---------------- full runnable snippets ---------------- */

const CODE_BASIC = `import * as React from "react"
import { HeatmapCalendar } from "@/components/heatmap-calendar"

function makeData(days = 365) {
  return Array.from({ length: days }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return {
      date: d.toISOString().slice(0, 10), // "YYYY-MM-DD"
      value: i % 7 === 0 ? 0 : i % 13,
    }
  })
}

export default function ExampleBasic() {
  const data = React.useMemo(() => makeData(365), [])

  return (
    <HeatmapCalendar
      title="Activity"
      data={data}
      weekStartsOn={1}
      axisLabels
    />
  )
}
`;

const CODE_AXIS = `import * as React from "react"
import { HeatmapCalendar } from "@/components/heatmap-calendar"

function makeData(days = 365) {
  return Array.from({ length: days }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return { date: d.toISOString().slice(0, 10), value: i % 7 === 0 ? 0 : i % 13 }
  })
}

export default function ExampleAxisLabels() {
  const data = React.useMemo(() => makeData(365), [])

  return (
    <HeatmapCalendar
      title="Axis Labels"
      data={data}
      weekStartsOn={1}
      legend={{ placement: "bottom" }}
      axisLabels={{
        showMonths: true,
        showWeekdays: true,
        weekdayIndices: [0, 1, 2, 3, 4, 5, 6], // show all weekday labels
        monthFormat: "short",
        minWeekSpacing: 3,
      }}
    />
  )
}
`;

const CODE_LEGEND_BOTTOM = `import * as React from "react"
import { HeatmapCalendar } from "@/components/heatmap-calendar"

function makeData(days = 365) {
  return Array.from({ length: days }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return { date: d.toISOString().slice(0, 10), value: i % 7 === 0 ? 0 : i % 13 }
  })
}

export default function ExampleLegendBottom() {
  const data = React.useMemo(() => makeData(365), [])

  return (
    <HeatmapCalendar
      title="Activity"
      data={data}
      axisLabels
      legend={{ placement: "bottom" }}
    />
  )
}
`;

const CODE_COMPACT = `import * as React from "react"
import { HeatmapCalendar } from "@/components/heatmap-calendar"

function makeData(days = 365) {
  return Array.from({ length: days }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return { date: d.toISOString().slice(0, 10), value: i % 7 === 0 ? 0 : i % 13 }
  })
}

export default function ExampleCompact() {
  const data = React.useMemo(() => makeData(365), [])

  return (
    <HeatmapCalendar
      title="Compact View"
      data={data}
      cellSize={9}
      cellGap={2}
      axisLabels={false}
    />
  )
}
`;

const CODE_THEMES = `import { HeatmapThemePresets } from "@/components/heatmap-theme-presets"

export default function ExampleThemes() {
  return <HeatmapThemePresets />
}
`;

const CODE_SHORT_RANGE = `import * as React from "react"
import { HeatmapCalendar } from "@/components/heatmap-calendar"

function makeData(days = 365) {
  return Array.from({ length: days }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return { date: d.toISOString().slice(0, 10), value: i % 7 === 0 ? 0 : i % 13 }
  })
}

export default function ExampleShortRange() {
  const data = React.useMemo(() => makeData(365), [])

  return (
    <HeatmapCalendar
      title="Last 90 Days"
      data={data}
      rangeDays={90}
      axisLabels
    />
  )
}
`;

const CODE_FITNESS = `import * as React from "react"
import { HeatmapCalendar } from "@/components/heatmap-calendar"

function makeTrainingData(days = 365) {
  // Example: minutes trained per day (0..90)
  return Array.from({ length: days }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)

    // deterministic pattern for demos
    const minutes =
      i % 9 === 0 ? 0 : (i * 7) % 75 // 0..74
    return { date: d.toISOString().slice(0, 10), value: minutes }
  })
}

export default function ExampleFitness() {
  const data = React.useMemo(() => makeTrainingData(365), [])

  return (
    <HeatmapCalendar
      title="Training Minutes"
      data={data}
      axisLabels
      legend={{ lessText: "Less", moreText: "More", placement: "bottom" }}
      renderTooltip={(cell) => (
        <div>
          <div className="font-medium">{cell.value} minutes</div>
          <div className="text-muted-foreground">{cell.label}</div>
        </div>
      )}
    />
  )
}
`;

const CODE_BUSINESS = `import * as React from "react"
import { HeatmapCalendar } from "@/components/heatmap-calendar"

function makeOrdersData(days = 365) {
  // Example: orders/day (0..40)
  return Array.from({ length: days }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)

    // deterministic: weekday-ish rhythm
    const base = (i % 7 === 0) ? 0 : (i % 17) + 3
    const orders = Math.min(40, base * (i % 5 === 0 ? 2 : 1))
    return { date: d.toISOString().slice(0, 10), value: orders }
  })
}

export default function ExampleBusiness() {
  const data = React.useMemo(() => makeOrdersData(365), [])

  return (
    <HeatmapCalendar
      title="Orders"
      data={data}
      axisLabels
      legend={{ lessText: "Low", moreText: "High", placement: "bottom" }}
      renderTooltip={(cell) => (
        <div>
          <div className="font-medium">{cell.value} orders</div>
          <div className="text-muted-foreground">{cell.label}</div>
        </div>
      )}
    />
  )
}
`;

const CODE_SUPPORT = `import * as React from "react"
import { HeatmapCalendar } from "@/components/heatmap-calendar"

function makeTicketsData(days = 365) {
  // Example: tickets/day (0..30)
  return Array.from({ length: days }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)

    // deterministic: spikes every ~2 weeks
    const spike = i % 14 === 0 ? 20 : 0
    const tickets = (i % 6 === 0 ? 0 : (i % 11) + 2) + spike
    return { date: d.toISOString().slice(0, 10), value: Math.min(30, tickets) }
  })
}

export default function ExampleSupport() {
  const data = React.useMemo(() => makeTicketsData(365), [])

  return (
    <HeatmapCalendar
      title="Support Tickets"
      data={data}
      axisLabels
      legend={{ lessText: "Fewer", moreText: "More", placement: "bottom" }}
      renderTooltip={(cell) => (
        <div>
          <div className="font-medium">{cell.value} tickets</div>
          <div className="text-muted-foreground">{cell.label}</div>
        </div>
      )}
    />
  )
}
`;

const CODE_LEARNING = `import * as React from "react"
import { HeatmapCalendar } from "@/components/heatmap-calendar"

function makeStudyData(days = 365) {
  // Example: study minutes/day (0..180)
  return Array.from({ length: days }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)

    // deterministic: higher on weekdays
    const weekdayBoost = (i % 7 === 5 || i % 7 === 6) ? 20 : 70
    const minutes = (i % 8 === 0 ? 0 : ((i * 13) % 110) + weekdayBoost)
    return { date: d.toISOString().slice(0, 10), value: minutes }
  })
}

export default function ExampleLearning() {
  const data = React.useMemo(() => makeStudyData(365), [])

  return (
    <HeatmapCalendar
      title="Study Time"
      data={data}
      axisLabels
      legend={{ lessText: "Less", moreText: "More", placement: "bottom" }}
      renderTooltip={(cell) => (
        <div>
          <div className="font-medium">{cell.value} minutes</div>
          <div className="text-muted-foreground">{cell.label}</div>
        </div>
      )}
    />
  )
}
`;

/* ---------------- examples config ---------------- */

type DemoExample = {
  id: string;
  title: string;
  description?: string;
  preview: React.ReactNode;
  code: string;
  fileName?: string;
};

const examples: DemoExample[] = [
  {
    id: "basic",
    title: "Basic Usage",
    description: "Calendar heatmap with built-in axis labels (months + weekdays).",
    preview: <HeatmapCalendar title="Activity" data={previewData} weekStartsOn={1} axisLabels />,
    code: CODE_BASIC,
    fileName: "ExampleBasic.tsx",
  },
  {
    id: "axis-labels",
    title: "Axis Labels",
    description: "Customize month format and which weekday rows are labeled.",
    preview: (
      <HeatmapCalendar
        title="Axis Labels"
        data={previewData}
        weekStartsOn={1}
        legend={{ placement: "bottom" }}
        axisLabels={{
          showMonths: true,
          showWeekdays: true,
          weekdayIndices: [0, 1, 2, 3, 4, 5, 6],
          monthFormat: "short",
          minWeekSpacing: 3,
        }}
      />
    ),
    code: CODE_AXIS,
    fileName: "ExampleAxisLabels.tsx",
  },
  {
    id: "legend-bottom",
    title: "Legend at Bottom",
    description: "Move the intensity legend below the heatmap.",
    preview: (
      <HeatmapCalendar
        title="Activity"
        data={previewData}
        axisLabels
        legend={{ placement: "bottom" }}
      />
    ),
    code: CODE_LEGEND_BOTTOM,
    fileName: "ExampleLegendBottom.tsx",
  },
  {
    id: "compact",
    title: "Compact",
    description: "Smaller cells and tighter spacing (axis labels disabled).",
    preview: (
      <HeatmapCalendar
        title="Compact View"
        data={previewData}
        cellSize={9}
        cellGap={2}
        axisLabels={false}
      />
    ),
    code: CODE_COMPACT,
    fileName: "ExampleCompact.tsx",
  },
  {
    id: "theme-presets",
    title: "Themes",
    description: "Pick a theme and copy CSS variables (like shadcn themes).",
    preview: <HeatmapThemePresets />,
    code: CODE_THEMES,
    fileName: "ExampleThemes.tsx",
  },
  {
    id: "short-range",
    title: "90 Days Range",
    description: "Shorter time window.",
    preview: <HeatmapCalendar title="Last 90 Days" data={previewData} rangeDays={90} axisLabels />,
    code: CODE_SHORT_RANGE,
    fileName: "ExampleShortRange.tsx",
  },
  {
    id: "fitness",
    title: "Fitness / Health",
    description: "Daily training minutes.",
    preview: (
      <HeatmapCalendar
        title="Training Minutes"
        data={previewData}
        axisLabels
        legend={{ lessText: "Less", moreText: "More", placement: "bottom" }}
        renderTooltip={(cell) => (
          <div>
            <div className="font-medium">{cell.value} minutes</div>
            <div className="text-muted-foreground">{cell.label}</div>
          </div>
        )}
      />
    ),
    code: CODE_FITNESS,
    fileName: "ExampleFitness.tsx",
  },
  {
    id: "business",
    title: "Business / Sales",
    description: "Orders per day.",
    preview: (
      <HeatmapCalendar
        title="Orders"
        data={previewData}
        axisLabels
        legend={{ lessText: "Low", moreText: "High", placement: "bottom" }}
        renderTooltip={(cell) => (
          <div>
            <div className="font-medium">{cell.value} orders</div>
            <div className="text-muted-foreground">{cell.label}</div>
          </div>
        )}
      />
    ),
    code: CODE_BUSINESS,
    fileName: "ExampleBusiness.tsx",
  },
  {
    id: "support",
    title: "Customer Support",
    description: "Support tickets opened per day.",
    preview: (
      <HeatmapCalendar
        title="Support Tickets"
        data={previewData}
        axisLabels
        legend={{ lessText: "Fewer", moreText: "More", placement: "bottom" }}
        renderTooltip={(cell) => (
          <div>
            <div className="font-medium">{cell.value} tickets</div>
            <div className="text-muted-foreground">{cell.label}</div>
          </div>
        )}
      />
    ),
    code: CODE_SUPPORT,
    fileName: "ExampleSupport.tsx",
  },
  {
    id: "learning",
    title: "Learning / Education",
    description: "Study minutes per day.",
    preview: (
      <HeatmapCalendar
        title="Study Time"
        data={previewData}
        axisLabels
        legend={{ lessText: "Less", moreText: "More", placement: "bottom" }}
        renderTooltip={(cell) => (
          <div>
            <div className="font-medium">{cell.value} minutes</div>
            <div className="text-muted-foreground">{cell.label}</div>
          </div>
        )}
      />
    ),
    code: CODE_LEARNING,
    fileName: "ExampleLearning.tsx",
  },
];

/* ---------------- component ---------------- */

export function DemoSection() {
  return (
    <section id="demo" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Live Demo</h2>
        <p className="text-sm text-muted-foreground">
          Multiple usage patterns with live preview and copyable code.
        </p>
      </div>

      {examples.map((example) => (
        <Card key={example.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{example.title}</CardTitle>
            {example.description ? (
              <p className="text-sm text-muted-foreground">{example.description}</p>
            ) : null}
          </CardHeader>

          <CardContent className="space-y-4">
            <Tabs defaultValue="preview">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="mt-4">
                {example.preview}
              </TabsContent>

              <TabsContent value="code" className="mt-4">
                <CodeBlock
                  code={example.code}
                  language="tsx"
                  fileName={example.fileName ?? "Example.tsx"}
                />
              </TabsContent>
            </Tabs>

            <Separator />
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
