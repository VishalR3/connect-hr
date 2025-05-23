import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Container from "./container";
import { Providers } from "./providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connect HR",
  description: "Time Management and Payroll",
};

export default function RootLayout({
  children,
  appBar,
}: Readonly<{
  children: React.ReactNode;
  appBar: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Container appBar={appBar}>{children}</Container>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
