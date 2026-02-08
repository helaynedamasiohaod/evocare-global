import React from 'react';
import { Text } from '../atoms/Typography';
import { IconSparkle } from '../atoms/Icons';

interface ChatBubbleProps {
  message: string;
  sender: 'ai' | 'user';
  timestamp?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender, timestamp }) => {
  const isAI = sender === 'ai';

  return (
    <div className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'} mb-6 group animate-fade-in-up`}>
      <div className={`flex max-w-[85%] ${isAI ? 'flex-row' : 'flex-row-reverse'} gap-4`}>
        
        {/* Avatar Area */}
        <div className="flex-shrink-0 mt-1">
          {isAI ? (
            <div className="w-8 h-8 rounded-full bg-evo-gradient p-[1px]">
              <div className="w-full h-full bg-brand-black rounded-full flex items-center justify-center">
                <IconSparkle size={14} className="text-white" />
              </div>
            </div>
          ) : (
             <div className="w-8 h-8 rounded-full bg-brand-surface border border-white/10 flex items-center justify-center">
                <span className="text-xs text-white/50 font-display">VO</span>
             </div>
          )}
        </div>

        {/* Message Bubble */}
        <div className={`
          relative p-4 rounded-2xl
          ${isAI 
            ? 'bg-brand-surface border border-white/5 text-white/90 rounded-tl-none' 
            : 'bg-brand-purple/10 border border-brand-purple/20 text-white rounded-tr-none'
          }
        `}>
          <Text className={`!text-sm md:!text-base whitespace-pre-wrap break-words leading-relaxed ${isAI ? '!text-gray-300' : '!text-white'}`}>
            {message}
          </Text>
          
          {/* Timestamp */}
          <div className={`mt-2 text-[10px] uppercase tracking-widest opacity-40 ${isAI ? 'text-left' : 'text-right'}`}>
            {timestamp || 'Just now'}
          </div>
        </div>
      </div>
    </div>
  );
};