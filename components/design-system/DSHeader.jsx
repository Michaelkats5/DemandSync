import React from 'react';
import { Link } from 'react-router-dom';
import { DemandSyncLogo } from '../DemandSyncLogo';

export const DSHeader = ({ title, subtitle, backLink = "/", className = "" }) => {
  return (
    <div 
      className={`text-white p-6 rounded-2xl mb-6 ${className}`}
      style={{ 
        background: 'linear-gradient(135deg, #FF7A00, #ea580c)',
        borderRadius: '24px',
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'relative'
      }}
    >
      <div style={{ flex: 1 }}>
        {backLink && (
          <Link 
            to={backLink} 
            style={{ 
              color: "white", 
              textDecoration: "none", 
              fontSize: 14, 
              marginBottom: 16, 
              display: "block" 
            }}
          >
            ← Back to Dashboard
          </Link>
        )}
        <h1 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>{title}</h1>
        {subtitle && (
          <p style={{ fontSize: '14px', opacity: 0.9 }}>{subtitle}</p>
        )}
      </div>
      <div style={{ marginLeft: '24px', flexShrink: 0 }}>
        <DemandSyncLogo size={64} color="#FFFFFF" />
      </div>
    </div>
  );
};

