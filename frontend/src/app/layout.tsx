import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "XAI Healthcare - Huntington's Disease Diagnosis",
  description: "Decision support tool with Explainable AI for clinicians.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0c] text-slate-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
