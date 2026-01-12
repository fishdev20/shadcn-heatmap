import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border">
            H
          </span>
          Heatmap Shadcn
        </Link>

        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <a href="#demo">Demo</a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a href="#docs">Docs</a>
          </Button>
          <ModeToggle />
          <Button asChild size="icon">
            <a href="https://github.com/fishdev20/shadcn-heatmap" target="_blank" rel="noreferrer">
              <Github />
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
