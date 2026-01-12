"use client";

import { Copy } from "lucide-react";
import * as React from "react";

import { HeatmapCalendar } from "@/components/heatmap-calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 5 buckets: 0..4 (empty -> max)
// Colors are picked to look good on both light/dark.
// You can tweak anytime.
type HeatmapPreset = {
  name: "Blue" | "Green" | "Default" | "Orange" | "Red" | "Rose" | "Violet" | "Yellow";
  key: string;
  light: [string, string, string, string, string];
  dark: [string, string, string, string, string];
};

const PRESETS: HeatmapPreset[] = [
  {
    name: "Blue",
    key: "blue",
    light: ["#e5e7eb", "#dbeafe", "#93c5fd", "#3b82f6", "#1d4ed8"],
    dark: ["#262626", "#0b1220", "#1e3a8a", "#2563eb", "#93c5fd"],
  },
  {
    name: "Green",
    key: "green",
    light: ["#e5e7eb", "#dcfce7", "#86efac", "#22c55e", "#166534"],
    dark: ["#262626", "#052e16", "#14532d", "#22c55e", "#86efac"],
  },
  {
    name: "Default",
    key: "default",
    light: ["#e5e7eb", "#d1fae5", "#86efac", "#22c55e", "#166534"],
    dark: ["#262626", "#052e16", "#14532d", "#22c55e", "#86efac"],
  },
  {
    name: "Orange",
    key: "orange",
    light: ["#e5e7eb", "#ffedd5", "#fdba74", "#f97316", "#9a3412"],
    dark: ["#262626", "#2b1305", "#7c2d12", "#f97316", "#fdba74"],
  },
  {
    name: "Red",
    key: "red",
    light: ["#e5e7eb", "#fee2e2", "#fca5a5", "#ef4444", "#991b1b"],
    dark: ["#262626", "#2b0b0b", "#7f1d1d", "#ef4444", "#fca5a5"],
  },
  {
    name: "Rose",
    key: "rose",
    light: ["#e5e7eb", "#ffe4e6", "#fda4af", "#f43f5e", "#9f1239"],
    dark: ["#262626", "#2b0b16", "#881337", "#f43f5e", "#fda4af"],
  },
  {
    name: "Violet",
    key: "violet",
    light: ["#e5e7eb", "#ede9fe", "#c4b5fd", "#8b5cf6", "#5b21b6"],
    dark: ["#262626", "#130b2b", "#4c1d95", "#8b5cf6", "#c4b5fd"],
  },
  {
    name: "Yellow",
    key: "yellow",
    light: ["#e5e7eb", "#fef9c3", "#fde047", "#f59e0b", "#92400e"],
    dark: ["#262626", "#241a04", "#78350f", "#f59e0b", "#fde047"],
  },
];

// generate stable demo data (no Math.random)
function makeDemoData(days = 365) {
  return Array.from({ length: days }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const value = i % 7 === 0 ? 0 : i % 13;
    return { date: key, value };
  });
}

function cssForPreset(p: HeatmapPreset) {
  // We expose variables hm-0..hm-4 so you can reuse them anywhere.
  // Put this into globals.css (or component-scoped if you want).
  return `:root {
  --hm-0: ${p.light[0]};
  --hm-1: ${p.light[1]};
  --hm-2: ${p.light[2]};
  --hm-3: ${p.light[3]};
  --hm-4: ${p.light[4]};
}

.dark {
  --hm-0: ${p.dark[0]};
  --hm-1: ${p.dark[1]};
  --hm-2: ${p.dark[2]};
  --hm-3: ${p.dark[3]};
  --hm-4: ${p.dark[4]};
}`;
}

export function HeatmapThemePresets() {
  const data = React.useMemo(() => makeDemoData(365), []);
  const [activeKey, setActiveKey] = React.useState<string>("default");
  const [copied, setCopied] = React.useState(false);

  const preset = React.useMemo(
    () => PRESETS.find((p) => p.key === activeKey) ?? PRESETS[2],
    [activeKey],
  );

  // apply theme via CSS variables on a wrapper (like shadcn themes page)
  const wrapperStyle = React.useMemo(() => {
    return {
      ["--hm-0" as any]: preset.light[0],
      ["--hm-1" as any]: preset.light[1],
      ["--hm-2" as any]: preset.light[2],
      ["--hm-3" as any]: preset.light[3],
      ["--hm-4" as any]: preset.light[4],
      // NOTE: this wrapper sets light palette; dark palette comes from .dark on <html>.
      // If you want per-wrapper dark palette too, we can do that, but this matches shadcn approach.
    } as React.CSSProperties;
  }, [preset]);

  const palette = React.useMemo(
    () => ["var(--hm-0)", "var(--hm-1)", "var(--hm-2)", "var(--hm-3)", "var(--hm-4)"],
    [],
  );

  async function onCopy() {
    await navigator.clipboard.writeText(cssForPreset(preset));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="space-y-4">
      {/* Top bar: theme tabs + copy button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4">
          {PRESETS.map((p) => {
            const active = p.key === activeKey;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setActiveKey(p.key)}
                className={cn(
                  "text-sm text-muted-foreground hover:text-foreground transition-colors",
                  active && "text-foreground",
                )}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        <Button variant="secondary" size="sm" onClick={onCopy} className="gap-2">
          <Copy className="h-4 w-4" />
          {copied ? "Copied" : "Copy Code"}
        </Button>
      </div>

      {/* Preview area */}
      <div style={wrapperStyle}>
        <HeatmapCalendar
          title={`Heatmap (${preset.name})`}
          data={data}
          weekStartsOn={1}
          legend={{ placement: "bottom" }}
          palette={palette}
        />
      </div>
    </div>
  );
}
