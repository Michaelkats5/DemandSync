import React from 'react';

export const DSCard = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white rounded-2xl p-6 shadow-md border border-orange-100 ${className}`}
      style={{ 
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(255, 122, 0, 0.1)',
        border: '1px solid rgba(255, 122, 0, 0.08)',
        ...props.style 
      }}
      {...props}
    >
      {children}
    </div>
  );
};

