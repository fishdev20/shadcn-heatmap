export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-8 text-sm text-muted-foreground md:px-6">
        <div>© {new Date().getFullYear()} Heatmap Calendar</div>
        <div className="flex items-center gap-4">
          <a
            className="hover:text-foreground"
            href="https://github.com/fishdev20/shadcn-heatmap"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a className="hover:text-foreground" href="#demo">
            Demo
          </a>
          <a className="hover:text-foreground" href="#docs">
            Docs
          </a>
        </div>
      </div>
    </footer>
  );
}
