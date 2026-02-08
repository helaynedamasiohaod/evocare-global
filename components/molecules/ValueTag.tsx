import React from 'react';
import { Text } from '../atoms/Typography';

interface ValueTagProps {
  label: string;
}

export const ValueTag: React.FC<ValueTagProps> = ({ label }) => {
  return (
    <div className="group relative">
      {/* Gradient Border Trick */}
      <div className="absolute -inset-0.5 bg-evo-gradient opacity-30 blur-sm transition duration-500 group-hover:opacity-100 rounded-full"></div>
      <div className="relative flex items-center bg-brand-surface px-6 py-2 rounded-full border border-white/10">
        <Text className="!text-white font-medium text-sm tracking-wide uppercase">
          {label}
        </Text>
      </div>
    </div>
  );
};