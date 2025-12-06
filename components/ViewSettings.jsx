import React, { useState } from 'react';
import { Settings } from 'lucide-react';

export function ViewSettings({ onCompactChange, compact = false }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-200 bg-white text-slate-800 hover:bg-orange-50 transition-colors"
        aria-label="View settings"
      >
        <Settings size={18} style={{ color: '#FF7A00' }} />
        <span className="text-sm font-medium">View Settings</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div
            className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg border border-orange-100 p-6 z-20"
            style={{
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(255, 122, 0, 0.15)'
            }}
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              View Settings
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-sm cursor-pointer group">
                <input
                  type="checkbox"
                  checked={compact}
                  onChange={(e) => {
                    onCompactChange?.(e.target.checked);
                  }}
                  className="w-4 h-4 text-orange-500 border-orange-300 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
                  aria-label="Enable compact line height"
                />
                <span className="text-slate-700 group-hover:text-slate-900">
                  Enable compact line height for a more condensed view
                </span>
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

