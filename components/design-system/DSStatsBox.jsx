import React from 'react';

export const DSStatsBox = ({ label, value, change, icon: Icon, prefix = '', suffix = '', className = '' }) => {
  const isPositive = change >= 0;
  
  return (
    <div 
      className={`bg-white rounded-2xl p-5 shadow-md border border-orange-100 ${className}`}
      style={{ 
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        padding: '20px'
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p 
            style={{ 
              fontSize: '12px', 
              color: '#6b7280', 
              textTransform: 'uppercase', 
              marginBottom: '8px',
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}
          >
            {label}
          </p>
        </div>
        {Icon && (
          <div 
            style={{ 
              padding: '8px', 
              borderRadius: '8px', 
              background: '#fff7ed'
            }}
          >
            <Icon size={20} style={{ color: '#FF7A00' }} />
          </div>
        )}
      </div>
      <div 
          style={{ 
            fontSize: '24px', 
            fontWeight: 600, 
            color: '#FF7A00',
            marginBottom: '8px'
          }}
      >
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </div>
      {change !== undefined && (
        <div 
          style={{ 
            fontSize: '12px', 
            fontWeight: 500,
            color: isPositive ? '#22c55e' : '#ef4444',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
        </div>
      )}
    </div>
  );
};

