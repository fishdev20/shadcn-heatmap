import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function Hero() {
  return (
    <section className="relative">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">shadcn/ui</Badge>
          <Badge variant="secondary">Next.js</Badge>
          <Badge variant="secondary">Copy-paste Block</Badge>
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Heatmap Calendar Component
        </h1>
        <p className="max-w-2xl text-muted-foreground md:text-lg">
          GitHub-style activity heatmap built with shadcn/ui primitives. Includes live demo, source
          code, and copy-paste instructions.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild>
            <a href="#demo">Try Live Demo</a>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <a href="https://github.com/yourname/yourrepo" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
              View Source
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
