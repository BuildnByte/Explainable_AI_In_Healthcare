"use client";

import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend
} from "recharts";
import { ShieldAlert, Info } from "lucide-react";

export default function XAIDashboard({ predictionData }: { predictionData: any }) {
    // Format SHAP data
    const shapData = Object.entries(predictionData.shap).map(([name, value]) => ({
        name: name.replace(/_/g, " "),
        value: Math.abs(value as number),
        original: value,
        status: (value as number) > 0 ? "Positive Impact" : "Negative Impact"
    })).sort((a, b) => b.value - a.value);

    // Format LIME data
    const limeData = Object.entries(predictionData.lime).map(([name, value]) => ({
        name: name.replace(/_/g, " "),
        value: value as number,
        status: (value as number) > 0 ? "Stage Advancement" : "Stage Retardation"
    })).sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

    // Consistency Check
    const topShap = shapData[0]?.name;
    const topLime = limeData[0]?.name;
    const isConsistent = topShap === topLime;

    return (
        <div className="space-y-8">
            {/* Dynamic Ethical Warning */}
            {!isConsistent && (
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex gap-4 items-center">
                    <ShieldAlert className="w-10 h-10 text-amber-500 shrink-0" />
                    <div>
                        <h4 className="text-amber-500 font-bold">XAI Consistency Warning</h4>
                        <p className="text-sm text-slate-300">
                            The global model (SHAP) and local instance (LIME) disagree on the primary driver for this patient.
                            SHAP suggests <span className="font-bold underline">{topShap}</span> while LIME suggests <span className="font-bold underline">{topLime}</span>.
                            Please exercise higher clinical skepticism.
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* SHAP Chart */}
                <div className="glass-card p-6 rounded-3xl">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <span className="w-2 h-6 bg-blue-500 rounded-full" />
                            Global Feature Importance (SHAP)
                        </h3>
                        <div className="group relative">
                            <Info className="w-4 h-4 text-slate-500 cursor-help" />
                            <div className="absolute right-0 bottom-full mb-2 w-64 p-3 bg-slate-800 rounded-xl text-xs text-slate-300 invisible group-hover:visible shadow-2xl z-50">
                                SHAP values show how much each clinical parameter contributed to the model's overall logic for this decision.
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={shapData} layout="vertical" margin={{ left: 40, right: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={120} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "12px" }}
                                    itemStyle={{ color: "#f8fafc" }}
                                />
                                <Bar dataKey="value" name="Relative Weight" radius={[0, 4, 4, 0]}>
                                    {shapData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.original as number > 0 ? "#3b82f6" : "#f43f5e"} fillOpacity={0.8} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* LIME Chart */}
                <div className="glass-card p-6 rounded-3xl">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <span className="w-2 h-6 bg-purple-500 rounded-full" />
                            Local Instance Logic (LIME)
                        </h3>
                        <div className="group relative">
                            <Info className="w-4 h-4 text-slate-500 cursor-help" />
                            <div className="absolute right-0 bottom-full mb-2 w-64 p-3 bg-slate-800 rounded-xl text-xs text-slate-300 invisible group-hover:visible shadow-2xl z-50">
                                LIME explains how the model behaved specifically for this patient's unique biological combination.
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={limeData} layout="vertical" margin={{ left: 40, right: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={120} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "12px" }}
                                />
                                <Bar dataKey="value" name="Contribution" radius={[0, 4, 4, 0]}>
                                    {limeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.value > 0 ? "#a855f7" : "#14b8a6"} fillOpacity={0.8} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
