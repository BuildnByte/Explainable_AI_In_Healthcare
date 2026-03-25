"use client";

import React, { useState } from "react";
import {
  Activity,
  Brain,
  ChevronRight,
  Dna,
  FileText,
  Info,
  Layers,
  ShieldAlert,
  Stethoscope,
  Eye,
  EyeOff
} from "lucide-react";
import IntakeForm from "@/components/IntakeForm";
import XAIDashboard from "@/components/XAIDashboard";
import NarrativePanel from "@/components/NarrativePanel";
import RawDataToggle from "@/components/RawDataToggle";

export default function Page() {
  const [predictionData, setPredictionData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleDiagnose = async (formData: any) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setPredictionData(data);
    } catch (error) {
      console.error("Diagnosis failed:", error);
      alert("Error connecting to backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-blue-600/20 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-sm font-semibold tracking-wider text-blue-400 uppercase">Neuro-Ethical Clinical Assist</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text pb-2">
            Explainable AI in Huntington's Care
          </h1>
          <p className="text-slate-400 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            Decision Support Tool — Not a Replacement for Clinical Judgment
          </p>
        </div>

        <div className="flex gap-4">
          <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-slate-300">Local Privacy Bridge: ACTIVE</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column - Intake */}
        <div className="xl:col-span-4 space-y-6">
          <section className="glass-card p-6 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <FileText className="w-24 h-24" />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <Stethoscope className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold">Patient Intake Form</h2>
            </div>
            <IntakeForm onSubmit={handleDiagnose} loading={loading} />
          </section>

          <section className="glass-card p-6 rounded-3xl border-amber-500/20">
            <div className="flex items-center gap-3 mb-3 text-amber-400">
              <Info className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold">Ethical Protocol</h2>
            </div>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Zero data egress: All processing occurs on clinical hardware via Ollama.</span>
              </li>
              <li className="flex gap-2">
                <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Dual Validation: Global (SHAP) and Local (LIME) explanations provided.</span>
              </li>
              <li className="flex gap-2">
                <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Human-in-the-loop: Verifiable raw logic available for clinical audit.</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Right Column - XAI Dashboard */}
        <div className="xl:col-span-8 space-y-8">
          {!predictionData ? (
            <div className="h-full min-h-[600px] flex flex-col items-center justify-center glass-card rounded-3xl border-dashed border-slate-700">
              <Layers className="w-16 h-16 text-slate-700 mb-4" />
              <p className="text-slate-500 text-lg">Awaiting patient data to generate explanations...</p>
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8">
              {/* Diagnosis Badge */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 glass-card p-6 rounded-3xl border-l-4 border-l-blue-500">
                  <p className="text-sm text-slate-400 mb-1">Predicted Disease Stage</p>
                  <h3 className="text-3xl font-bold text-blue-400">{predictionData.prediction}</h3>
                </div>
                <div className="flex-1 glass-card p-6 rounded-3xl border-l-4 border-l-purple-500">
                  <p className="text-sm text-slate-400 mb-1">Confidence Score</p>
                  <h3 className="text-3xl font-bold text-purple-400">{predictionData.confidence.toFixed(1)}%</h3>
                </div>
              </div>

              {/* Charts Section */}
              <XAIDashboard predictionData={predictionData} />

              {/* Narrative Panel */}
              <NarrativePanel predictionData={predictionData} />

              {/* Raw Data Toggle */}
              <RawDataToggle predictionData={predictionData} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
