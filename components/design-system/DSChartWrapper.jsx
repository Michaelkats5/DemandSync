import React from 'react';

export const DSChartWrapper = ({ children, title, className = '' }) => {
  return (
    <div 
      className={`bg-white rounded-2xl p-6 shadow-md border border-orange-100 ${className}`}
      style={{ 
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        padding: '24px'
      }}
    >
      {title && (
        <h3 
          className="mb-4"
          style={{ 
            fontSize: '18px', 
            fontWeight: 600, 
            color: '#FF7A00',
            marginBottom: '16px'
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

