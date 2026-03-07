import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Databuddy } from "@databuddy/sdk/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Better Auth Studio",
  description:
    "An admin dashboard for Better Auth. Manage users, sessions, organizations, and more with an intuitive interface.",
  openGraph: {
    title: "Better Auth Studio",
    description:
      "An admin dashboard for Better Auth. Manage users, sessions, organizations, and more with an intuitive interface.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Better Auth Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
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
        {children}
        <Analytics />
        <Databuddy
          clientId="ed8e2478-4df1-4e9a-b21f-bc6872f261c9"
          trackHashChanges={true}
          trackAttributes={true}
          trackOutgoingLinks={true}
          trackInteractions={true}
        />
      </body>
    </html>
  );
}
