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
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A reusable <strong>React heatmap calendar</strong> built with <strong>shadcn/ui</strong>{" "}
          and <strong>Tailwind CSS</strong>. Visualize daily activity, fitness data, business
          metrics, IoT events, or learning progress with a GitHub-style heatmap.
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
