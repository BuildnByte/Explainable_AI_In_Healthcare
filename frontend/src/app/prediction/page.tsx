"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Stethoscope, ShieldAlert, ArrowRight, BrainCircuit } from "lucide-react";
import IntakeForm from "@/components/IntakeForm";
import { usePrediction } from "@/context/PredictionContext";

export default function PredictionPage() {
  const router = useRouter();
  const { predictionData, setPredictionData } = usePrediction();
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
      
      // Auto-navigate to explanation page on success
      setTimeout(() => {
        router.push("/explanation");
      }, 1500);

    } catch (error) {
      console.error("Diagnosis failed:", error);
      alert("Error connecting to backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <header className="mb-10 text-center animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl font-bold gradient-text mb-4">Clinical Prediction</h1>
        <p className="text-slate-400 flex justify-center items-center gap-2 max-w-lg mx-auto">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          Enter patient phenotypic data for stage probability analysis. Data remains localized.
        </p>
      </header>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Left Column - Form */}
        <div className="md:col-span-8 space-y-6">
          <section className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden border-t border-blue-500/30 shadow-[0_0_40px_-15px_rgba(59,130,246,0.2)]">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Stethoscope className="w-48 h-48" />
            </div>
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="bg-blue-500/20 p-2 rounded-xl">
                <Stethoscope className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Patient Intake</h2>
                <p className="text-sm text-slate-400">Complete all biomarker fields</p>
              </div>
            </div>
            
            <div className="relative z-10">
              <IntakeForm onSubmit={handleDiagnose} loading={loading} />
            </div>
          </section>
        </div>

        {/* Right Column - Results preview */}
        <div className="md:col-span-4 space-y-6">
          {predictionData ? (
             <div className="glass-card p-6 rounded-3xl border-t border-emerald-500/50 shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)] animate-in zoom-in duration-500 h-full flex flex-col justify-center">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                     <BrainCircuit className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-300">Diagnosis Generated</h3>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-slate-800/50 p-4 rounded-2xl flex justify-between items-center border border-slate-700">
                    <span className="text-slate-400 text-sm">Stage</span>
                    <span className="font-bold text-blue-400 text-lg">{predictionData.prediction}</span>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-2xl flex justify-between items-center border border-slate-700">
                    <span className="text-slate-400 text-sm">Confidence</span>
                    <span className="font-bold text-purple-400 text-lg">{predictionData.confidence.toFixed(1)}%</span>
                  </div>
                </div>

                <button 
                  onClick={() => router.push("/explanation")}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all mt-auto"
                >
                  View Explanation
                  <ArrowRight className="w-5 h-5" />
                </button>
             </div>
          ) : (
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center h-full min-h-[400px] rounded-3xl border-dashed border-slate-700/50">
               <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                 <ShieldAlert className="w-8 h-8 text-slate-500" />
               </div>
               <h3 className="text-lg font-medium text-slate-300 mb-2">Awaiting Data</h3>
               <p className="text-sm text-slate-500">
                 Submit the patient intake form to generate the prediction and unlock XAI features.
               </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
