import React from 'react';
import { Heading, Text, GradientText } from '../atoms/Typography';
import { CheckItem } from '../molecules/CheckItem';

export const Methodology: React.FC = () => {
  const points = [
    "Já tentou de tudo para que seus relacionamentos dessem certo, mas até hoje não encontrou a resposta.",
    "Tem vontade de conquistar relacionamentos saudáveis e duradouros.",
    "Precisa gerenciar melhor suas emoções para fazer escolhas de forma assertiva.",
    "Quer ressignificar sentimentos, emoções e memórias de eventos passados.",
    "Sente-se preso a dores do passado e não consegue ser feliz no presente.",
    "Procura fortalecer sua autoconfiança e ampliar suas competências de liderança."
  ];

  return (
    <section className="relative py-24 bg-brand-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: The List (Structure) */}
        <div className="space-y-12">
          <Heading className="text-4xl md:text-5xl text-white">
            Esse evento é para <GradientText>você que:</GradientText>
          </Heading>
          
          <div className="space-y-2">
            {points.map((point, i) => (
              <CheckItem key={i} text={point} />
            ))}
          </div>
        </div>

        {/* Right: The Visual (Emotion) */}
        <div className="relative h-full min-h-[500px] w-full">
           {/* Collage Effect */}
           <div className="absolute top-0 right-0 w-3/4 h-3/4 overflow-hidden rounded-lg grayscale hover:grayscale-0 transition-all duration-700 ease-out z-10 border border-white/10">
              <img src="https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=2070&auto=format&fit=crop" alt="Hugging" className="object-cover w-full h-full" />
           </div>
           
           <div className="absolute bottom-0 left-0 w-2/3 h-2/3 overflow-hidden rounded-lg grayscale z-20 border border-brand-black shadow-2xl">
              <img src="https://images.unsplash.com/photo-1475721027767-f4213d505888?q=80&w=2070&auto=format&fit=crop" alt="Emotion" className="object-cover w-full h-full" />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/40 to-transparent mix-blend-overlay"></div>
           </div>

           {/* Decor Elements */}
           <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-brand-orange/50 rounded-full z-30 blur-sm"></div>
        </div>
      </div>
    </section>
  );
};