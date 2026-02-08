import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT, BRAND_ASSETS } from '../../constants';
import { Button } from '../atoms/Button';
import { IconSend, IconSparkle, IconCircleDashed, IconDoor } from '../atoms/Icons';
import { Heading, Text } from '../atoms/Typography';
import { ChatBubble } from '../molecules/ChatBubble';
import type { FormState } from '../../App';

interface EvoCareChatProps {
  formData: FormState;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

const createInitialContext = (data: FormState): string => {
  let context = `O nome do participante é ${data.nome}.\n\nResumo das respostas da avaliação:\n`;
  if (data.q1) context += `- Estado emocional atual: ${data.q1}\n`;
  if (data.q2) context += `- Percepção sobre ressignificação: ${data.q2}\n`;
  if (data.q4) context += `- Sensação de vazio ou pendência: ${data.q4}\n`;
  if (data.q5) context += `- Nível de energia: ${data.q5}\n`;
  if (data.q6) context += `- Dificuldade em aplicar ferramentas: ${data.q6}\n`;
  if (data.q9 === 'Sim') context += `- Relatou sentir medo ou vontade de se isolar.\n`;
  if (data.q10) context += `- Capacidade de lidar com emoções: ${data.q10}\n`;
  if (data.q13) context += `- Interesse em apoio de coaching (ARP): ${data.q13}\n`;
  if (data.q14 && data.q14 !== 'Nenhuma, estou bem em todas as áreas.') context += `- Área de interesse para coaching: ${data.q14}\n`;

  context += "\nPor favor, inicie a conversa de acolhimento seguindo suas diretrizes, usando o nome da pessoa e abordando um dos pontos mais sensíveis que você identificar no resumo.";
  return context;
};

export const EvoCareChat: React.FC<EvoCareChatProps> = ({ formData }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [conversationEnded, setConversationEnded] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatHistoryRef.current?.scrollTo({ top: chatHistoryRef.current.scrollHeight, behavior: 'smooth' });
  };
  
  useEffect(scrollToBottom, [messages]);

  // Contar trocas de conversa (user turns)
  useEffect(() => {
    const userTurns = messages.filter(m => m.sender === 'user').length;
    setTurnCount(userTurns);
    
    // Se atingiu 3 turnos, encerra a conversa
    if (userTurns >= 3) {
      setConversationEnded(true);
    }
  }, [messages]);

  useEffect(() => {
    const startConversation = async () => {
      setIsLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const initialContext = createInitialContext(formData);
        
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: initialContext,
            config: {
                systemInstruction: SYSTEM_PROMPT
            }
        });

        const welcomeMessage = response.text;
        setMessages([{ sender: 'ai', text: welcomeMessage }]);
      } catch (error) {
        console.error("Error starting conversation:", error);
        setMessages([{ sender: 'ai', text: `Olá, ${formData.nome}. Tivemos um problema para iniciar nossa conversa, mas a equipe do EVO Care já foi notificada e entrará em contato com você em breve.` }]);
      } finally {
        setIsLoading(false);
      }
    };

    startConversation();
  }, [formData]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chatWithHistory = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: {
                systemInstruction: SYSTEM_PROMPT,
            },
            history: messages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }],
            }))
        });

        const response = await chatWithHistory.sendMessage({ message: currentInput });

        const aiMessage: Message = { sender: 'ai', text: response.text };
        setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage: Message = { sender: 'ai', text: "Desculpe, ocorreu um erro ao processar sua mensagem. A equipe já foi notificada. Por favor, aguarde o contato de um de nossos especialistas." };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleExit = () => {
    window.location.href = 'https://evocare.com';
  };

  return (
    <section className="min-h-screen flex flex-col bg-brand-depth">
        <header className="flex items-center justify-between p-4 border-b border-white/5 bg-brand-black sticky top-0 z-20">
            <div className="flex items-center gap-4">
                <img src={BRAND_ASSETS.logo} alt="EVO Care" className="h-10" />
                <div>
                    <Heading as="h3" className="text-lg">EVO Care</Heading>
                    <Text className="!text-xs !text-brand-teal leading-none">Online</Text>
                </div>
            </div>
        </header>
        
        <div ref={chatHistoryRef} className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {messages.map((msg, index) => (
                    <ChatBubble key={index} sender={msg.sender} message={msg.text} />
                ))}
                {isLoading && (
                    <div className="flex justify-start mb-6 animate-fade-in-up">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-evo-gradient p-[1px] flex-shrink-0 mt-1">
                              <div className="w-full h-full bg-brand-black rounded-full flex items-center justify-center">
                                <IconSparkle size={14} className="text-white" />
                              </div>
                            </div>
                            <div className="bg-brand-surface border border-white/5 p-4 rounded-2xl rounded-tl-none">
                                <IconCircleDashed size={20} className="animate-spin text-white/50" />
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Botão Sair - Aparece após 3 turnos ou quando conversa termina */}
                {conversationEnded && !isLoading && (
                    <div className="flex justify-center mt-8 mb-4 animate-fade-in-up">
                        <button
                            onClick={handleExit}
                            className="bg-evo-gradient text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-all duration-300 flex items-center gap-2 shadow-lg"
                        >
                            <IconDoor size={20} />
                            Sair da Conversa
                        </button>
                    </div>
                )}
            </div>
        </div>

        <footer className="p-4 border-t border-white/5 bg-brand-black sticky bottom-0 z-20">
            {!conversationEnded ? (
                <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-center gap-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        disabled={isLoading}
                        className="flex-1 bg-brand-surface border border-white/10 rounded-xl px-4 py-3 focus:border-brand-purple outline-none transition-colors text-white disabled:opacity-50"
                        aria-label="Mensagem"
                    />
                    <Button type="submit" size="sm" className="!px-4 !py-3 rounded-xl" disabled={isLoading || !input.trim()} aria-label="Enviar Mensagem">
                        <IconSend size={20} />
                    </Button>
                </form>
            ) : (
                <div className="max-w-4xl mx-auto text-center">
                    <Text className="!text-sm !text-brand-teal/70">
                        Conversa encerrada. Um especialista ARP entrará em contato com você em breve.
                    </Text>
                </div>
            )}
        </footer>
    </section>
  );
};
