import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#080c15",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Rahul Prajapati | IT Infrastructure Coordinator & MIS Operations Specialist",
  description:
    "Professional portfolio of Rahul Prajapati — IT Infrastructure Coordinator at Advantmed India LLP with deep expertise in Vendor Management, Advanced Excel, MIS Reporting, PMO Operations, and AI-enabled productivity.",
  keywords: [
    "Rahul Prajapati",
    "IT Infrastructure Coordinator",
    "Data & MIS Specialist",
    "Advanced Excel",
    "Advantmed India LLP",
    "Vendor Management",
    "PMO Operations",
    "Prompt Engineering",
    "Microsoft Copilot",
    "Ahmedabad IT Professional",
    "Operations Lead"
  ],
  authors: [{ name: "Rahul Prajapati" }],
  openGraph: {
    title: "Rahul Prajapati | IT Infrastructure Coordinator & MIS Specialist",
    description:
      "IT Infrastructure Coordinator with 7+ years cross-functional experience across IT operations, MIS reporting, PMO processes, and AI productivity tools.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
