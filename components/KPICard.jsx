import React from 'react';

export const KPICard = ({ label, value, status = 'green', prefix = '', suffix = '', message = '', icon: Icon }) => {
  const statusColors = {
    green: {
      bg: '#dcfce7',
      border: '#86efac',
      text: '#166534',
      valueColor: '#16a34a'
    },
    yellow: {
      bg: '#fef3c7',
      border: '#fde047',
      text: '#92400e',
      valueColor: '#ca8a04'
    },
    red: {
      bg: '#fee2e2',
      border: '#fca5a5',
      text: '#991b1b',
      valueColor: '#dc2626'
    }
  };

  const colors = statusColors[status] || statusColors.green;

  return (
    <div 
      style={{ 
        background: colors.bg,
        border: `2px solid ${colors.border}`,
        borderRadius: '16px',
        padding: '20px',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ flex: 1 }}>
          <p 
            style={{ 
              fontSize: '12px', 
              color: colors.text, 
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
              background: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            <Icon size={20} style={{ color: colors.valueColor }} />
          </div>
        )}
      </div>
      <div 
        style={{ 
          fontSize: '28px', 
          fontWeight: 700, 
          color: colors.valueColor,
          marginBottom: message ? '8px' : '0'
        }}
      >
        {prefix}{typeof value === 'number' ? value.toLocaleString('en-US', { maximumFractionDigits: 1 }) : value}{suffix}
      </div>
      {message && (
        <div 
          style={{ 
            fontSize: '11px', 
            color: colors.text,
            marginTop: '4px',
            opacity: 0.8
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

