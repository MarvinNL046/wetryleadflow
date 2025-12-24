import type { Metadata } from "next";
import { Suspense } from "react";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { ThemeProvider } from "next-themes";
import { stackClientApp } from "../stack/client";
import { Geist, Geist_Mono } from "next/font/google";
import { ImpersonationBanner } from "@/components/admin/impersonation-banner";
import { NavigationProgress } from "@/components/navigation-progress";
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
  title: "LeadFlow",
  description: "AI-powered lead generation platform",
};

// Custom Stack Auth theme matching LeadFlow branding
const stackTheme = {
  light: {
    primary: "hsl(271, 91%, 65%)", // Purple
    primaryForeground: "hsl(0, 0%, 100%)",
    secondary: "hsl(240, 5%, 96%)",
    secondaryForeground: "hsl(240, 6%, 10%)",
    background: "hsl(0, 0%, 100%)",
    foreground: "hsl(240, 10%, 4%)",
    card: "hsl(0, 0%, 100%)",
    cardForeground: "hsl(240, 10%, 4%)",
    border: "hsl(240, 6%, 90%)",
    input: "hsl(240, 6%, 90%)",
    ring: "hsl(271, 91%, 65%)",
    muted: "hsl(240, 5%, 96%)",
    mutedForeground: "hsl(240, 4%, 46%)",
  },
  dark: {
    primary: "hsl(271, 91%, 65%)", // Purple
    primaryForeground: "hsl(0, 0%, 100%)",
    secondary: "hsl(240, 4%, 16%)",
    secondaryForeground: "hsl(0, 0%, 98%)",
    background: "hsl(240, 10%, 4%)",
    foreground: "hsl(0, 0%, 98%)",
    card: "hsl(240, 6%, 10%)",
    cardForeground: "hsl(0, 0%, 98%)",
    border: "hsl(240, 4%, 16%)",
    input: "hsl(240, 4%, 16%)",
    ring: "hsl(271, 91%, 65%)",
    muted: "hsl(240, 4%, 16%)",
    mutedForeground: "hsl(240, 5%, 65%)",
  },
  radius: "0.5rem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StackProvider app={stackClientApp}>
            <StackTheme theme={stackTheme}>
              <Suspense fallback={null}>
                <NavigationProgress />
              </Suspense>
              {children}
              <ImpersonationBanner />
            </StackTheme>
          </StackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
