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
  title: "KStudy — AI Study Assistant for Students",
  description:
    "KStudy gives every student a personal AI agent to help with assignments, research, writing, scheduling, and more — all for just $2/month.",
  keywords: ["AI study assistant", "student AI", "homework help", "KStudy"],
  openGraph: {
    title: "KStudy — AI Study Assistant",
    description: "Your personal AI agent. Assignments, research, writing & more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
