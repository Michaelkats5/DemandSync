import React from "react";

export default function InventoryChart({ data = [] }) {
  const maxValue = Math.max(...data.map(d => d.par), 0);

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
      <h3 className="mb-4 text-sm font-medium text-slate-200">Inventory vs Par Levels</h3>
      <div className="space-y-4">
        {data.map((item, idx) => {
          const stockPercent = (item.stock / item.par) * 100;
          const barColor = stockPercent < 80 ? "bg-red-500" : stockPercent < 95 ? "bg-amber-500" : "bg-green-500";
          
          return (
            <div key={idx}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-slate-300">{item.name}</span>
                <span className="text-slate-400">{item.stock} / {item.par}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full ${barColor} transition-all`}
                  style={{ width: `${Math.min(stockPercent, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

