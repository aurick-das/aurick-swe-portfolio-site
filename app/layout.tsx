import type { Metadata } from "next";
import { env } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: env.NEXT_PUBLIC_SITE_URL
    ? new URL(env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: "Aurick | Link in Bio Portfolio",
  description:
    "A high-performance single-page portfolio with projects, social links, and a live tech stack marquee.",
  openGraph: {
    title: "Aurick Portfolio",
    description:
      "A high-performance single-page portfolio with projects, social links, and a live tech stack marquee.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurick Portfolio",
    description:
      "A high-performance single-page portfolio with projects, social links, and a live tech stack marquee."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
