"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, FileText, BarChart3, Info, CheckCircle } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Brain },
    { name: "Prediction", href: "/prediction", icon: FileText },
    { name: "Explanation", href: "/explanation", icon: BarChart3 },
    { name: "Conclusion", href: "/conclusion", icon: CheckCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0a0a0c]/80 border-b border-slate-800/50">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600/20 p-1.5 rounded-lg group-hover:bg-blue-600/30 transition-colors">
            <Brain className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
          </div>
          <span className="font-bold text-lg tracking-wide gradient-text">
            Neuro-Ethical Assist
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? "bg-blue-500/10 text-blue-400" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-500"}`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu could be added here, keeping it simple for now */}
        <div className="md:hidden flex items-center">
            {/* Minimal mobile indicator */}
            <div className="text-xs text-blue-400 font-medium px-3 py-1 bg-blue-500/10 rounded-full">
                {navItems.find(i => i.href === pathname)?.name || "Menu"}
            </div>
        </div>
      </div>
    </nav>
  );
}
