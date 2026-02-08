import React from 'react';
import { BRAND_ASSETS } from '../../constants';
import { Button } from '../atoms/Button';
import { Heading, Text } from '../atoms/Typography';

interface AlertDisplayProps {
  level: 'verde' | 'amarelo' | 'vermelho';
  userName: string;
  onProceed: () => void;
}

export const AlertDisplay: React.FC<AlertDisplayProps> = ({ level, userName, onProceed }) => {
  if (level === 'vermelho') {
    return (
      <section className="min-h-screen bg-red-900/10 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-brand-surface border-2 border-red-500 rounded-3xl p-8 md:p-12 text-center">
            <div className="text-6xl mb-6">🚨</div>
            
            <Heading as="h2" className="text-3xl md:text-4xl text-red-500 mb-4">
              Alerta Crítico - Saúde Mental
            </Heading>
            
            <Text className="text-lg text-white mb-8">
              {userName}, suas respostas indicam que você pode estar em sofrimento emocional significativo.
            </Text>

            <div className="bg-red-900/30 border-2 border-red-500/50 rounded-2xl p-6 mb-8 text-left">
              <p className="text-white font-bold text-lg mb-4">
                Você não está sozinho. Profissionais estão prontos para ajudar:
              </p>
              <ul className="text-white/90 space-y-3 text-base">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">📞</span>
                  <div>
                    <span className="font-bold">CVV (188):</span> Disponível 24/7 - Suporte emocional
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">📞</span>
                  <div>
                    <span className="font-bold">SAMU (192):</span> Emergências de saúde
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">💬</span>
                  <div>
                    <span className="font-bold">Equipe EVO Care:</span> Profissional entrará em contato urgentemente
                  </div>
                </li>
              </ul>
            </div>

            <Button 
              onClick={onProceed}
              size="lg"
              className="!bg-red-600 hover:!bg-red-700 w-full"
            >
              Entendi - Continuar com Equipe EVO Care
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (level === 'amarelo') {
    return (
      <section className="min-h-screen bg-brand-orange/5 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-brand-surface border-2 border-brand-orange rounded-3xl p-8 md:p-12 text-center">
            <div className="text-6xl mb-6">⚠️</div>
            
            <Heading as="h2" className="text-3xl md:text-4xl text-brand-orange mb-4">
              Acompanhamento Recomendado
            </Heading>
            
            <Text className="text-lg text-white mb-8">
              {userName}, identificamos que um acompanhamento personalizado pode ser muito valioso neste momento.
            </Text>

            <div className="bg-brand-orange/10 border-2 border-brand-orange/30 rounded-2xl p-6 mb-8">
              <p className="text-white/90 text-base leading-relaxed">
                Um <span className="font-bold text-brand-orange">Amante Radical de Pessoas (ARP)</span> especialmente treinado 
                entrará em contato com você nos próximos dias para oferecer coaching pro bono 
                e ajudá-lo a organizar seus próximos passos.
              </p>
            </div>

            <Button 
              onClick={onProceed}
              size="lg"
              className="!bg-brand-orange hover:!opacity-90 w-full"
            >
              Continuar
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (level === 'verde') {
    return (
      <section className="min-h-screen bg-brand-teal/5 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-brand-surface border-2 border-brand-teal rounded-3xl p-8 md:p-12 text-center">
            <div className="text-6xl mb-6">✅</div>
            
            <Heading as="h2" className="text-3xl md:text-4xl text-brand-teal mb-4">
              Parabéns! Você está bem!
            </Heading>
            
            <Text className="text-lg text-white mb-8">
              {userName}, suas respostas indicam que você integrou bem a experiência da Imersão 
              e está em um bom lugar emocionalmente.
            </Text>

            <div className="bg-brand-teal/10 border-2 border-brand-teal/30 rounded-2xl p-6 mb-8">
              <p className="text-white/90 text-base">
                Continue praticando os aprendizados do Método EVO e curta seu progresso! 
                Você está no caminho certo.
              </p>
            </div>

            <Button 
              onClick={onProceed}
              size="lg"
              className="!bg-brand-teal hover:!opacity-90 w-full"
            >
              Finalizar
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return null;
};
