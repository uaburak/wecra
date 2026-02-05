import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const matter = localFont({
  src: [
    {
      path: "../public/Matter/Matter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Matter/Matter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Matter/Matter-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/Matter/Matter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/Matter/Matter-Heavy.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-matter",
});

export const metadata: Metadata = {
  title: "Wecra Digital Agency",
  description: "Wecra is a premium digital agency that elevates brands through design, strategy and precision.",
  icons: {
    icon: "/favicon.ico",
  },
};

import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import SmoothScroll from "@/components/global/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${matter.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}>
        <SmoothScroll>
          <Header />
          <main className="flex-grow pt-20 max-w-[800px] mx-auto w-full">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
