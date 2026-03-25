"use client";

import React, { useState, useEffect } from "react";
import { MessageSquareText, Sparkles, Loader2, AlertCircle } from "lucide-react";

export default function NarrativePanel({ predictionData }: { predictionData: any }) {
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (predictionData) {
            handleSummarize();
        }
    }, [predictionData]);

    const handleSummarize = async () => {
        setLoading(true);
        setSummary("");
        setError(null);

        try {
            const response = await fetch("http://localhost:8000/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(predictionData),
            });

            if (!response.ok) throw new Error("Failed to reach Ollama bridge.");

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value, { stream: true });
                    setSummary((prev) => prev + chunk);
                }
            }
        } catch (err: any) {
            console.error("Summarization failed:", err);
            setError("Local LLM (Ollama) is unavailable. Please ensure Ollama is running with 'mistral' on localhost:11434.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="glass-card p-8 rounded-3xl border-l-4 border-l-green-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Sparkles className="w-32 h-32" />
            </div>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <MessageSquareText className="w-6 h-6 text-green-400" />
                    <h2 className="text-xl font-bold">Clinical Logic Summary (LLM)</h2>
                </div>

                {loading && (
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium animate-pulse">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating Narrative...
                    </div>
                )}
            </div>

            <div className="min-h-[120px] bg-slate-900/40 rounded-2xl p-6 border border-slate-800/50 leading-relaxed text-slate-300">
                {error ? (
                    <div className="flex gap-3 text-amber-400 items-start">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p className="text-sm">{error}</p>
                    </div>
                ) : summary ? (
                    <div className="whitespace-pre-wrap font-medium">
                        {summary}
                        {loading && <span className="inline-block w-2 h-4 ml-1 bg-green-500 animate-pulse" />}
                    </div>
                ) : (
                    <p className="text-slate-500 italic">Synthetic neurologist is reviewing the data...</p>
                )}
            </div>

            <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                <span className="w-1 h-1 rounded-full bg-slate-500" />
                Sourced from Local Mistral Infrastructure
                <span className="w-1 h-1 rounded-full bg-slate-500" />
                No Internet Egress
            </div>
        </section>
    );
}
