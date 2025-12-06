import React from 'react';

const LOCATIONS = [
  { value: 'Plano', label: 'Plano' },
  { value: 'Addison', label: 'Addison' },
  { value: 'Uptown', label: 'Uptown' },
  { value: 'Irving', label: 'Irving' }
];

export function LocationToggleBar({ location, onChange, showAll = false }) {
  // For forecast endpoints, only show the 4 specific locations (no "All")
  const locationsToShow = LOCATIONS;
  
  return (
    <div
      role="radiogroup"
      aria-label="Select restaurant location"
      style={{ 
        display: 'flex', 
        gap: '12px', 
        flexWrap: 'wrap',
        alignItems: 'center'
      }}
    >
      {locationsToShow.map((loc) => (
        <button
          key={loc.value}
          type="button"
          role="radio"
          aria-checked={location === loc.value}
          className={
            "px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 " +
            (location === loc.value
              ? "bg-orange-500 text-white border-orange-500 shadow-md"
              : "bg-white text-slate-800 border-orange-200 hover:bg-orange-50 hover:border-orange-300")
          }
          style={{
            minWidth: '100px',
            padding: '10px 20px',
            whiteSpace: 'nowrap',
            display: 'inline-block'
          }}
          onClick={() => onChange(loc.value)}
        >
          {loc.label}
        </button>
      ))}
    </div>
  );
}

