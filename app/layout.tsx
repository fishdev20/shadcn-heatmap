import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "React Heatmap Calendar",
    template: "%s | React Heatmap Calendar",
  },

  description:
    "A reusable React heatmap calendar built with shadcn/ui and Tailwind CSS. Visualize activity, fitness, business metrics, IoT events, and more.",

  keywords: [
    "react heatmap",
    "heatmap calendar",
    "shadcn heatmap",
    "tailwind heatmap",
    "github style heatmap",
    "calendar heatmap react",
  ],

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
