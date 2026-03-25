"use client";

import React from "react";
import { Loader2, PlusCircle,Activity } from "lucide-react";

const FEATURES = [
    { id: "HTT_CAG_Repeat_Length", label: "HTT CAG Repeat Length", min: 36, max: 60, step: 1, default: 40 },
    { id: "Motor_Symptoms", label: "Motor Symptoms (UHDRS)", min: 0, max: 50, step: 0.1, default: 15 },
    { id: "Cognitive_Decline", label: "Cognitive Decline Score", min: 0, max: 30, step: 0.1, default: 10 },
    { id: "Chorea_Score", label: "Chorea Score", min: 0, max: 10, step: 0.1, default: 2 },
    { id: "Brain_Volume_Loss", label: "Brain Volume Loss (%)", min: 1, max: 10, step: 0.1, default: 3 },
    { id: "Functional_Capacity", label: "Functional Capacity", min: 0, max: 15, step: 0.1, default: 10 },
    { id: "HTT_Gene_Expression_Level", label: "HTT Gene Expression", min: 1, max: 5, step: 0.1, default: 2.5 },
    { id: "Protein_Aggregation_Level", label: "Protein Aggregation", min: 0, max: 100, step: 1, default: 20 },
];

export default function IntakeForm({ onSubmit, loading }: { onSubmit: (data: any) => void, loading: boolean }) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        // Convert to numbers
        const numericData = Object.keys(data).reduce((acc: any, key) => {
            acc[key] = parseFloat(data[key] as string);
            return acc;
        }, {});
        onSubmit(numericData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FEATURES.map((feat) => (
                    <div key={feat.id} className="space-y-1.5">
                        <label htmlFor={feat.id} className="text-xs font-semibold text-slate-400 uppercase tracking-tight">
                            {feat.label}
                        </label>
                        <input
                            id={feat.id}
                            name={feat.id}
                            type="number"
                            step={feat.step}
                            min={feat.min}
                            max={feat.max}
                            defaultValue={feat.default}
                            required
                            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                ))}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-900/20 mt-6"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing Neural Analysis...</span>
                    </>
                ) : (
                    <>
                        <Activity className="w-5 h-5" />
                        <span>Generate XAI Clinical Diagnosis</span>
                    </>
                )}
            </button>
        </form>
    );
}
