import React from 'react';
import { Display, Text, GradientText } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { CONTENT, BRAND_ASSETS } from '../../constants';
import { IconCalendar, IconMapPin } from '../atoms/Icons';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Layer - Polarity: Visceral Emotion (B&W) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544531696-2d226d97c55c?q=80&w=2070&auto=format&fit=crop" 
          alt="Emotional Crowd" 
          className="w-full h-full object-cover grayscale opacity-40 mix-blend-screen"
        />
        {/* Gradient Overlay for Fade to Black */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/60 to-transparent" />
      </div>

      {/* Content Layer - Polarity: Structure & Method */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-20">
        
        {/* Brand Logo Area */}
        <div className="mb-12 animate-fade-in-up">
           <img src={BRAND_ASSETS.logo} alt="IME EVO Logo" className="h-16 md:h-20 object-contain" />
        </div>

        <div className="max-w-4xl space-y-8">
          <Display className="text-5xl md:text-7xl lg:text-8xl text-white">
            Supere suas <span className="text-white/50">limitações</span> e alcance os <GradientText>resultados</GradientText> que você merece.
          </Display>
          
          <Text className="text-xl md:text-2xl max-w-2xl !text-gray-400">
            A imersão presencial que já transformou a história de milhares de pessoas está de volta.
          </Text>

          {/* Logistics Data (Atoms) */}
          <div className="flex flex-col md:flex-row gap-6 md:items-center pt-4 text-white/80 font-body">
            <div className="flex items-center gap-3">
               <IconCalendar className="text-brand-purple" />
               <span className="text-lg">{CONTENT.date}</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-3">
               <IconMapPin className="text-brand-orange" />
               <span className="text-lg">{CONTENT.location}</span>
            </div>
          </div>

          <div className="pt-8">
            <Button size="lg" icon>
              {CONTENT.cta}
            </Button>
          </div>
        </div>
      </div>

      {/* Aesthetic Decor: The Infinite Loop Hint */}
      <div className="absolute -right-20 top-1/4 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute -left-20 bottom-0 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
    </section>
  );
};