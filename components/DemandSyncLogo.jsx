import React from 'react';

export const DemandSyncLogo = ({ size = 40, className = "", color = "#FF7A00" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Chip Icon with Graph */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Chip outline */}
        <rect 
          x="8" 
          y="8" 
          width="24" 
          height="24" 
          rx="2" 
          stroke={color} 
          strokeWidth="2" 
          fill="none"
        />
        
        {/* Pins - Top */}
        <rect x="17" y="4" width="6" height="4" fill={color} />
        {/* Pins - Bottom */}
        <rect x="17" y="32" width="6" height="4" fill={color} />
        {/* Pins - Left */}
        <rect x="4" y="17" width="4" height="6" fill={color} />
        {/* Pins - Right */}
        <rect x="32" y="17" width="4" height="6" fill={color} />
        
        {/* Graph lines inside chip */}
        <path 
          d="M 12 28 L 15 24 L 18 26 L 21 20 L 24 22 L 28 16" 
          stroke={color} 
          strokeWidth="2" 
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path 
          d="M 12 30 L 15 26 L 18 28 L 21 22 L 24 24 L 28 18" 
          stroke={color} 
          strokeWidth="2" 
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Arrow pointing up-right */}
        <path 
          d="M 26 14 L 30 10 M 30 10 L 28 10 M 30 10 L 30 12" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      
      {/* DEMANDSYNC Text */}
      <span 
        style={{ 
          color: color,
          fontSize: size === 40 ? '20px' : `${size * 0.5}px`,
          fontWeight: 700,
          letterSpacing: '0.5px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
        className="uppercase"
      >
        DEMANDSYNC
      </span>
    </div>
  );
};

