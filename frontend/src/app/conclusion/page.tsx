import React from "react";
import { CheckCircle2, ShieldAlert, Cpu, Lock } from "lucide-react";

export default function ConclusionPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-6">Ethical Protocol & Conclusion</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Summarizing the core ethos, validation methodology, and the ultimate clinical objective of the Neuro-Ethical Clinical Assist project.
        </p>
      </header>

      <section className="glass-card p-10 rounded-3xl border-t-2 border-slate-700">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <CheckCircle2 className="w-8 h-8 text-blue-500" />
          Project Conclusion
        </h2>
        <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
          <p>
            The integration of Explainable Artificial Intelligence (XAI) in the diagnostic pathway of neurodegenerative diseases, such as Huntington's, represents a critical step forward from the "black-box" models of the past. 
          </p>
          <p>
            By bridging advanced high-accuracy predictive capabilities with rigorous interpretability, this project empowers clinicians rather than replacing them. The dual-validation approach using SHAP and LIME ensures both a global understanding of the algorithm's learned logic and a granular audit of individual local patient inferences.
          </p>
          <p>
            Furthermore, translating complex mathematical weights into natural language using privacy-preserving local LLMs (Ollama) effectively bridges the technical gap, converting abstract math into a verifiable clinical second-opinion. 
          </p>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="glass-card p-8 rounded-3xl bg-amber-500/5 hover:border-amber-500/30 transition-colors">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-amber-500">
            <ShieldAlert className="w-6 h-6" />
            Decision Support limitations
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            This tool is designed strictly as an assistive bridge. Predictive analytics, regardless of transparent explainability, must always be synthesized with holistic physiological examinations, family history analysis, and clinical intuition. The model augments, but never supersedes, the primary physician.
          </p>
        </section>

        <section className="glass-card p-8 rounded-3xl bg-blue-500/5 hover:border-blue-500/30 transition-colors">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-500">
            <Lock className="w-6 h-6" />
            Privacy Architecture
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Patient phenotypic biomarkers and narrative interpretations are isolated locally. The utilization of on-device inference via Ollama completely eliminates data egress to third-party cloud APIs, adhering inherently to HIPAA and overarching global data protection schemas.
          </p>
        </section>
      </div>

      <section className="glass-card p-10 rounded-3xl text-center bg-gradient-to-t from-slate-900 to-slate-800">
        <Cpu className="w-12 h-12 text-slate-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-slate-200 mb-4">The Future of Ethical AI</h3>
        <p className="text-slate-400 max-w-xl mx-auto">
          Verifiability, Local Privacy, and Interpreter Bridging—the modern paradigm for deploying Machine Learning in high-stakes medical sectors.
        </p>
      </section>
    </main>
  );
}
