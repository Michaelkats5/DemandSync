import React from 'react';

export const DSButtonPrimary = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-5 py-2.5 rounded-lg font-medium text-white transition-all ${className}`}
      style={{
        background: '#FF7A00',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 500,
        cursor: 'pointer',
        border: 'none',
      }}
      onMouseEnter={(e) => e.target.style.background = '#ea580c'}
      onMouseLeave={(e) => e.target.style.background = '#FF7A00'}
      {...props}
    >
      {children}
    </button>
  );
};

export const DSButtonSecondary = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-5 py-2.5 rounded-lg font-medium transition-all ${className}`}
      style={{
        background: 'white',
        color: '#FF7A00',
        border: '1px solid #FF7A00',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 500,
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.target.style.background = '#FFF3E8';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'white';
      }}
      {...props}
    >
      {children}
    </button>
  );
};

