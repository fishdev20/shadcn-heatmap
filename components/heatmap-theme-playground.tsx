"use client";

import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import * as React from "react";
import { HeatmapCalendar } from "./heatmap-calendar";

const DEFAULT_PALETTE = [
  "hsl(var(--muted))",
  "hsl(var(--primary) / 0.20)",
  "hsl(var(--primary) / 0.35)",
  "hsl(var(--primary) / 0.55)",
  "hsl(var(--primary) / 0.75)",
];

function makeDemoData() {
  return Array.from({ length: 365 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const value = i % 7 === 0 ? 0 : i % 13;
    return { date: key, value };
  });
}

export function HeatmapThemePlayground() {
  const data = React.useMemo(() => makeDemoData(), []);
  const [palette, setPalette] = React.useState<string[]>([
    "#e5e7eb",
    "#bbf7d0",
    "#4ade80",
    "#16a34a",
    "#166534",
  ]);

  const code = `const palette = ${JSON.stringify(palette, null, 2)}

<HeatmapCalendar
  title="Custom Palette"
  data={data}
  palette={palette}
/>`;

  function update(i: number, value: string) {
    setPalette((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  }

  function resetToDefault() {
    // Reset to semantic tokens (works in light/dark automatically)
    setPalette(DEFAULT_PALETTE);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium">Theme Playground</div>
          <div className="text-xs text-muted-foreground">
            Change heatmap colors live (like shadcn themes).
          </div>
        </div>
        <Button variant="secondary" size="sm" onClick={resetToDefault}>
          Use shadcn tokens
        </Button>
      </div>

      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-[260px_1fr]">
          {/* Controls */}
          <div className="space-y-3">
            {palette.map((c, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <div className="text-xs text-muted-foreground">
                  Level {i} {i === 0 ? "(empty)" : ""}
                </div>

                <div className="flex items-center gap-2">
                  {/* Native color picker works for hex; user can still type hsl/var */}
                  <input
                    type="color"
                    value={c.startsWith("#") ? c : "#22c55e"}
                    onChange={(e) => update(i, e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border bg-background p-1"
                    title="Pick color"
                  />
                  <input
                    value={c}
                    onChange={(e) => update(i, e.target.value)}
                    className="h-8 w-[150px] rounded border bg-background px-2 text-xs"
                    placeholder="#rrggbb or hsl(...)"
                  />
                </div>
              </div>
            ))}

            <div className="pt-2 text-xs text-muted-foreground">
              Tip: you can use CSS vars too, e.g. <code>hsl(var(--primary))</code>
            </div>
          </div>

          {/* Preview */}
          <div className="min-w-0">
            <HeatmapCalendar
              title="Custom Palette"
              data={data}
              weekStartsOn={1}
              legend={{ placement: "bottom" }}
              palette={palette}
            />
          </div>
        </div>
      </Card>

      <CodeBlock code={code} language="tsx" fileName="palette.tsx" />
    </div>
  );
}
