import React from 'react';
import { DSHeader } from './DSHeader';

export const DSPageLayout = ({ 
  title, 
  subtitle, 
  backLink = "/", 
  children, 
  maxWidth = "1400px",
  className = "" 
}) => {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
        body { 
          background: #FFF3E8 !important;
          padding: 24px; 
          color: #444444; 
          min-height: 100vh;
        }
        .ds-page-container { 
          max-width: ${maxWidth}; 
          margin: 0 auto; 
        }
      `}</style>
      
      <div className={`ds-page-container ${className}`}>
        <DSHeader title={title} subtitle={subtitle} backLink={backLink} />
        {children}
      </div>
    </>
  );
};

