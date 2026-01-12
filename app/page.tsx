import { DemoSection } from "@/components/demo-section";
import { Hero } from "@/components/hero";
import { InstallSection } from "@/components/install-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import Script from "next/script";

export const metadata = {
  title: "React Heatmap Calendar (shadcn UI)",
  description:
    "Copy-paste React heatmap calendar with axis labels, themes, and tooltips. Built for shadcn UI and Tailwind CSS.",
};

export default function HomePage() {
  return (
    <>
      <StructuredData />
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
    </>
  );
}

export function StructuredData() {
  return (
    <Script
      id="heatmap-ld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Heatmap Calendar",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
          description:
            "A reusable React heatmap calendar component built with shadcn/ui and Tailwind CSS.",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }),
      }}
    />
  );
}
