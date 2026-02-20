import React from 'react';

interface ProgressProps {
  value: number; // 0 to 100
  color?: string;
}

export const ProgressBar = ({ value, color = 'bg-blue-600' }: ProgressProps) => {
  return (
    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-1000 ease-out`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};