import React from 'react';

export const DSGrid = ({ children, cols = 1, gap = 6, className = '' }) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
  };
  
  return (
    <div 
      className={`grid ${gridCols[cols]} ${className}`}
      style={{ gap: `${gap * 8}px` }}
    >
      {children}
    </div>
  );
};

