import { DemoSection } from "@/components/demo-section";
import { Hero } from "@/components/hero";
import { InstallSection } from "@/components/install-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 md:px-6">
        <Hero />
        <div className="mt-12 space-y-12">
          <DemoSection />
          <InstallSection />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
