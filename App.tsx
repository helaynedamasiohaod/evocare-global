

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Button } from './components/atoms/Button';
import { BRAND_ASSETS, CONTENT, EVO_STAGES } from './constants';
import { Display, Heading, Text, GradientText } from './components/atoms/Typography';
import { IconArrowRight, IconCheck, IconWarning, IconLock, IconSparkle } from './components/atoms/Icons';
import { EvoCareChat } from './components/organisms/EvoCareChat';
import { AlertDisplay } from './components/organisms/AlertDisplay';

// --- Types & Data ---

type AlertLevel = 'verde' | 'amarelo' | 'vermelho';

export interface FormState {
  // Identificação
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  cidade: string;
  // Perguntas (Q1 - Q15)
  q1: string; // Estado emocional (melhor, igual, confuso, pior)
  q2: string; // Ressignificar (paz, incompleta, precisa mais, não conseguiu)
  q3: string; // Aberta - o que mudou
  q4: string; // Vazio (Não, sim falta algo, sim questões abertas)
  q5: string; // Energia (Aumentou, mesma, cansado)
  q6: string; // Ferramentas (Fácil, dificuldades, não consegue)
  q7: string; // Aberta - frase momento
  q8: string[]; // Sintomas (Checkbox multi)
  q9: string; // Medo/Isolamento (Sim, Não)
  q10: string; // Capacidade lidar (Controle, sobrecarregando, perdeu controle)
  q11: string; // Pensamentos vida não vale a pena (Sim, Não)
  q12: string; // Diagnóstico (Sim acompanhamento, sim sem tratamento, não)
  q13: string; // Apoio ARP (Sim falta, talvez, não)
  q14: string; // Áreas Coaching (Família, Carreira, Autoconfiança, Nenhuma)
  q15: string; // Aberta - Compartilhar algo
}

const initialFormState: FormState = {
  nome: '', email: '', telefone: '', cpf: '', cidade: '',
  q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: [], q9: '', q10: '', q11: '', q12: '', q13: '', q14: '', q15: ''
};

// --- Standalone View Components (Moved outside App to prevent re-rendering) ---

interface LandingViewProps {
  onStart: () => void;
}
const LandingView: React.FC<LandingViewProps> = ({ onStart }) => (
    <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544531696-2d226d97c55c?q=80&w=2070&auto=format&fit=crop" 
          alt="Emotional Experience" 
          className="w-full h-full object-cover grayscale opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/90 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-4xl space-y-12">
        <img src={BRAND_ASSETS.logo} alt="EVO Care" className="h-24 mx-auto drop-shadow-2xl" />
        <Display className="text-5xl md:text-7xl">
          AVALIAÇÃO <GradientText>PÓS IMERSÃO</GradientText>
        </Display>
        <Text className="text-xl md:text-2xl max-w-2xl mx-auto">
          {CONTENT.tagline}
        </Text>
        <div className="pt-8">
          <Button size="lg" icon onClick={onStart}>
            {CONTENT.cta}
          </Button>
        </div>
      </div>
    </section>
);

interface StepIndicatorProps {
  currentStep: number;
}
const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => (
  <div className="flex justify-between items-center mb-12 max-w-2xl mx-auto w-full">
    {EVO_STAGES.map((stage, idx) => (
      <div key={stage.id} className="flex flex-col items-center gap-2 flex-1">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${currentStep >= idx ? 'border-brand-purple bg-brand-purple text-white' : 'border-white/10 bg-brand-black text-white/30'}`}>
          {currentStep > idx ? <IconCheck size={18} /> : (idx + 1)}
        </div>
        <span className={`text-[10px] uppercase tracking-widest font-bold ${currentStep >= idx ? 'text-white' : 'text-white/30'}`}>{stage.label}</span>
      </div>
    ))}
  </div>
);

interface FormStepProps {
  formData: FormState;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
  fieldErrors?: Record<string, string>;
  setFieldErrors?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleOpenFieldChange?: (value: string, field: 'q3' | 'q7' | 'q15') => void;
}

// Validation functions
const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  if (cleaned.length <= 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  }
  return cleaned.slice(0, 11);
};

const formatCPF = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  if (cleaned.length <= 9) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  }
  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
};

const isValidCPF = (cpf: string) => {
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleaned)) return false;
  
  let sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(9, 10))) return false;
  
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(10, 11))) return false;
  
  return true;
};


const FormStep0: React.FC<FormStepProps> = ({ formData, setFormData, fieldErrors = {}, setFieldErrors = () => {} }) => {
  const handleEmailChange = (value: string) => {
    setFormData(prev => ({...prev, email: value}));
    setFieldErrors(prev => ({
      ...prev,
      email: value.length > 0 && !isValidEmail(value) ? 'Email inválido' : ''
    }));
  };

  const handlePhoneChange = (value: string) => {
    const masked = formatPhoneNumber(value);
    setFormData(prev => ({...prev, telefone: masked}));
  };

  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    setFormData(prev => ({...prev, cpf: formatted}));

    if (formatted.length === 14) {
      setFieldErrors(prev => ({
        ...prev,
        cpf: !isValidCPF(formatted) ? 'CPF inválido' : ''
      }));
    }
  };

  return (
  <div className="space-y-8 animate-fade-in">
    <Heading className="text-3xl text-center">I. Identificação Obrigatória</Heading>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input label="Nome Completo" value={formData.nome} onChange={(v: string) => setFormData(prev => ({...prev, nome: v}))} />
      <Input label="E-mail" type="email" value={formData.email} onChange={handleEmailChange} error={fieldErrors.email} />
      <Input label="Telefone (WhatsApp)" placeholder="(00) 9XXXX-XXXX" value={formData.telefone} onChange={handlePhoneChange} maxLength="15" />
      <Input label="CPF" placeholder="000.000.000-00" value={formData.cpf} onChange={handleCPFChange} error={fieldErrors.cpf} maxLength="14" />
      <div className="md:col-span-2">
        <Input label="Cidade onde participou da Imersão" value={formData.cidade} onChange={(v: string) => setFormData(prev => ({...prev, cidade: v}))} />
      </div>
    </div>
  </div>
  );
};

const FormStep1: React.FC<FormStepProps> = ({ formData, setFormData, fieldErrors = {}, handleOpenFieldChange = () => {} }) => (
  <div className="space-y-10 animate-fade-in">
    <Heading className="text-2xl">II. Filtro de Percepção (1/3)</Heading>
    <RadioGroup
      label="1. Como você descreveria seu estado emocional geral HOJE, em comparação ao período anterior à Imersão?"
      options={['Sinto-me muito melhor, em paz e com clareza.', 'Sinto-me igual, mas com novos conhecimentos.', 'Sinto-me confuso(a) ou com a sensação de algo "pendente".', 'Sinto-me emocionalmente mais frágil ou pior do que antes.']}
      value={formData.q1}
      onChange={(v: string) => setFormData(prev => ({...prev, q1: v}))}
    />
    <RadioGroup
      label="2. Sobre o processo de 'Ressignificar' vivido no evento, qual alternativa melhor define sua situação atual?"
      options={['Ressignifiquei o que era necessário e sinto paz em relação a isso.', 'Acredito que ressignifiquei com a pessoa errada ou de forma incompleta.', 'Sinto que ainda preciso ressignificar com mais pessoas ou outras situações.', 'Sinto que não consegui ressignificar nada durante o processo.']}
      value={formData.q2}
      onChange={(v: string) => setFormData(prev => ({...prev, q2: v}))}
    />
    <Textarea label="3. Descreva brevemente: o que mudou na sua forma de pensar ou agir desde que saiu da Imersão?" value={formData.q3} onChange={(v: string) => handleOpenFieldChange(v, 'q3')} error={fieldErrors.q3} minChars={10} />
    <RadioGroup 
      label="4. Você sente que 'faltou algo' para que sua experiência fosse completa ou sente um vazio em alguma área da vida?"
      options={['Não, sinto-me pleno(a).', 'Sim, sinto que falta algo, mas não sei identificar o quê.', 'Sim, sinto que saí do evento com questões abertas que precisam de atenção.']}
      value={formData.q4}
      onChange={(v: string) => setFormData(prev => ({...prev, q4: v}))}
    />
    <RadioGroup 
      label="5. Qual a sua percepção sobre o seu nível de energia e motivação para as tarefas do dia a dia agora?"
      options={['Minha energia aumentou significativamente.', 'Minha energia continua a mesma.', 'Sinto-me mais cansado(a) e desmotivado(a) do que antes.']}
      value={formData.q5}
      onChange={(v: string) => setFormData(prev => ({...prev, q5: v}))}
    />
  </div>
);

const FormStep2: React.FC<FormStepProps> = ({ formData, setFormData, fieldErrors = {}, handleOpenFieldChange = () => {} }) => (
  <div className="space-y-10 animate-fade-in">
    <Heading className="text-2xl">II. Filtro de Percepção (2/3)</Heading>
    <RadioGroup
      label="6. Você sente que as ferramentas aprendidas no Método EVO estão sendo fáceis de aplicar sozinho(a)?"
      options={['Sim, estou aplicando com facilidade.', 'Tenho algumas dificuldades e gostaria de auxílio para praticar.', 'Não estou conseguindo aplicar nada do que vi.']}
      value={formData.q6}
      onChange={(v: string) => setFormData(prev => ({...prev, q6: v}))}
    />
    <Textarea label="7. Se você pudesse definir seu momento atual em uma única frase, qual seria?" value={formData.q7} onChange={(v: string) => handleOpenFieldChange(v, 'q7')} error={fieldErrors.q7} minChars={10} />
    <CheckboxGroup 
      label="8. Após a Imersão, você apresentou algum destes sintomas de forma persistente? (Marque todos que se aplicam)"
      options={['Dificuldade severa para dormir ou perda de apetite.', 'Crises de choro incontroláveis ou irritabilidade extrema.', 'Falta de ar, palpitações ou medo súbito de lugares abertos.', 'Desânimo profundo ou dificuldade de sair da cama.', 'Nenhuma das anteriores.']}
      value={formData.q8}
      onChange={(v: string[]) => setFormData(prev => ({...prev, q8: v}))}
    />
    <RadioGroup 
      label="9. Você tem sentido um medo paralisante ou uma vontade constante de se isolar de amigos e familiares?"
      options={['Sim.', 'Não.']}
      value={formData.q9}
      onChange={(v: string) => setFormData(prev => ({...prev, q9: v}))}
    />
    <RadioGroup 
      label="10. Como você avalia sua capacidade de lidar com as emoções negativas que surgiram após o evento?"
      options={['Estou lidando bem e me sinto no controle.', 'Sinto dificuldade e as emoções estão me sobrecarregando.', 'Sinto que perdeu o controle sobre minhas emoções.']}
      value={formData.q10}
      onChange={(v: string) => setFormData(prev => ({...prev, q10: v}))}
    />
  </div>
);

const FormStep3: React.FC<FormStepProps> = ({ formData, setFormData, fieldErrors = {}, handleOpenFieldChange = () => {} }) => (
  <div className="space-y-10 animate-fade-in">
    <Heading className="text-2xl">II. Filtro de Percepção (3/3)</Heading>
    <RadioGroup
      label="11. Em algum momento, desde o término do evento, você teve pensamentos de que a vida não vale mais a pena?"
      options={['Sim.', 'Não.']}
      value={formData.q11}
      onChange={(v: string) => setFormData(prev => ({...prev, q11: v}))}
    />
    <RadioGroup
      label="12. Você já possui ou teve algum diagnóstico de transtorno de ansiedade, depressão, pânico ou outra condição de saúde mental?"
      options={['Sim, e estou em acompanhamento profissional.', 'Sim, mas não estou em tratamento no momento.', 'Não.']}
      value={formData.q12}
      onChange={(v: string) => setFormData(prev => ({...prev, q12: v}))}
    />
    <RadioGroup
      label="13. Você acredita que o apoio de um Amante Radical de Pessoas (ARP) através de um processo de Coaching ajudaria você a organizar seus próximos passos?"
      options={['Sim, sinto que esse acompanhamento é o que me falta agora.', 'Talvez, gostaria de entender melhor como isso pode me ajudar.', 'Não, sinto que já tenho o que preciso para seguir.']}
      value={formData.q13}
      onChange={(v: string) => setFormData(prev => ({...prev, q13: v}))}
    />
    <RadioGroup
      label="14. Em qual dessas áreas você sente que um processo de auxílio (Coaching Pro Bono) faria mais diferença hoje?"
      options={['Relacionamentos Familiares / Amorosos.', 'Carreira, Finanças e Propósito.', 'Autoconfiança e Gestão das Emoções.', 'Nenhuma, estou bem em todas as áreas.']}
      value={formData.q14}
      onChange={(v: string) => setFormData(prev => ({...prev, q14: v}))}
    />
    <Textarea label="15. Existe algo específico que aconteceu na Imersão, ou após ela, que você gostaria de compartilhar com a equipe do EVO Care?" value={formData.q15} onChange={(v: string) => handleOpenFieldChange(v, 'q15')} error={fieldErrors.q15} minChars={10} />
  </div>
);

interface ResultViewProps {
  alertLevel: AlertLevel;
  onReset: () => void;
}
const ResultView: React.FC<ResultViewProps> = ({ alertLevel, onReset }) => {
    if (alertLevel === 'vermelho') {
      return (
        <section className="min-h-screen p-8 flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 mb-4">
            <IconWarning size={48} />
          </div>
          <Display className="text-red-500">Atenção Prioritária</Display>
          <Text className="text-xl">Identificamos que você está passando por um momento de alta vulnerabilidade emocional. É fundamental que você tenha suporte profissional agora.</Text>
          <div className="p-8 bg-brand-surface border border-red-500/30 rounded-3xl w-full">
            <Heading as="h4" className="mb-4">Recursos de Apoio Imediato</Heading>
            <ul className="text-left space-y-4">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>CVV (Centro de Valorização da Vida): Ligue 188</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>SAMU: 192</span>
              </li>
            </ul>
            <div className="mt-8">
              <Button size="lg" className="w-full bg-red-600 !text-white hover:bg-red-700" onClick={() => window.open('https://institutoevo.com.br/profissionais-saude', '_blank')}>
                Acessar Profissionais de Saúde Parceiros
              </Button>
            </div>
          </div>
        </section>
      );
    }

    if (alertLevel === 'amarelo') {
      return (
        <section className="min-h-screen p-8 flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange mb-4">
            <IconSparkle size={48} />
          </div>
          <Display className="text-brand-orange">Suporte EVO Care</Display>
          <Text className="text-xl">O processo de ressignificação é profundo e, às vezes, precisamos de um guia para organizar os próximos passos.</Text>
          <div className="p-8 bg-brand-surface border border-brand-orange/30 rounded-3xl w-full">
            <Heading as="h4" className="mb-4">Encaminhamento para ARP / Coaching</Heading>
            <Text className="mb-8">Detectamos que o apoio de um Amante Radical de Pessoas (ARP) pode ser transformador para o seu momento atual. Vamos conectar você a um coach pro bono.</Text>
            <Button size="lg" icon className="w-full" onClick={() => window.open('https://wa.me/5561986060051?text=Olá,%20fiz%20minha%20avaliação%20e%20fui%20encaminhado%20para%20atendimento%20ARP.', '_blank')}>
              Conectar com o EVO Care agora
            </Button>
          </div>
        </section>
      );
    }

    return (
      <section className="min-h-screen p-8 flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-12 animate-fade-in">
        <div className="w-32 h-32 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-teal mb-4 shadow-[0_0_40px_rgba(0,208,132,0.3)]">
          <IconCheck size={64} />
        </div>
        <Display className="text-brand-teal text-6xl md:text-8xl">Você é Livre!</Display>
        <div className="space-y-6">
          <Text className="text-2xl !text-white font-medium">Parabéns por concluir esta etapa da sua jornada.</Text>
          <Text className="text-lg">Você completou a Imersão e integrou profundamente seus aprendizados. Sua transformação é real e está apenas começando. Agora é hora de viver a vida extraordinária que você escolheu, com a força e clareza que conquistou.</Text>
        </div>
        <div className="pt-8">
          <Button size="lg" className="bg-evo-gradient text-white px-16" onClick={onReset}>
            Sair
          </Button>
        </div>
      </section>
    );
};


const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'form' | 'result' | 'chat'>('landing');
  const [currentStep, setCurrentStep] = useState(0); // 0: Identificação, 1: Perguntas 1-5, 2: 6-10, 3: 11-15
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [alertLevel, setAlertLevel] = useState<AlertLevel>('verde');

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // --- Logic Functions ---

  const handleStart = () => {
    setView('form');
    setCurrentStep(0);
    scrollToTop();
  };

  const calculateTriage = (): AlertLevel => {
    const isRed =
      formData.q11 === 'Sim' ||
      (formData.q8.length > 0 && formData.q8.some(s => s !== 'Nenhuma das anteriores.') && formData.q1 === 'Sinto-me emocionalmente mais frágil ou pior do que antes.');

    const isYellow =
      formData.q2 === 'Acredito que ressignifiquei com a pessoa errada ou de forma incompleta.' ||
      formData.q2 === 'Sinto que ainda preciso ressignificar com mais pessoas ou outras situações.' ||
      formData.q13 === 'Sim, sinto que esse acompanhamento é o que me falta agora.';

    if (isRed) return 'vermelho';
    if (isYellow) return 'amarelo';
    return 'verde';
  };

  const handleFinish = () => {
    const level = calculateTriage();
    setAlertLevel(level);
    if (level === 'amarelo') {
      setView('chat');
    } else {
      setView('result');
    }
    scrollToTop();
  };

  // Função para verificar se há erros no FormStep atual
  const hasErrorsInCurrentStep = (): boolean => {
    if (currentStep === 1) {
      return fieldErrors.q3 !== '';
    }
    if (currentStep === 2) {
      return fieldErrors.q7 !== '';
    }
    if (currentStep === 3) {
      return fieldErrors.q15 !== '';
    }
    return false;
  };

  // Handler para campos abertos (Q3, Q7, Q15)
  const handleOpenFieldChange = (value: string, field: 'q3' | 'q7' | 'q15') => {
    setFormData(prev => ({...prev, [field]: value}));
    const minChars = 10;
    const error = value.length > 0 && value.length < minChars
      ? `Mínimo ${minChars} caracteres`
      : '';
    setFieldErrors(prev => ({...prev, [field]: error}));
  };

  return (
    <main className="bg-brand-black min-h-screen text-white font-body selection:bg-brand-purple selection:text-white">
      {view === 'landing' && <LandingView onStart={handleStart} />}
      
      {view === 'form' && (
        <section className="max-w-5xl mx-auto px-6 py-20 min-h-screen">
          <div className="flex flex-col items-center mb-16">
            <img src={BRAND_ASSETS.logo} alt="EVO Care" className="h-16 mb-8" />
            <StepIndicator currentStep={currentStep} />
          </div>

          <div className="bg-brand-surface/40 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[40px] shadow-2xl">
            {currentStep === 0 && <FormStep0 formData={formData} setFormData={setFormData} fieldErrors={fieldErrors} setFieldErrors={setFieldErrors} />}
            {currentStep === 1 && <FormStep1 formData={formData} setFormData={setFormData} fieldErrors={fieldErrors} handleOpenFieldChange={handleOpenFieldChange} />}
            {currentStep === 2 && <FormStep2 formData={formData} setFormData={setFormData} fieldErrors={fieldErrors} handleOpenFieldChange={handleOpenFieldChange} />}
            {currentStep === 3 && <FormStep3 formData={formData} setFormData={setFormData} fieldErrors={fieldErrors} handleOpenFieldChange={handleOpenFieldChange} />}

            <div className="mt-16 flex justify-between items-center border-t border-white/5 pt-12">
              <Button 
                variant="ghost" 
                disabled={currentStep === 0}
                onClick={() => { setCurrentStep(s => s - 1); scrollToTop(); }}
              >
                Voltar
              </Button>
              <Button 
                size="lg"
                icon={currentStep < 3}
                disabled={hasErrorsInCurrentStep()}
                onClick={() => {
                  if (currentStep < 3) {
                    setCurrentStep(s => s + 1);
                    scrollToTop();
                  } else {
                    handleFinish();
                  }
                }}
              >
                {currentStep === 3 ? "Finalizar Avaliação" : "Próxima Etapa"}
              </Button>
            </div>
          </div>
        </section>
      )}
      
      {view === 'alert' && (
        <AlertDisplay 
          level={alertLevel} 
          userName={formData.nome} 
          onProceed={() => setView('chat')} 
        />
      )}
      {view === 'chat' && <EvoCareChat formData={formData} />}

      {view === 'result' && <ResultView alertLevel={alertLevel} onReset={() => setView('landing')} />}

      <footer className="py-12 border-t border-white/5 text-center text-white/20 text-xs">
        <p>&copy; 2026 EVO Care • Todos os direitos reservados • Inteligência Emocional</p>
      </footer>
    </main>
  );
};

// --- Helper Input Components ---

const Input = ({ label, type = "text", placeholder, value, onChange, error, maxLength }: any) => (
  <div className="space-y-2">
    <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      maxLength={maxLength}
      className={`w-full bg-brand-black border rounded-xl px-4 py-4 focus:outline-none transition-colors text-white ${
        error ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand-purple'
      }`}
    />
    {error && <span className="text-red-500 text-sm ml-1">{error}</span>}
  </div>
);

const Textarea = ({ label, value, onChange, error, minChars = 10 }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-1">{label}</label>
      <span className={`text-xs ${value.length >= minChars ? 'text-brand-teal' : 'text-white/50'}`}>
        {value.length}/{minChars}
      </span>
    </div>
    <textarea 
      rows={4}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-4 focus:border-brand-purple outline-none transition-colors text-white resize-none"
    />
  </div>
);

const RadioGroup = ({ label, options, value, onChange }: any) => (
  <div className="space-y-4">
    <label className="text-lg font-medium text-white/90 leading-tight block mb-4">{label}</label>
    <div className="grid grid-cols-1 gap-3">
      {options.map((opt: string) => (
        <label key={opt} className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${value === opt ? 'bg-brand-purple/10 border-brand-purple' : 'bg-brand-black/40 border-white/5 hover:border-white/10'}`}>
          <input type="radio" checked={value === opt} onChange={() => onChange(opt)} className="hidden" />
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${value === opt ? 'border-brand-purple' : 'border-white/20'}`}>
            {value === opt && <div className="w-2.5 h-2.5 bg-brand-purple rounded-full"></div>}
          </div>
          <span className={`text-sm ${value === opt ? 'text-white' : 'text-white/60'}`}>{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

const CheckboxGroup = ({ label, options, value, onChange }: any) => (
  <div className="space-y-4">
    <label className="text-lg font-medium text-white/90 leading-tight block mb-4">{label}</label>
    <div className="grid grid-cols-1 gap-3">
      {options.map((opt: string) => {
        const isChecked = value.includes(opt);
        return (
          <label key={opt} className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${isChecked ? 'bg-brand-purple/10 border-brand-purple' : 'bg-brand-black/40 border-white/5 hover:border-white/10'}`}>
            <input 
              type="checkbox" 
              checked={isChecked} 
              onChange={() => {
                if (isChecked) onChange(value.filter((v: string) => v !== opt));
                else onChange([...value, opt]);
              }} 
              className="hidden" 
            />
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isChecked ? 'border-brand-purple bg-brand-purple' : 'border-white/20'}`}>
              {isChecked && <IconCheck size={14} className="text-brand-black" strokeWidth={32} />}
            </div>
            <span className={`text-sm ${isChecked ? 'text-white' : 'text-white/60'}`}>{opt}</span>
          </label>
        );
      })}
    </div>
  </div>
);

export default App;
