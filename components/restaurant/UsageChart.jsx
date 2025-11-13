import React from "react";

export default function UsageChart({ data = [], title }) {
  const maxValue = Math.max(...data.map(d => d.value), 0);

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
      <h3 className="mb-4 text-sm font-medium text-slate-200">{title}</h3>
      <div className="space-y-3">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-slate-300">{item.name}</span>
              <span className="text-slate-400">{item.value} units</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-slate-500 transition-all"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

