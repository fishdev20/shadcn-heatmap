"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as React from "react";

export function CodeBlock({
  code,
  language = "tsx",
  fileName,
}: {
  code: string;
  language?: string;
  fileName?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  async function onCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="relative overflow-hidden rounded-xl border bg-muted/30">
      <div className="flex items-center justify-between border-b bg-background px-3 py-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {fileName ? <span className="font-medium text-foreground">{fileName}</span> : null}
          <span>{language}</span>
        </div>
        <Button size="sm" variant="secondary" onClick={onCopy}>
          {copied ? "Copied" : "Copy code"}
        </Button>
      </div>

      <ScrollArea className="h-[360px]">
        <pre className="p-4 text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
      </ScrollArea>
    </div>
  );
}
