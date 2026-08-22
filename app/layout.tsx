import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/ui/SplashScreen";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "Academei - أكاديمي",
  description: "المنصة التعليمية الرائدة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
