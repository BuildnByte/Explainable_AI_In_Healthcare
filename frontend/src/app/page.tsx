import React from "react";
import Link from "next/link";
import { Brain, ShieldAlert, ArrowRight, Dna, Activity, Lock } from "lucide-react";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-7xl space-y-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-12 animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-medium text-blue-400 tracking-wider uppercase">Neuro-Ethical Clinical Assist</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Explainable AI in <br />
          <span className="gradient-text">Huntington's Care</span>
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          A secure, precise, and transparent decision-support bridge for clinicians. Combining global predictability with local privacy using on-device inference.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link 
            href="/prediction"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-[0_0_30px_-5px_#3b82f6] hover:shadow-[0_0_40px_-5px_#3b82f6]"
          >
            Start Diagnosis
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/conclusion"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-8 py-3.5 rounded-full font-semibold transition-all border border-slate-700 hover:border-slate-600"
          >
            Read Ethical Protocol
          </Link>
        </div>
      </section>

      {/* Feature Insights */}
      <section className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        
        <div className="glass-card p-8 rounded-3xl hover:border-blue-500/30 transition-colors group">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Lock className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-100">Zero Data Egress</h3>
          <p className="text-slate-400 leading-relaxed">
            All qualitative interpretation runs locally using Ollama. Protected health information never leaves the clinical hardware network.
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl hover:border-purple-500/30 transition-colors group">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Activity className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-100">Dual Validation</h3>
          <p className="text-slate-400 leading-relaxed">
            Unifying global SHAP interpretations with local LIME instances ensures high-fidelity transparency before any clinical recommendation is supported.
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl hover:border-emerald-500/30 transition-colors group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <ShieldAlert className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-100">Human-in-the-Loop</h3>
          <p className="text-slate-400 leading-relaxed">
            Directly verifiable abstract mathematical logic is converted into actionable, natural language rationales for clinical audition and safety.
          </p>
        </div>

      </section>

      {/* Impact Stat */}
      <section className="glass-card p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        
        <Dna className="w-16 h-16 text-blue-400 mb-6 relative z-10" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10 max-w-3xl">
          Bridging the gap between predictive accuracy and ethical interpretability.
        </h2>
        <p className="text-slate-400 max-w-2xl relative z-10 text-lg">
          Our platform translates complex multi-modal neurodegenerative indicators into clear, stage-based risk assessments ensuring you remain the ultimate decision maker.
        </p>
      </section>
    </main>
  );
}
