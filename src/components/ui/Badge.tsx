import React from 'react';

interface BadgeProps {
  type: 'Spark' | 'Catalyst' | 'Guardian';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = ({ type, size = 'md' }: BadgeProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const assetPath = `/assets/badge-${type.toLowerCase()}.svg`;

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-slate-50 p-1 border border-slate-100 shadow-sm`}>
      <img src={assetPath} alt={`${type} Badge`} className="w-full h-full object-contain" />
    </div>
  );
};