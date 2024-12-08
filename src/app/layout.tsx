import Providers from "@/components/providers/providers";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Gothic_A1 } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const gothic = Gothic_A1({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Discover",
  description: "Discover your new family",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${gothic.className}`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
