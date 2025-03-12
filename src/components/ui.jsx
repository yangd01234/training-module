import React from 'react';

export const UIButton = ({ children, onClick, disabled, highlighted, className = '' }) => (
  <button 
    className={`px-2 py-1 text-black bg-gray-300 border-t border-l border-gray-100 border-r border-b border-gray-800 active:border-t active:border-l active:border-gray-800 active:border-r active:border-b active:border-gray-100 active:translate-y-px ${highlighted ? 'ring-1 ring-blue-700' : ''} ${className} ${disabled ? 'opacity-50' : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export const UIPanel = ({ children, className = '' }) => (
  <div className={`bg-gray-100 border-t border-l border-gray-100 border-r border-b border-gray-800 p-1 ${className}`}>
    {children}
  </div>
);

export const UIWindow = ({ children, className = '' }) => (
  <div className={`border border-gray-800 border-b-gray-100 border-r-gray-100 ${className}`}>
    {children}
  </div>
);
