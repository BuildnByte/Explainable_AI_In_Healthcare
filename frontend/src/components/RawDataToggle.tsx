"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Database, FileCode } from "lucide-react";

export default function RawDataToggle({ predictionData }: { predictionData: any }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="glass-card rounded-3xl overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 hover:bg-slate-800/30 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-slate-400" />
                    <h2 className="text-lg font-bold text-slate-300">Raw XAI Logic Trace</h2>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
            </button>

            {isOpen && (
                <div className="p-6 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                                <FileCode className="w-3 h-3" /> SHAP Coefficients
                            </label>
                            <pre className="text-[10px] bg-black/50 p-4 rounded-xl border border-slate-800 overflow-x-auto text-blue-300">
                                {JSON.stringify(predictionData.shap, null, 2)}
                            </pre>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                                <FileCode className="w-3 h-3" /> LIME Local Weights
                            </label>
                            <pre className="text-[10px] bg-black/50 p-4 rounded-xl border border-slate-800 overflow-x-auto text-purple-300">
                                {JSON.stringify(predictionData.lime, null, 2)}
                            </pre>
                        </div>
                    </div>
                    <p className="mt-4 text-[11px] text-slate-500 italic">
                        This raw data is provided for full auditability and verification of the clinical narrative summary.
                    </p>
                </div>
            )}
        </section>
    );
}
