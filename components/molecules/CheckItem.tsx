import React from 'react';
import { Text } from '../atoms/Typography';
import { IconCheck } from '../atoms/Icons';

interface CheckItemProps {
  text: string;
}

export const CheckItem: React.FC<CheckItemProps> = ({ text }) => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl transition-colors hover:bg-white/5 border border-transparent hover:border-white/5">
      <div className="flex-shrink-0 mt-1">
        <div className="w-6 h-6 rounded bg-brand-teal/20 flex items-center justify-center text-brand-teal">
          <IconCheck size={14} strokeWidth="20" />
        </div>
      </div>
      <Text className="text-gray-300 text-lg">
        {text}
      </Text>
    </div>
  );
};