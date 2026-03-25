import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { PredictionProvider } from "@/context/PredictionContext";

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
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-[#0a0a0c] text-slate-50 min-h-screen flex flex-col`}>
        <PredictionProvider>
          <Navbar />
          <div className="flex-1 w-full">
            {children}
          </div>
        </PredictionProvider>
      </body>
    </html>
  );
}
