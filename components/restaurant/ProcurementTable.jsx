import React from "react";

export default function ProcurementTable({ rows = [] }) {
  const getUrgencyStyle = (urgency) => {
    switch (urgency) {
      case "High":
        return "bg-red-500/20 text-red-200";
      case "Medium":
        return "bg-amber-500/20 text-amber-200";
      default:
        return "bg-green-500/20 text-green-200";
    }
  };

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Item</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Quantity</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Vendor</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Unit Cost</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Total Cost</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Urgency</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">ETA</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-slate-800/50 last:border-0">
              <td className="px-4 py-3 text-sm text-slate-200">{row.item}</td>
              <td className="px-4 py-3 text-sm text-slate-300">{row.qty}</td>
              <td className="px-4 py-3 text-sm text-slate-300">{row.vendor}</td>
              <td className="px-4 py-3 text-sm text-slate-300">${row.unitCost.toFixed(2)}</td>
              <td className="px-4 py-3 text-sm text-slate-200 font-medium">${(row.qty * row.unitCost).toFixed(2)}</td>
              <td className="px-4 py-3">
                <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${getUrgencyStyle(row.urgency)}`}>
                  {row.urgency}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-slate-300">{row.etaDays} days</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

