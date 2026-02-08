import React from 'react';
import { IconArrowRight } from './Icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
}

/**
 * Button Component
 * 
 * Primary: The "Abundance" button. White glow, high contrast black text.
 * Outline: The "Structure" button. Gradient border.
 */
export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon = false,
  className = '',
  ...props 
}) => {
  
  const baseStyles = "relative inline-flex items-center justify-center font-display font-bold tracking-wide transition-all duration-300 overflow-hidden group";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg",
  };

  const variants = {
    primary: `
      bg-white text-brand-black 
      hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.6)]
      active:scale-[0.98]
    `,
    outline: `
      bg-transparent text-white border border-white/20
      hover:border-brand-purple hover:text-brand-purple
      hover:shadow-[0_0_20px_-5px_rgba(155,81,224,0.5)]
    `,
    ghost: `
      bg-transparent text-white/70 hover:text-white
    `
  };

  // Special "EVO" gradient border logic for a specific premium look if needed
  // For now, we stick to the clean high-contrast primary.

  return (
    <button 
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <IconArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
      </span>
    </button>
  );
};