import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

/**
 * Display Heading
 * Font: Outfit
 * Use for Hero sections and major impact statements.
 */
export const Display: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'h1' }) => (
  <Component className={`font-display font-bold tracking-tight leading-[1.1] ${className}`}>
    {children}
  </Component>
);

/**
 * Section Heading
 * Font: Outfit
 * Use for standard section titles.
 */
export const Heading: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'h2' }) => (
  <Component className={`font-display font-semibold tracking-normal ${className}`}>
    {children}
  </Component>
);

/**
 * Body Text
 * Font: Sora
 * High readability, slightly technical/scientific feel.
 * Default color is handled by parent or inherited, typically white or gray-300 in this theme.
 */
export const Text: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'p' }) => (
  <Component className={`font-body font-light text-gray-400 leading-relaxed ${className}`}>
    {children}
  </Component>
);

/**
 * Gradient Text
 * Applies the EVO brand gradient to text.
 */
export const GradientText: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'span' }) => (
  <Component className={`bg-clip-text text-transparent bg-evo-gradient ${className}`}>
    {children}
  </Component>
);