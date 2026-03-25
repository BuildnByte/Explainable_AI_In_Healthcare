"use client";

import React from "react";
import Link from "next/link";
import { usePrediction } from "@/context/PredictionContext";
import XAIDashboard from "@/components/XAIDashboard";
import NarrativePanel from "@/components/NarrativePanel";
import RawDataToggle from "@/components/RawDataToggle";
import { ShieldAlert, Layers, ArrowLeft } from "lucide-react";

export default function ExplanationPage() {
  const { predictionData } = usePrediction();

  if (!predictionData) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-7xl h-[80vh] flex flex-col items-center justify-center">
        <div className="glass-card p-12 rounded-3xl border-dashed border-slate-700 max-w-md text-center">
          <Layers className="w-16 h-16 text-slate-700 mb-6 mx-auto" />
          <h2 className="text-2xl font-bold mb-4">No Diagnosis Found</h2>
          <p className="text-slate-500 text-lg mb-8">
            You need to complete the patient intake form to generate an explainable AI diagnosis.
          </p>
          <Link
            href="/prediction"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Go to Intake Form
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-4">Explainable AI Dashboard</h1>
          <p className="text-slate-400 flex items-center gap-2 max-w-2xl">
            <ShieldAlert className="w-5 h-5 text-emerald-500 shrink-0" />
            Analysis of the patient's individual biomarkers and the model's global logic.
          </p>
        </div>
        
        {/* Diagnosis Badge */}
        <div className="flex gap-4 self-start md:self-auto">
          <div className="glass-card px-6 py-3 rounded-2xl border-l-4 border-l-blue-500">
            <p className="text-xs text-slate-400 mb-1">Diagnosis</p>
            <h3 className="text-xl font-bold text-blue-400">{predictionData.prediction}</h3>
          </div>
          <div className="glass-card px-6 py-3 rounded-2xl border-l-4 border-l-purple-500">
            <p className="text-xs text-slate-400 mb-1">Confidence</p>
            <h3 className="text-xl font-bold text-purple-400">{predictionData.confidence.toFixed(1)}%</h3>
          </div>
        </div>
      </header>

      <div className="space-y-12">
        {/* Charts Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-slate-100 border-b border-slate-800 pb-2">Mathematical Logic Validation</h2>
          <XAIDashboard predictionData={predictionData} />
        </section>

        {/* Narrative Panel */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-slate-100 border-b border-slate-800 pb-2">Clinical Narrative Interpretation</h2>
          <NarrativePanel predictionData={predictionData} />
        </section>

        {/* Raw Data Toggle */}
        <section className="pt-6 border-t border-slate-800">
          <RawDataToggle predictionData={predictionData} />
        </section>
      </div>
    </main>
  );
}
