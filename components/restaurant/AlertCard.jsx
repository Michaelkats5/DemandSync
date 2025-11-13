import React from "react";

export default function AlertCard({ severity, title, detail }) {
  const severityStyles = {
    high: "bg-red-500/10 border-red-500/30 text-red-200",
    medium: "bg-amber-500/10 border-amber-500/30 text-amber-200",
    low: "bg-blue-500/10 border-blue-500/30 text-blue-200"
  };

  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${severityStyles[severity]}`}>
      <p className="font-medium">{title}</p>
      {detail && <p className="mt-1 text-xs opacity-80">{detail}</p>}
    </div>
  );
}

