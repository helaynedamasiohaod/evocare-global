import React from 'react';
import { CONTENT } from '../../constants';
import { ValueTag } from '../molecules/ValueTag';
import { Heading, Text } from '../atoms/Typography';

export const ValuesGrid: React.FC = () => {
  return (
    <section className="py-24 border-t border-white/5 bg-brand-depth">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <div className="mb-16 max-w-2xl mx-auto">
          <Text className="uppercase tracking-widest mb-4 text-brand-teal text-sm font-bold">Pilares do Método</Text>
          <Heading className="text-3xl md:text-4xl text-white mb-6">
            Valores que guiam sua <span className="text-brand-teal">Transformação</span>
          </Heading>
          <Text>
            O método EVO não é apenas um curso, é um realinhamento completo dos seus valores fundamentais.
          </Text>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {CONTENT.values.map((val) => (
            <ValueTag key={val.label} label={val.label} />
          ))}
        </div>
        
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-brand-surface border border-white/5 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col items-center">
                <Text className="font-display font-light text-2xl md:text-4xl italic text-center max-w-4xl text-white/90">
                "{CONTENT.tagline}"
                </Text>
            </div>
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/10 via-transparent to-brand-orange/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
      </div>
    </section>
  );
};