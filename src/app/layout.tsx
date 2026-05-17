import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EmergencyFab } from "@/components/layout/EmergencyFab";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { PwaInstallPrompt } from "@/components/pwa/PwaInstallPrompt";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "H.E.A.R.T* — Maternal Cardiovascular Health",
  description:
    "Helping Every At-Risk Mother Thrive. Cardiovascular education and support for pregnant and postpartum women in California.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "H.E.A.R.T*",
  },
};

export const viewport: Viewport = {
  themeColor: "#A91D45",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className={`${inter.variable} ${display.variable} flex min-h-screen flex-col font-sans`}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pb-20 pt-16 md:pb-0">{children}</main>
          <Footer />
          <EmergencyFab />
          <MobileBottomNav />
          <PwaInstallPrompt />
        </ThemeProvider>
      </body>
    </html>
  );
}
