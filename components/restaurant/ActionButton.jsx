import React from "react";

export default function ActionButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-3 text-left text-sm font-medium text-slate-100 transition-colors hover:border-slate-600 hover:bg-slate-900"
    >
      {label}
    </button>
  );
}

