import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
      <body>{children}</body>
    </html>
  );
}
